import * as React from 'react';
import {
  Button, CssBaseline, TextField, Link, Grid, Box,
  Typography, Container
} from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as ShortUrlLarge } from '../media/short-url.svg';
import { useNavigate, NavLink } from 'react-router-dom';
const theme = createTheme();


export function SignUp() {
  const history = useNavigate();

  const addUser = async (driver) => {
    const response = await fetch(`http://localhost:5000/users/register`, {
      method: 'POST',
      body: JSON.stringify(driver),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok) alert(`An error occured: ${response.statusText}`);
    return history('/login');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get('firstName'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('confirmPassword'),
    }
    addUser(newUser);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              my: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <ShortUrlLarge />
            <Typography component="h1" variant="h5">
              Create your Short URL account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required={true}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required={true}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link component={NavLink} to="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignUp