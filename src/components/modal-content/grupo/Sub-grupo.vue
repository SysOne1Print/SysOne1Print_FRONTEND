<template>
  <div class="col-lg-4 col-md-12 col-sm-12">
    <div class="w-100 bg-light p-4 border rounded-bottom">
      <div class="w-100 mr-0">
        <p class="w-100 border-bottom" style="font-size: 16px">Atribuindo Sub Grupo.</p>
      </div>
      <form @submit.prevent="addSubGroup">
        <div class="form-group flex-grow">
          <label class="form-label text-70 mb-0" for="cadSubGpOnGpNome">Nome do Sub Grupo</label>
          <input
            id="cadSubGpOnGpNome"
            placeholder="Preencha o nome do Sub Grupo"
            ype="text"
            class="form-control w-100"
            v-model="subGroup"
          />
        </div>
        <div class="form-group flex-grow">
          <label class="form-label text-50 mb-0" for="cadSubGpOnGpAtual">Atribuindo a</label>
          <input
            id="cadSubGpOnGpAtual"
            type="text"
            class="form-control w-100"
            v-model="grupoSelect.nome_grupo"
            readonly
          />
        </div>
        <div class="w-100 d-flex flex-row justify-content-between">
          <button type="button" @click.prevent="$emit('cancel-sub')" class="btn btn-secondary w-25">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">Incluir ao grupo de produtos</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGrupo } from '@/model/Index'
import { ref, toRefs, type PropType } from 'vue'
import { useGrupoProduto } from '@/composables/UseGrupoProduto'
const prop = defineProps({
  grupoSelect: { type: Object as PropType<IGrupo>, required: true, default: Object }
})

const emit = defineEmits(['search-sub-group', 'cancel-sub'])

const { grupoSelect } = toRefs(prop)

const { createSubGrupo } = useGrupoProduto()

const subGroup = ref<string>('')

const addSubGroup = async () => {
  await createSubGrupo({
    group_id: grupoSelect?.value?.id as number,
    nome_sub_grupo: grupoSelect?.value?.nome_grupo as string
  })
  subGroup.value = ''

  emit('search-sub-group')
  emit('cancel-sub')
}
</script>

<style scoped></style>
