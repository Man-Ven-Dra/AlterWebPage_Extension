import { useEffect, useState } from "react";

const DarkMode = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

        /**
 * @typedef {Object} chrome
 * @property {Object} tabs
 * @property {Function} query
 * @property {Object} scripting
 * @property {Function} executeScript
 */

/** @type {chrome} */
const chrome = window.chrome;

const handleDarkMode = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [isOn],
        func: (isOn) => {
        const allElements = document.querySelectorAll('*');
     
        if(isOn === true) {  
          allElements.forEach(element => {
              element.style.backgroundColor = 'black';
              element.style.color = 'white';
          });
        }
        if(isOn === false) {
            allElements.forEach(element => {
                element.style.backgroundColor = 'white';
                element.style.color = 'black';
            });
        }
        }
    });
  };

useEffect(() => {
    handleDarkMode();
}, [isOn])

    return (
        <div className='text-[1.1rem] flex gap-4 items-center w-full justify-center pl-6'>
            <div className="font-medium">
                Dark Mode
            </div>
            <div className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isOn ? 'bg-blue-400' : ''}`} onClick={toggleSwitch}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`} ></div>
            </div>
        </div>
    );
};

export default DarkMode;