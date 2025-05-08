import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
//import "./tasklist.css";
import "./index.css";

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="header ">
      <h1>TASK list</h1>
      <TaskList />
    </header>
  );
}
function TaskList() {
  //declaring component -level state using react hook (useState)
  //const [tasks, setTasks] = useState(initialTasks);
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage or use initial tasks if not found
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: "Buy groceries", completed: true },
          { id: 2, text: "Finish React assignment", completed: false },
          { id: 3, text: "Call mom", completed: false },
        ];
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    if (!newTask.trim()) return;
    const newId = tasks.length + 1;
    const newTaskObj = { id: newId, text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
  }

  function handleCompleted(id) {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updated);
  }

  return (
    <main className="task-list">
      <h2>Tasks </h2>

      <ul className="tasks">
        {tasks.map((tasks) => (
          <TaskItem
            key={tasks.id}
            tasksObj={tasks}
            onComplete={handleCompleted}
          />
        ))}
      </ul>
      <TaskInput onAdd={handleAddTask} />
    </main>
  );
}

function TaskInput({ onAdd }) {
  const [newTask, setNewTask] = useState("");
  function handleAdd() {
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
  }
  return (
    <div className="task-input">
      <input
        className="btn"
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAdd}>AddTask</button>
    </div>
  );
}

function TaskItem({ tasksObj, onComplete }) {
  return (
    <li className="task">
      <span>{tasksObj.id}</span>
      <strong>{tasksObj.text}</strong>
      {!tasksObj.completed ? (
        <button onClick={() => onComplete(tasksObj.id)}>
          Mark as Complete
        </button>
      ) : (
        <span className="done">✅ Done</span>
      )}
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
