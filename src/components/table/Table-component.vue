<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap">
    <Thead
      class="efeito-titulo clientes"
      :classTh="'pr-5'"
      :extra="true"
      :data-table="dataTableClient"
    ></Thead>
    <tbody class="list" id="search">
      <TrComponent
        class="efeito-lista clientes-lista"
        v-for="(value, index) in clientState"
        :key="index"
      >
        <td :class="{ 'pr-0': index === 0 }">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              :id="value.cli_id.toString()"
              :value="value.cli_id"
              class="custom-control-input js-check-selected-row"
            />
            <label class="custom-control-label" :for="value.cli_id.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-70">
              <strong>{{ value.cli_id }}</strong>
            </p>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-70">
              <strong>{{ value.cli_nome }}</strong>
            </p>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex flex-row justify-content-between">
            <p class="mb-0 text-70">
              <strong>{{ value.cli_whatsapp }}</strong>
            </p>

            <ButtonToolTip
              :type="'button'"
              @click.prevent="copy(value.cli_whatsapp, 'Celular/WhatsApp')"
              :class="'btn btn-sm btn-secondary ml-1'"
              :button-options="{
                tooltip: 'Copiar número do WPP',
                icon: 'far fa-copy'
              }"
            >
            </ButtonToolTip>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex justify-content-between">
            <p class="mb-0 text-70">
              {{ value.cli_email }}
            </p>

            <ButtonToolTip
              :type="'button'"
              @click.prevent="copy(value.cli_email, 'E-mail')"
              :class="'btn btn-sm btn-secondary ml-1'"
              :button-options="{
                tooltip: 'Copiar endereço de email',
                icon: 'far fa-copy'
              }"
            >
            </ButtonToolTip>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex flex-row justify-content-between">
            <p class="mb-0 text-70">
              <span
                :style="
                  value.carteira_one1_cliente?.cart_valor === undefined ||
                  value.carteira_one1_cliente?.cart_valor < 0
                    ? 'color:red;'
                    : 'color:#538628;'
                "
              >
                {{
                  value.carteira_one1_cliente?.cart_valor !== undefined
                    ? value.carteira_one1_cliente?.cart_valor < 0
                      ? fnMinusSignValue(
                          real.formatToParts(value.carteira_one1_cliente?.cart_valor)
                        )
                      : real.format(value.carteira_one1_cliente?.cart_valor)
                    : ' - '
                }}
              </span>
            </p>

            <ButtonToolTip
              @click.prevent="$emit('open', value, 'add')"
              :content="'Add. Saldo'"
              :type="'submit'"
              :class="'btn btn-sm btn-success'"
              :button-options="{
                tooltip: 'Adicionar saldo na carteira',
                icon: 'far fa-copy mr-2'
              }"
            >
              <i class="far fa-copy mr-2"></i>
            </ButtonToolTip>
          </div>
        </td>

        <td td class="text-50 small">
          <div class="d-flex gap-2 justify-content-between">
            <ButtonToolTip
              @click.prevent="$emit('open', value, '')"
              :content="'Editar Cliente'"
              :type="'submit'"
              :class="'btn btn-sm btn-primary'"
              :button-options="{
                tooltip: 'Editar Usuário',
                icon: 'fas fa-qrcode',
                contentTag: 'fas fa-pen mr-2'
              }"
            >
              <i class="fas fa-pen mr-2"></i>
            </ButtonToolTip>

            <ButtonToolTip
              @click.prevent="deleteCliente"
              :type="'submit'"
              :class="'btn btn-sm btn-accent ml-1'"
              :button-options="{
                tooltip: 'Deletar Cliente',
                icon: 'fas fa-trash'
              }"
            >
            </ButtonToolTip>
          </div>
        </td>
      </TrComponent>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import Thead from '@/components/table/Thead.vue'
import TrComponent from './Tr-component.vue'
import { dataTableClient } from '@/util/TableInfo'
import type { IClientAll } from '@/model/Index'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import { useToast } from '@/composables/Toast'
import { copyFile } from '@/util/Util'

defineProps({
  clientState: { type: Array as PropType<Array<IClientAll>> }
})

//toast
const { notifyToast } = useToast()

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const fnMinusSignValue = (real: Intl.NumberFormatPart[]) => {
  return `${real[1].value}${real[2].value} ${real[0].value} ${real[3].value}${real[4].value}${real[5].value}`
}

const copy = (content: string, typeContent: string) => {
  copyFile(content, notifyToast, typeContent)
}

const deleteCliente = () => {}
</script>

<style scoped>
.gap-2 {
  gap: 1rem;
}
</style>
