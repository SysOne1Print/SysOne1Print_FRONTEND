/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Composable para validação de formulários usando vee-validate e zod
 * Fornece funções para validar campos de formulário de produtos
 */
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schema } from '@/util/ZodHandler'
import type { ICreateProdStep1 } from '@/model/Index'

/**
 * Tipo para valores simples de formulário
 */
type SimpleFormValues = Record<string, string | number>

/**
 * Hook para validação de formulários
 * @returns {Object} Objeto contendo funções para validação de formulários
 */
export const useVeelidate = () => {
  /**
   * Schema de validação convertido para formato compatível com vee-validate
   */
  const validationSchema = toTypedSchema(schema)

  /**
   * Configuração do formulário com o schema de validação
   */
  const { values, validate, setValues } = useForm<SimpleFormValues>({
    validationSchema
  })

  // Campos do formulário com seus respectivos valores
  const { value: pro_nome } = useField<string>('pro_nome')
  const { value: pro_venda } = useField<string>('pro_venda')
  const { value: pro_categoria_cor } = useField<string>('pro_categoria_cor')
  const { value: pro_categoria_item } = useField<string>('pro_categoria_item')
  const { value: pro_categoria_tamanho } = useField<string>('pro_categoria_tamanho')
  const { value: pro_categoria_tecido } = useField<string>('pro_categoria_tecido')
  const { value: pro_tinta_id } = useField<string>('pro_tinta_id')
  const { value: pro_outros_id } = useField<string>('pro_outros_id')
  const { value: pro_outros_select_id } = useField<string>('pro_outros_select_id')
  const { value: pro_tipo } = useField<string>('pro_tipo')
  const { value: pro_unidade } = useField<string>('pro_unidade')
  const { value: prod_cores } = useField<string>('prod_cores')
  const { value: prod_tamanho } = useField<string>('prod_tamanho')
  const { value: pro_marca } = useField<string>('pro_marca')
  const { value: pro_producao } = useField<string>('pro_producao')
  const { value: pro_data_validade } = useField<string>('pro_data_validade')
  const { value: pro_frete } = useField<string>('pro_frete')
  const { value: pro_peso_liq } = useField<string>('pro_peso_liq')
  const { value: pro_peso_bruto } = useField<string>('pro_peso_bruto')
  const { value: pro_largura } = useField<string>('pro_largura')
  const { value: pro_altura } = useField<string>('pro_altura')
  const { value: pro_umd_caixa } = useField<string>('pro_umd_caixa')
  const { value: pro_itens_caixa } = useField<string>('pro_itens_caixa')
  const { value: pro_volume } = useField<string>('pro_volume')
  const { value: pro_profundidade } = useField<string>('pro_profundidade')
  const { value: pro_gtin_ean } = useField<string>('pro_gtin_ean')
  const { value: pro_gtin_ean_tributario } = useField<number>('pro_gtin_ean_tributario')
  const { value: dirStage } = useField<number>('dirStage')
  const { value: galeria } = useField<string>('galeria')
  const { value: pro_minimo } = useField<string>('pro_minimo')
  const { value: pro_maximo } = useField<string>('pro_maximo')
  const { value: pro_deposito } = useField<string>('pro_deposito')
  const { value: pro_quantidade } = useField<string>('pro_quantidade')
  const { value: pro_preco_compra_unidade } = useField<string>('pro_preco_compra_unidade')
  // const { value: pro_custo_compra_unidade } = useField<string>('pro_custo_compra_unidade')
  const { value: pro_observacao } = useField<string>('pro_observacao')
  const { value: pro_fornecedor_id } = useField<string>('pro_fornecedor_id')
  const { value: pro_origem } = useField<string>('pro_origem')
  const { value: pro_fiscal_ncm } = useField<string>('pro_fiscal_ncm')
  const { value: pro_fiscal_cest } = useField<string>('pro_fiscal_cest')
  const { value: pro_fiscal_tipo } = useField<string>('pro_fiscal_tipo')
  const { value: pro_fiscal_tributo } = useField<string>('pro_fiscal_tributo')
  const { value: pro_grupo_produto } = useField<string>('pro_grupo_produto')
  const { value: pro_fiscal_base_icms } = useField<string>('pro_fiscal_base_icms')
  const { value: pro_fiscal_base_icmsSt } = useField<string>('pro_fiscal_base_icmsSt')
  const { value: pro_fiscal_icms_substituto } = useField<string>('pro_fiscal_icms_substituto')
  const { value: pro_fiscal_excecaoTipi } = useField<string>('pro_fiscal_excecaoTipi')

  /**
   * Executa a validação do formulário
   * @returns {Object} Objeto contendo erros, status de validação, resultados e valores
   */
  const validateHandler = async () => {
    const { errors, valid, results, values } = await validate()
    return { errors, valid, results, values }
  }

  /**
   * Processa os valores do formulário por etapas e configura para validação
   * @param {ICreateProdStep1 | any} values1 - Valores do formulário organizados por etapas
   * @param {number} user_id - ID do usuário que está cadastrando o produto
   * @returns {Promise} Promise com o resultado da validação
   */
  const valuesForm = async (values1: ICreateProdStep1 | any, user_id: number) => {
    const obj: any = {}
    let checkStep = ''
    Object.keys(values).forEach((v: string, index) => {
      obj[v] = ''

      // Processa valores da etapa 1
      Object.keys(values1.step1 as any).forEach((value, i) => {
        if (v === value) {
          obj[v] = Object.values(values1.step1)[i]
          checkStep = '1'
        }
      })
      
      // Processa valores da etapa 2
      Object.keys(values1.step2 as any).forEach((value, i) => {
        if (v === value) {
          obj[v] = Object.values(values1.step2)[i]
          checkStep = '2'
        }
      })
      
      // Processa valores da etapa 3 (galeria de imagens)
      Object.keys(values1.step3 as any).forEach((value, i) => {
        if (v === value) {
          obj[v] =
            values1.step3.galeria.length === 0 || values1.step3.alreadyExistImg.length === 0
              ? []
              : Object.values(values1.step3)[i]

          checkStep = '3'
        }
      })
      
      // Processa valores da etapa 4
      Object.keys(values1.step4 as any).forEach((value, i) => {
        if (v === value) {
          obj[v] = Object.values(values1.step4)[i]
          checkStep = '4'
        }
      })
      
      // Processa valores da etapa 5
      Object.keys(values1.step5 as any).forEach((value, i) => {
        if (v === value) {
          obj[v] = Object.values(values1.step5)[i]

          checkStep = '5'
        }
      })
    })
    
    // Adiciona o ID do usuário que está cadastrando
    obj.user_usucadastro = user_id
    setValues(obj)
    return await validateHandler()
  }

  return {
    valuesForm,
    validateHandler
  }
}
