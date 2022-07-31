<template>
  <div id="filterFormContainer">
    <form id="filterForm" name="filterForm">
      <FormItem v-for="input in formInputs" :key="input" :inputData="input" />
    </form>
  </div>
</template>

<script>
import FormItem from "@/components/form/FormItem.vue";

export default {
  props: {
    formInputs: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  components: {
    FormItem,
  },
};
</script>
