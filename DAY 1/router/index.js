import { buildNavbar } from '../components/navbar.js'
import { buildForm } from '../js/form.js'
import { buildPostsFoundation } from '../js/postsData.js'
import { buildMain } from '../js/mainPage.js'
import l from '../js/loading.js'


const app = document.getElementById('app');

function buildError() {
    app.innerHTML = '<h1>404 Podany adres nie istnieje</h1>';
}

window.addEventListener('popstate', () => {
    l.loading(app);
    if(window.location.pathname === '/'){
        app.innerHTML = '';
        buildMain();
    }
    else if(window.location.pathname === '/posts'){
        app.innerHTML = '';
        buildPostsFoundation();
    }
    else if(window.location.pathname === '/userForm'){
        app.innerHTML = '';
        buildForm();
    }
    else{
        app.innerHTML = '';
        buildError();
    }
    l.unlink();
  });

window.addEventListener('load', () => {
    l.loading(app);
    if(window.location.pathname === '/'){
        buildMain();
    }
    else if(window.location.pathname === '/posts'){
        buildPostsFoundation();
    }
    else if(window.location.pathname === '/userForm'){
        buildForm();
    }
    else{
        buildError();
    }
    l.unlink();
  });

function changeUrl(state, title, url) {
    window.history.pushState(state, title, url);
}

const pages = {
    home: {state: 'home', title: 'Strona główna', url: '/', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        app.innerHTML = '';
        l.loading(app);
        buildMain();
        l.unlink();
    }},
    posts: {state: 'posts', title: 'Posty', url: '/posts', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        app.innerHTML = '';
        l.loading(app);
        buildPostsFoundation();
        l.unlink();

    }},
    userForm: {state: 'userForm', title: 'Formularz', url: '/userForm', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        app.innerHTML = '';
        l.loading(app);
        buildForm();
        l.unlink();
    }},
}

// let lastUrl = location.href; 
// new MutationObserver(() => {
//   const url = location.href;
//   if (url !== lastUrl) {
//     lastUrl = url;
//     onUrlChange();
//   }
// }).observe(document, {subtree: true, childList: true});
 
 
// function onUrlChange() {
//   alert('URL changed!', location.href);
// }

buildNavbar(pages);


// loading(document.getElementById('app'));

