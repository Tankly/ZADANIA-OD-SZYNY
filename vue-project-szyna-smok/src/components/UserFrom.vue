<template>
  <div class="formContainer">
    <form id="userForm" name="userForm">
      <component
        v-for="input in formInputs"
        :key="input"
        :is="input.type"
        :input="input"
        v-model="values[input.name]"
      />
      <FormBtn
        v-for="btn in btns"
        :key="btn"
        :input="btn"
        @click="btn.btnFunction"
      />
    </form>
  </div>
</template>

<script>
import FormInput from "./form/FormInput.vue";
import FormSelect from "./form/FormSelect.vue";
import FormBtn from "./form/FormBtn.vue";
import FormTextarea from "./form/FormTextarea.vue";

export default {
  props: {
    formInputs: {
      type: Object,
      required: true,
      default: Object,
    },
    btns: {
      type: Object,
      required: true,
      default: Object,
    },
    inputsData: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  computed: {
    values: {
      get() {
        return this.inputsData;
      },
      set(value) {
        this.$emit("update:inputsData", value);
      },
    },
  },
  components: {
    FormInput,
    FormSelect,
    FormBtn,
    FormTextarea,
  },
};
</script>
