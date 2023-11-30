import React, {useEffect, useState} from 'react';
import axios from "axios";
import dayjs from "dayjs";

const url = 'https://65642481ceac41c0761d7eb6.mockapi.io/todo'

const App = () => {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
        axios(url)
            .then(({data}) => setTodos(data))
    },[])

    const handleAddTodo = () => {
        const newTodo = {
            title: todoTitle,
            completed: false,
            completedAt: null,
            createdAt: +new Date()
        }
        setTodoTitle('')
            axios.post(url, newTodo)
                .then(({data}) => setTodos([...todos, data]))
    }

    const handleDeleteTodo = (id) => {
        axios.delete(`${url}/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    }

    const handleToggleComplete = (id, completed) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !completed, completedAt: !completed ? new Date().toISOString() : null } : todo
        );

        axios.put(`${url}/${id}`, { completed: !completed, completedAt: !completed ? new Date().toISOString() : null })
            .then(() => setTodos(updatedTodos));
    };


    return (
        <div className={'container '}>
          <h1 className={'title'}>TODO LIST</h1>
            <input type="text" className={'border border-3 rounded-2 p-1 '} onChange={(e) => setTodoTitle(e.target.value)} value={todoTitle}/>
            <button onClick={handleAddTodo} className={'btn btn-primary '} >ADD</button>
            {
                todos.map(todo => (
                    <div key={todo.id} className={'todo-wrapper d-flex justify-content-around'}>
                        <p>{todo.title}</p>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id, todo.completed)}
                        />
                        <span>{todo.completed ? dayjs(todo.completedAt).format(' HH.mm DD.MM.YYYY') : ''}</span>
                        <button onClick={() => handleDeleteTodo(todo.id)} className={'btn btn-danger'}>Delete Todo</button>
                    </div>
                ))
            }
        </div>
    );
};

export default App;