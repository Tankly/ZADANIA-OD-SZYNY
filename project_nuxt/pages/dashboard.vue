<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;UDAŁO SIĘ ZALOGOWAĆ! WITAJ {{ msg() }}&#8221;
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return{
      firstname:  this.$store.state.userData.firstname || "",
      lastname: this.$store.state.userData.lastname || "",
    }
  },
  methods: {
    msg() {
      return this.firstname + " " + this.lastname
    },
  },
}
</script>
