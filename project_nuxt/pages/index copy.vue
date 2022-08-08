<template>
  <v-form v-model="valid" app class="d-flex justify-center">
    <v-container>
      <v-text-field
        v-model="credentials.login"
        :rules="loginRules"
        counter
        label="Login"
        required
      ></v-text-field>
      <v-text-field
        v-model="credentials.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Hasło"
        hint="Co najmniej 8 znaków"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-btn
        color="info"
        elevation="2"
        large
        @click="aaa"
      >Zaloguj</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: "login",
  data: () => ({
    valid: false,
    credentials: {
      login: '',
      password: '',
    },
    loginRules: [
      v => !!v || 'Login jest wymagany',
      v => v.length >= 8 || 'Co najmniej 8 znaków',
    ],
    showPassword: false,
    passwordRules: {
      required: value => !!value || 'Hasło jest wymagane.',
      min: v => v.length >= 8 || 'Co najmniej 8 znaków',
  },
  }),
  methods: {
    aaa() {
      console.log('aaaa');
    },
    login() {
      this.$axios.$post('auth/login', this.credentials)
      .then(({token, expiresIn}) => {
        this.$store.dispatch('setToken', {token, expiresIn});
        this.$router.push({name: 'logged'});
      })
      .catch(errors => {
        // console.dir(errors);
      });
    },
  },
}
</script>
