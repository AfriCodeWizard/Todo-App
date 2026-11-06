
import { useEffect, useState, type KeyboardEvent } from 'react'
import type { Todo } from './types'
import './App.css'

type Filter = 'all' | 'active' | 'completed'

function App() {

  // CHANGE 1: Load previously saved todos when the app starts.
  // If nothing is saved, use the two default todos.
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos')

      if (savedTodos) {
        const parsedTodos: unknown = JSON.parse(savedTodos)

        if (Array.isArray(parsedTodos)) {
          return parsedTodos as Todo[]
        }
      }
    } catch (error) {
      console.error('Could not load todos from localStorage:', error)
    }

    return [
      { id: 1, text: 'Learn TypeScript', completed: false },
      { id: 2, text: 'Build a Todo App', completed: false },
    ]
  })

  // CHANGE 2: Save todos whenever the todos state changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  // CHANGE 3: Imported KeyboardEvent as a type from React.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length
  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <div className="app">
      <h1>Nido App?</h1>

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

            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p className="empty">No tasks to display.</p>
      )}

      {todos.length > 0 && (
        <div className="footer">
          <span>
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </span>

          {hasCompleted && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
       </div>
      )}
    </div>
  )
}

export default App
