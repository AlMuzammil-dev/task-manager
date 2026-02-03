import React, { useState } from "react";

const TaskList = ({ tasks, deleteTask, toggleComplete, editTask }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t, index) => (
          <li key={t.id} className="task-item">
            {/* LEFT SIDE */}
            <div className="task-left">
              <button
                className={
                  t.completed ? "switch-btn completed" : "switch-btn pending"
                }
                onClick={() => toggleComplete(t.id)}
              >
                {t.completed ? "Completed" : "Pending"}
              </button>

              {editingIndex === index ? (
                <>
                  <input
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </>
              ) : (
                <span className="task-text">
                  {t.text} - {t.dueDate || "No date"}
                </span>
              )}
            </div>

            {/* RIGHT SIDE (buttons always aligned) */}
            <div className="task-right">
              {editingIndex === index ? (
                <button
                  onClick={() => {
                    editTask(t.id, newText, newDueDate);
                    setEditingIndex(null);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setNewText(t.text);
                    setNewDueDate(t.dueDate);
                  }}
                >
                  Edit
                </button>
              )}

              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
