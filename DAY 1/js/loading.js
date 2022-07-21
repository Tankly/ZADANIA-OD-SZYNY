export default  {
    loadingDiv: null,
    loading: function(domEl) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingDiv';
        domEl.appendChild(loadingDiv);
        let div2 = document.createElement('div');
        div2.id = 'lpadingSubDiv'
        loadingDiv.appendChild(div2);
        let loadingSpan = document.createElement('span');
        loadingSpan.classList.add('loader','loader-circles');
        div2.appendChild(loadingSpan);
        // loadingDiv.innerHTML += 'Ładowanie';
        this.loadingDiv = loadingDiv
    },
    unlink() {
        this.loadingDiv.remove()
    }
}