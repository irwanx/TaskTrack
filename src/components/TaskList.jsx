import React from 'react';
import SortingAndSearch from './SortingAndSearch.jsx';

function TaskList({ tasks, deleteTask, toggleComplete, searchTerm, setSearchTerm, sortBy, handleSortBy }) {
    const handleDelete = (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        
        if (confirmDelete) {
            deleteTask(taskId);
        }
    };

    return (
        <div>
            <ul className="w-full max-w-full mt-6">
                {tasks.length > 0 && (
                    <>
                        <li className='text-xl font-semibold mb-4 text-center'><h1>Tasks</h1></li>
                        <li>
                            <SortingAndSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} handleSortBy={handleSortBy} />
                        </li>
                    </>
                )}
                {tasks.map((task) => (
                    <li key={task.id} className={`my-2 p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-200 dark:text-white dark:bg-indigo-900 text-indigo-900 bg-gray-100`}>
                        <span className={`${task.completed ? 'line-through' : ''} w-96`}>
                            <h1 className='text-lg font-semibold'>{task.name}</h1>
                            <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{task.text}</p>
                            <p className="text-xs text-gray-500">Create At : {task.createdAt}</p>
                            <p className="text-xs text-gray-500">Due date : {task.date}</p>
                            <p className="text-xs text-gray-500">{task.priority}</p>
                        </span>
                        <div className='block sm:flex sm:gap-2 w-auto sm:w-24'>
                            <button
                                onClick={() => toggleComplete(task.id)}
                                className={`w-10 sm:w-12 m-2 sm:m-0 px-2 py-1 rounded transition-all ease-in-out duration-500 ${task.completed ? ('dark:bg-indigo-900 dark:border dark:border-green-500 bg-gray-50 border border-green-500') : ('dark:bg-indigo-900 dark:border dark:border-yellow-500 bg-gray-50 border border-yellow-500')} text-white hover:opacity-75 transition`}
                            >
                                {task.completed ? <img src='icon/check-square.svg' alt='centang' /> : <img src='icon/square.svg' alt='centong' />}
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className={`w-10 sm:w-12 m-2 sm:m-0 transition-all ease-in-out duration-500 dark:bg-indigo-900 dark:border dark:hover:bg-red-950 bg-gray-50 border hover:bg-red-100 border-red-400 text-white px-2 py-1 rounded`}
                            >
                                <img src='icon/trash-2.svg' alt='trash icon' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
