<template>
  <div id="alertContainer">
    <div id="alertBox">
      <h1>Błędnie wypełniony formularz</h1>
      <p>Sprawdź proszę pole: {{ invalidInputs }}</p>
      <button id="closeButton">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>
