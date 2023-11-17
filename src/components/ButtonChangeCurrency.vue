
<script setup>
    // defineProps( [ 'title' ] )
    defineEmits(['clickHandler'])

</script>

<template>
    <button class="rounded-full border border-gray-300 h-14 w-14 hover:border-blue-500 hover:bg-gray-200 "
        @click="$emit('clickHandler')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
        </svg>
    </button>
</template>

<style lang="scss" scoped></style>