import React, { useEffect, useState } from 'react';

import {
  Button, CssBaseline, TextField, Link,
  Typography, Container, Grid, Box, Collapse, Alert, IconButton
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';

import { loginUser } from '../helpers/helpers';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogoLarge } from '../components/Logo';
import useUser from '../contexts/user';

export function Login() {
  const history = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    }

    loginUser(user).then(res => {
      if (res.isAuth) {
        login(res);
        history('/');
      }
    })
      .catch(err => { console.log(err) });
  };

  useEffect(() => {
    if (errorMsg?.length > 0) {
      setTimeout(() => {
        setErrorMsg('');
      }, 5000)
    }
  }, [errorMsg])

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoLarge />
        <Typography component="h1" variant="h5" sx={{ my: 2 }}>
          Sign in to your Short URL account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <Collapse in={errorMsg.length !== 0}>
            <Alert
              severity='error'
              variant='outlined'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorMsg('');
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ my: 3 }}
            >
              {errorMsg}
            </Alert>
          </Collapse>

          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => { setEmail(e.target.value) }}
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => { setPassword(e.target.value) }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;