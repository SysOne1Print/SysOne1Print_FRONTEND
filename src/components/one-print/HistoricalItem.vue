<template>
  <div class="card" v-if="historical && historical?.length > 0">
    <DataTable :value="historical" :tableStyle="widthTable">
      <Column field="id" header="Codigo" sortable style="width: 23rem"></Column>
      <Column field="user_nome" header="Nome" sortable style="width: 23rem"></Column>
      <Column field="data" header="Data da alteração" sortable style="width: 23rem"></Column>
      <Column field="alter" header="Alteração" sortable style="width: 23rem"></Column>
    </DataTable>
  </div>

  <div class="card" id="replace" v-if="replace_layout && replace_layout?.length > 0">
    <DataTable :value="formattedData" :tableStyle="widthTable">
      <Column v-for="(header, index) in headers" :key="index" :field="header.field" :header="header.header"
        :sortable="true" :style="header.style || 'width: 23rem'" />
    </DataTable>
  </div>

  <div class="card" id="orcamento_log" v-if="orcamentoLog && orcamentoLog?.length > 0">
    <DataTable :value="formattedDataLog" :tableStyle="widthTable">
      <Column v-for="(header, index) in headers" :key="index" :field="header.field" :header="header.header"
        :sortable="true" :style="header.style || 'width: 23rem'" />

      <Column field="orcamento_log" header="Log dos Arquivos" sortable style="width: 23rem">
        <template #body="slotProps">
          <ButtonPrime rounded label="Logs" icon="pi pi-external-link" @click="openModal(slotProps.data)" />
        </template>
      </Column>

      <!-- orcamento_log -->
    </DataTable>

    <Dialog v-model:visible="dialogVisible" modal header="Logs de Orçamento" :style="{ width: '35rem' }">
      <div v-if="orcamentoLogsLocal.length === 0">Carregando...</div>
      <div v-else>

        <div class="d-flex flex-column" v-for="(log, index) in orcamentoLogsLocal" :key="index">
          <h4>Orçamento Log #{{ log.id }}</h4>
          <div class="">
            <span style="font-size: 1.2rem; font-weight: 900;" class="font-weight-normal text-100"
              v-if="log.operation === 'save'">
              Orçamento criado por {{
                log.nome_user
              }}</span>
            <span style="font-size: 1.2rem; font-weight: 900;" class="font-weight-normal text-100"
              v-else-if="log.operation === 'update'">Orçamento atualizado por {{ log.changedUser
              }}</span>
          </div>

          <!-- Iteramos sobre as chaves e valores do objeto 'content.orcamento' -->
          <div class="" v-for="(value, key) in log.content.orcamento" :key="key">
            <strong v-if="value.toString() !== 'Sem modificações'.toString() && key !== 'produto_orcamento'">{{
              value }}</strong>
          </div>

          <!-- Verificando e exibindo 'produto_orcamento' -->
          <div class="mt-2" v-for="(produto, prodIndex) in log.content.orcamento.produto_orcamento" :key="prodIndex">
            <h4>Produto #{{ prodIndex + 1 }}</h4>
            <div v-for="(prodValue, prodKey) in produto" :key="prodKey">
              <strong>{{ prodValue }}:</strong>
            </div>
          </div>

          <hr />
        </div>

        <div class="flex justify-content-end">
          <ButtonPrime rounded type="button" label="Sair" severity="danger" @click="dialogVisible = false">
          </ButtonPrime>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { IError, IOrcamento_historico_status, IOrcamentoLog, IReplace_layout } from '@/model/Index'
import { DateAndHour } from '@/util/Data'
import { computed, ref, toRefs, watch, type PropType } from 'vue'
import Dialog from 'primevue/dialog'
import { useToast } from '@/composables/Toast'
import { getUsersById } from '@/api/actions/Users'

