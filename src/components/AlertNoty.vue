<template>
  <div class="alert alert-soft-primary alert-dismissible fade show m-2" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
    <div class="d-flex flex-wrap align-items-start">
      <div class="mr-8pt">
        <i class="fas fa-exclamation-triangle fa-lg"></i>
      </div>
      <div class="flex" style="min-width: 180px">
        <small class="text-black-100">
          <strong>INFO - </strong> Quando a linha estiver
          <span class="wtDetalhes p-1">amarelada</span>, confira os detalhes do trabalho!
        </small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
