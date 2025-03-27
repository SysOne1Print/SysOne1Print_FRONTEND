<template>
  <div class="card-header">
    <div class="search-form">
      <input
        type="text"
        @input="maskNumbers"
        v-model="searchItem"
        v-bind:max="ifNumber ? 18 : ''"
        v-bind:maxlength="ifNumber ? 18 : ''"
        @change="searchClient"
        class="form-control search"
        placeholder="Procurar Cliente ..."
      />
      <button @click.prevent="searchClient" class="btn" type="button">
        <i class="material-icons">search</i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllClient } from '@/api/actions/Client'
import { useToast } from '@/composables/Toast'
import type { IError } from '@/model/Index'
import { useClientStore } from '@/stores/ClientStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

//store
const { clientState } = storeToRefs(useClientStore())

//composables
const { notifyToast } = useToast()

const searchItem = ref('')
const ifNumber = ref(false)

const searchClient = async () => {
  try {
    const searchNum = 8
    let search = testIfNumberCnpj()
    //search = search.replace(/\D/g, '')
    const { data } = await getAllClient(searchNum, 0, search)
    clientState.value = data
  } catch (er: unknown) {
    const error = er as IError
    clientState.value = []
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro ao cadastrar produto', typeToast: 'error' })
    } else if (error.response.status === 500) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else if (error.response.status === 409) {
      notifyToast({
        msg: 'Erro ao cadastrar produto, envie os dados corretamente',
        typeToast: 'error'
      })
    } else {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    }
  }
}

function maskNumbers() {
  let apenasDigitos = searchItem.value.replace(/\D/g, '')
  if (!identificarNumeroOuCNPJ()) {
    return ''
  }

  //Regex para numeros inteiros de 1 a 6 digitos
  if (apenasDigitos.length >= 1 && apenasDigitos.length < 6) {
    return
  }

  //regex para verificar se é um numero de telefone ou CNPJ
  if (apenasDigitos.length <= 11) {
    // Formatar como telefone (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (apenasDigitos.length > 10) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (apenasDigitos.length > 6) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else if (apenasDigitos.length > 2) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{0,4})/, '($1) $2')
    } else {
      searchItem.value = apenasDigitos.replace(/(\d*)/, '($1')
    }
  } else {
    // Formatar como CNPJ XX.XXX.XXX/XXXX-XX
    if (apenasDigitos.length > 12) {
      searchItem.value = apenasDigitos.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      )
    } else if (apenasDigitos.length > 8) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4')
    } else if (apenasDigitos.length > 5) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else if (apenasDigitos.length > 2) {
      searchItem.value = apenasDigitos.replace(/(\d{2})(\d{0,3})/, '$1.$2')
    } else {
      searchItem.value = apenasDigitos.replace(/(\d*)/, '$1')
    }
  }
}

function identificarNumeroOuCNPJ() {
  //apenas digitos
  const apenasDigitos = searchItem.value.replace(/\D/g, '')

  // Expressão regular para telefone com 10 ou 11 dígitos
  const regexTelefone = /^\d{10,11}$/

  // Expressão regular para CNPJ com 14 dígitos
  const regexCNPJ = /^\d{14}$/

  // Expressão regular para identificar numero Inteiro
  const regexNumber = /^\d{1,6}$/

  if (regexTelefone.test(apenasDigitos)) {
    ifNumber.value = true
    return true
  } else if (regexCNPJ.test(apenasDigitos)) {
    ifNumber.value = true
    return true
  } else if (regexNumber.test(apenasDigitos)) {
    ifNumber.value = true
    return true
  } else {
    ifNumber.value = false
    return false
  }
}

const testIfNumberCnpj = () => {
  const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/

  // Expressão regular para CNPJ XX.XXX.XXX/XXXX-XX
  const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

  //regex number
  const regexNumber = /^\d{1,6}$/

  if (regexTelefone.test(searchItem.value)) {
    //se for telefone
    return `?searchWhat=${searchItem.value.replace(/\D/g, '')}&typeSearch=cellphone`
  } else if (regexCNPJ.test(searchItem.value)) {
    // se for CNPJ
    return `?searchCNPJ=${searchItem.value.replace(/\D/g, '')}&typeSearch=cnpj`
  } else if (regexNumber.test(searchItem.value)) {
    //se for numero
    return `?searchNumber=${searchItem.value.replace(/\D/g, '')}&typeSearch=number`
  } else {
    //se for Nome
    return `?searchNome=${searchItem.value}`
  }
}
</script>

<style scoped></style>
