<template>
  <div class="card-body p-0 py-3">
    <div class="form-group">
      <label class="form-label" for="entregaValue">Insira o valor de entrega</label>
      <InputNumber
        :class="'w-100'"
        v-model:model-value="model"
        :placeholder="'R$ 0,00'"
        inputId="currency-usd"
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        fluid
      />
    </div>
    <button @click.prevent="addShippingValue" type="button" class="btn btn-primary w-100">
      <span class="pt-1">Adicionar </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { updateOrcamentoShippingValue } from '@/api/actions/Orcamento'
import { useToast } from '@/composables/Toast'
import type { IError } from '@/model/Index'
import { useRoute } from 'vue-router'

const model = defineModel<number | null>('shipping', {
  default: null
})

//notify
const { notifyToast } = useToast()
const route = useRoute()

const addShippingValue = async () => {
  try {
    const orc_id = Number(route.params.id)
    if (model.value !== null) {
      const { data } = await updateOrcamentoShippingValue(orc_id, {
        orc_valor_frete: model.value.toString()
      })
      notifyToast({ msg: data.msg, typeToast: 'success' })
      return
    }
    notifyToast({ msg: 'Erro ao adicionar frete', typeToast: 'error' })
  } catch (error: unknown) {
    console.log(error)
    const er = error as IError
    if (er.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de criação do QRCODE', typeToast: 'error' })
      return
    }
    if (er.response.status === 404) {
      notifyToast({ msg: er.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  }
}
</script>

<style scoped></style>
