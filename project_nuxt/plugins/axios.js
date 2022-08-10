const errors = {
    400: { errMsg:"Nieprawidłowe zapytanie", },
    403: { errMsg:"Brak uprawnień",},
    404: { errMsg:"Nie znaleziono", },
    429: { errMsg:"Zbyt wiele zapytań, spróbuj za chwile", },
}

export default function ({ $axios, store, redirect }) {
    $axios.onError(error => {
        let msg = "Wewnętrzny błąd serwera"
        if(error.response.status == 401) {
            msg = "Nieautoryzowany dostęp"
            if(error.response.config.url == "auth/refresh-token"){
                store.dispatch('logout');
                redirect('/');
                store.dispatch('alert/setMsg', msg);
                return Promise.resolve(false);
            }
            if(localStorage.getItem('User')){
                store.dispatch('refreshToken')
                return Promise.resolve(false);
            }
        } 
        else if(error.response.data.message){
            msg = error.response.data.message;
        }
        else {
            for(const err in errors){
                if(err == error.response.status){
                    msg = errors[err].errMsg;
                }
            }
        }
        store.dispatch('alert/setMsg', msg);
        return Promise.resolve(false);
    })
}
