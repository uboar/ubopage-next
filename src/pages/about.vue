<template>
    <div class="pt-24">
        <div class="mx-8 text-6xl border-b border-base-content text-center logo-font">ABOUT UBOAR</div>
        <links></links>
    </div>
</template>

<script>
import Links from '../components/links.vue';


export default {
    name: "index",
    components: { Links },
    mounted() {
        document.title = `ABOUT UBOAR - UBOPAGE`;
    },
    setup() {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>