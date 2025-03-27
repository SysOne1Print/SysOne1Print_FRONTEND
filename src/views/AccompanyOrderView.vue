<template>
  <div class="limitadorLargura">
    <div class="cardOne">
      <CardHeader :client="client"></CardHeader>

      <div class="cardBody">
        <div class="infoPedido">
          <span class="titulo mt-1 mb-05">Confira seu pedido</span>
          <span class="desc">{{ itens }}</span>
        </div>
        <div class="regraConteudo">
          <CardBody :orcamento_status="orc_status" :user="user"></CardBody>
        </div>
      </div>

      <footer class="cardFooter">
        <CardFooter :orcamento="orcamento" :client="client"></CardFooter>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardHeader from '@/components/client/accompany-order/Card-header.vue'
import CardBody from '@/components/client/accompany-order/Card-body.vue'
import CardFooter from '@/components/client/accompany-order/Card-footer.vue'
import { useHead } from '@unhead/vue'
import { computed, onMounted, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import { useRoute } from 'vue-router'
import { getPedidoOrc } from '@/api/actions/Orcamento'
import type { IError, IOrcamento, IOrcamentoItens, orcamentoStatus, orClient } from '@/model/Index'

document.querySelector('body')?.removeAttribute('class')
//useRoute
const route = useRoute()
//hooks toast
const { notifyToast } = useToast()
const orc_status = ref<orcamentoStatus>()
const id_orc = ref(Number(route.params.id))
const orcamento = ref<IOrcamento>()
const orca_itens = ref<IOrcamentoItens[]>()
const user = ref<string>('')
const client = ref<orClient>()
//titulo da pagina
useHead({
  title: 'ONE1PRINT - Acompanhamento',
  meta: [
    { property: 'og:title', content: 'ACOMPANHE SEU PEDIDO' },
    {
      property: 'og:image',
      content:
        'Construímos um espacinho virtual, para que você possa acompanhar seu pedido aqui dentro! Vem ver...'
    }
  ],
  link: [
    {
      href: '/css/meuPedido.css',
      type: 'text/css',
      rel: 'stylesheet'
    }
  ]
})

const itens = computed(() => {
  return orca_itens.value?.reduce((acc = '', prod) => {
    return acc !== '' ? acc + ' | ' + prod.produto.pro_nome : prod.produto.pro_nome
  }, '')
})

onMounted(async () => {
  try {
    const { data } = await getPedidoOrc(id_orc.value)
    const {
      forma_pagamento,
      orcamento_status,
      orca: { cliente, users, orcamento_itens, ...orcRest }
    } = data
    user.value = users?.user_nome as string
    orc_status.value = orcamento_status
    orca_itens.value = orcamento_itens
    client.value = cliente
    orcamento.value = orcRest
    forma_pagamento.value = forma_pagamento
    // numberPayment.value = forma_pagamento.value.fpg_id
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de busca do pedido', typeToast: 'error' })
      return
    }

    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 400) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    } else {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
    }
  }
})
</script>

<style></style>
