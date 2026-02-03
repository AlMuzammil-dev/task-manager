import React, { useState } from 'react'



const TaskForm = ({addTask}) => {
    const [task,setTask]=useState("");
    const [dueDate,setDueDate]=useState("");
  return (
    <div className='task-form'>
        <h2>Task Form</h2>
        <input placeholder="Enter task"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
        />
        <input 
        type="date"
        value={dueDate} 
        onChange={(e)=> setDueDate(e.target.value)}
        />

        <button onClick={()=> {
            addTask(task,dueDate);
            setTask("");
            setDueDate("");
            }}
            >
                Add
            </button>
      
    </div>
  )
}

export default TaskForm
