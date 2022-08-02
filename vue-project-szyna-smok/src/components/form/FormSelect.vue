<template>
  <div class="formItem">
    <label :for="input.name">{{ input.label }}</label>
    <select
      :name="input.name"
      :id="input.name"
      :disabled="input.disabled"
      @change="
        (e) => {
          $emit('update:modelValue', e.target.value);
        }
      "
    >
      <option
        v-for="(option, text) in input.selectOptions"
        :value="option"
        :key="option"
      >
        {{ input.textForOptions[text] }}
      </option>
    </select>
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
