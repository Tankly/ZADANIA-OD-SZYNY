<template>
  <v-app>
    <v-main>
        <Nuxt />
        <Alert />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  middleware: 'logged',
}
</script>