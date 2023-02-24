import React, { useState, useEffect } from 'react';
import "./form.scss";
import * as MdIcons from "react-icons/md";
import { saveAs } from 'file-saver';

const objectToQueryParams = (obj) => {
  const queryParams = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + queryParams.join("&");
}

const Form = () => {

  const [allMemes, setAllMemes] = useState([]);

  const [meme, setMeme] = useState(
    {
      topText: "",
      bottomText: "",
      randomImage: "https://i.imgflip.com/3oevdk.jpg",
      memeId: "222403160"
    }
  );

  const [generateMeme, setGenerateMeme] = useState(null);

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
      topText: "",
      bottomText: "",
      randomImage: memesArray[randomNumer].url,
      memeId: memesArray[randomNumer].id
    }))
    setGenerateMeme(null);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme(prevMemeData => ({
      ...prevMemeData,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      template_id: meme.memeId,
      text0: meme.topText,
      text1: meme.bottomText,
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD
    }

    const res = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParams(params)}`);
    const data = await res.json();
    setGenerateMeme(data.data.url);
  }

  const downloadImage = () => {
    saveAs(generateMeme, 'image.jpg')
  }

  return (
    <main className='form'>
      <form>
        <div className='form-input'>
          <input
            type="text"
            placeholder='Top text'
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            spellCheck="false"
          />
          <input
            type="text"
            placeholder='Bottom text'
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            spellCheck="false"
          />
        </div>
        <button type='button' onClick={getMemeImage}>
          Get a new meme image< MdIcons.MdExtension />
        </button>
        <button type='submit' onClick={handleSubmit}>
          Generate meme
        </button>
      </form>
      <div className='form-img'>
        {
          generateMeme ? <img src={generateMeme} alt="meme" /> : <img src={meme.randomImage} alt="meme" />
        }

        {
          /* NOT USING H2 WHEN CAPTION_IMAGE  
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2> 
          */
        }
      </div>
      <button type='button' onClick={downloadImage}>
        Download image
      </button>
      <a href='https://imgflip.com/api'>Imgflip API</a>
    </main>
  )
}

export default Form