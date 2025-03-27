<template>
  <div class="col-lg-4 col-md-12 col-sm-12">
    <div class="w-100 h-100 bg-light p-4 border rounded-bottom">
      <div class="w-100 mr-0">
        <p class="w-100 border-bottom" style="font-size: 16px">Crie um novo Grupo</p>
      </div>
      <form @submit.prevent="createGrupo">
        <div class="w-100">
          <div class="form-group flex-grow">
            <label class="form-label mb-0 text-70" for="cadNomeFornecedor">
              Nome
              <span class="text-danger font-weight-bold">*</span>
            </label>
            <input
              id="cadNomeFornecedor"
              type="text"
              class="form-control"
              v-model="grupo.nome_grupo"
              placeholder="Insira o nome do Grupo de Produto .."
            />
          </div>
        </div>
        <div class="w-100 pt-3">
          <button type="submit" class="btn btn-primary w-100 mt-3">Criar grupo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGrupoProduto } from '@/composables/UseGrupoProduto'

const { createGrupo, grupo } = useGrupoProduto()
</script>

<style scoped></style>
