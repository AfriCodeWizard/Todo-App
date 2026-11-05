
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

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
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
    <div className="app">
      <h1>Nido App?</h1>

      {/* CHANGE: Matched input-row to the existing CSS selector. */}
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
        />

        <button onClick={addTodo}>Add</button>
      </div>

      {/* CHANGE: Matched filters to the existing CSS selector. */}
      <div className="filters">
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
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
          >
            {/* CHANGE: Added existing CSS classes to the task content. */}
            <span
              className="todo-content"
              onClick={() => toggleTodo(todo.id)}
            >
              <span className="checkbox">
                {todo.completed ? '✓' : ''}
              </span>

              <span className="todo-text">
                {todo.text}
              </span>
            </span>

            {/* CHANGE: Added delete-btn to activate its CSS styling. */}
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* CHANGE: Matched empty to the existing CSS selector. */}
      {filteredTodos.length === 0 && (
        <p className="empty">No tasks to display.</p>
      )}
    </div>
  )
}

export default App
