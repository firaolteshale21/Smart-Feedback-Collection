import React from 'react'
import { useTheme } from '../ThemeContext'
import TopNav from '../components/TopNav';
import Hero from '../components/Hero';
import FeedBackScreen from './FeedBackScreen';

const Home = () => {

    const {theme} = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} dark:bg-zinc-800 min-h-screen`}>
        <TopNav/>
        <FeedBackScreen/>
    </div>
  )
}

export default Home