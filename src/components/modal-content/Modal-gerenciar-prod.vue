<template>
  <!-- Inicio da modal Ger. Grupo de Produtos -->
  <div id="modalGerGrupoProdutos" class="modal">
    <div class="modal-content w-75 oneScroll">
      <div class="modal-top">
        <span class="modal-close" @click.prevent="closeGroup" style="cursor: pointer">&times;</span>
      </div>
      <div class="modal-container">
        <h4 style="padding: 0; margin-bottom: 0">Gerenciar Grupo de Produtos</h4>
        <small class="text-50 mt-100">Editar ou Inserir um grupo de produtos..</small>

        <hr />
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="row d-lg-flex flex-wrap justify-content-between pl-0 pr-0 row-gap-1">
            <!-- Início Lista dos Grupos e gerenciamento -->
            <div class="col-lg-7 col-md-12 col-sm-12">
              <div
                class="w-100 h-100 d-lg-flex flex-column justify-content-center bg-light border rounded-bottom p-4"
              >
                <div class="w-100">
                  <p class="border-bottom" style="font-size: 16px">
                    Selecione um Grupo de Produtos para gerir ..
                  </p>
                </div>
                <div class="w-100">
                  <div class="form-group w-100 mb-0">
                    <select
                      id="selectGrupoProdutos"
                      v-model="selectGrupo"
                      class="form-control w-100 mb-0"
                    >
                      <option :value="0" selected disabled>Selecione um Grupo de Produto</option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in reworkAllGroup"
                        :key="index"
                      >
                        {{ value.nome_grupo }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="w-100 d-flex flex-column" v-if="selectGrupo > 0">
                  <div class="w-100 d-flex justify-content-between mt-3 mb-3 border-bottom">
                    <p class="text-50 mb-0" style="font-size: 16px">
                      Grupo de Produtos selecionado:
                    </p>
                    <p class="text-uppercase mb-0" style="font-size: 16px">
                      {{ grupoComputed?.nome_grupo }}
                    </p>
                  </div>

                  <div class="w-100 d-lg-flex flex-row justify-content-between">
                    <button @click.prevent="deleteGrupo" type="button" class="btn btn-danger mt-2">
                      Excluir grupo
                    </button>
                    <button
                      @click.prevent="subGroupAdd"
                      type="button"
                      class="btn btn-secondary ml-2 mt-2"
                    >
                      Atribuir Sub Grupo
                    </button>
                    <button @click="editarGrupoFn" type="button" class="btn btn-primary ml-2 mt-2">
                      Editar grupo
                    </button>
                  </div>
                </div>
                <!-- Fim da div Detalhes do Grupo-->
              </div>
            </div>
            <!-- Fim Lista dos Grupos e gerenciamento -->

            <!-- Inicio Criar grupo -->
            <div class="col-lg-4 col-md-12 col-sm-12" v-if="!atribuirSub">
              <div class="w-100 h-100 bg-light p-4 border rounded-bottom">
                <div class="w-100 mr-0">
                  <p class="w-100 border-bottom" style="font-size: 16px">{{ msg }}</p>
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
                    <button v-if="!atribuirEdit" type="submit" class="btn btn-primary w-100 mt-3">
                      Criar grupo
                    </button>
                    <button
                      v-else
                      type="button"
                      @click.prevent="editarUpGrupo"
                      class="btn btn-primary w-100 mt-3"
                    >
                      Atualizar Grupo
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- Fim criar grupo -->

            <!-- DIV btn:Atribuir Sub Grupo ao Grupo -->
            <SubGrupo
              v-if="atribuirSub"
              :grupoSelect="grupoComputed"
              @search-sub-group="getGrupo"
              @cancel-sub="subGroupAdd"
            ></SubGrupo>
            <!--sub-grupo-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Fim da modal Ger. Grupo de Produtos -->
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, toRefs, type PropType } from 'vue'
import SubGrupo from '@/components/modal-content/grupo/Sub-grupo.vue'
import type { IGrupo, IGrupoArray } from '@/model/Index'

const prop = defineProps({
  allGrupo: { type: Array as PropType<IGrupoArray[]>, required: true },
  select_grupo: { type: Number, required: true, default: 0 }
})

const { allGrupo, select_grupo } = toRefs(prop)
const emit = defineEmits([
  'closeModal',
  'update-list-group',
  'delete-group',
  'create-group',
  'get-group'
])

//const { createGrupo, grupo, allGrupo, deleteGrupoFn, getGrupo, editarGrupo } = useGrupoProduto()

//variable
const grupo = ref<IGrupo>({
  nome_grupo: ''
})
const selectGrupo = ref<number>(select_grupo.value)
const atribuirSub = ref<boolean>(false)
const atribuirEdit = ref<boolean>(false)
const msg = ref('Crie um novo Grupo')
//computed
const grupoComputed = computed(() => {
  return allGrupo.value !== undefined && allGrupo.value?.length > 0
    ? allGrupo.value.find((v) => v.id === selectGrupo.value)
    : { id: 0, nome_grupo: '' }
})

const reworkAllGroup = computed(() => {
  return allGrupo.value.length > 0
    ? allGrupo.value.map((v) => {
        return {
          id: v.id,
          nome_grupo:
            v.produto_sub_grupo.length > 0
              ? `${v.nome_grupo} - ${v.produto_sub_grupo.reduce((acc = '', curr) => {
                  return (acc = acc + curr.nome_sub_grupo)
                }, '')}`
              : v.nome_grupo
        }
      })
    : []
})

const subGroupAdd = () => {
  atribuirSub.value = !atribuirSub.value
}

const createGrupo = () => {
  emit('create-group', grupo.value)
}

const getGrupo = () => {
  emit('get-group')
}

const editarUpGrupo = async () => {
  atribuirEdit.value = false
  msg.value = 'Crie um novo Grupo'
  emit('update-list-group', grupo.value)
}

const deleteGrupo = async () => {
  // const delGrupo = await deleteGrupoFn(selectGrupo.value)
  // if (delGrupo && delGrupo.status === 200) {
  //   selectGrupo.value = 0
  // }

  //selectGrupo.value = 0
  emit('delete-group', selectGrupo.value)
}

const editarGrupoFn = () => {
  atribuirEdit.value = true
  msg.value = 'Editar Grupo'

  grupo.value.id = grupoComputed.value?.id
  grupo.value.nome_grupo = grupoComputed.value?.nome_grupo as string
}

const closeGroup = () => {
  selectGrupo.value = 0
  atribuirSub.value = false
  atribuirEdit.value = false
  msg.value = 'Crie um novo Grupo'

  grupo.value.id = 0
  grupo.value.nome_grupo = ''

  emit('closeModal', allGrupo)
}

onUnmounted(() => {
  selectGrupo.value = 0
  atribuirSub.value = false
  atribuirEdit.value = false
})
</script>

<style scoped>
.row-gap-1 {
  row-gap: 1rem;
}
</style>
