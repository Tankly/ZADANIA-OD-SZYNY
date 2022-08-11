<template>
  <v-row>
    <v-col class="text-center" cols="6">
      <v-file-input
        chips
        label="Dodaj plik"
      ></v-file-input>
      <v-file-input
        chips
        label="Dodaj plik"
      ></v-file-input>
    </v-col>
    <v-col align-self="center" cols="6">
      <v-btn
        color="primary"
        elevation="13"
        large
        outlined
      >Dodaj kolejny plik</v-btn>
      <v-btn
        color="primary"
        elevation="13"
        large
        outlined
      >Wyślij</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FilesSender',
}
</script>
