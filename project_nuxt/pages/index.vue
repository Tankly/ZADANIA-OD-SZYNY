<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="info">
                        <v-toolbar-title>{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                     <v-form ref="form" @submit.prevent="isRegister ? register() : login()">
                            <v-text-field
                              v-model="credentials.login"
                              name="userLogin"
                              label="Login"
                              type="text"
                              placeholder="Login"
                              autocomplete="username"
                              required
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="credentials.password"
                              name="password"
                              label="Hasło"
                              type="password"
                              placeholder="Hasło"
                              autocomplete="current-password"
                              required
                           ></v-text-field>

                           <v-text-field
                              v-if="isRegister"
                              v-model="confirmPassword"
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              placeholder="cocnfirm password"
                              autocomplete="current-password"
                              required
                           ></v-text-field>
                           <v-checkbox
                              v-model="credentials.remember_me"
                              label= "Zapamiętaj mnie"
                              required
                            ></v-checkbox>
                           <div class="red--text"> {{errorMessage}}</div>
                           <v-btn type="submit" class="mt-4" color="primary" value="log in">{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-btn>
                           <div class="grey--text mt-4" @click="isRegister = !isRegister;">
                              {{toggleMessage}}  
                           </div>
                      </v-form>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: "login",
  data() {
    return {
      credentials: {
        login: '',
        password: '',
        remember_me: false,
      },
      alert: false,
      alertMsg: '',
      confirmPassword: "",
      isRegister : false,
      errorMessage: "",
      stateObj: {
         register :{
            name: 'Rejestracja',
            message: 'Posiadasz już konto? Zaloguj się.'
         },
         login : {
            name: 'Logowanie',
            message: 'Zarejestruj sie'
         }
      }
    };
  },
  computed: {
    toggleMessage() { 
      return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message }
    },
  methods: {
    login() {
      this.$axios.$post('auth/login', this.credentials)
      .then((data) => {
         this.$store.dispatch('setUser',  data.data);
         this.$store.dispatch('setToken', { token: data.access_token, expiresIn: data.expires_in});
         this.$router.push({name: 'dashboard'});
      });
    },
    register() {
       if(this.password == this.confirmPassword){
          this.isRegister = false;
          this.errorMessage = "";
          this.$refs.form.reset();
       }
       else {
         this.errorMessage = "password did not match"
       }
    }
  }
};
</script>
