import React, { useState, useEffect } from 'react';

const TypingText = ({ strings }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(50); // Default typing speed

    useEffect(() => {
        const currentIndex = textIndex % strings.length;
        const currentText = strings[currentIndex];

        // Calculate typing speed based on text length
        const newTypingSpeed = Math.max(20, Math.floor(2000 / currentText.length));

        setTypingSpeed(newTypingSpeed);

        const typingEffect = setTimeout(() => {
            setDisplayText(currentText.substring(0, displayText.length + 1));

            if (displayText === currentText) {
                clearTimeout(typingEffect);
                setTimeout(() => {
                    setTextIndex((prevIndex) => prevIndex + 1);
                    setDisplayText('text');
                }, 1000);
            }
        }, typingSpeed);

        return () => clearTimeout(typingEffect);
    }, [textIndex, displayText, strings, typingSpeed]);

    return (
        <>
            <h1 className='text-indigo-600 text-2xl'>{displayText}</h1>
            <p>Simply add your tasks here</p>
        </>
    )
};

export default TypingText;
