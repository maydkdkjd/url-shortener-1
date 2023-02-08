import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Signup, Dashboard } from './pages'
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import { checkAuth } from './helpers/helpers';
import ProtectedComponent from './components/ProtectedComponent';
// import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleUserState = (res) => {
    if (!res || !res.isAuth) setUser(null);
  }

  useEffect(() => {
    const user = {
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
    }
    setUser(user);
    checkAuth().then(res => {
      if (!res.isAuth) {
        setUser(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
      };
    })
  }, [])

  const handleUser = (user) => {
    setUser(user);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
  }

  const logoutUser = () => {
    fetch(`http://localhost:5000/users/logout`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        console.log('Logged out successfully')
      }
    }).catch(err => { throw err })
      .finally(() => {
        setUser(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
      })
  }

  return (
    <BrowserRouter>
      <Layout handleLogout={logoutUser} user={user}>
        <Routes>
          <Route path='/' element={
            <ProtectedComponent handleUserState={handleUserState} userState={user}>
              <Dashboard user={user} />
            </ProtectedComponent>
          } />
          <Route path='/login' element={<Login handleUser={handleUser} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
