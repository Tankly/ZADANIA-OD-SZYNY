function getFormData(){
    valid = true;
    let FormData = document.forms['userForm'];
    let name = FormData['name'].value;
    let surname = FormData['surname'].value;
    let age = FormData['age'].value;
    let email = FormData['email'].value;
    let details = FormData['details'].value;
    let gender = FormData['gender'].value;
    let alertMsg="Formularz źle wpełniony sprawdź pole: ";
    const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const checkEmail = regForEmail.test(email)
    if(name==''){
        valid=false;
        alertMsg+= "Imię ";
    }
    if(surname==''){
        valid=false;
        alertMsg+= "Nazwisko ";
    }
    if(age<=0){
        valid=false;
        alertMsg+= "Wiek ";
    }
    if(!checkEmail){
        valid=false;
        alertMsg+= "Email ";
    }
    if(details==''){
        details="brak"
    }
    if(gender=='default'){
        valid=false;
        alertMsg+= "Płeć ";
    }
    if(valid){
        let output=document.getElementById("output");
        output.innerHTML = "Imię: "+name+"<br>Nazwisko: "+surname+"<br>Wiek: "+age+"<br>Email: "+email+"<br>Opis: "+details+"<br>Płeć: "+gender;
    }
    else{
        alert(alertMsg);
    }

}