import { useEffect, useState } from 'react';

const TextDropdown = () => {
  const [selected, setSelected] = useState('Select Font Style');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    'normal',
    'italic',
    'bold',
  ];

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
      args: [selected],
      func: (selected) => {
        const allElements = document.querySelectorAll('*');

        if(selected === 'bold') {
            allElements.forEach(element => {
                element.style.fontWeight = selected;
            });
        }
        if(selected === 'italic') {
            allElements.forEach(element => {
                element.style.fontStyle = selected;
            });
        }
        if(selected === 'normal') {
            allElements.forEach(element => {
                element.style.fontWeight = selected;
                element.style.fontStyle = selected;
            });
        }
      }
  });
};

const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    console.log(selected)
   // handleFontChange()
};

useEffect(() => {
    handleFontSizeChange()
}, [selected])

  return (
    <div className="relative inline-block w-64 shadow-md text-gray-700 font-bold">
      <button
        className=" border border-blue-400 rounded-md shadow-sm px-4 py-2 w-full text-left  bg-blue-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className="float-right">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 border border-gray-300 rounded-md shadow-lg z-10  bg-blue-300">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextDropdown;
