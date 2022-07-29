<template>
  <div class="formItem">
    <label :for="input.name">{{ input.label }}</label>
    <input
      :type="input.inputType"
      :name="input.name"
      :id="input.name"
      @input="
        (e) => {
          $emit('change', input.name, e.target.value);
        }
      "
      :disabled="input.disabled"
    />
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: Object,
      required: true,
    },
  },
};
</script>
