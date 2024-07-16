import React, { useState, useEffect } from 'react';
import Header from './components/partials/Header.jsx';
import Footer from './components/partials/Footer.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import ErrorAlert from './components/ErrorAlert.jsx';
import TypingText from './components/TypingText.jsx';

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
  const [darkMode, setDarkMode] = useState(true);
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
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex flex-col font-popins`}>
      <div className="bg-indigo-950 dark:text-gray-50 text-gray-900 sm:bg-gradient-to-r sm:from-indigo-200 sm:via-gray-50 sm:to-indigo-200 sm:dark:from-indigo-800 sm:dark:via-indigo-950 sm:dark:to-indigo-800 sm:dark:text-gray-50 flex-grow">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className='text-center pt-6'>
          <TypingText strings={strings} className='text-2xl font-bold mb-4' />
        </div>
        <div className='flex flex-col items-center mt-4 flex-grow'>
          <div className="p-6 rounded-lg sm:shadow-lg w-full max-w-sm md:max-w-xl transition-all ease-in-out duration-500 bg-gray-50 dark:bg-indigo-950 dark:text-gray-50">
            <TaskForm
              name={name}
              setName={setName}
              input={input}
              setInput={setInput}
              date={date}
              setDate={setDate}
              priority={priority}
              setPriority={setPriority}
              addTask={addTask}
            />
            <TaskList
              tasks={filteredAndSortedTasks}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              handleSortBy={handleSortBy}
            />
            {error && <ErrorAlert message={error} onClose={handleCloseError} />}
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
