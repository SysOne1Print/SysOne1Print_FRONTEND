<template>
    <span :class="classList">
        <slot></slot>
        {{ title_span }}
    </span>
</template>

<script setup lang="ts">
defineProps({
    title_span: { type: [String, Number], required: true },
    classList: { type: String, required: false, default: '' }
})

</script>

<style scoped></style>