const prop = defineProps({
  headers: {
    type: Array as PropType<Array<{ field: string; header: string; style: string }>>,
    required: true,
    default: () => []
  },
  orcamentoHistorical: {
    type: Object as PropType<IOrcamento_historico_status[] | undefined>,
    required: false,
    default: Object
  },
  newOrcamentoHistorical: {
    type: Array as PropType<Array<{
      id: number
      descricao: string;
      users_data: string;
      users_dtalteracao: string;
      users: {
        user_nome: string;
      };
    }> | undefined>, required: false, default: () => []
  },
  orcamentoLog: {
    type: Array as PropType<IOrcamentoLog[] | undefined>,
    required: false,
    default: () => []
  },
  replace_layout: {
    type: Array as PropType<IReplace_layout[]>,
    required: false,
    default: () => []
  },

  widthTable: {
    type: String,
    required: false,
    default: 'min-width: 90rem'
  }
})

const { orcamentoHistorical, replace_layout, headers, orcamentoLog, newOrcamentoHistorical } = toRefs(prop)
const { notifyToast } = useToast()


const dialogVisible = ref(false)
const orcamentoLogsLocal = ref<IOrcamentoLog[]>([])

const historical = computed(() => typeHistorical())

const replacement = computed(() => {
  return replace_layout.value && replace_layout.value.length > 0
    ? replace_layout.value?.map((v) => {
      return {
        id: v.id,
        observacao: v.rpl_observacao,
        orc_id: v.orc_id,
        user_nome: v.users.user_nome,
        data: DateAndHour(new Date(v.created_at))
        //file: v.
      }
    })
    : []
})

// Formatar os dados para serem exibidos conforme os headers
const formattedData = computed(() =>
  replacement.value.map((item: any) =>
    headers.value.reduce((acc, header) => {
      acc[header.field] = item[header.field] ?? '' // Garantir que o campo exista
      return acc
    }, {} as any)
  )
)


const orcamento_logComputed = computed(() => {
  return orcamentoLog.value && orcamentoLog.value.length > 0
    ? orcamentoLog.value.map((v) => {
      return {
        ...v,
        data_log: DateAndHour(new Date(v.data_log))
      }
    })
    : []
})

// Formatar os dados para serem exibidos conforme os headers
const formattedDataLog = computed(() =>

  orcamento_logComputed.value?.map((item: any) =>
    headers.value.reduce((acc, header) => {
      acc[header.field] = item[header.field] ?? '' // Garantir que o campo exista
      return acc
    }, {} as any)
  )
)

const typeHistorical = () => {
  return orcamentoHistorical?.value && orcamentoHistorical.value?.length > 0
    ? orcamentoHistorical.value?.map((v) => ({
      id: v.ohs_id,
      user_nome: v?.users?.user_nome,
      data: DateAndHour(new Date(v.ohs_data)),
      alter: v.orcamento_status.ost_descricao
    })) :
    newOrcamentoHistorical?.value && newOrcamentoHistorical?.value?.length > 0 ?
      newOrcamentoHistorical?.value?.map((v) => ({
        id: v.id,
        user_nome: v?.users?.user_nome,
        data: DateAndHour(new Date(v.users_data)),
        alter: v.descricao
      })) : null
}

const openModal = (evt: {
  data_log: string
  id: number
  id_orc: number
  operation: string
}) => {
  if (orcamento_logComputed.value.length > 0) {
    const item = orcamento_logComputed.value.find((v) => v.id === evt.id) as IOrcamentoLog
    orcamentoLogsLocal.value = [item]
  }

  dialogVisible.value = true

}

watch(dialogVisible, async (newV, old) => {
  try {
    if (orcamento_logComputed.value && orcamento_logComputed.value.length > 0 && newV === true) {
      const resolvedPromises = await Promise.all(
        orcamento_logComputed.value.map(async (value) => {
          try {
            const data = await getUsersById(value.changedUser);
            return data.data.user_nome;
          } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return null; // Retorne null para usuários com erro
          }
        })
      );
      orcamentoLogsLocal.value = []

      orcamentoLogsLocal.value.push(...orcamento_logComputed.value.map((v, i) => ({
        ...v,
        nome_user: resolvedPromises[i],
      })));

    }

  } catch (err: unknown) {
    const error = err as IError

    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }

    if (error.response.status === 400) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 409) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
  }
})
</script>

<style scoped>
.p-button.p-button-rounded {
  border-radius: 2rem;
}
</style>
