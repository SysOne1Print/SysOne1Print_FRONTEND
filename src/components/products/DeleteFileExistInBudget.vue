<template>
  <div class="flex flex-column" style="max-width: 100%">
    <ul class="dz-preview dz-preview-multiple list-group list-group-flush mt-16pt">
      <li class="list-group-item" v-for="(value, index) in imgBudgetComputed" :key="index">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <div class="avatar">
              <img
                v-if="value.type_file == 'img'"
                :src="value.url"
                class="avatar-img rounded"
                :alt="value.nome_arq"
              />
              <img
                v-else-if="value.type_file == 'pdf'"
                src="@/assets/img/pdf.png "
                class="avatar-img rounded"
                :alt="value.nome_arq"
              />
              <img
                v-else
                src="@/assets/img/cdr.png"
                class="avatar-img rounded"
                :alt="value.nome_arq"
              />
            </div>
          </div>
          <div class="col">
            <div class="font-weight-bold" data-dz-name>
              {{ value.nome_arq }}
            </div>
          </div>
          <div class="col-auto">
            <a
              href="#"
              @click.prevent="removeImagem(index)"
              class="text-muted-light"
              data-dz-remove
            >
              <i class="material-icons">close</i>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { IArquivos } from '@/model/Index'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'
import { computed, toRefs, type PropType } from 'vue'

const prop = defineProps({
  imgBudget: { type: Array as PropType<IArquivos[]>, required: true, default: Array }
})
const { imgBudget } = toRefs(prop)

//store
const { alterProductSelectState } = storeToRefs(useProductStore())

//computed
const imgBudgetComputed = computed(() => imgBudget.value.filter((v) => v.url_deleted === false))

const removeImagem = (index: number) => {
  if (alterProductSelectState.value !== undefined && alterProductSelectState.value.fileExist) {
    alterProductSelectState.value.fileExist[index].url_deleted = true
  }
}
</script>

<style scoped></style>
