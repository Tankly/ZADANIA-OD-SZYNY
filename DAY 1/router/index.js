import { buildNavbar } from '../components/navbar.js'
import { buildForm } from '../js/form.js'
import { buildPostsFoundation } from '../js/postsData.js'
import { buildMain } from '../js/mainPage.js'

function changeUrl(state, title, url) {
    window.history.pushState(state, title, url);
}

const pages = {
    home: {state: 'home', title: 'Strona główna', url: '/', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
        buildMain();
    }},
    posts: {state: 'posts', title: 'Posty', url: '/posts', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
        buildPostsFoundation();

    }},
    userForm: {state: 'userForm', title: 'Formularz', url: '/userForm', buildPageFun: function(){
        changeUrl(this.state, this.title, this.url);
        document.getElementById('app').innerHTML = '';
        buildForm();
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
buildMain();