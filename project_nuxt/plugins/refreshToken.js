import cookies from 'js-cookie';

export default function ({ store, redirect }) {
  const token = cookies.get('x-access-token');
  if(!localStorage.getItem('User')){
    return;
  }
  if (!token) {
    console.log('aaaaaaaaaaaaaaaa');
    store.dispatch('refreshToken')
      .catch(errors => {
        store.dispatch('logout');
        redirect('/')
      });
  }
  else {
    store.dispatch('loadToken', token)
  }
}