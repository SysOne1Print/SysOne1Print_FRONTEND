<template>
  <div class="page-section">
    <div class="card card-form d-flex flex-column flex-sm-row mb-lg-32pt">
      <div class="card-form__body card-body-form-group flex">
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group">
              <label for="filter_name">Produto</label>
              <form class="search-form" @submit.prevent="searchItem">
                <input
                  v-model="search"
                  id="filter_name"
                  type="text"
                  class="form-control"
                  style="width: 400px; max-width: 400px; min-width: 200px"
                  placeholder="Procurar por um produto ou código"
                />
                <button class="btn" type="submit">
                  <i class="material-icons">search</i>
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label for="filter_category">Categoria</label><br />

              <select
                v-model.number="getProductByCategory.id_cat"
                id="filter_category"
                class="custom-select"
                @change="searchItem"
                style="max-width: 400px; min-width: 200px"
              >
                <option value="" disabled selected>Selecione um opção</option>
                <option :value="0">Todas as categorias</option>
                <option :value="value?.id" v-for="(value, index) in allCategory" :key="index">
                  {{ value?.prod_tipo_descricao }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label for="filter_stock">Em Estoque?</label>
              <div class="custom-control custom-checkbox mt-sm-2">
                <input
                  v-model="getProductByCategory.disponivel"
                  @change.prevent="searchItem"
                  type="checkbox"
                  class="custom-control-input"
                  id="filter_stock"
                  checked
                />
                <label class="custom-control-label" for="filter_stock">Disponível</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="reset"
        @click.prevent="resetAndRefresh"
        class="btn bg-alt border-left border-top border-top-sm-0 rounded-5"
      >
        <i class="material-icons" style="font-size: 14pt; color: grey">refresh</i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from '@/composables/Toast'
// import { getProductByName } from '@/api/actions/produtos';
import { useProductStore } from '@/stores/ProductStore'
import { getAllCategoria } from '@/api/actions/Categoria'
import { storeToRefs } from 'pinia'
import type { IError } from '@/model/Index'
import { useRouter } from 'vue-router'

//composables
const limit = ref(8)
const { notifyToast } = useToast()

const router = useRouter()
const { setProductState } = useProductStore()
const { productState } = storeToRefs(useProductStore())

const search = ref<string>('')
const allCategory = ref<{ id: number; prod_tipo_descricao: string }[]>()
const getProductByCategory = ref<{ id_cat: number | string; disponivel: boolean }>({
  id_cat: '',
  disponivel: true
})

const searchItem = async () => {
  try {
    const searchFn = search.value !== '' ? search.value : ''
    const categoryFn =
      Number(getProductByCategory.value.id_cat) === 0
        ? null
        : Number(getProductByCategory.value.id_cat)

    await setProductState(searchFn, limit.value, categoryFn, getProductByCategory.value.disponivel)
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response !== undefined) {
      if (error.response.status === 404 && error.code == 'ERR_BAD_REQUEST') {
        productState.value = []
        notifyToast({ msg: 'Não foi encontrado os produtos dessa categoria', typeToast: 'info' })
        return
      }
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }

    notifyToast({ msg: 'Erro ao buscar esse tipo de produto', typeToast: 'info' })
  }
}

const resetAndRefresh = async () => {
  router.go(0)
}

onMounted(() => {
  getAllCategoria()
    .then((result) => {
      const { data } = result
      allCategory.value = data
    })
    .catch((error) => {
      if (error.response !== undefined) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        return
      }
      notifyToast({ msg: 'Erro ao buscar as categorias', typeToast: 'error' })
    })
})
</script>

<style scoped></style>
