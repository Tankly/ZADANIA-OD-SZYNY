export default function ({ store, redirect }) {
    if (localStorage.getItem('User')) {
      const userData = JSON.parse(localStorage.getItem("User"))
      store.dispatch('setUser', userData)
      return redirect('/dashboard');
    }
  }