
import { useState } from 'react'
import type { Todo } from './types'
import './App.css'

type Filter = 'all' | 'active' | 'completed'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn TypeScript', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    // CHANGE: All JSX elements are wrapped in ONE parent div.
    // This fixes: "JSX expressions must have one parent element."
    <div className="app">
      <h1>Nido App</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filter-buttons">
        {/* CHANGE: JSX uses className, not class. */}
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>

        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          // CHANGE: Each mapped item has a unique key.
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
          >
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* CHANGE: Empty-state message is inside the same parent div. */}
      {filteredTodos.length === 0 && (
        <p className="empty-message">No tasks to display.</p>
      )}
    </div>
  )
}

export default App
