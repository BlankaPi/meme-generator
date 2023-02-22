import React from 'react';
import "./header.scss"
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Header = () => {
  return (
    <header>
        <div>
          <MdOutlineEmojiEmotions />
          <h2>Meme Generator</h2>
        </div>
        <h4>Unleash your creativity with one hundred of the most popular memes</h4>
    </header>
  )
}

export default Header