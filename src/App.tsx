
import { useState } from 'react'
import type { Todo } from './types'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn TypeScript', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ])

  const [input, setInput] = useState('')

  const addTodo = () => {
    const text = input.trim()
    if (!text) return

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInput('')
  }

  const  toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed} : todo
     )
        
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <h1>Nido App</h1>

      <div className= "input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"        
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className={todo.completed ? 'completed' : ''}
            >

              <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                <span className="checkbox">
                  {todo.completed ? '✔' : ''}
                </span>
                <span className="todo-text">{todo.text}</span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo">
                  x
                </button>              
          </li>
        ))}
      </ul>
      </div>
  )
}

export default App
