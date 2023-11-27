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

    // const handleDelete  = (todo) => {
    //     axios.delete(`${url}/ ${todo.id}` )
    // }

    return (
        <div className={'container'}>
          <h1 className={'title'}>Todo list</h1>
            <input type="text" onChange={(e) => setTodoTitle(e.target.value)} value={todoTitle}/>
            <button onClick={handleAddTodo}>Add todo</button>
            {
                todos.map(todo =>
                <div key={todo.id} className={'todo-wrapper'}>
                    <p>{todo.title}</p>
                    <input type="checkbox" checked={todo.completed}/>
                    <span>{dayjs(todo.createdAt).format(' HH.mm DD.MM.YYYY')}</span>
                    {/*<button onClick={() => handleDelete(todo)}>Delete Todo</button>*/}
                </div>
                )
            }
        </div>
    );
};

export default App;