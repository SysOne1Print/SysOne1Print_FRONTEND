<template>
  <div class="modal-container">
    <slot name="header"></slot>

    <div class="w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom">
      <span>Logística, atualmente:</span>
      <span class="font-weight-bold"><i class="fas fa-dolly-flatbed"></i> Entrega própria</span>
    </div>

    <div class="w-100 d-flex flex-column mt-3">
      <form action="">
        <div class="form-group">
          <label class="form-label" for="alterarLogistica"
            ><i class="fas fa-edit mr-1"></i>
            <span class="text-50">Alteração sobre logística?</span></label
          >
          <select v-model="logistica" id="alterarLogistica" class="form-control custom-select">
            <option :value="0">Escolha o tipo de entrega</option>
            <option :value="value.id_logis" v-for="(value, index) in logisticAll" :key="index">
              {{ value.name_logis }}
            </option>
          </select>
        </div>

        <div class="form-group mb-0">
          <button class="btn btn-primary w-100" @click.prevent="registerLogistica">
            <i class="fas fa-check mb-1 mr-2"></i> <span>SALVAR ALTERAÇÃO</span>
          </button>
        </div>
      </form>
    </div>
    <!-- Fim do conteúdo Detalhes -->
  </div>
</template>

<script setup lang="ts">
import { regLogistica } from '@/api/actions/Logistica'
import { useToast } from '@/composables/Toast'
import type { IError, IOrcamentoStage } from '@/model/Index'
import { ref, toRefs, type PropType } from 'vue'
const prop = defineProps({
  orcamento: { type: Object as PropType<IOrcamentoStage>, required: true, default: Object },
  logisticAll: {
    type: Array as PropType<{ id_logis: number; name_logis: string }[]>,
    required: true,
    default: Array
  }
})

const emit = defineEmits(['update-list-orc'])

const { orcamento } = toRefs(prop)
const { notifyToast } = useToast()

const logistica = ref<number>(0)

const registerLogistica = async () => {
  try {
    const { data } = await regLogistica({
      id_logis: logistica.value,
      id_orc: orcamento?.value?.orc_id as number
    })
    emit('update-list-orc')
    notifyToast({ msg: data.msg, typeToast: 'success' })
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  }
}
</script>

<style scoped></style>
