import cookies from 'js-cookie';

export default async function ({ store }) {
  const token = cookies.get('x-access-token');
  if(!localStorage.getItem('User')){
    return;
  }
  else{
    const userData = JSON.parse(localStorage.getItem("User"))
    store.dispatch('setUser', userData)
  }
  if (!token) {
    await store.dispatch('refreshToken')
  }
  else {
    store.dispatch('loadToken', token)
  }
}