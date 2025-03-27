<template>
  <div id="etapaPorEtapaForm">
    <div class="card rounded">
      <form action="post">
        <StepProd01
          :description="
            router.currentRoute.value.name === 'Alterar Produtos'
              ? 'ao confirmar o item será alterado'
              : ''
          "
          :tipo="getTipoItem"
          :unidade="getUnidadeMedida"
          :categoria="getCatAll"
          @fnDetailsProd="detailsProdFn"
        />
        <StepProd02 :unidade="getUnidadeMedida" :producao="getProducao" />
        <StepProd03 />
        <StepProd04 />
        <StepProd05 />
        <StepProd06
          @alterProduto="alterProduct"
          @createProduto="createProduct"
          :detailsProd="detailsProd"
        >
        </StepProd06>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { btns } from '@/util/Document'
import StepProd01 from '@/components/form/steps/StepProd01.vue'
import StepProd02 from '@/components/form/steps/StepProd02.vue'
import StepProd03 from '@/components/form/steps/StepProd03.vue'
import StepProd04 from '@/components/form/steps/StepProd04.vue'
import StepProd05 from '@/components/form/steps/StepProd05.vue'
import StepProd06 from '@/components/form/steps/StepProd06.vue'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { useToast } from '@/composables/Toast'
import { onMounted, ref } from 'vue'
import { uploadImageProduct } from '@/api/actions/Upload'
import type {
  IAll_one1_produto_estoque,
  ICreateProdStep1,
  IOne1_produto_estoque,
  details
} from '@/model/Index'
import { createProduction, updateProduction } from '@/api/actions/Produtos'
import { useLoginStore } from '@/stores/LoginStore'
import { useRouter, useRoute } from 'vue-router'
import { useVeelidate } from '@/composables/VeelidadeField'
import { useSwal } from '@/composables/Swal'
import { useProductFormStore } from '@/stores/ProductFormStore'

//store
//numberOfSteps.value = 6
//currentStep.value = 1
const { prod, currentStep } = storeToRefs(useStepStore())
const { goToStep } = useStepStore()
const { notifyToast } = useToast()
const { swal } = useSwal()
const route = useRoute()
const { user } = useLoginStore()
const useProductForm = useProductFormStore()
const { productForChange, getCatAll, getProducao, getTipoItem, getUnidadeMedida, prodForChange } =
  storeToRefs(useProductFormStore())
const router = useRouter()
const { valuesForm } = useVeelidate()

const createProd = ref<ICreateProdStep1>(prod.value as ICreateProdStep1)

const detailsProd = ref<details>({
  cor: { id: 0, one1_cor_nome: '' },
  tamanho: { id: 0, one1_tamanho_nome: '', nome: '' },
  tecido: { id: 0, one1_tecido_nome: '' },
  outro: '',
  select_outro: '',
  categoria: {
    id: 0,
    prod_tipo_descricao: ''
  },
  tipo: { id: 0, descricao: '' }
})

const detailsProdFn = (obj: details) => {
  detailsProd.value = { ...obj }
}

