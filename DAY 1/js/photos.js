import { getPhotosOfGivenAlbum } from '../api'

export async function buildPhotos(albumId){
    data = await getPhotosOfGivenAlbum(albumId);
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
    navigationLeft.classList = 'navigation';
    slider.appendChild(navigationLeft);
    let photoBox = document.createElement('div');
    photoBox.id = 'photoBox';
    slider.appendChild(photoBox);
    let navigationRight = document.createElement('div');
    navigationRight.id = 'nRight';
    navigationRight.classList = 'navigation';
    slider.appendChild(navigationRight);
}