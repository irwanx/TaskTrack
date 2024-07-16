import React from 'react';

function Header({ darkMode, toggleDarkMode }) {
    return (
        <div className='flex justify-between items-center'>
            <button
                onClick={toggleDarkMode}
                className={`dark:bg-indigo-900 sm:dark:bg-indigo-700 bg-gray-50 mx-4 mt-4 px-4 py-2 rounded shadow-md transition-all ease-in-out duration-500`}
            >
                {darkMode ? (
                    <img src='icon/sun2.svg' alt="Sun Icon" className="w-6 h-6 transition-all ease-in-out duration-500" />
                ) : (
                    <img src='icon/moon.svg' alt="Moon Icon" className="w-6 h-6 transition-all ease-in-out duration-500" />
                )}
            </button>
            <a href='https://github.com/irwanx' target='_blank' rel='noopener noreferrer'
                className={`dark:bg-indigo-900 sm:dark:bg-indigo-700 bg-gray-50 mx-4 mt-4 px-4 py-2 rounded shadow-md transition-all ease-in-out duration-500`}
            >
                {darkMode ? (
                    <img src='icon/github2.svg' alt="github icon dark" className="w-6 h-6 transition-all ease-in-out duration-500" />
                ) : (
                    <img src='icon/github.svg' alt="github Icon light" className="w-6 h-6 transition-all ease-in-out duration-500" />
                )}
            </a>
        </div>
    );
}

export default Header;
