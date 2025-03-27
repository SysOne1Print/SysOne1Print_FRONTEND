import * as zod from 'zod'

export const schema = zod.object({
  pro_nome: zod.string().nonempty('* O Campo Nome do item, é necessário'),
  pro_observacao: zod.string(),
  pro_tipo: zod.number({
    required_error: '* É preciso selecionar o tipo do item',
    invalid_type_error: '* Preencha o Campo Tipo Produto'
  }),
  galeria: zod
    .array(zod.any(), {
      required_error: '* É Preciso ter 1 imagem',
      invalid_type_error: '* É Preciso ter 1 imagem'
    })
    .or(
      zod
        .string({
          required_error: '* É Preciso ter 1 imagem',
          invalid_type_error: '* É Preciso ter 1 imagem'
        })
        .nonempty('* É Preciso ter 1 imagem')
    ),

  user_usucadastro: zod
    .number({
      required_error: '* É preciso estar logado como usuário',
      invalid_type_error: '* É preciso estar logado como usuário'
    })
    .gt(0, '* Verifique se está logado!'),
  // user_usuultalteracao: zod.number(),
  pro_categoria_item: zod.number({
    required_error: '* É preciso selecionar a categoria do item',
    invalid_type_error: '* Preencha o Campo Categoria Item'
  }),
  // pro_crossdocking: zod.number(),
  dirStage: zod.string({
    required_error: '* É preciso selecionar departamento',
    invalid_type_error: '* Preencha o Campo Departamento'
  }),

  pro_deposito: zod.number({
    required_error: '* É preciso selecionar o campo deposito',
    invalid_type_error: '* Preencha o Campo Deposito'
  }),

  pro_fornecedor_id: zod.number({
    required_error: '* É preciso selecionar o campo fornecedor',
    invalid_type_error: '* É preciso selecionar o campo fornecedor'
  }),
  pro_frete: zod.boolean().optional(),

  pro_grupo_produto: zod
    .number({
      required_error: '* O Campo Grupo de Produtos, é necessário',
      invalid_type_error: '* O Campo Grupo de Produtos, é necessário'
    })
    .optional(),

  pro_gtin_ean: zod
    .number({
      required_error: '* O Campo GTIN/EAN é necessário',
      invalid_type_error: '* O Campo GTIN/EAN é necessário'
    })
    .or(zod.string())
    .optional()
    .nullable(),

  pro_marca: zod
    .string({
      required_error: '* O Campo MARCA é necessário',
      invalid_type_error: '* O Campo MARCA é necessário'
    })
    .or(zod.string())
    .optional(),

  pro_maximo: zod.number({
    required_error: '* O Campo MAXIMO é necessário',
    invalid_type_error: '* O Campo MAXIMO é necessário'
  }),
  pro_minimo: zod.number({
    required_error: '* O Campo MINIMO é necessário',
    invalid_type_error: '* O Campo MINIMO é necessário'
  }),
  pro_producao: zod.number({
    required_error: '* É preciso selecionar o campo PRODUÇÃO',
    invalid_type_error: '* É preciso selecionar o campo PRODUÇÃO'
  }),
  pro_quantidade: zod.number({
    required_error: '* O Campo QUANTIDADE é necessário',
    invalid_type_error: '* O Campo QUANTIDADE é necessário'
  }),
  pro_unidade: zod.number({
    required_error: '* É preciso selecionar o campo UNIDADE',
    invalid_type_error: '* É preciso selecionar o campo UNIDADE'
  }),
  pro_venda: zod
    .number({
      required_error: '* O Campo Preço VENDA é necessário',
      invalid_type_error: '* O Campo Preço VENDA é necessário'
    })
    .or(
      zod.string({
        required_error: '* O Campo Preço VENDA é necessário',
        invalid_type_error: '* O Campo Preço VENDA é necessário'
      })
    )
    .optional()
    .nullable(),

  pro_preco_compra_unidade: zod.number({
    required_error: '* O Campo PREÇO COMPRA UNIDADE é necessário',
    invalid_type_error: '* Preencha o Campo PREÇO COMPRA UNIDADE'
  }),
  pro_data_validade: zod
    .string({
      required_error: '* O Campo DATA DE VALIDADE é necessário',
      invalid_type_error: '* O Campo DATA DE VALIDADE é necessário'
    })
    .or(zod.string())
    .optional(),

  pro_gtin_ean_tributario: zod
    .number({
      required_error: '* O Campo GTIN/EAN TRIBUTÁRIO é necessário',
      invalid_type_error: '* O Campo GTIN/EAN TRIBUTÁRIO é necessário'
    })
    .or(zod.string())
    .optional()
    .nullable(),

  pro_altura: zod
    .number({
      required_error: '* O Campo Altura é necessário',
      invalid_type_error: '* O Campo Altura é necessário'
    })
    .or(zod.string())
    .optional()
    .nullable(),

  pro_itens_caixa: zod
    .number({
      required_error: '* O Campo ITENS P/ CAIXA é necessário',
      invalid_type_error: '* O Campo ITENS P/ CAIXA é necessário'
    })
    .or(zod.string())
    .optional()
    .nullable(),

  pro_largura: zod
    .number({
      required_error: '* O Campo LARGURA é necessário',
      invalid_type_error: '* O Campo LARGURA é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_peso_bruto: zod
    .number({
      required_error: '* O Campo PESO BRUTO é necessário',
      invalid_type_error: '* O Campo PESO BRUTO é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_peso_liq: zod
    .number({
      required_error: '* O Campo PESO LÍQUIDO é necessário',
      invalid_type_error: '* O Campo PESO LÍQUIDO é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_profundidade: zod
    .number({
      required_error: '* O Campo PROFUNDIDADE é necessário',
      invalid_type_error: '* O Campo PROFUNDIDADE é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_volume: zod
    .number({
      required_error: '* O Campo VOLUME é necessário',
      invalid_type_error: '* O Campo VOLUME é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_umd_caixa: zod
    .number({
      required_error: '* É preciso selecionar a UNIDADE DE MEDIDA para o caixa',
      invalid_type_error: '* É preciso selecionar a UNIDADE DE MEDIDA para o caixa'
    })
    .or(zod.string())
    .optional(),

  umd_prod_id: zod.number({
    required_error: '* É preciso selecionar a UNIDADE DE MEDIDA',
    invalid_type_error: '* É preciso selecionar a UNIDADE DE MEDIDA'
  }),

  pro_fiscal_base_icms: zod
    .number({
      required_error: '* O Campo VALOR BASE ICMS ST - RETENÇÃO é necessário',
      invalid_type_error: '* O Campo VALOR BASE ICMS ST - RETENÇÃO é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_base_icmsSt: zod
    .number({
      required_error: '* O Campo VALOR BASE ICMS ST - PARA RETENÇÃO é necessário',
      invalid_type_error: '* O Campo VALOR BASE ICMS ST - PARA RETENÇÃO é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_cest: zod
    .number({
      required_error: '* O Campo CEST é necessário',
      invalid_type_error: '* O Campo CEST é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_excecaoTipi: zod
    .number({
      required_error: '* O Campo CÓDIGO EXCEÇÃO DA TIPI é necessário',
      invalid_type_error: '* O Campo CÓDIGO EXCEÇÃO DA TIPI é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_icms_substituto: zod
    .number({
      required_error: '* O Campo VALOR ICMS PRÓPRIO DO SUBSTITUTO é necessário',
      invalid_type_error: '* O Campo VALOR ICMS PRÓPRIO DO SUBSTITUTO é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_ncm: zod
    .number({
      required_error: '* O Campo NCM é necessário',
      invalid_type_error: '* O Campo NCM é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_fiscal_tipo: zod.number({
    required_error: '* O Campo TIPO DO ITEM FISCAL é necessário',
    invalid_type_error: '* O Campo TIPO DO ITEM FISCAL é necessário'
  }),

  pro_fiscal_tributo: zod
    .number({
      required_error: '* O Campo TRIBUTOS Fiscal é necessário',
      invalid_type_error: '* O Campo TRIBUTOS Fiscal é necessário'
    })
    .or(zod.string())
    .nullable()
    .optional(),

  pro_categoria_cor: zod
    .number({
      required_error: '* O Campo COR DA CATEGORIA é necessário',
      invalid_type_error: '* O Campo COR DA CATEGORIA é necessário'
    })
    .or(
      zod.string({
        required_error: '* O Campo COR DA CATEGORIA é necessário',
        invalid_type_error: '* O Campo COR DA CATEGORIA é necessário'
      })
    )
    .nullable(),

  pro_categoria_tamanho: zod
    .number({
      required_error: '* O Campo TAMANHO DA CATEGORIA é necessário',
      invalid_type_error: '* O Campo TAMANHO DA CATEGORIA é necessário'
    })
    .or(
      zod.string({
        required_error: '* O Campo TAMANHO DA CATEGORIA é necessário',
        invalid_type_error: '* O Campo TAMANHO DA CATEGORIA é necessário'
      })
    )
    .nullable(),

  pro_categoria_tecido: zod
    .number({
      required_error: '* O Campo TECIDO DA CATEGORIA é necessário',
      invalid_type_error: '* O Campo TECIDO DA CATEGORIA é necessário'
    })
    .or(
      zod.string({
        required_error: '* O Campo TECIDO DA CATEGORIA é necessário',
        invalid_type_error: '* O Campo TECIDO DA CATEGORIA é necessário'
      })
    )
    .optional(),

  pro_outros: zod.any({
    required_error: '* O Campo OUTROS DA CATEGORIA é necessário',
    invalid_type_error: '* O Campo OUTROS DA CATEGORIA é necessário'
  }),
  pro_outros_id: zod
    .number({
      required_error: '* O Campo OUTROS DA CATEGORIA é necessário',
      invalid_type_error: '* O Campo OUTROS DA CATEGORIA é necessário'
    })
    .optional(),
  pro_outros_select_id: zod
    .number({
      required_error: '* O Campo OPÇÕES EXTRAS é necessário',
      invalid_type_error: '* O Campo OPÇÕES EXTRAS é necessário'
    })
    .or(zod.string({ required_error: '' }))
    .optional(),

  stock: zod.array(
    zod.object({
      id: zod.number({ required_error: '', invalid_type_error: '* O campo id e numerico' }),
      nome: zod.string({ required_error: '', invalid_type_error: '* O campo nome e string' }),
      value: zod
        .number({ required_error: '' })
        .or(zod.string({ required_error: '' }))
        .optional()
    }),
    {
      required_error: '* O Campo ESTOQUE é necessário',
      invalid_type_error: '* Preencha o Campo Estoque'
    }
  ),
  modelo_tintas: zod
    .array(
      zod.object(
        {
          id: zod.number({ required_error: '' }),
          nome: zod.string({ required_error: '' }),
          value: zod.number({ required_error: '' }).or(zod.string({ required_error: '' }))
        },
        {
          required_error: '* O Campo CORES é necessário',
          invalid_type_error: '* Dados do campo CORES é invalido!'
        }
      )
    )
    .or(zod.string())
    .optional(),

  prod_tamanho: zod.any({
    required_error: '* O Campo TAMANHO é necessário',
    invalid_type_error: '* O Campo TAMANHO é necessário'
  }),
  pro_origem: zod
    .any({
      required_error: '* O Campo ORIGEM é necessário',
      invalid_type_error: '* O Campo ORIGEM é necessário'
    })
    .or(zod.string())
    .optional(),

  prod_cores: zod.array(
    zod.object({
      id: zod.number({ required_error: '', invalid_type_error: '' }),
      nome: zod.string({ required_error: '', invalid_type_error: '' }),
      value: zod
        .number({ required_error: '', invalid_type_error: '' })
        .or(zod.string({ required_error: '', invalid_type_error: '' }))
    }),
    {
      required_error: '* O Campo CORES é necessário',
      invalid_type_error: '* Dados do campo CORES é invalido!'
    }
  )
})
