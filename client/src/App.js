import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Dashboard } from './pages'
import Layout from './components/Layout';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
