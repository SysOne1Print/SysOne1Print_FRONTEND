<template>
  <!-- Modal cadastrar Deposito -->
  <div id="modalCadastrarDeposito" class="modal">
    <div class="modal-content w-75 oneScroll">
      <div class="modal-top">
        <a style="cursor: pointer" class="modal-close" @click="$emit('openModalDeposito')"
          >&times;</a
        >
      </div>
      <div class="modal-container">
        <h4 style="padding: 0; margin-bottom: 0">Gerenciar Deposito</h4>
        <small class="text-50 mt-100">Editar ou Inserir um Deposito..</small>

        <hr />
        <div class="col-lg-12 col-12">
          <div class="row d-lg-flex flex-wrap justify-content-between pl-0 pr-0">
            <!-- Inicio cadastro de Deposito -->
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="w-100 bg-light p-4 border rounded-bottom">
                <div class="w-100 mr-0">
                  <p class="w-100 border-bottom" style="font-size: 16px">Cadastre Deposito.</p>
                </div>
                <form method="post">
                  <div class="w-100">
                    <div class="form-group flex-grow">
                      <label class="form-label mb-0 text-70" for="cadNomeFornecedor"
                        >Nome do deposito<span class="text-danger font-weight-bold">*</span></label
                      >
                      <input
                        v-model="deposito.nome"
                        id="cadNome"
                        type="text"
                        class="form-control"
                        placeholder="Insira o nome do deposito .."
                      />
                    </div>

                    <ButtonToolTip
                      :type="'button'"
                      @click.prevent="createDeposito"
                      :class="'btn-primary btn-md'"
                      :button-options="{
                        tooltip: 'Cadastrar Deposito',
                        icon: ''
                      }"
                      :content="'Cadastrar deposito'"
                    ></ButtonToolTip>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreateDeposito, getAllDeposito } from '@/api/actions/Deposito'
import { useToast } from '@/composables/Toast'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref } from 'vue'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'

defineEmits(['openModalDeposito'])
const { notifyToast } = useToast()

// Chamar abaixo a variavel do deposito para preenchar o select no step 4
const { allDeposito } = storeToRefs(useStepStore())

const deposito = ref({
  nome: ''
})

const timeout = ref()
const createDeposito = async () => {
  try {
    //
    const { data, status } = await CreateDeposito(deposito.value)
    notifyToast({ msg: data.msg, typeToast: 'success' })
    if (status === 201) {
      const { data, status } = await getAllDeposito()
      allDeposito.value = data

      timeout.value = setTimeout(() => {
        deposito.value.nome = ''

        if (status === 200) {
          clearTimeout(timeout.value)
        }
      }, 300)
    }
  } catch (error: unknown) {
    const er = error as { response: { status: number; data: { error: string; msg: string } } }
    if (er.response === undefined) {
      notifyToast({ msg: 'Erro ao cadastrar produto', typeToast: 'error' })
    } else if (er.response.status === 500) {
      notifyToast({ msg: er.response.data.msg, typeToast: 'error' })
    } else if (er.response.status === 409) {
      notifyToast({
        msg: 'Erro ao cadastrar produto, envie os dados corretamente',
        typeToast: 'error'
      })
    }
  }
}

onUnmounted(() => {
  clearTimeout(timeout.value)
})
</script>

<style scoped></style>
