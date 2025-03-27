<template>
  <div class="tab-pane">
    <div class="sidebar-heading">{{ title }}</div>
    <ul class="sidebar-menu">
      <li
        class="sidebar-menu-item"
        @click.prevent="$emit('change-sidebar', index, i, value.route_path)"
        v-for="(value, i) in routeC"
        :key="i"
      >
        <router-link class="sidebar-menu-button" :to="{ name: value.route_path }">
          <span
            class="material-icons sidebar-menu-icon sidebar-menu-icon--left"
            v-if="['fas', 'fa'].some((v) => value?.icon.includes(v))"
            style="width: 25px"
          >
            <i :class="value?.icon"></i>
          </span>
          <span class="material-icons sidebar-menu-icon sidebar-menu-icon--left" v-else
            >{{ value?.icon }}
          </span>

          <span class="sidebar-menu-text">{{ value?.nome }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/Sidebar'
import type { ISideBarSubMenu } from '@/model/Index'
import { computed, onBeforeMount, onMounted, toRefs, type PropType } from 'vue'

const props = defineProps({
  title: { type: String, required: true, default: '' },
  routes: {
    type: Array as PropType<ISideBarSubMenu[]>,
    required: true,
    default: Array
  },
  index: { type: Number, required: true }
})

const { routes, title } = toRefs(props)
const { removeActiveInOtherPage, sidebar } = useSidebar()

const routeC = computed(() =>
  routes.value.map((v) => {
    return v
  })
)

defineEmits(['change-sidebar'])

onMounted(() => {
  removeActiveInOtherPage(sidebar.value)
})
onBeforeMount(() => {
  removeActiveInOtherPage(sidebar.value)
})
</script>

<style scoped>
.tab-pane {
  display: block;
}
</style>
