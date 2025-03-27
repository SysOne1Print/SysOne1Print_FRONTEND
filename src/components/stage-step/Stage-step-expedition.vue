<template>
  <ul class="processosMinimizados d-flex flex-row mb-0">
    <li class="processoEtapa" v-for="(value, index) in status" :key="index" :class="value?.classActive"
      v-tooltip.bottom="{
        value: value?.nome,
        pt: { arrow: { style: { borderBottomColor: '#fff' } }, text: 'bg-white text-100 fw-700 ' }
      }">
      <i :class="value?.icon"></i>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IOrcamentoItensPedidoStatus } from '@/model/Index'
import { computed, ref, toRefs, type PropType } from 'vue'

const prop = defineProps({
  typeModal: {
    type: Object as PropType<IOrcamentoItensPedidoStatus>,
    required: true,
    default: () => { }
  }
})

const { typeModal } = toRefs(prop)

const listMenu = ref<{ id: number; nome: string; icon: string; active: number }[]>([
  { id: 1, nome: 'Aguardando Produção', icon: 'far fa-lg fa-id-card', active: 1 },
  { id: 2, nome: 'Arte Final', icon: 'fas fa-lg fa-images', active: 2 },
  { id: 3, nome: 'Em Produção', icon: 'fas fa-lg fa-print', active: 3 },
  { id: 4, nome: 'Produção Pausada', icon: 'fas fa-lg fa-print', active: 4 },
  { id: 5, nome: 'Produção Concluída', icon: 'fas fa-lg fa-print', active: 5 },
  { id: 6, nome: 'Em Separação', icon: 'fas fa-lg fa-hat-wizard', active: 6 },
  { id: 7, nome: 'Pronto para Entrega', icon: 'fas fa-lg fa-thumbs-up', active: 7 }
])

const status = computed(() => {
  // Definir os IDs dos estágios de produção
  const estadosProducao = [3, 4, 5]

  // Identificar o status atual
  const statusAtual = typeModal?.value?.orcamento_status?.ost_id as number

  return listMenu.value
    .map((v) => {
      const itensHistorical = typeModal.value.orcamento_itens_historical?.find(
        (val) => val.oitHs_status_id === v.active
      )

      // Se o status for de produção, garantir que só o estado atual seja exibido
      if (estadosProducao.includes(v.id)) {
        // Se for o status atual de produção, mantém ele
        if (v.id === statusAtual) {
          return {
            ...v,
            classActive: activeLi(itensHistorical, v)
          }
        }

        // Se não há status atual de produção definido, mantém "Em Produção" (id 3) como padrão
        if (!estadosProducao.includes(statusAtual) && v.id === 3) {
          return {
            ...v,
            classActive: activeLi(itensHistorical, v)
          }
        }
        // Oculta os outros estágios de produção
        return null
      }
      // Mantém os demais status normalmente
      return {
        ...v,
        classActive: activeLi(itensHistorical, v)

      }
    })
    .filter(Boolean) // Remove os `null`
})

const activeLi = (itensHistorical: { oitHs_status_id: number } | undefined, v: { active: number }) => {
  return typeModal?.value !== undefined &&
    itensHistorical === undefined
    ? (typeModal.value.orcamento_itens_historical &&
      typeModal?.value?.orcamento_status?.ost_id === v.active) ||
      typeModal?.value?.orcamento_status?.ost_id > v.active
      ? 'active'
      : ''
    : itensHistorical && itensHistorical?.oitHs_status_id >= v.active ? 'active' : ''
}
</script>

<style scoped></style>
