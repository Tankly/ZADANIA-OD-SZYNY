<template>
  <component
    @set="
      (...v) => {
        $emit('set', ...v);
      }
    "
    :is="inputData.type"
    :input="inputData"
  />
</template>

<script>
import FormInput from "./FormInput.vue";
import FormSelect from "./FormSelect.vue";
import FormBtn from "./FormBtn.vue";
import FormTextarea from "./FormTextarea.vue";

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
    FormTextarea,
  },
};
</script>
