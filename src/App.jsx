import './App.css'
import DarkMode from './darkMode';
import FontColorDropdown from './fontColorDropdown';
import FontFamilyDropdown from './fontFamilyDropdown';
import FontSizeDropdown from './fontSizeDropdown';
import TextDropdown from './textDropdown';

function App() {

  return (
    <div className='flex flex-col justify-center gap-4 text-1xl w-60 '>
      <div className='text-[1.5rem] font-semibold pl-4'>
        Edit WebPage
      </div>
     <FontSizeDropdown/>
     <FontFamilyDropdown/>
     <TextDropdown/>
     <FontColorDropdown/>
     <DarkMode/>
    </div>
  )
}

export default App
