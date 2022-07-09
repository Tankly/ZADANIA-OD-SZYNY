export function fireAlert(alertMsg){
    const alertButton = 'OK';
    const alertTitle = 'Błędnie wypełniony formularz';
    
    let isAlertDivCreated = document.getElementById("alertContainer");
    if (isAlertDivCreated) {
        return;
    }
    //@NOTE document.querySelector('body') -> document.body
    let body = document.body;
    let divForAlertContainer = document.createElement('div');
    let alertContainer = body.appendChild(divForAlertContainer);
    
    alertContainer.id = 'alertContainer';
    // alertContainer.className = 'alertContainer';

    let divForAlertBox = document.createElement('div');
    let alertBox = alertContainer.appendChild(divForAlertBox);

    alertBox.id = 'alertBox';

    // alertBox.style.top = document.documentElement.scrollTop + "px";
    // alertBox.style.left = (document.documentElement.scrollWidth - alertBox.offsetWidth) / 2 + "px";

    //@NOTE INNERTEXT TEXTCONTENT
    // let alertTitleText = document.createTextNode(alertTitle);
    let alertHeaderTag =  document.createElement('h1');
    let alertTitleDone = alertBox.appendChild(alertHeaderTag);
    alertTitleDone.innerText=alertTitle;

    let alertPTag = document.createElement('p');
    let alertPTextContainer = alertBox.appendChild(alertPTag);
    alertPTextContainer.textContent = alertMsg;

    let closeButtonTag = document.createElement('button');
    let closeButton = alertBox.appendChild(closeButtonTag);
    closeButton.innerText = alertButton;
    // closeButton.appendChild(closeButtonText);
    // closeButtonTag -> closeButton | closeButton.innerText = alertButton
    closeButton.id = 'closeButton';

    closeButton.addEventListener('click', () => {
        divForAlertContainer.remove();
        // removeAlert();
    }, false);
}

// function removeAlert(){
//     let body = document.querySelector('body');
//     let alertContainer = document.getElementById('alertContainer');
//     //@NOTE alertContainer.remove()
//     body.removeChild(alertContainer);
// }