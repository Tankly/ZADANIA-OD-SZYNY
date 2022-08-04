<template>
  <div class="formItem">
    <label :for="input.name">{{ input.label }}</label>
    <select
      :name="input.name"
      :id="input.name"
      :value="modelValue"
      :disabled="input.disabled"
      @input="validateAndSet"
      @focusout="validateAndSet"
      :class="{ wrongInput: reqMsg }"
    >
      <option
        v-for="(option, text) in input.selectOptions"
        :value="option"
        :key="option"
      >
        {{ input.textForOptions[text] }}
      </option>
    </select>
    <span :class="{ wrongInputMsg: reqMsg }" v-if="reqMsg">{{ reqMsg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqMsg: null,
    };
  },
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
  methods: {
    validateAndSet(e) {
      const inputValue = e.target.value;
      this.$emit("update:modelValue", inputValue);
      let isValid;
      if (this.input.validationF) {
        for (const fun of this.input.validationF) {
          isValid = fun(inputValue);
          // console.log(isValid);
          if (typeof isValid === "string") {
            this.reqMsg = isValid;
            break;
          } else {
            this.reqMsg = null;
          }
        }
      }
    },
  },
};
</script>
