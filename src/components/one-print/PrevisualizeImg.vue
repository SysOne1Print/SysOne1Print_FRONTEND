<template>
  <div class="right w-40">
    <div class="selecioneUmAnexoPrimeiro" v-if="urlImg === ''">
      <i class="fas fa-file-image"></i>
    </div>

    <div ref="contentLupa" @mousemove="handleMouseMove" @click="openImage" class="contentLupa" v-if="urlImg !== ''">
      <img ref="image" :src="urlImg" alt="Imagem 01 da lista de imagens do item." id="imgPrevSelecionada"
        class="abrirNovaGuiaIMG" />
      <div v-if="urlImg || showLupa" ref="lupaDiv" class="lupa" :style="`
          display: block;
          left: 318.5px;
          top: 120.578px;
          background-repeat: no-repeat;
          background-position: -318.5px -120.578px;
          background-size: 379px 390px;
          background-image: url('${urlImg}');`"></div>
    </div>

    <div class="infosAnexoSelecionado" v-if="urlImg">
      <h5>
        Tipo: <span class="dataTipo">{{ orc.tipo }}</span>
      </h5>
      <h5>
        Vínculo: <span class="dataVinculado">{{ orc?.nome_prod }} {{ orc?.orc_id }}</span>
      </h5>
      <h5>
        Origem: <span class="dataOrigem">Produção {{ orc?.data_prod }}</span>
      </h5>
      <h5>
        Responsável pela importação:
        <span class="responsavelImportacao">{{ orc?.responsavel }}</span>
      </h5>
    </div>

    <!-- <div class="btArea mt-3" v-if="urlImg">
      <button class="btn btn-primary w-50">ACERERRE</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, type PropType } from 'vue'

const prop = defineProps({
  urlImg: {
    type: String,
    required: true,
    default: ''
  },
  orc: {
    type: Object as PropType<{
      orc_id: number
      nome_prod: string
      data_prod: string
      responsavel: string
      tipo: string
    }>,
    default: Object
  }
})

const { urlImg } = toRefs(prop)

const contentLupa = ref<HTMLDivElement | null>(null)
const lupaDiv = ref<HTMLDivElement | null>(null)
const image = ref<HTMLImageElement | null>(null)
const showLupa = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!contentLupa.value || !lupaDiv.value || !image.value) return

  const rect = contentLupa.value.getBoundingClientRect()
  const posX = e.clientX - rect.left
  const posY = e.clientY - rect.top
  const tamanhoLupa = lupaDiv.value.offsetWidth / 2

  if (posX >= 0 && posX <= rect.width && posY >= 0 && posY <= rect.height) {
    showLupa.value = true
    lupaDiv.value.style.display = 'block'
    lupaDiv.value.style.left = `${posX - tamanhoLupa}px`
    lupaDiv.value.style.top = `${posY - tamanhoLupa}px`

    const zoom = 1
    lupaDiv.value.style.backgroundImage = `url('${image.value.src}')`
    lupaDiv.value.style.backgroundRepeat = 'no-repeat'

    const bgX = posX * zoom - tamanhoLupa
    const bgY = posY * zoom - tamanhoLupa

    lupaDiv.value.style.backgroundPosition = `-${bgX}px -${bgY}px`
    lupaDiv.value.style.backgroundSize = `${image.value.width * zoom}px ${image.value.height * zoom}px`
  } else {
    showLupa.value = false
    lupaDiv.value.style.display = 'none'
    lupaDiv.value.style.backgroundImage = ''
  }
}

function openImage() {
  const src = urlImg.value
  window.open(src, '_blank')
}

onMounted(() => {
  if (contentLupa.value && image.value && lupaDiv.value) {
    contentLupa.value.addEventListener('mousemove', handleMouseMove)
    contentLupa.value.addEventListener('click', openImage)
  }
})
</script>

<style scoped>
.w-40 {
  width: 40%;
}
</style>
