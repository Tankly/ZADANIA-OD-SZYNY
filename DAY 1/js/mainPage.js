export function buildMain(){
    let app = document.getElementById('app');
    let pageContent = document.createElement('div');
    pageContent.className = 'pageContent';
    app.appendChild(pageContent);
    let header =  document.createElement('header');
    pageContent.appendChild(header);
    let headerH1 = document.createElement('h1');
    headerH1.innerText = 'Strona główna';
    header.appendChild(headerH1);
    let main = document.createElement('main');
    pageContent.appendChild(main);
}