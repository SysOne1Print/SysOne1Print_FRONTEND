<template>
  <div class="modal-content oneScroll">
    <div class="modal-top">
      <span class="modal-close" @click.prevent="$emit('closeModal', $event)">×</span>
    </div>
    <div class="modal-container">
      <div class="w-100 d-flex flex-column gap-1 border-bottom mb-2">
        <h4 class="mb-0">{{ text_title }}</h4>
      </div>

      <form ref="reset" action="post" @submit.prevent="addAccountTopay($event)">
        <div class="d-flex flex-column gap-2">
          <div class="d-flex flex-column">
            <label class="form-label mb-1 mt-3">Emissão</label>
            <Calendar
              id="calendar-24h"
              v-model="createFinanceiro.emissao"
              placeholder="dd/mm/yy"
              dateFormat="dd/mm/yy"
              showButtonBar
            />

            <!-- <input class="form-control flatpickr-input active" type="datetime-local"
                    v-model="createFinanceiro.emissao" name="data" id="data"> -->
          </div>

          <div class="form-group mt-0 mb-0">
            <label class="form-label mb-1" for="edtStatus">Fornecedor:</label>
            <select
              id="edtStatus"
              v-model="createFinanceiro.fornecedor_id"
              data-toggle="select"
              class="form-control"
            >
              <option value="0" selected>Escolha um Fornecedor</option>
              <option :value="value.id" v-for="value in fornecedorList" :key="value.id">
                {{ value.pro_for_nome }}
              </option>
            </select>
          </div>

          <div class="d-flex flex-column">
            <label class="form-label">Vencimento:</label>
            <Calendar
              id="calendar-24h"
              v-model="createFinanceiro.vencimento"
              placeholder="dd/mm/yy"
              dateFormat="dd/mm/yy"
              showButtonBar
            />
          </div>

          <div class="form-group flex-grow-1 mb-0">
            <label class="form-label mb-0" for="itemPrecoVenda">Valor:</label>
            <div class="input-group input-group-merge">
              <input
                v-model="createFinanceiro.valor"
                id="valor"
                type="text"
                class="form-control"
                placeholder="00,00"
                data-mask="#.##0,00"
                data-mask-reverse="true"
              />
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <span class="text-50">R$</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group mb-0">
            <label class="form-label mb-1" for="edtStatus">Categoria:</label>
            <select
              id="edtStatus"
              v-model="createFinanceiro.categoria"
              data-toggle="select"
              class="form-control"
            >
              <option value="0" selected>Escolha um Categoria</option>
              <option :value="value.id" v-for="value in categoriaOp" :key="value.id">
                {{ value.cat }}
              </option>
            </select>
          </div>

          <div class="form-group mb-4">
            <label name="ocorrencia" class="form-label">Ocorrência</label>
            <input
              class="form-control"
              placeholder="Ocorrência"
              type="number"
              v-model.number="createFinanceiro.ocorrencia"
              name="ocorrência"
              id="ocorrência"
            />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-light">
            <i class="material-icons icon--left" style="font-size: 16px">clear</i> LIMPAR
          </button>
          <button type="submit" class="btn btn-primary">
            <i class="material-icons icon--left">person_add</i> Cadastrar contas a pagar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createAccountToPay } from '@/api/actions/AccountFinanceiro'
import { useSwal } from '@/composables/Swal'
import { useToast } from '@/composables/Toast'
import type { IError, IFinanceCreate } from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { categoriaOpStatic } from '@/util/Util'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref, toRefs, type PropType } from 'vue'

const prop = defineProps({
  fornecedorList: {
    type: Object as PropType<Array<{ id: number; pro_for_nome: string }>>,
    required: true
  },
  modalTypeRef: { type: Number, required: false, default: 0 },
  text_title: { type: String, required: true, default: '' }
})

const { modalTypeRef } = toRefs(prop)

const emit = defineEmits(['closeModal', 'addToListFinance'])

const { notifyToast } = useToast()
const { swalConfirmed } = useSwal()
const { userData } = storeToRefs(useLoginStore())
//variable
const reset = ref()
const categoriaOp = ref(categoriaOpStatic)
const createFinanceiro = ref<IFinanceCreate>({
  emissao: undefined,
  vencimento: undefined,
  valor: '',
  categoria: 0,
  ocorrencia: '',
  fornecedor_id: 0,
  user_id: userData.value.user_id
})

const addAccountTopay = async (evt: unknown) => {
  try {
    const result = await swalConfirmed({
      title: 'Atenção',
      icon: 'info',
      text: 'Você deseja realmente a cadastrar esse forncedor ?'
    })
    if (result.isConfirmed) {
      if (modalTypeRef.value >= 1) {
        const { data } = await createAccountToPay(createFinanceiro.value, modalTypeRef.value)
        notifyToast({ msg: data.msg, typeToast: 'success' })
        emit('addToListFinance', createFinanceiro.value, modalTypeRef.value)
        reset.value.reset()
        resetForm()
      }
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
      return
    }
    if (error.response.status === 409) {
      notifyToast({ msg: 'Envie os dados corretamente!', typeToast: 'error' })
      return
    }
    if (error.response.status === 500) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 400) {
      notifyToast({ msg: 'Erro ao buscar pdf', typeToast: 'error' })
      return
    }
  } finally {
    emit('closeModal', evt)
  }
}

const resetForm = () => {
  createFinanceiro.value = {
    emissao: undefined,
    vencimento: undefined,
    valor: '',
    categoria: 0,
    ocorrencia: '',
    fornecedor_id: 0,
    user_id: userData.value.user_id
  }
}

onUnmounted(() => {
  resetForm()
})
</script>

<style lang="scss">
.gap-1 {
  gap: 0.5rem;
}

.gap-2 {
  gap: 1rem;
}

.p-datepicker-calendar {
  text-align: center !important;

  thead {
    tr {
      text-align: center;
    }
  }
}

.p-datepicker td > span {
  margin: auto;
}
</style>
