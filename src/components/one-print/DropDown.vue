<template>
  <div id="dropdown" class="rounded">
    <ul class="sidebar-submenu d-flex">
      <li class="">
        <router-link class="sidebar-menu-button" :to="`change-orcamento-middle/${id_orc}/${id_cli}`"
          >Alterar Orçamento</router-link
        >
      </li>
    </ul>
    <hr class="mb-1" />
    <button
      @click.prevent="$emit('closeDropdown')"
      id="closeDropdown"
      class="btn btn-accent btn-sm rounded w-100"
    >
      CANCELAR
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id_orc: { type: Number, required: true },
  id_cli: { type: Number, required: true }
})
defineEmits(['closeDropdown'])
</script>

<style scoped>
#dropdown {
  display: none;
}

.activeDrop {
  display: block !important;
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #fff;
  outline: 1px solid rgba(204, 204, 204, 0.3);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
