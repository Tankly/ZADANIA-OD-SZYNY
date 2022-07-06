function fireAlert(alertMsg){
    const alertButton = 'OK';
    const alertTitle = 'Błąd';
    
    let isAlertDivCreated = document.getElementById("alertContainer");
    if (isAlertDivCreated) {
        return;
    }

    let body = document.querySelector('body');
    let divForAlertContainer = document.createElement('div');
    let alertContainer = body.appendChild(divForAlertContainer);
    
    alertContainer.id = 'alertContainer';
    alertContainer.className = 'alertContainer';

    let divForAlertBox = document.createElement('div');
    let alertBox = alertContainer.appendChild(divForAlertBox);

    alertBox.className = 'alertBox';

    alertBox.style.top = document.documentElement.scrollTop + "px";
    alertBox.style.left = (document.documentElement.scrollWidth - alertBox.offsetWidth) / 2 + "px";

    let alertHeaderTag =  document.createElement('h1');
    let alertTitleText = document.createTextNode(alertTitle);
    let alertTitleDone = alertBox.appendChild(alertHeaderTag);
    alertTitleDone.appendChild(alertTitleText);

    let alertPTag = document.createElement('p');
    let alertPTextContainer = alertBox.appendChild(alertPTag);
    alertPTextContainer.textContent = alertMsg;

    let closeButtonTag = document.createElement('button');
    let closeButtonText = document.createTextNode(alertButton);
    let closeButton = alertBox.appendChild(closeButtonTag);
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'closeButton';

    closeButton.addEventListener('click', () => {
        removeAlert();
    }, false);
}
function removeAlert(){
    let body = document.querySelector('body');
    let alertContainer = document.getElementById('alertContainer');
    body.removeChild(alertContainer);
}