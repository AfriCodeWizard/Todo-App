```
import { useState } from 'react'
import type { Todo } from './types'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn TypeScript', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ])

  return (
    <div className="app">
      <h1>Todo App</h1>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
```