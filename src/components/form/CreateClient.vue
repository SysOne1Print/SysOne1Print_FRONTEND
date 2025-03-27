<template>
  <div class="card" style="outline: 1px solid blue">
    <div class="card-body">
      <p style="font-size: 11pt; color: grey">{{ descricaoRoute }}</p>

      <form @submit.prevent="createCliente" @reset="reset" ref="resetForm">
        <div class="col-lg-12 d-flex align-items-top">
          <!-- ESQUERDA -->
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-label" for="clienteName"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>NOME CLIENTE
                RESPONSÁVEL:</label
              >
              <input
                type="text"
                oninvalid="setCustomValidity('Preencha o nome');"
                oninput="setCustomValidity('');"
                class="form-control"
                id="clienteName"
                v-model="client.cli_nome"
                placeholder="Insira o Nome do Cliente Responsável .."
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>NOME DA
                EMPRESA:</label
              >
              <input
                type="text"
                oninvalid="setCustomValidity('Preencha a empresa');"
                oninput="setCustomValidity('');"
                class="form-control"
                id="clienteName"
                v-model="client.cli_nome_fantasia"
                placeholder="Insira o Nome da Empresa .."
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>TIPO DE
                PESSOA:</label
              >
              <div class="custom-controls-stacked">
                <div class="custom-control custom-radio">
                  <input
                    ref="checkedInput"
                    id="radioStacked1"
                    name="radio-stacked"
                    type="radio"
                    class="custom-control-input"
                    v-model.number="client.cli_tipo_pessoa"
                    :checked="true"
                    :value="1"
                  />
                  <label for="radioStacked1" class="custom-control-label">PESSOA FÍSICA</label>
                </div>
                <div class="custom-control custom-radio">
                  <input
                    id="radioStacked2"
                    name="radio-stacked"
                    type="radio"
                    :value="2"
                    v-model.number="client.cli_tipo_pessoa"
                    class="custom-control-input"
                  />
                  <label for="radioStacked2" class="custom-control-label">PESSOA JURÍDICA</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>NÚMERO
                WHATSAPP:</label
              >
              <input
                type="tel"
                oninvalid="setCustomValidity('Preencha o whatsapp');"
                oninput="setCustomValidity('');"
                class="form-control"
                id="clienteName"
                v-model="client.cli_whatsapp"
                placeholder="Insira o Número de WHATSAPP com DDD (00) 00000-0000"
                v-maska
                data-maska="(##) #####-####"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>CPF ou
                CNPJ:</label
              >
              <input
                type="text"
                oninvalid="setCustomValidity('Preencha com CPF/CNPJ');"
                oninput="setCustomValidity('');"
                class="form-control"
                id="clienteName"
                v-model="client.cli_cnpj_and_cpf"
                placeholder="Insira o CPF ou CNPJ 000.000.000-00 | 00.000.000/0000-00"
                v-maska
                data-maska="['###.###.###-##','##.###.###/####-##']"
                required
              />
            </div>
          </div>

          <!-- DIREITA -->
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-label" for="clienteName"
                ><span style="color: red; font-size: 14px; font-weight: bold">*</span>Nº INSCRIÇÃO
                ESTADUAL:</label
              >
              <input
                :disabled="client.cli_isento"
                type="text"
                oninvalid="setCustomValidity('Preencha a inscrição estadual');"
                oninput="setCustomValidity('');"
                class="form-control"
                id="clienteName"
                v-model="client.cli_inscricao_estadual"
                placeholder="Insira o Nº de Inscrição Estadual .."
                required
              />
            </div>

            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  v-model="client.cli_isento"
                  id="customCheck01"
                  type="checkbox"
                  class="custom-control-input"
                />
                <label for="customCheck01" class="custom-control-label">Isento</label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName">EMAIL:</label>
              <input
                type="email"
                class="form-control"
                id="clienteName"
                v-model="client.cli_email"
                placeholder="Insira o email@email.com"
                oninvalid="setCustomValidity('Preencha o email');"
                oninput="setCustomValidity('');"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName">CEP:</label>
              <input
                type="text"
                class="form-control"
                id="clienteName"
                v-maska
                data-maska="#####-###"
                v-model="client.cli_cep"
                @change.prevent="getDadosCep"
                placeholder="Insira o CEP 00000-000"
                oninvalid="setCustomValidity('Preencha o cep');"
                oninput="setCustomValidity('');"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteAddress">Endereço:</label>
              <input
                type="text"
                class="form-control"
                oninvalid="setCustomValidity('Preencha o Endereço');"
                name="clienteAddress"
                id="clienteAddress"
                placeholder="Insira o endereço"
                v-model="client.cli_endereco"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteContact"
                >Contato(Responsáveis da empresa):</label
              >
              <input
                type="text"
                class="form-control"
                name="clienteContact"
                id="clienteContact"
                placeholder="Insira o Contato (00) 00000-0000"
                v-model="client.cli_contact"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteContact">Transportadora</label>
              <input
                type="text"
                class="form-control"
                name="clienteTransportadora"
                id="clienteTransportadora"
                placeholder="Insira a Transportadora"
                v-model="client.cli_transportadora"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="clienteName">TEL.:</label>
              <input
                type="tel"
                class="form-control"
                id="clienteName"
                v-model="client.cli_telefone"
                placeholder="Insira um Telefone para Contato (00) 00000-0000"
                oninvalid="setCustomValidity('Preencha o telefone');"
                oninput="setCustomValidity('');"
                v-maska
                data-maska="(##) #####-####"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-group" style="padding: 0 25px 0 25px">
          <label class="form-label">ANEXAR FOTO DE PERFIL ou LOGOTIPO:</label>
          <div class="custom-file">
            <input
              type="file"
              :multiple="false"
              @change="upload($event, imageAccept, 'save')"
              accept="image/jpg,image/jpeg,image/png,image/webp"
              id="file"
              class="custom-file-input"
            />
            <label for="file" class="custom-file-label">
              {{ filesRef && filesRef?.size > 0 ? filesRef.name : 'Escolher uma imagem' }}
            </label>
          </div>
        </div>

        <hr />

        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row">
            <button
              type="button"
              @click.prevent="openModalSpecificPrice"
              class="btn btn-light mr-2"
            >
              <i class="fas fa-user-shield mr-2" style="font-size: 16px"></i>
              Gerenciar os produtos com desconto
            </button>
          </div>
          <div class="d-flex justify-content-end gap-1">
            <button type="reset" class="btn btn-light" v-if="!buttonChange">
              <i class="material-icons icon--left" style="font-size: 16px">clear</i>
              LIMPAR
            </button>
            <button
              type="button"
              @click.prevent="emit('close-modal-client')"
              class="btn btn-accent mr-2"
            >
              <i class="material-icons icon--left" style="font-size: 16px">clear</i>
              Cancelar Ação
            </button>

            <button type="submit" class="btn btn-primary" v-if="!buttonChange">
              <i class="material-icons icon--left" style="font-size: 16px">add_shopping_cart</i>
              CADASTRAR
            </button>
            <button @click.prevent="updateClient" type="submit" class="btn btn-primary" v-else>
              <i class="material-icons icon--left" style="font-size: 16px">add_shopping_cart</i>
              Alterar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IClient, IError } from '@/model/Index'
