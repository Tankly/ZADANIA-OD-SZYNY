<template>
  <div class="formItem">
    <button type="button" :name="input.name" :id="input.name">
      {{ input.content }}
    </button>
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
