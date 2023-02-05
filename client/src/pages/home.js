import React, { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const handleSubmit = (e) => {
    fetch('http://localhost:5000/urls', {
      method: "POST",
        body: JSON.stringify({ targetUrl: url }),
        headers: {
          'Content-Type': 'application/json'
        },
    }).then(res => res.json())
      .then(resJson => {
        if (resJson) {
          setUrl('')
          setShortUrl(resJson.shortUrl)
          console.log(resJson);
        }
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <input
        name="url"
        onChange={handleChange}
        value={url}
        placeholder='paste/type your URL here'
      />

      <button onClick={handleSubmit} type="button">Submit</button>

      {shortUrl.length !== 0 && (
        <a target='_blank'
          rel='noreferrer'
          href={`http://localhost:5000/${shortUrl}`}>
          {`http://localhost:5000/${shortUrl}`}
        </a>
      )}
    </div>
  )
}

export default Home;