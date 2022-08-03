<template>
  <div class="formItem">
    <label :for="input.name">{{ input.label }}</label>
    <textarea
      :name="input.name"
      :id="input.name"
      :rows="input.textArea[0]"
      :cols="input.textArea[1]"
      :placeholder="input.placeholder"
      @input="
        (e) => {
          $emit('update:modelValue', e.target.value);
        }
      "
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
