<template>
  <div class="w-100 mt-3 mb-3">
    <span>Imagens/Arquivos anexadas:</span>
    <div class="w-100 d-flex flex-row flex-wrap justify-content-around p-3 ml-0 mr-0 mt-2 border bg-light fixGapMaisQ5"
      v-if="files && files?.length > 0">
      <!-- .naoTemImg -->
      <a style="cursor: pointer" @click="$emit('click-img', value)" v-for="(value, index) in files" :key="index">
        <img class="selectImagemRefItem"
          :src="value.type_file === 'pdf' ? pdf : value.type_file === 'cdr' ? cdr : value.url"
          alt="Imagem 01 da lista de imagens do item." />
      </a>
    </div>

    <div class="w-100 d-flex flex-row flex-wrap justify-content-around p-3 ml-0 mr-0 mt-2 border bg-light fixGapMaisQ5"
      v-else-if="typeModal && typeModal?.cliente_comprovante">
      <!-- .naoTemImg -->
      <a style="cursor: pointer" @click="$emit('click-img', typeModal?.cliente_comprovante.cli_compro_url)">
        <img class="selectImagemRefItem" :src="typeModal?.cliente_comprovante.cli_compro_url"
          alt="Imagem 01 da lista de imagens do item." />
      </a>
    </div>

    <div v-else>
      <span>Não Existe!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrcamentoPedidoStatus, IWalletOne } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import pdf from '@/assets/img/pdf.png'
import cdr from '@/assets/img/cdr.png'

const prop = defineProps({
  financeOrc: {
    type: Object as PropType<IOrcamentoPedidoStatus>,
    required: false,
    default: Object
  },
  detailsCartOne: {
    type: Object as PropType<IWalletOne>,
    required: false,
    default: Object
  }
})

const { financeOrc, detailsCartOne } = toRefs(prop)

const files = computed(() => {
  return financeOrc?.value?.files !== undefined && financeOrc?.value?.files.length > 0
    ? financeOrc?.value?.files
    : financeOrc?.value?.arquivos
})

const typeModal = computed(() => {
  return detailsCartOne?.value !== undefined && detailsCartOne?.value
})
defineEmits(['click-img'])
</script>

<style scoped></style>
