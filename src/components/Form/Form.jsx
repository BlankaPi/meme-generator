import React, { useState, useEffect } from 'react';
import "./form.scss";
import * as MdIcons from "react-icons/md";

const Form = () => {

  const [meme, setMeme] = useState(
    {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg"
    }
  )

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])

  const getMemeImage = () => {
    const memesArray = allMemes;
    const randomNumer = Math.floor(Math.random() * memesArray.length);
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: memesArray[randomNumer].url
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme(prevMemeData => ({
      ...prevMemeData,
      [name]: value
    }))
  }

  //console.log(meme)

  return (
    <main className='form'>
      <div className='form-input'>
        <input
          type="text"
          placeholder='Top text'
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          spellcheck="false"
        />
        <input
          type="text"
          placeholder='Bottom text'
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          spellcheck="false"
        />
      </div>
      <button onClick={getMemeImage}>
        Get a new meme image< MdIcons.MdExtension />
      </button>
      <div className='form-img'>
        <img src={meme.randomImage} alt="meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <a href='https://imgflip.com/api'>Imgflip API</a>
    </main>
  )
}

export default Form