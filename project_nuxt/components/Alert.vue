<template>
    <v-alert
        :value="!!msg"
        class="alert"
        border="left"
        color="red"
        elevation="7"
        type="error"
        transition="scale-transition">
            {{ msg }}
            <v-progress-linear
                v-model="value"
                color="white"
            ></v-progress-linear>
    </v-alert>
</template>

<script>
export default {
data () {
    return {
      value: 0,
      interval: 0,
      timer: null,
    }
  },
  computed: {
    msg() {
        return this.$store.state.alert.msg
    }
  },
  watch: {
    msg() {
        clearInterval(this.interval)
        clearTimeout(this.timer)
        this.startBuffer()
        this.timer = setTimeout(() => {
            this.$store.dispatch('alert/dismiss');
        }, 5000);
    },
  },
  methods: {
    startBuffer () {
      this.value=0
      this.interval=0
      this.interval = setInterval(() => {
        this.value += 1
      }, 45)
      
    },
  },
}
</script>