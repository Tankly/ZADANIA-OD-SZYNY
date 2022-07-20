import { buildNavbar } from '../components/navbar.js'
import { buildForm } from '../js/form.js'

function changeUrl(state, title, url) {
    window.history.pushState(state, title, url);
}

const pages = {
    home: {state: 'home', title: 'Strona główna', url: '/', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
    }},
    posts: {state: 'posts', title: 'Posty', url: '/posts', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
    }},
    userForm: {state: 'userForm', title: 'Formularz', url: '/userForm', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
        buildForm();
    }},
}

buildNavbar(pages);