<template>
  <!-- Quadro CLIENTE/VENDEDOR-->
  <div class="col-lg-3">
    <!--  col-sm-12 col-md-12 card mb0p12 -->
    <div class="card card-group-row__card mb0p12 h-100">
      <div class="d-flex align-items-center">
        <div class="media-left mr-12pt">
          <a href="" class="avatar avatar-sm">
            <!-- <img src="../../LB" alt="avatar" class="avatar-img rounded-circle"> -->
            <span class="avatar-title rounded-circle">
              <img
                :src="getClient?.cli_imagem"
                loading="lazy"
                alt="avatar"
                class="avatar-img rounded-circle"
              />
            </span>
          </a>
        </div>
        <div class="d-flex flex-column">
          <a href="" class="card-title">{{ getClient?.cli_nome }}</a>
          <small class="text-muted">{{ getClient?.cli_nome_fantasia }}</small>
        </div>
      </div>
      <hr />
      <div>
        <p class="text-70 text-monospace h6 mb-0">Saldo na Carteira ONE1:</p>
        <p class="text-positive text-monospace h5">
          <span style="" v-if="(getClient?.carteira_one1_cliente?.cart_valor as number) > 0">
            {{ real.format(getClient?.carteira_one1_cliente?.cart_valor as number) }}
          </span>
          <span v-else style="color: grey">Sem Saldo</span>
        </p>
      </div>
      <div>
        <p class="text-70 text-monospace h6 mb-0">WhatsApp:</p>
        <p class="text-100 text-monospace h5">
          {{ getClient?.cli_whatsapp }}
        </p>
      </div>
      <div>
        <p class="text-70 text-monospace h6 mb-0">E-mail:</p>
        <p class="text-100 text-monospace h5">
          {{ getClient?.cli_email }}
        </p>
      </div>
      <hr />
      <div>
        <p class="text-70 text-monospace h6 mb-0">Vendedor:</p>
        <p class="text-100 text-monospace h5">
          {{ userData.user_nome }}
        </p>
      </div>
      <div>
        <p class="text-70 text-monospace h6 mb-0">Data de Emissão</p>
        <p class="text-100 text-monospace h5">
          {{ dataPedido }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '@/stores/ClientStore'
import { useLoginStore } from '@/stores/LoginStore'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

//router
const route = useRoute()

//variable
const dataPedido = ref(new Date().toLocaleDateString('pt-br'))
const paramsRouter = ref(route.params.id || route.params.id_cli)

//hooks
const { getClientById } = useClientStore()
const { userData } = useLoginStore()

//computed
const getClient = computed(() => getClientById(Number(paramsRouter.value)))
//variable
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
</script>

<style scoped></style>
