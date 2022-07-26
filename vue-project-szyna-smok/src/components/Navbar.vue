<template>
    <nav class="navbar">
        <div class="navbarBody">
            <div v-for="page in pages" :key="page" class="navbarItem">
                {{ page }}
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['pages'],
    }
</script>
