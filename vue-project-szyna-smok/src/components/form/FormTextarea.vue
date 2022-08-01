<template>
  <div class="formItem">
    <textarea
      :name="input.name"
      :id="input.name"
      :rows="input.textArea[0]"
      :cols="input.textArea[1]"
      :placeholder="input.placeholder"
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
