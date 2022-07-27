<template>
    <div id="postsContainer">
        <div v-for="post in postsData" :key="post" class="post" :id="`post_${post.id}`">
            <h2>Post nr: {{ post.id }} <br>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <div class="postFooter">
                <span>Autor: {{ post.id }}</span>
                <button>Komentarze</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["postsData"],
};
</script>
