<template>
  <div class="formItem">
    <label :for="inputData.name">{{ inputData.label }}</label>
    <component
      :is="inputData.type"
      :id="inputData.name"
      :type="inputData.inputType"
      :name="inputData.name"
      :value="inputData.defaultValue"
    />
  </div>
</template>

<script>
export default {
  props: ["inputData"],
};
</script>
