import { useEffect, useState } from "react";

const FontColorDropdown = () => {

const [color, setColor] = useState('#000000');    

/**
* @typedef {Object} chrome
 * @property {Object} tabs
 * @property {Function} query
 * @property {Object} scripting
 * @property {Function} executeScript
 */

/** @type {chrome} */
const chrome = window.chrome;

const ColorChange = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [color],
      func: (color) => {
        
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.color = color;
        });
      
      }
  });
};

const handleColorChange = (e) => {
    setColor(e)
}

useEffect(() => {
    ColorChange(color);
}, [color])

return (
    <div className="text-[1.1rem] flex items-center gap-4 justify-center p-2 bg-blue-300 rounded-lg shadow-md ml-4">
      <span className="text-gray-600 font-medium">Text Color</span>
      <input 
        type="color" 
        onChange={(e) => handleColorChange(e.target.value)} 
        className="w-10 h-10 p-1 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer transition duration-300 ease-in-out hover:border-gray-500"
      />
    </div>
  );
};

export default FontColorDropdown;