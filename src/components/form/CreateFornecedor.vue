<template>
  <!-- Modal cadastrar Fornecedor -->
  <div id="modalCadastrarFornecedor" class="modal">
    <div class="modal-content w-75 oneScroll">
      <div class="modal-top">
        <a style="cursor: pointer" class="modal-close" @click="$emit('openModalFornecedor')"
          >&times;</a
        >
      </div>
      <div class="modal-container">
        <h4 style="padding: 0; margin-bottom: 0">Gerenciar Fornecedores</h4>
        <small class="text-50 mt-100">Editar ou Inserir um Fornecedor..</small>

        <hr />
        <div class="col-lg-12 col-12">
          <div class="row d-lg-flex flex-wrap justify-content-between pl-0 pr-0">
            <!-- Inicio cadastro de fornecedor -->
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="w-100 bg-light p-4 border rounded-bottom">
                <div class="w-100 mr-0">
                  <p class="w-100 border-bottom" style="font-size: 16px">
                    Cadastre seu fornecedor.
                  </p>
                </div>
                <form action="">
                  <div class="w-100">
                    <div class="form-group flex-grow">
                      <label class="form-label mb-0 text-70" for="cadNomeFornecedor"
                        >Nome do fornecedor<span class="text-danger font-weight-bold"
                          >*</span
                        ></label
                      >
                      <input
                        v-model="fornecedor.pro_for_nome"
                        id="cadNomeFornecedor"
                        type="text"
                        class="form-control"
                        placeholder="Insira o nome do fornecedor .."
                      />
                    </div>
                    <div class="form-group flex-grow">
                      <label class="form-label mb-0 text-70" for="cadNomeFornecedor"
                        >Nome da Empresa</label
                      >
                      <input
                        v-model="fornecedor.pro_for_empresa"
                        id="cadNomeFornecedor"
                        type="text"
                        class="form-control"
                        placeholder="Insira o nome da empresa do fornecedor .."
                      />
                    </div>
                  </div>
                  <div class="w-100">
                    <small class="text-50"
                      >Caso seu fornecedor não receba uma "declaração" por Empresa, ele será contado
                      como Autônomo.</small
                    >
                    <button @click.prevent="createForne" class="btn btn-primary w-100 mt-3">
                      Cadastrar Fornecedor
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- Fim cadastro de fornecedor -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createFornecedor, getAllFornecedor } from '@/api/actions/Fornecedor'
import { useToast } from '@/composables/Toast'
import type { IError } from '@/model/Index'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

defineEmits(['openModalFornecedor'])
const { notifyToast } = useToast()
const { allFornecedor } = storeToRefs(useStepStore())

const fornecedor = ref({
  pro_for_nome: '',
  pro_for_empresa: ''
})
const createForne = async () => {
  try {
    //
    const { data, status } = await createFornecedor(fornecedor.value)
    notifyToast({ msg: data.msg, typeToast: 'success' })
    if (status === 200) {
      fornecedor.value.pro_for_nome = ''
      fornecedor.value.pro_for_empresa = ''

      const { data } = await getAllFornecedor()
      allFornecedor.value = data
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro ao cadastrar produto', typeToast: 'error' })
    } else if (error.response.status === 500) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else if (error.response.status === 409) {
      notifyToast({
        msg: 'Erro ao cadastrar produto, envie os dados corretamente',
        typeToast: 'error'
      })
    }
  }
}
</script>

<style scoped></style>