import { onMounted, ref, toRefs, watchEffect, type PropType } from 'vue'
import { useUpload } from '@/composables/Upload'
import { createClientPost, updateClientPut } from '@/api/actions/Client'
import { getCep } from '@/api/actions/Cep'
import { useToast } from '@/composables/Toast'
import { useLoginStore } from '@/stores/LoginStore'
import { useClientStore } from '@/stores/ClientStore'
import { vMaska } from 'maska'
import { useRoute, useRouter } from 'vue-router'

const prop = defineProps({
  clienteEdit: { type: Object as PropType<IClient>, required: false },
  // productSelectPrice: { type: Object as PropType<IProduct[]>, required: false, default: [] },
  descricaoRoute: { type: String, required: true, default: 'Cadastrar novo cliente' }
})

const emit = defineEmits(['open-specific-price', 'close-modal-client'])
const { clienteEdit } = toRefs(prop)

//hookls
const { userData } = useLoginStore()
const { notifyToast } = useToast()
const clientStore = useClientStore()
const router = useRouter()
const route = useRoute()

const imageAccept = ref<string[]>(['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])
const buttonChange = ref<boolean>(false)

const { upload, filesRef, empty, fileDirectory } = useUpload()
const client = ref<IClient>({
  cli_isento: false,
  cli_tipo_pessoa: 0,
  cli_nome: '',
  cli_razao_social: '00000000',
  cli_nome_fantasia: '',
  cli_celular: '',
  cli_whatsapp: '',
  cli_cnpj_and_cpf: '',
  cli_inscricao_estadual: '',
  cli_email: '',
  cli_cep: '',
  cli_telefone: '',
  user_usucadastro: 0,
  cli_imagem: '',
  cli_uuid: '',
  cli_bairro: '',
  cli_cidade: '',
  cli_estado: '',
  cli_endereco: '',
  cli_valor_prod: '',
  cli_prod_id: 0,
  cli_contact: '',
  cli_transportadora: ''
})
const checkedInput = ref<HTMLInputElement>()
const resetForm = ref()

const openModalSpecificPrice = () => {
  document.querySelector('#specificPrice')?.classList.toggle('active')
  const body = document.querySelector('body')

  //scroll ate o top da pagina/modal
  const scrollableElement = document.scrollingElement || document.documentElement
  scrollableElement.scrollTo({
    top: 0,
    behavior: 'smooth' // Adiciona rolagem suave
  })

  //verifica se existe o style se tiver remove caso tiver aperto e abre quando nao tiver
  if (body?.hasAttribute('style')) {
    document.querySelector('body')?.removeAttribute('style')
  } else {
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  }
  emit('open-specific-price', true)
}

const reset = async () => {
  client.value.cli_tipo_pessoa = 0
  client.value.cli_nome = ''
  client.value.cli_razao_social = ''
  client.value.cli_nome_fantasia = ''
  client.value.cli_celular = ''
  client.value.cli_whatsapp = ''
  client.value.cli_cnpj_and_cpf = ''
  client.value.cli_inscricao_estadual = ''
  client.value.cli_email = ''
  client.value.cli_cep = ''
  client.value.cli_telefone = ''
  client.value.user_usucadastro = 0
  client.value.cli_imagem = ''
  client.value.cli_transportadora = ''
  client.value.cli_contact = ''
  client.value.cli_endereco = ''
  empty()
}

const createCliente = async () => {
  try {
    //if (fileDirectory.value) {
    client.value.cli_tipo_pessoa = Number(client.value.cli_tipo_pessoa)
    client.value.user_usucadastro = userData.user_id
    client.value.cli_uuid = fileDirectory.value.uuid
    client.value.cli_imagem = fileDirectory.value.path
    client.value.cli_celular = client.value.cli_whatsapp
    client.value.cli_razao_social = client.value.cli_nome
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { cli_valor_prod, cli_prod_id, ...cliente } = client.value

    if (userData.user_id <= 0 && client.value.user_usucadastro <= 0) {
      notifyToast({ msg: 'Logue no sistema para poder criar o cliente', typeToast: 'warning' })
      router.push({ name: 'home' })
      return
    }
    const { status } = await createClientPost(cliente)
    if (status === 200) {
      notifyToast({ msg: 'Cliente Cadastrado com sucesso!', typeToast: 'success' })

      await clientStore.getAllClientLimit(5, 0)

      setTimeout(() => {
        reset()
      }, 800)
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 409) {
        notifyToast({
          msg: 'Erro ao cadastrar cliente, pois o formulario nao foi preenchido corretamente',
          typeToast: 'error'
        })
      }
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao cadastrar cliente', typeToast: 'error' })
    }
  }
}

const updateClient = async () => {
  try {
    client.value.cli_tipo_pessoa = Number(client.value.cli_tipo_pessoa)
    const { ...update } = client.value
    client.value.user_usuultalteracao = userData.user_id

    const { status } = await updateClientPut(update)
    if (status === 200) {
      notifyToast({ msg: 'Cliente atualizado com sucesso!', typeToast: 'success' })
      setTimeout(() => {
        router.go(0)
      }, 500)
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 409) {
        notifyToast({
          msg: 'Erro ao cadastrar cliente, pois o formulario nao foi preenchido corretamente',
          typeToast: 'error'
        })
      }
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao cadastrar cliente', typeToast: 'error' })
    }
  }
}

