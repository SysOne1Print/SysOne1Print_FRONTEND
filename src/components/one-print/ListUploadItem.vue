<template>
  <ul class="dz-preview dz-preview-multiple list-group list-group-flush mt-16pt">
    <li class="list-group-item" v-for="(value, index) in filesOrc" :key="index">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <div class="avatar">
            <img
              v-if="
                ['image/png', 'image/jpeg']
                  .toLocaleString()
                  .includes(value.type.toLocaleLowerCase())
              "
              :src="value.img"
              class="avatar-img rounded"
              :alt="value.nameImg"
            />
            <img
              v-else-if="value.type == 'application/pdf'"
              src="@/assets/img/pdf.png "
              class="avatar-img rounded"
              :alt="value.nameImg"
            />
            <img
              v-else
              src="@/assets/img/cdr.png"
              class="avatar-img rounded"
              :alt="value.nameImg"
            />
          </div>
        </div>
        <div class="col">
          <div class="font-weight-bold">
            {{ value.nameImg }}
          </div>
          <p class="small text-muted mb-0">
            {{ sizeCalculate(value.size) }}
          </p>
        </div>
        <div class="col-auto">
          <a
            href="#"
            @click.prevent="$emit('remove-img', value)"
            class="text-muted-light"
            data-dz-remove
          >
            <i class="material-icons">close</i>
          </a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IUploadImagem } from '@/model/Index'
import { sizeCalculate } from '@/util/SizeFile'
import { type PropType } from 'vue'

defineProps({
  filesOrc: { type: Array as PropType<IUploadImagem[]>, required: true }
})

defineEmits(['remove-img'])
</script>

<style scoped></style>
