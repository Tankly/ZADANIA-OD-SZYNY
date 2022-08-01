<template>
  <div id="alertContainer">
    <div id="alertBox">
      <h1>Błędnie wypełniony formularz</h1>
      <p>Sprawdź proszę pole: {{ invalidInputs }}</p>
      <button id="closeButton" @click="close()">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    invalidInputs: {
      type: String,
      default: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: Boolean,
      required: true,
    },
  },
  emits: ["update:invalid"],
  methods: {
    close() {
      this.$emit("update:invalid", false);
    },
  },
};
</script>
