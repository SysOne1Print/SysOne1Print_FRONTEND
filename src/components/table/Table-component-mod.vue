<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap">
    <slot name="headerTable"></slot>

    <tbody class="list" id="search">
      <slot name="content"> </slot>
      <slot></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts"></script>

<style scoped></style>
