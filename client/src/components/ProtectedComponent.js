import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../helpers/helpers';
import { ReactComponent as Spinner } from '../media/spinner.svg'

const UnauthorizedComponent = () => (
  <Container maxWidth="lg">
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          mt: 8
      }} >
        <Spinner width={32} height={32} />
      </Box>
    </Box>
  </Container>
);

const ProtectedComponent = ({ children, userState, handleUserState }) => {
  const history = useNavigate();
  useEffect(() => {
    checkAuth().then(res => {
      handleUserState(res);
      if (!res.isAuth) {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        return history('/login');
      };
    })
    .catch(err => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      handleUserState(null); 
      throw err 
    })
  })

  return userState ? children : <UnauthorizedComponent />
};

export default ProtectedComponent;