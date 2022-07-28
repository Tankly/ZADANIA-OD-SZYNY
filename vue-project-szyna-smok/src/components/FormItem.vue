<template>
  <component :is="inputData.type" :input="inputData" />
</template>

<script>
import FormInput from "./FormInput.vue";
import FormSelect from "./FormSelect.vue";
import FormBtn from "./FormBtn.vue";

export default {
  props: {
    inputData: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  components: {
    FormInput,
    FormSelect,
    FormBtn,
  },
};
</script>
