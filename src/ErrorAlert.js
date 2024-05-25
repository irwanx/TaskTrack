import React, { useState, useEffect } from 'react';

const ErrorAlert = ({ message, onClose, darkMode }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        <div className='absolute top-3 right-0 left-0'>
            <div className={`flex items-center justify-center backdrop-filter backdrop-blur-sm ${visible ? 'visible' : 'hidden'}`} role="alert">
                <div className={`flex gap-3 items-center justify-between  border border-red-700 text-red-700 px-4 py-3 rounded ${darkMode ? 'bg-red-950 text-white' : 'bg-gray-50'} transition-all ease-in-out`}>
                    <div className="flex items-center">
                        <div className="py-1">
                            <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM8 8a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Error!</p>
                            <p className="text-sm">{message}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className={`focus:outline-none ${darkMode ? 'text-gray-200 hover:text-red-200' : 'text-red-500 hover:text-red-700'} transition-all ease-in-out`}>
                        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.95 14.95a.75.75 0 010 1.06.75.75 0 01-1.06 0L10 11.06l-3.94 3.94a.75.75 0 11-1.06-1.06L8.94 10 5 6.06a.75.75 0 011.06-1.06L10 8.94l3.94-3.94a.75.75 0 011.06 1.06L11.06 10l3.94 3.94z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;
