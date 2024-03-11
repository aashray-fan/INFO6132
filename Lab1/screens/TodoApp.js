import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';
import AppToggle from '../components/AppToggle';
import AppTextInput from '../components/AppTextInput';

// or any pure javascript modules available in npm
import {
  Title,
  Paragraph,
  Card,
  Button,
  TextInput,
  Modal,
} from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../redux/actions';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo, updateTodo }) => {
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState(null);

  const handleAddTodo = (task) => {
    addTodo({ task, status: 'due' });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (item) => {
    updateTodo(item);
  };

  const onStatusChange = (item, newStatus) => {
    handleUpdateTodo({ ...item, status: newStatus });
  };

  const onTaskChange = (newText) => {
    handleUpdateTodo({ ...temp, task: newText });
    setVisible(false);
    setTemp(null);
  };

  const onPressEdit = (item) => {
    setTemp(item);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>
          ToDo App with React Native and Redux
        </Text>
      </Card>
      <Spacer />
      <AppTextInput
        title={'Add Todo Here'}
        buttonText={'Add Task'}
        onPress={handleAddTodo}
        value={''}
      />
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const activeColor =
            item?.status === 'due'
              ? 'yellow'
              : item?.status === 'done'
              ? 'green'
              : 'red';
          return (
            <>
              <Card style={[styles.item, { borderColor: activeColor }]}>
                <Card.Title
                  title={`Task#${item.id}`}
                  left={(props) => (
                    <Icon name="tasks" size={24} color="black" />
                  )}
                  right={(props) => (
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item.id)}
                    />
                  )}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
                <View style={styles.editBar}>
                  <AppToggle
                    selectedValue={item?.status}
                    activeColor={activeColor}
                    onChangeSelectedValue={(newValue) =>
                      onStatusChange(item, newValue)
                    }
                  />
                  <Button
                    icon="pencil"
                    style={styles.editButton}
                    mode="outlined"
                    onPress={() => onPressEdit(item)}>
                    {'EDIT'}
                  </Button>
                </View>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <AppTextInput
          title={'Edit Task'}
          value={temp?.task}
          buttonText={'Submit'}
          onPress={onTaskChange}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    borderWidth: 3,
  },
  editBar: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  editButton: {
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
});

const mapStateToProps = (state, ownProps) => {
  console.log(state.todos.todo_list);
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
