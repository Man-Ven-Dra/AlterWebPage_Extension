import { useEffect, useState } from 'react';

const FontSizeDropdown = () => {
  const [size, setSize] = useState(0);
  const [change, setChange] = useState(false)
//selected
    /**
 * @typedef {Object} chrome
 * @property {Object} tabs
 * @property {Function} query
 * @property {Object} scripting
 * @property {Function} executeScript
 */

/** @type {chrome} */
const chrome = window.chrome;

const handleFontSizeChange = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [size],
      func: (size) => {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Get the computed style of the element
            const style = window.getComputedStyle(element);
            
            // Get the current font size
            const fontSize = parseFloat(style.fontSize);
            
            // Calculate the new font size
            const newFontSize = fontSize + size;
            
            // Set the new font size
            element.style.fontSize = `${newFontSize}px`;
          });
      }
  });
};

const handleInc = () => {
    setChange(!change)
    setSize(2);
};

const handleDec = () => {
    setChange(!change)
    setSize(-2);
};

useEffect(() => {
    handleFontSizeChange()
}, [change])

  return (
    <div className="relative inline-block w-64">
        <div className='flex justify-between items-center'>
            <div className='border-2 rounded w-16 py-1 shadow-md cursor-pointer text-[1.1rem] hover:border-blue-700' onClick={handleInc}>INC</div>
            <div className='text-[1.1rem] font-medium'>Font Size</div>
            <div className='border-2 rounded w-16 py-1 shadow-md cursor-pointer text-[1.1rem]  hover:border-blue-700' onClick={handleDec}>DEC</div>
        </div>
    </div>
  );
};

export default FontSizeDropdown
