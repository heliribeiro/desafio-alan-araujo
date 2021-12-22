import { useState, useEffect } from 'react';

import api from '../../services/api';
import history from '../../history';


export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [erroLogin, setErroLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(email,password) {

    const { data:{token, user} } = await api.post('/session',{
      email,
      password
    }).catch(error=>{
      //alert('Erro ao fazer o login, verifique o seu email e senha')
      console.log(error)
      setErroLogin(true)
    });

    localStorage.setItem('name', JSON.stringify(user.name));

    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`; 
    setAuthenticated(true);
    history.push('/home');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, erroLogin ,handleLogin, handleLogout };
}