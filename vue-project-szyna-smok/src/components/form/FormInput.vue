<template>
  <div class="formItem">
    <label :for="input.name">{{ input.label }}</label>
    <input
      :type="input.inputType"
      :name="input.name"
      :value="modelValue"
      :id="input.name"
      @input="
        (e) => {
          $emit('update:modelValue', e.target.value);
        }
      "
      :disabled="input.disabled"
      :maxlength="input.maxLength"
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
    modelValue: {
      type: [String, Number, null],
      required: true,
      default: null,
    },
  },
};
</script>
