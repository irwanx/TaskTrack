import React from 'react';

function TaskForm({ name, setName, input, setInput, date, setDate, priority, setPriority, addTask, darkMode }) {
    return (
        <React.Fragment>
            <h2 className="text-xl font-semibold mb-4 text-center">Add your tasks below:</h2>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Task Name..."
                className='w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition-all ease-in-out duration-500dark:text-gray-100 dark:bg-indigo-900 bg-white'
            />
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Description..."
                className='w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition-all ease-in-out duration-500dark:text-gray-100 dark:bg-indigo-900 bg-white'
                rows={4}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition-all ease-in-out duration-500dark:text-gray-100 dark:bg-indigo-900 bg-white'
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition-all ease-in-out duration-500dark:text-gray-100 dark:bg-indigo-900 bg-white'
            >
                <option value="default">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button
                onClick={addTask}
                className='w-full py-2 rounded text-white bg-indigo-500 hover:bg-indigo-700 transition-all ease-in-out duration-500'
            >
                Add Task
            </button>
        </React.Fragment>
    );
}

export default TaskForm;
