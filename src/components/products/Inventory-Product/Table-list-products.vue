<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap" v-if="productList.length > 0">
    <Thead @select-all-item="selectAll" :extra="false" :data-table="tableStock"></Thead>
    <tbody class="list" id="search">
      <tr
        v-for="(value, index) in relistProduct"
        :key="index"
        :class="[{ selected: selectActiveTr(value.pro_id), color_bg: !value?.pro_disponivel }]"
      >
        <td :class="{ 'pr-0': index === 0 }">
          <div class="custom-control custom-checkbox">
            <input
              :disabled="!value.pro_disponivel"
              type="checkbox"
              class="custom-control-input js-check-selected-row"
              :id="value.pro_id.toString()"
              :value="value.pro_id"
              v-model="selectItem"
            />
            <label class="custom-control-label" :for="value.pro_id.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </td>
        <td class="js-lists-values-codigo">
          {{ value.pro_id }}
        </td>

        <td class="small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-70">
              <strong>{{ value.nome }}</strong>
            </p>
            <small
              class="text-hidden text-50"
              v-tooltip.bottom="{
                value: value.tamanho
              }"
              >{{ value.tamanho }}</small
            >
          </div>
        </td>

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              <strong> {{ value.marca }}</strong>
            </p>
          </div>
        </td>

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-70">
              <strong> {{ value.categoria }}</strong>
            </p>
          </div>
        </td>

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-70">
              {{ value.min }}
            </p>
          </div>
        </td>

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              {{ value.max }}
            </p>
          </div>
        </td>

        <td>
          {{ value.qnt }}
        </td>

        <td>
          {{ value.orc }}
        </td>

        <td>R$ {{ value.preco }}</td>

        <td
          class="text-center"
          v-if="['/vendedor/stock', '/vendedor/lista-produto'].some((v) => v === route.path)"
        >
          <ButtonToolTip
            @click.prevent="$emit('open-modal', value)"
            class="btn btn-secondary"
            :button-options="{
              tooltip: 'Visualizar Detalhes.',
              icon: 'material-icons',
              contentTag: 'dehaze'
            }"
          >
          </ButtonToolTip>

          <!--Diferenciar botão de deleta por rota-->
          <ButtonToolTip
            class="btn btn-secondary"
            @click.prevent="router.push({ name: 'Alterar Produtos', params: { id: value.pro_id } })"
            :button-options="{
              tooltip: 'Alterar produto.',
              icon: 'material-icons',
              contentTag: 'edit'
            }"
          >
          </ButtonToolTip>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center m-3" v-else>
    <span style="font-size: 18px; font-weight: 500">Não foi encontrado produto</span>
  </div>
</template>

<script setup lang="ts">
import Thead from '@/components/table/Thead.vue'
import type { IProducTable } from '@/model/Index'
import { computed, ref, toRefs, type PropType } from 'vue'
import { DateAndHour } from '@/util/Data'
import { dataTableStock } from '@/util/TableInfo'
import { useSelectItem } from '@/composables/UseSelectItemTable'
import { useRoute, useRouter } from 'vue-router'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'

const prop = defineProps({
  productList: { type: Object as PropType<IProducTable[]>, required: true }
})

defineEmits(['delete-item', 'open-modal'])

//composables
const { selectAll, selectItem } = useSelectItem()

const tableStock = ref(dataTableStock)
const { productList } = toRefs(prop)
const route = useRoute()
const router = useRouter()

const relistProduct = computed(() =>
  productList.value.map((v) => {
    return {
      pro_visible: v.pro_visible,
      pro_disponivel: v.pro_disponivel,
      pro_id: v.pro_id,
      nome: v.pro_nome,
      tamanho:
        v.pro_categoria_item === 4
          ? v.one1_produto_estoque
              .map((val) => val.one1_tamanho.one1_tamanho_nome)
              ?.reduce((acc = '', one1_tamanho_nome) => {
                return acc + ', ' + one1_tamanho_nome
              })
          : '',
      marca: v.pro_marca,
      categoria: v.produto_categoria_item.prod_tipo_descricao,
      min: v.pro_minimo,
      max: v.pro_maximo,
      qnt: v.pro_quantidade,
      orc: ' - ',
      preco: v.pro_venda.toString().replace('.', ','),
      pro_data_validade: DateAndHour(new Date(v.pro_data_validade)),
      pro_frete: v.pro_frete,
      pro_observacao: v.pro_observacao,
      user_nome: v.users.user_nome,
      log: v.log
    }
  })
)

const selectActiveTr = (prod_id: number) => selectItem.value.find((v) => v === prod_id) // retornando assim

//expondo variavel para o component pai
defineExpose({
  selectItem
})
</script>

<style scoped>
.text-hidden {
  white-space: nowrap;
  width: 15em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-white {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;

  text-overflow: ellipsis;
}

.activeModal {
  display: flex;
}

.color_bg {
  background-color: rgb(217 49 49 / 20%);
}
</style>
