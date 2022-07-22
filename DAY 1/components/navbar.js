
export function buildNavbar(pages) {
    let body = document.body;
    let navbar = document.createElement('nav');
    navbar.className = 'navbar';
    body.prepend(navbar);
    let navbarBody = document.createElement('div');
    navbarBody.className = 'navbarBody';
    navbar.appendChild(navbarBody);
    for(let page in pages){
        // let a = document.createElement('a');
        // a.href = pages[page].url;
        // navbarBody.appendChild(a);
        let navbarItem = document.createElement('div');
        navbarItem.className = 'navbarItem';
        navbarItem.innerText = pages[page].title;
        navbarItem.addEventListener('click', () => {
            pages[page].buildPageFun()
        });
        // navbarItem.addEventListener('popState', () => {
        //     // pages[page].buildPageFun()
        //     console.log('aaaaa');
        // });
        navbarBody.appendChild(navbarItem);
    }
}