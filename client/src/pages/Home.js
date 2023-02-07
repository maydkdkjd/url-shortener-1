import { Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/urls/add', {
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
        }
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <Box>
      <Container maxWidth="sm">
        <Box sx={{py: 4, margin: 'auto'}} component="form" onSubmit={handleSubmit}>
          <Typography variant='h3' component="h1">
            Shorten a URL
          </Typography>
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="URL to shorten"
            name="url"
            value={url}
            onChange={e => { setUrl(e.target.value) }}
          />

          <Button type="submit" variant='outlined' fullWidth>
            Generate
          </Button>
        </Box>

          {shortUrl.length !== 0 && (
            <a target='_blank'
              rel='noreferrer'
              href={`http://localhost:5000/${shortUrl}`}>
              {`http://localhost:5000/${shortUrl}`}
            </a>
          )}
      </Container>
    </Box>
  )
}

export default Home;