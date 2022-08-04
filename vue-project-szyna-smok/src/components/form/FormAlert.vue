<template>
  <div id="alertContainer">
    <div id="alertBox">
      <h1>Błędnie wypełniony formularz</h1>
      <p>
        Sprawdź proszę pole:
        <span v-for="input in invalidInputs" :key="input">{{ input }},</span>
      </p>
      <button id="closeButton" @click="close()">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    invalidInputs: {
      type: Array,
      default: Array,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: Boolean,
      required: true,
    },
  },
  emits: ["update:invalid", "update:invalidInputs"],
  methods: {
    close() {
      this.$emit("update:invalid", false);
      this.$emit("update:invalidInputs", []);
    },
  },
};
</script>
