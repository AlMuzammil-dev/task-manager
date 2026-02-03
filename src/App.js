import { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./App.css";
import Filter from "./Components/Filter";
import Search from "./Components/Search";
import { FaCog } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings]=useState(false)

  // Load tasks from localStorage
  useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    try {
      setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error("Invalid tasks data in localStorage:", error);
      localStorage.removeItem("tasks");
    }
  }
}, []);


  // Save tasks to localStorage
  useEffect(() => {
  console.log("Saving tasks:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = (text, dueDate) => {
  if (!text.trim()) return;

  const newTask = {
    id: Date.now(),
    text,
    dueDate,
    completed: false,
  };

  setTasks((prev) => [...prev, newTask]);
};


  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, dueDate: newDueDate }
          : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <div className="container">
        <h1>My Task</h1>

        <div className="settings">
          <button className="settings-btn"
          onClick={()=> setShowSettings(!showSettings)}>
            <FaCog/>
          </button>

          {showSettings &&(
            <div className="settings-menu">
              <label className="switch">
                <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={()=> setDarkMode(!darkMode)} />

                <span className="slider"></span>
              </label>
                <span className="switch-label">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </span>

            </div>

          )}

    
        </div>

        <TaskForm addTask={addTask} />
        <Search setSearch={setSearch} />
        <Filter setFilter={setFilter} />
        <div className="task-panel">

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
