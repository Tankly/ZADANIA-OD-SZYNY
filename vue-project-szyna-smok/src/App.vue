<template>
  <Navbar :pages="pages"/>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default{
  name: 'app',
  data(){
    return{
      pages: {
        home: {
          
        }
      }
    }
  },
  components:{
    Navbar
  }
}
</script>