import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';

export default class App extends React.Component {

    state = {
        inputValue: '',
        todos: [],
        completedTodos: []
    };

    changeText = value => {
        this.setState({inputValue: value});
    };

    addItem = () => {
        if (this.state.inputValue !== '') {
            this.setState(prevState => {
                let newToDo = {
                    title: this.state.inputValue,
                    createdAt: Date.now(),
                    todoId: Date.now().toString(),
                    completed: false
                };

                let todos = this.state.todos.concat(newToDo);

                this.setState({
                    todos: todos,
                    inputValue: ''
                });
            });
        }
    };

    markAsComplete = (todoId) => {
        let completedTodos = this.state.completedTodos;

        let newTodos = this.state.todos.filter((todo) => {
            if (todo.todoId === todoId) {
                let tempTodo = todo;
                tempTodo.completed = true;
                completedTodos.push(tempTodo)
            }
            return todo.todoId !== todoId;
        });

        this.setState({todos: newTodos, completedTodos: completedTodos});
    }

    deleteTodo = (todoId, todoArray) => {
        let newTodos = todoArray.filter((todo) => {
            return todo.todoId !== todoId;
        });

        return newTodos;
    }

    render() {
        let todos = this.state.todos.reverse().map((todo, key) =>
            <View style={styles.background}>
                <TouchableOpacity style={styles.touchbleopacity} onPress={() => {
                    console.log(todo.todoId);

                    this.markAsComplete(todo.todoId);
                }}/>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.text}>{todo.title}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    let newTodoList = this.deleteTodo(todo.todoId, this.state.todos);
                    this.setState({todos: newTodoList})
                }}>
                    <Ionicons name="trash" size={32} color="white"/>
                </TouchableOpacity>
            </View>
        );

        let completedTodos = this.state.completedTodos.reverse().map((todo, key) =>
            <View style={styles.background}>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
                    <Text style={[styles.text, {textDecorationLine: 'line-through'}]}>{todo.title}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    let newCompletedTodoList = this.deleteTodo(todo.todoId, this.state.completedTodos);
                    this.setState({completedTodos: newCompletedTodoList})
                }}>
                    <Ionicons name="trash" size={32} color="white"/>
                </TouchableOpacity>
            </View>
        );

        return (
            <LinearGradient colors={['#FE51BB', '#330014']} style={{flex: 1}}>
                <StatusBar barStyle="light-content"/>

                <View>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={this.addItem}
                        onChangeText={this.changeText}
                        placeholder="Type here to add a Todo"
                        value={this.state.inputValue}
                        placeholderTextColor={'#fff'}
                        multiline={true}
                        autoCapitalize="sentences"
                        underlineColorAndroid="transparent"
                        selectionColor={'white'}
                        maxLength={30}
                        returnKeyType="done"
                        autoCorrect={false}
                        blurOnSubmit={true}
                    />
                </View>

                {this.state.todos.length > 0 ?
                    <View>
                        {todos}
                    </View> :
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={{color: 'white', fontSize: 16}}>No Todos are added</Text>
                    </View>}

                {this.state.completedTodos.length > 0 ? <View>
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={{color: 'white', fontSize: 16}}>Completed Todos</Text>
                    </View>

                    {completedTodos}
                </View> : null}

            </LinearGradient>
        );
    }
}

const styles = {
    input: {
        marginTop: 30,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        fontSize: 25,
        color: 'white',
        fontWeight: '500'
    },

    background: {
        flexDirection: 'row',
        marginTop: 10,
        flex: 1,
        alignItems: 'center'
    },

    touchbleopacity: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: 'white',
        margin: 15
    },

    text: {
        paddingLeft: 5,
        fontSize: 28,
        color: 'white'
    },
};
