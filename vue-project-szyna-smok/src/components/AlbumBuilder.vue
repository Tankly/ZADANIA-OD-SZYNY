<template>
  <div class="album" :id="`Album_${album.id}`">
    <h2>Album nr: {{ album.id }} <br />{{ album.title }}</h2>
    <div class="albumFooter">
      <span>Autor: {{ album.userId }}</span>
      <button>Przejdź do albumu</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true,
      default: Object,
    },
  },
};
</script>
