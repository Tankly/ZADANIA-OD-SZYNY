import { getPhotosOfGivenAlbum } from '../api'

var album;

var photoIterator;

var currentPhotoEl;

function iteratorHandler(handler) {
    currentPhotoEl.classList.add('photoShakeAnimation');
    handler(photoIterator)
    currentPhotoEl.src = album[photoIterator].url;
    currentPhotoEl.title = album[photoIterator].title;
    setTimeout(() =>{
        currentPhotoEl.classList.remove('photoShakeAnimation');
    },500)
    idlePhotoChange();
}

const next = () => {
    iteratorHandler(() => {
        photoIterator++;
        if(photoIterator >= album.length){
            photoIterator = 0;
        }
    })
}
const previous = () => {
    iteratorHandler(() => {
        photoIterator--;
        if(photoIterator < 0){
            photoIterator = album.length;
        }
    })
}




function idlePhotoChange() {
    console.log('miasto poznań')
    let t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;     
    window.ontouchstart = resetTimer;  
    window.ontouchmove = resetTimer;  
    window.onclick = resetTimer;      
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true);

    function resetTimer(e) {
        clearTimeout(t);
        t = setTimeout(next, 500);
    }
}


export async function buildPhotos(albumId){
    album = await getPhotosOfGivenAlbum(albumId);
    photoIterator = 0;
    let app = document.getElementById('app');
    app.innerHTML = '';
    let pageContent = document.createElement('div');
    pageContent.className = 'pageContent';
    app.appendChild(pageContent);
    let header =  document.createElement('header');
    pageContent.appendChild(header);
    let headerH1 = document.createElement('h1');
    headerH1.innerText = `Zdjęcia z albumu numer ${albumId}`;
    header.appendChild(headerH1);
    let main = document.createElement('main');
    main.id = 'photosMain';
    pageContent.appendChild(main);
    let slider = document.createElement('div');
    slider.id = 'slider'
    main.appendChild(slider);
    let navigationLeft = document.createElement('div');
    navigationLeft.id = 'nLeft';
    navigationLeft.classList.add('navigation');
    slider.appendChild(navigationLeft);
    let photoBox = document.createElement('img');
    photoBox.id = 'photoBox';
    photoBox.src = album[photoIterator].url;
    photoBox.title = album[photoIterator].title;
    slider.appendChild(photoBox);
    let navigationRight = document.createElement('div');
    navigationRight.id = 'nRight';
    navigationRight.classList.add('navigation');
    slider.appendChild(navigationRight);
    navigationLeft.addEventListener('click', previous);
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft'){
            previous();
        }
        else if(e.key === 'ArrowRight'){
            next();
        }
    });
    navigationRight.addEventListener('click', next);
    currentPhotoEl = document.getElementById('photoBox');
    idlePhotoChange();
}
