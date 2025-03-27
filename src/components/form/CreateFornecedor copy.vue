<template>
  <!-- Modal cadastrar Fornecedor -->
  <div id="modalCadastrarFornecedor" class="modal">
    <div class="modal-content w-75 oneScroll">
      <div class="modal-top">
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-container">
        <h4 style="padding: 0; margin-bottom: 0">Gerenciar Fornecedores</h4>
        <small class="text-50 mt-100">Editar ou Inserir um Fornecedor..</small>

        <hr />
        <div class="col-lg-12 col-12">
          <div class="row d-lg-flex flex-wrap justify-content-between pl-0 pr-0">
            <!-- Início Lista de fornecedores -->
            <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
              <div
                class="w-100 d-lg-flex flex-column justify-content-center bg-light border rounded-bottom p-4"
              >
                <div class="w-100">
                  <p class="border-bottom" style="font-size: 16px">Selecione um fornecedor ..</p>
                </div>
                <div class="w-100">
                  <form action="">
                    <div class="form-group w-100 mb-0">
                      <select
                        id="selectNomeFornecedor"
                        data-toggle="select"
                        class="form-control w-100 mb-0"
                      >
                        <option value="" selected disabled>Selecione um fornecedor ..</option>
                        <option value="">Richard Bilssons</option>
                        <option value="">Renata Garcia</option>
                        <option value="">José Francisco</option>
                        <option value="">Gérson Rodiscley</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div class="w-100 d-flex flex-column">
                  <!-- .hidden -->
                  <div class="w-100 d-flex justify-content-between mt-3 mb-3 border-bottom">
                    <p class="text-50 mb-0" style="font-size: 16px">Selecionado o fornecedor:</p>
                    <p class="text-uppercase mb-0" style="font-size: 16px">Richard bilssons</p>
                  </div>
                  <!-- DIV Atribuir Fornecedor a um item -->
                  <div class="w-100 d-flex flex-column border rounded-bottom p-2 mb-3">
                    <form action="">
                      <div class="w-100 vincularFornecedorItem hidden">
                        <!-- .hidden -->

                        <div class="w-100 d-lg-flex justify-content-between">
                          <div class="form-group flex-grow">
                            <label class="form-label text-70 mb-0" for="vincItemSKU"
                              >Código (SKU)</label
                            >
                            <input
                              id="vincItemSKU"
                              type="text"
                              class="form-control"
                              value="#0A-35C3PO"
                            />
                          </div>
                          <div class="form-group flex-grow ml-2">
                            <label class="form-label text-70 mb-0" for="vincPrecoCusto"
                              >Preço de CUSTO</label
                            >
                            <input
                              id="vincPrecoCusto"
                              type="text"
                              class="form-control"
                              placeholder="0,00"
                              data-mask="#.##0,00"
                              data-mask-reverse="true"
                            />
                          </div>
                          <div class="form-group flex-grow ml-2">
                            <label class="form-label text-70 mb-0" for="vincPrecoCompra"
                              >Preço de COMPRA</label
                            >
                            <input
                              id="vincPrecoCompra"
                              type="text"
                              class="form-control"
                              placeholder="0,00"
                              data-mask="#.##0,00"
                              data-mask-reverse="true"
                            />
                          </div>
                        </div>
                        <div class="form-group flex-grow">
                          <label class="form-label text-70 mb-0" for="vincGarantia">Garantia</label>
                          <input
                            id="vincGarantia"
                            type="text"
                            class="form-control"
                            placeholder=".."
                          />
                        </div>
                      </div>
                      <div class="w-100">
                        <button id="vincularFornecedorItem" class="btn btn-secondary w-100">
                          VINCULAR FORNECEDOR AO ITEM
                        </button>
                      </div>
                    </form>
                  </div>

                  <!-- FINAL - DIV Atribuir Fornecedor a um item -->
                  <div class="w-100 d-flex flex-column mb-3">
                    <div class="form-group w-100 mb-0">
                      <select
                        id="listNomeFornecedor"
                        data-toggle="select"
                        class="form-control w-100 mb-0"
                      >
                        <option value="" selected disabled>
                          Clique aqui e veja uma lista de itens já vinculados à esse fornecedor ..
                        </option>
                        <option value="">TINTA PDF</option>
                        <option value="">PINCEL PARA CARTOLINA</option>
                        <option value="">SPRAY DE PIMENTA MAMADA</option>
                        <option value="">CD - É O TCHAN</option>
                      </select>
                    </div>
                  </div>
                  <div class="w-100 d-flex flex-column">
                    <button class="btn btn-secondary mb-3">EDITAR FORNECEDOR</button>
                    <button class="btn btn-danger">EXCLUIR FORNECEDOR</button>
                  </div>
                </div>
                <!-- Fim da div Detalhes do Fornecedor-->
              </div>
            </div>
            <!-- Fim Lista de fornecedores -->

            <!-- Inicio cadastro de fornecedor -->
            <div class="col-lg-4 col-md-12 col-sm-12">
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
