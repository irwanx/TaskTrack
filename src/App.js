import React, { useState, useEffect } from 'react';

import ErrorAlert from './ErrorAlert';
import TypingText from './TypingText';

function App() {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('tasks');
    return localData ? JSON.parse(localData) : [];
  });
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('default');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!name) {
      setError('Task Name is required.');
      return;
    }

    if (!input) {
      setError('Task description is required.');
      return;
    }

    if (!date) {
      setError('The date is required.');
      return;
    }

    if (priority === 'default') {
      setError('Priority must be selected.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    if (date === today) {
      setError('The date cannot be the same as today.');
      return;
    } else if (date < today) {
      setError('The selected date is in the past.');
      return;
    }

    const createdAt = new Date().toLocaleString();

    const newTask = {
      id: Date.now(),
      text: input,
      date: date,
      name: name,
      priority: priority,
      createdAt: createdAt,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
    setDate('');
    setName('');
    setPriority('default');
    setError('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleSortBy = (sortBy) => {
    setSortBy(sortBy);
  };

  const sortedTasks = () => {
    switch (sortBy) {
      case 'hardToLow':
        return tasks.slice().sort((a, b) => b.priority.localeCompare(a.priority));
      case 'lowToHard':
        return tasks.slice().sort((a, b) => a.priority.localeCompare(b.priority));
      case 'newestFirst':
        return tasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldestFirst':
        return tasks.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return tasks;
    }
  };

  const filteredAndSortedTasks = sortedTasks().filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const strings = ['To-do List 📝', 'Arrange tasks, enhance daily efficiency! 🚀.', 'Reach Your Objectives One Step at a Time 📃', 'Strategy, Execute, Succeed: Begin Today! 😉..'];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-indigo-200 via-gray-50 to-indigo-200 text-black'} font-sans`}>
      <div className='flex justify-between items-center'>
        <button
          onClick={toggleDarkMode}
          className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mx-4 mt-4 px-4 py-2 rounded shadow-md transition-all ease-in-out duration-500`}
        >
          {darkMode ? (
            <img src='icon/sun2.svg' alt="Sun Icon" className="w-6 h-6 transition-all ease-in-out duration-500" />
          ) : (
            <img src='icon/moon.svg' alt="Moon Icon" className="w-6 h-6 transition-all ease-in-out duration-500" />
          )}
        </button>
        <a href='https://github.com/irwanx' target='_blank' rel='noopener noreferrer'
          className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mx-4 mt-4 px-4 py-2 rounded shadow-md transition-all ease-in-out duration-500`}
        >
          {darkMode ? (
            <img src='icon/github2.svg' alt="github icon dark" className="w-6 h-6 transition-all ease-in-out duration-500" />
          ) : (
            <img src='icon/github.svg' alt="github Icon light" className="w-6 h-6 transition-all ease-in-out duration-500" />
          )}
        </a>
      </div>
      <div className='text-center pt-6'>
        <TypingText strings={strings} className='text-2xl font-bold mb-4' />
      </div>
      <div className='flex flex-col items-center mt-4 flex-grow'>
        <div className={`p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-xl transition-all ease-in-out duration-500 ${darkMode ? 'text-white bg-gray-800' : ' bg-gray-50 text-black'}`}>
          <h2 className="text-xl font-semibold mb-4 text-center">Add your tasks below :</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Task Name..."
            className={`w-full mb-2 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Description..."
            className={`w-full mb-2 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full mb-2 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`w-full mb-4 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            <option value="default">Enter Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={addTask}
            className={`w-full transition-all ease-in-out duration-500 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-500'} text-white py-2 rounded hover:bg-indigo-700 transition`}
          >
            Add Task
          </button>
          <ul className="w-full max-w-full mt-6">
            {filteredAndSortedTasks.length > 0 && (
              <li className='text-xl font-semibold mb-4 text-center'><h1>Tasks</h1></li>
            )}
            {tasks.length > 0 && (
              <li>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks by name..."
                  className={`w-full mb-2 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                />
              </li>
            )}
            {filteredAndSortedTasks.length > 0 && (
              <div className="flex items-center justify-between mb-4">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortBy(e.target.value)}
                  className={`p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                >
                  <option value="">None</option>
                  <option value="hardToLow">High to Low</option>
                  <option value="lowToHard">Low to High</option>
                  <option value="newestFirst">Newest First</option>
                  <option value="oldestFirst">Oldest First</option>
                </select>
              </div>
            )}
            {filteredAndSortedTasks.map((task) => (
              <li key={task.id} className={`my-2 p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-200 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-700 bg-gray-100'}`}>
                <span className={`${task.completed ? 'line-through' : ''}`}>
                  <h1 className='text-lg font-semibold'>{task.name}</h1>
                  <p>{task.text}</p>
                  <p>Create At : {task.createdAt}</p>
                  <p>Due date : {task.date}</p>
                  <p>{task.priority}</p>
                </span>
                <div className='flex gap-2'>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-2 py-1 rounded transition-all ease-in-out duration-500 ${task.completed ? (darkMode ? 'bg-gray-600 border border-green-500' : 'bg-gray-50 border border-green-500') : (darkMode ? 'bg-gray-600 border border-yellow-500' : 'bg-gray-50 border border-yellow-500')} text-white hover:opacity-75 transition`}
                  >
                    {task.completed ? <img src='icon/check-square.svg' alt='centang' /> : <img src='icon/square.svg' alt='centong' />}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={`transition-all ease-in-out duration-500 ${darkMode ? 'bg-gray-600 border hover:bg-red-950' : 'bg-gray-50 border hover:bg-red-100'} border-red-400 text-white px-2 py-1 rounded transition`}
                  >
                    <img src='icon/trash-2.svg' alt='trash icon' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {error && <ErrorAlert message={error} onClose={handleCloseError} darkMode={darkMode} />}
        </div>
      </div>
      <footer className={`py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-indigo-200 via-gray-50 to-indigo-200 text-black'} font-sans`}>
        <p className='text-center text-sm'>Developed & Designed by <strong>Irwanx</strong> || &copy; All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
