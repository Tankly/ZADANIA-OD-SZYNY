export default function ({ redirect }) {
    if (!localStorage.getItem('User')) {
      return redirect('/');
    }
  }