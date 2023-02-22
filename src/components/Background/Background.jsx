import React from 'react'
import "./background.scss"
import * as MdIcons from "react-icons/md";

const Background = () => {
  return (
    <div className='background'>
        <div className='bg1'></div>
        <div className='bg2'><MdIcons.MdOutlineSmartToy /></div>
        <div className='bg3'><MdIcons.MdSentimentNeutral /></div>
    </div>
  )
}

export default Background;