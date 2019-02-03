import axios from 'axios';

const { REST_SERVER_URL } = process.env;

const startLocalSession = (data) => {
  localStorage.setItem('email', data.email);
  localStorage.setItem('username', data.username);
  localStorage.setItem('id', data.id);
  localStorage.setItem('token', data.token.accessToken);
  localStorage.setItem('unrankedRating', data.rating_unranked);
  localStorage.setItem('rankedRating', data.rating_ranked);
  if (data.avatar != null) { localStorage.setItem('avi', data.avatar) }
}

const login = async (username, password) => {
  const { data } = await axios.post(`${REST_SERVER_URL}/api/auth/login`, { username, password }, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (data) {
    startLocalSession(data);
    return {
      active: true,
      message: 'Login Successful'
    };
  }
  return {
    acive: false,
    message: 'Credentials provided do not match'
  };
}


export default {
  startLocalSession,
  login,
}