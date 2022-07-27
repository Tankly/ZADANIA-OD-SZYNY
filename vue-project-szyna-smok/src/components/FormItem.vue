<template>
  <component :is="inputData.type" :input="inputData" />
</template>

<script>
import FormInput from "./FormInput.vue";
import FormSelect from "./FormSelect.vue";
import FormBtn from "./FormBtn.vue";

export default {
  props: ["inputData"],
  components: {
    FormInput,
    FormSelect,
    FormBtn,
  },
};
</script>
