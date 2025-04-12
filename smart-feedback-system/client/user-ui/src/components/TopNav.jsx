import React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../ThemeContext'
import logo from '../assets/kuriftu.svg'


const TopNav = () => {

    const {setTheme} = useTheme();
  return (
    <div className='flex w-full justify-between p-5'>
            <div>
                <h1 className='font-bold text-3xl text-blue-800 dark:text-gray-400'>
                    <img src={logo}></img>  
                </h1>
            </div>
            <div className='p-2 rounded-xl bg-zinc-200   dark:bg-zinc-700 flex '>
                <button
                onClick={() => setTheme("light")}
                 className='p-2  rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-400'>
                    <LuSun className=' dark:text-white'/>
                </button>
                
                <button 
                onClick={() =>  setTheme("dark")}
                className='p-2 rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-400'>
                    <LuMoon className=' dark:text-white'/>
                </button>
            
            </div>
        </div>
  )
}

export default TopNav