const getDadosCep = async () => {
  try {
    const split = client.value.cli_cep.split('-')
    const cep = split[0] + split[1]
    const { data } = await getCep(cep)
    if (Number(data.resultado) === 1) {
      client.value.cli_bairro = data.bairro
      client.value.cli_cidade = data.cidade
      client.value.cli_estado = data.uf
      client.value.cli_endereco = `${data.tipo_logradouro} - ${data.logradouro} - ${data.bairro} - ${data.cidade} - ${data.uf}`
    } else {
      notifyToast({ msg: 'Cep não encontrado, tente novamente!', typeToast: 'error' })
    }
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response !== undefined) {
      notifyToast({ msg: 'Erro Interno ou a rota não existe', typeToast: 'error' })
      return
    }
    notifyToast({ msg: 'Erro ao buscar dados do cep', typeToast: 'error' })
  }
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (checkedInput.value?.checked) client.value.cli_tipo_pessoa = checkedInput.value?.value as any
})

watchEffect(async () => {
  if (
    clienteEdit?.value &&
    clienteEdit.value?.cli_id !== undefined &&
    route.path === '/finance/client'
  ) {
    client.value = { ...clienteEdit.value }
    client.value.cli_prod_id =
      clienteEdit.value.cli_prod_id !== undefined && clienteEdit.value.cli_prod_id > 0
        ? clienteEdit.value.cli_prod_id
        : 0

    await getDadosCep()

    buttonChange.value = true
  }
})
</script>

<style scoped>
.gap-1 {
  gap: 0.5rem;
}
</style>
