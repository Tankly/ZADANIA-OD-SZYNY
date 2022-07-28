<template>
  <div class="formContainer">
    <form id="userForm" name="userForm">
      <FormItem v-for="input in formInputs" :key="input" :inputData="input" />
    </form>
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";

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
