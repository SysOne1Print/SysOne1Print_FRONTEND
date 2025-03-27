/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { stringify, parse } from 'zipson'
import type {
  IOrcamentoItensPedidoStatus,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoPedidoStatus,
  IOrcamentoProduction,
  IOrcamentoStage,
  IOrcamentoVariedStage2
} from '@/model/Index'
import { DateAndHour, DatePtBR, DateTimePtBR } from '@/util/Data'

/**
 * Store para gerenciar estágios de produção de orçamentos
 * Fornece funções e estados para controlar o fluxo de produção e visualização de orçamentos
 */
export const useProductionStageStore = defineStore(
  'productionStage',
  () => {
    /**
     * Tipo de estágio atual da produção
     */
    const stageType = ref(0)
    
    /**
     * Lista de orçamentos com status de pedido
     */
    const orcamento = ref<IOrcamentoItensTablePedidoStatus[]>([])
    
    /**
     * Lista de orçamentos em modo variado com estágio 2
     */
    const orcamentoModoVariado = ref<IOrcamentoVariedStage2[]>([])
    
    /**
     * Nova lista de orçamentos com estágios
     */
    const newOrcamento = ref<IOrcamentoStage[]>([])

    /**
     * Computed que formata os dados de orçamento para exibição na interface
     * Adiciona informações de impressora, status, arquivos e outras propriedades necessárias
     */
    const computedArray = computed(() =>
      orcamento.value && orcamento.value.length > 0
        ? orcamento.value.map((v) => {
            return {
              printerId: v.impressora_log[0]?.impressora.id_impr,
              impr_log_id:
                v.impressora_log && v.impressora_log.length > 0 ? v.impressora_log[0]?.id : 0,
              priority: v.impressora_log.length > 0 ? v.impressora_log[0]?.priority : 0,
              statusId:
                v.impressora_log !== undefined && v.impressora_log.length > 0
                  ? v.impressora_log.reduce((acc = 0, curr, index) => curr.action_status, 0)
                  : null,
              categoria_item: v.one1_outros?.one1_nome,
              statusQueue:
                v.impressora_log !== undefined && v.impressora_log.length > 0
                  ? v.impressora_log.reduce((acc = '', curr, index) => curr.impr_status, '')
                  : '',
              orcamento_status: v.orcamento.orcamento_status,
              printer:
                v.orcamento !== undefined && v.impressora_log.length > 0
                  ? v.impressora_log.reduce(
                      (acc = '', curr, index) =>
                        `${curr.impressora.nome_impr} | ${curr.impressora.marca_impr} - ${curr.impressora.modelo_impr}`,
                      ''
                    )
                  : 'A Configurar',
              timeFinished:
                v.impressora_log !== undefined && v.impressora_log.length > 0
                  ? v.impressora_log.reduce(
                      (acc = '', curr, index) => DateTimePtBR(new Date(curr.impr_conclusao)),
                      ''
                    )
                  : '',
              file_location:
                v.arquivos.length > 0
                  ? v.arquivos[0].url.split(v.arquivos[0].nome_arq)[0].replace('public', 'upload')
                  : '',
              orc_id: v.orc_id,
              oit_id: v.oit_id,
              cliente: v.orcamento?.cliente,
              jobs: `${v.produto.pro_nome} - ${v.one1_outros === null ? '' : v.one1_outros.one1_nome}`,
              description: v.produto.pro_nome,
              oit_observacao: v.oit_observacao,
              arqTotal: v.arquivos?.length, // Total de arquivos no orçamento
              producao_expedicao:
                v.orcamento.producao_expedicao?.length === 0 ? [] : v.orcamento.producao_expedicao,
              arquivos: v.arquivos?.reduce((acc, curr, index) => {
                return `${acc + curr.nome_arq}${v.arquivos.length - 1 === index ? '' : ' | '}`
              }, ''),
              orc_data_aprovacao: DateAndHour(new Date(v.orcamento.orc_data_aprovacao)),
              meters_info: {
                description: `${v.oit_qtde}x ${v.produto.unidade_medida.umd_descricao}`
              },
              users: {
                user_id: v?.orcamento?.users.user_id,
                user_nome: v?.orcamento?.users.user_nome
              },
              orcamento_historico_status: v.orcamento_historico_status,
              logistica: v.orcamento.logistica,
              status: `${v.orcamento.orcamento_status?.ost_descricao}/${v.orcamento_itens_status?.oit_descricao}`,
              orcamento_itens_status: v.orcamento_itens_status
            }
          })
        : []
    ) as ComputedRef<IOrcamentoProduction[] | []>

    /**
     * Computed que formata os dados de orçamento em modo variado para exibição na interface
     * Similar ao computedArray, mas adaptado para o formato de orçamentos variados
     */
    const computedArrayVariado = computed(() => {
      return orcamentoModoVariado.value.map((val) => ({
        ...val,
        orcamento: val.orcamento.map((v) => ({
          oit_id: v.oit_id,
          priority: v.impressora_log?.length > 0 ? v.impressora_log[0]?.priority : '',
          orc_id: v.orc_id,
          cliente: v.orcamento?.cliente,
          users: v.orcamento?.users,
          oit_observacao: v.oit_observacao,
          logistica:
            v.orcamento.logistica === null || v.orcamento.logistica === undefined
              ? 0
              : v.orcamento.logistica,
          orc_data_validade: DatePtBR(new Date(v.orcamento.orc_data_validade)),
          orc_data_aprovacao: DatePtBR(new Date(v.orcamento.orc_data_aprovacao)),
          orc_data_entrega: DatePtBR(new Date(v.orcamento.orc_data_entrega)),
          description: v.produto.pro_nome,
          // itens_qnt:
          //   v.orcamento_itens !== undefined && v.orcamento_itens.length > 0
          //     ? v.orcamento_itens?.reduce((acc = 0, curr) => curr.oit_qtde, 0)
          //     : 0,
          producao_expedicao:
            v.orcamento.producao_expedicao?.length === 0 ? [] : v.orcamento.producao_expedicao,
          orcamento_historico_status: v.orcamento_historico_status,
          meters_info: {
            description: `${v.oit_qtde}x ${v.produto.unidade_medida.umd_descricao}`
          },
          orcamento_status: v.orcamento.orcamento_status,
          arquivos: v.arquivos,
          impressora_log: v.impressora_log,
          file_location:
            v.arquivos.length > 0
              ? v.arquivos[0].url.split(v.arquivos[0].nome_arq)[0].replace('public', 'upload')
              : '',
          printer:
            v.orcamento !== undefined && v.impressora_log.length > 0
              ? v.impressora_log.reduce(
                  (acc = '', curr, index) =>
                    `${curr.impressora.nome_impr} | ${curr.impressora.marca_impr} - ${curr.impressora.modelo_impr}`,
                  ''
                )
              : 'A Configurar',
          // impressora:
          //   v.impressora_log !== undefined && v.impressora_log.length > 0
          //     ? v.impressora_log.reduce(
          //         (acc = '', curr, index) =>
          //           `${curr.impressora.nome_impr} ${curr.impressora.id_impr}`,
          //         ''
          //       )
          //     : '',
          statusQueue:
            v.impressora_log !== undefined && v.impressora_log.length > 0
              ? v.impressora_log.reduce((acc = '', curr, index) => curr.impr_status, '')
              : '',
          timeFinished:
            v.impressora_log !== undefined && v.impressora_log.length > 0
              ? v.impressora_log.reduce(
                  (acc = '', curr, index) => DateTimePtBR(new Date(curr.impr_conclusao)),
                  ''
                )
              : '',
          orcCheckParcial: v.orcamento.orc_check_parcial,
          statusId:
            v.impressora_log !== undefined && v.impressora_log.length > 0
              ? v.impressora_log.reduce((acc = 0, curr, index) => curr.action_status, 0)
              : 0
        }))
      }))
    })

    return {
      stageType,
      orcamento,
      newOrcamento,
      computedArray,
      computedArrayVariado,
      orcamentoModoVariado
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['productionStage', 'orcamento', 'stageType', 'orcamentoNewArrayFn'],
      key: 'productionStage',
      serializer: {
        deserialize: parse,
        serialize: stringify
      }
    }
  }
)
