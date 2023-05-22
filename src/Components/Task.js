import React, { useState, useEffect } from 'react'
import './css/tasks.css'


const LOCAL_STORAGE_KEY = "todos.app"

const Task = () => {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([])


  useEffect(() => {
    const storedtodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedtodos) setTodos(storedtodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (newTodo === "") return
    setTodos(currentTodos => {
      return [...currentTodos, {
        id: crypto.randomUUID(),
        title: newTodo, completed: false
      }];


    })
    setNewTodo("")
  }
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  function handleClear(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(clearTodo => todos.id)

    })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='container'>
        <div className='header'>
          <h1>What to do?</h1>
        </div>
        <div className='text-area'>
          <input value={newTodo} onChange={e => setNewTodo(e.target.value)} type="text" name="text" placeholder="Enter what to do..."></input>
        </div>
        <button className="primary-btn">Add</button>

      </form>
      <div className="container-2">
        <div className="Todos">
          <h3>Todos</h3>
        </div>
        {todos.length === 0 && "No todos"}
        <ul className="todo-element">
          {todos.map(todo => {
            return (
              <div className="gap2">
                <li className="Todo-lists" key={todo.id}>
                  <label>
                    <input type="checkbox">
                    </input>
                    {todo.title}
                  </label>
                  <button
                    onClick={() => deleteTodo(todo.id)} className='danger-btn'>delete</button>
                </li>
              </div>
            )
          }
          )}
        </ul>

      </div>
      <div className="center-btn">
        <button onClick={() => handleClear()} className="border-btn">clear</button>
      </div>
    </>
  )
}

export default Task