const createProduct = async (step6: { disponivel: number }) => {
  // descomentar para validação
  const { valid, errors, results } = await valuesForm(createProd.value, user.user_id)
  const errorMsg: string = Object.values(errors).reduce((acc = '', errors) => {
    let str: string = ''
    if (errors === ' ' || errors === '') {
      str = ''
    } else {
      str = '<br>'
    }
    return acc + '' + errors + str
    //return acc + "" + errors
  }, '') as string

  //Fazer a verificação se os campos foram validos e mostrar em uma notificação
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultsNew = results as any
  try {
    if (!valid) {
      swal({
        title: 'Atenção Preencha os campos citados',
        html: errorMsg.trim(),
        text: errorMsg.trim(),
        icon: 'info'
      })

      leaveStep(resultsNew, createProd.value)
      return
    }

    let uploadData: { status: number; data: { galeria: unknown } } | undefined
    const form = new FormData()
    const galeria = createProd.value?.step3?.galeria as Array<object>
    galeria?.forEach((v) => {
      form.append('galeria', v as string | Blob)
    })
    if (galeria.length > 0) {
      uploadData = await uploadImageProduct(form)
    }
    if (uploadData?.status === 200) {
      const { galeria } = uploadData.data
      if (createProd.value?.step1?.pro_categoria_item === detailsProd.value.categoria.id) {
        const newStock = createProd.value.step1?.stock.map((v) => ({
          id: v.id,
          nome: v.one1_tamanho_nome ?? v.nome,
          value: v.value
        }))
        createProd.value.step1.stock = newStock
      }
      let step1 = { ...createProd.value?.step1 }

      const production = await createProduction({
        ...step1,
        ...createProd.value?.step2,
        ...createProd.value?.step3,
        ...createProd.value?.step4,
        ...createProd.value?.step5,
        ...step6,
        user_usucadastro: user.user_id,
        pro_galeria_id: galeria
      })

      if (production.status === 200) {
        notifyToast({ msg: production.data.msg, typeToast: 'success' })
        setTimeout(() => {
          router.go(0)
        }, 1000)
      }
    }
  } catch (error: unknown) {
    console.log(error)
    const er = error as { response: { status: number; data: { error: string; msg: string } } }
    if (er.response === undefined) {
      notifyToast({ msg: 'Erro ao cadastrar produto', typeToast: 'error' })
    } else if (er.response.status === 409) {
      const errorHandler: string = er.response.data.error
      notifyToast({
        msg: errorHandler.trim(),
        typeToast: 'error'
      })
    } else {
      if (er.response.status === 413) {
        //tamanho de imagem permitido 400MB
        notifyToast({ msg: 'Erro, as imagens são grandes para o upload', typeToast: 'error' })
        return
      }
      notifyToast({ msg: er.response.data.msg, typeToast: 'error' })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const leaveStep = (resultsNew: any, createProd: ICreateProdStep1) => {
  Object.keys(resultsNew).forEach((v) => {
    if (createProd.step1 !== undefined && resultsNew[v].valid === false) {
      currentStep.value = 1
      goToStep()
    } else if (createProd.step2 !== undefined && resultsNew[v].valid === false) {
      currentStep.value = 2
      goToStep()
    } else if (createProd.step3 !== undefined && resultsNew[v].valid === false) {
      currentStep.value = 3
      goToStep()
    } else if (createProd.step4 !== undefined && resultsNew[v].valid === false) {
      currentStep.value = 4
      goToStep()
    } else {
      currentStep.value = 5
      goToStep()
    }
  })
}

const alterProduct = async (step6: { disponivel: number }) => {
  const { valid, errors, results } = await valuesForm(createProd.value, user.user_id)
  const errorMsg: string = Object.values(errors).reduce((acc = '', errors) => {
    let str: string = ''
    if (errors === ' ' || errors === '') {
      str = ''
    } else {
      str = '<br>'
    }
    return acc + '' + errors + str
    //return acc + "" + errors
  }, '') as string
  //Fazer a verificação se os campos foram validos e mostrar em uma notificação
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultsNew = results as any

  try {
    if (!valid) {
      swal({
        title: 'Atenção Preencha os campos citados',
        html: errorMsg.trim(),
        text: errorMsg.trim(),
        icon: 'info'
      })
      leaveStep(resultsNew, createProd.value)
      return
    }

    //let uploadData: unknown = null
    const form = new FormData()
    const galeria: Array<object> = createProd.value?.step3?.galeria as Array<object>
    const alreadyExistImg = createProd.value?.step3?.alreadyExistImg as []
    if (
      createProd.value?.step3?.galeria !== undefined &&
      createProd.value?.step3?.galeria?.length > 0
    ) {
      galeria?.forEach((v) => {
        form.append('galeria', v as string | Blob)
      })
    }

    const id = prodForChange.value?.pro_galeria_id as number
    form.append('id', id.toString())

    form.append('alreadyExistImg', JSON.stringify(alreadyExistImg))

    if (galeria.length > 0 || alreadyExistImg.length > 0) {
      await uploadImageProduct(form)
    }

    if (detailsProd.value.categoria === undefined) {
      alert(
        'Atualize a pagina ou volte para Lista de estoque/produtos, e selecione o produto denovo!'
      )
      return
    }

    const categoria_item_id = productForChange.value?.pro_categoria_item as number
    if (createProd.value?.step1?.pro_categoria_item === detailsProd.value.categoria.id) {
      const newArrayStock = productForChange.value?.one1_produto_estoque.map((v) => {
        const { item } = categoriaItem(v as IAll_one1_produto_estoque, categoria_item_id)
        return {
          id: item?.id,
          nome: item?.nome,
          value: createProd.value?.step1?.stock.find((y) => y.id === item?.id).value,
          id_est_delete: !createProd.value.step1?.stock.some(
            (existingItem) => existingItem?.id === v.one1_tamanho?.id
          ),
          id_est: v?.id
        }
      }) as Array<{
        id: number
        nome: string
        value: number
        id_est_delete: boolean | undefined
        id_est: number
      }>

      createProd.value.step1.stock?.map((v, i) => {
        return {
          id: newArrayStock[i]?.id,
          nome: newArrayStock[i]?.nome,
          value: newArrayStock[i].value,
          id_est_delete: newArrayStock[i].id_est_delete,
          id_est: newArrayStock[i].id_est
        }
      })
    }
    let step1 = { ...createProd.value?.step1 }

    const production = await updateProduction(
      {
        ...step1,
        ...createProd.value?.step2,
        ...createProd.value?.step3,
        ...createProd.value?.step4,
        ...createProd.value?.step5,
        ...step6,
        user_usucadastro: user.user_id,
        pro_galeria_id: useProductForm.productForChange?.produto_galeria.id as number
      },
      Number(route.params.id.toString())
    )

    if (production.status === 200) {
      notifyToast({ msg: production.data.msg, typeToast: 'success' })
      setTimeout(() => {
        router.push({ name: 'Estoque de Produtos' })
      }, 1000)
    }
  } catch (error: unknown) {
    console.log(error)
    const er = error as { response: { status: number; data: { error: string; msg: string } } }

    if (er.response === undefined) {
      notifyToast({ msg: 'Erro ao cadastrar produto', typeToast: 'error' })
    } else if (er.response.status === 409) {
      const errorHandler: string = er.response.data.error
      notifyToast({
        msg: errorHandler.trim(),
        typeToast: 'error'
      })
    } else {
      if (er.response.status === 413) {
        //tamanho de imagem permitido 400MB
        notifyToast({ msg: 'Erro, as imagens são grandes para o upload', typeToast: 'error' })
        return
      }
      if (er.response.status === 500) {
        notifyToast({ msg: 'Erro ao atualizar o produto', typeToast: 'error' })
      }
      notifyToast({ msg: er.response.data.msg, typeToast: 'error' })
    }
  }
}

const categoriaItem = (product: IAll_one1_produto_estoque, pro_categoria_item: number) => {
  let item, item_preco

  try {
    switch (pro_categoria_item) {
      case 1:
      case 2:
      case 3:
      case 10:
        console.log('product> ', product)
        item = { id: product.one1_outros?.id, nome: product.one1_outros?.one1_nome }
        item_preco = { price: product.produto_preco_unidade[0]?.ppu_preco_venda }
        console.log('10')

        break
      case 4:
        break
      case 5:
        item = { id: product.one1_outros?.id, nome: product.one1_outros?.one1_nome }
        item_preco = { price: product.produto_preco_unidade[0]?.ppu_preco_venda }
        console.log('5')

        break
      case 6:
        item = { id: product.one1_cor.id, nome: product.one1_cor.one1_cor_nome }
        item_preco = { price: product.produto_preco_unidade[0]?.ppu_preco_venda }
        console.log('6')

        break

      case 7:
        console.log('7')

        break
      case 8:
        item = {
          id: product.one1_modelo_tintas.modelo_id,
          nome: product.one1_modelo_tintas.modelo_nome
        }
        item_preco = { price: product.produto_preco_unidade[0]?.ppu_preco_venda }

        console.log('8')
        break

      default:
        break
    }
  } catch (error) {
    console.log(error)
  }

  return { item, item_preco }
}

onMounted(async () => {
  btns()
  try {
    //const id = Number(route.params.id)
    await useProductForm.getInfoCreateProd()
  } catch (error: unknown) {
    console.log(error)
    const er = error as { response: { status: number; data: { error: string; msg: string } } }

    if (er.response !== undefined) {
      if (er.response.status === 404) {
        notifyToast({ msg: er.response.data.msg, typeToast: 'error' })
      }

      if (er.response.status === 409) {
        notifyToast({ msg: er.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar produto', typeToast: 'error' })
    }
  }
})
</script>

<style scoped></style>
