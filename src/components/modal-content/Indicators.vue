<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="indicadoConfig">
    <div class="internaIndicadoConfig">
      <div class="form-group">
        <label class="form-label" for="indicadoVendedor">Qual vendedor indicou?</label>
        <div class="input-group">
          <select
            name="indicadoVendedor"
            v-model="indicatorsId"
            id="indicadoVendedor"
            class="form-control"
          >
            <option :value="0">Selecione o vendedor</option>
            <option :value="value.user_id" v-for="(value, index) in allIndicators" :key="index">
              {{ value.user_nome }}
            </option>
          </select>
        </div>
      </div>
      <button @click.prevent="sendIndicators" type="button" class="btn btn-primary w-100">
        <span class="pt-1">Definir indicação</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createIndicators, getAllUsers } from '@/api/actions/Users'
import { useToast } from '@/composables/Toast'
import type { IError } from '@/model/Index'
import { onMounted, ref, toRefs } from 'vue'

const prop = defineProps({
  orc_id: {
    type: Number,
    required: false,
    default: 0
  },
  indicators_id: {
    type: Number,
    required: false,
    default: 0
  }
})

const { orc_id, indicators_id } = toRefs(prop)

//composables notify
const { notifyToast } = useToast()

const allIndicators = ref<{ user_id: number; user_nome: string }[]>([])
const indicatorsId = ref<number>(0)
const sendIndicators = async () => {
  try {
    if (indicatorsId.value <= 0) {
      notifyToast({ msg: 'Selecione um vendedor indicador ', typeToast: 'error' })
      return
    }
    const { data } = await createIndicators({ user_id: indicatorsId.value, orc_id: orc_id.value })
    notifyToast({ msg: data.msg, typeToast: 'success' })
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else {
      notifyToast({ msg: 'Error', typeToast: 'error' })
    }
  }
}

onMounted(() => {
  getAllUsers()
    .then(({ data }) => {
      indicatorsId.value = indicators_id.value > 0 ? indicators_id.value : 0
      allIndicators.value = data
    })
    .catch(() => {
      allIndicators.value = []
    })
})
</script>

<style scoped></style>
