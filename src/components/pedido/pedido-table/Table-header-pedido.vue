<template>
    <div class="card-header">
        <span class="w-100 d-flex flex-row justify-content-end text-50">Listar Pedidos por STATUS</span>
        <div class="w-100 d-flex flex-row justify-content-between align-items-center">
            <div class="search-form flex-grow">
                <input v-model.lazy="searchItem" @change="searchStatus" type="text" class="form-control search"
                    placeholder="Buscar por ..." />
                <button class="btn" type="button">
                    <i class="material-icons">search</i>
                </button>
            </div>
            <div class="form-group ml-4 mb-0">
                <select v-model.number="orcStatus" id="itemCondicao" @change="searchStatus" name="itemCondicao"
                    class="form-control SelectCondicao">
                    <option :value="0" selected>Exibir todos os pedidos.</option>
                    <option :value="value.ost_id" v-for="(value, index) in orcamentoStatus" :key="index">
                        {{ value.ost_descricao }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IOrcamentoStatus } from '@/model/Index';
import { ref, type PropType } from 'vue';

defineProps({
    orcamentoStatus: { type: Object as PropType<IOrcamentoStatus[]>, required: true }
})

const emit = defineEmits(['search-status'])

const orcStatus = ref<string | number>(0);
const searchItem = ref<string>('')


const searchStatus = () => {
    emit('search-status', orcStatus.value, searchItem.value, 0)
}
</script>

<style scoped></style>
