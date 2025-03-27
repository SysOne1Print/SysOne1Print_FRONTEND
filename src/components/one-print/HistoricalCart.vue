<template>
    <div class="card" v-if="cartOneLog && cartOneLog !== null && cartOneLog.length > 0">
        <DataTable showGridlines :value="cartOneLog" :tableStyle="widthTable">
            <Column v-for="(header, index) in headers" :key="index" :field="header.field" :header="header.header"
                :style="header.style || 'width: 23rem'"></Column>


            <Column field="client_url" header="Link do Comprovante" style="width: 23rem">
                <template #body="{ data }">
                    <div class="flex justify-content-center align-items-center gap-2">
                        <a :href="data.client_url" target="_blank">
                            <img :alt="data.client" :src="data.client_url" style="width: 32px" />
                        </a>
                    </div>
                </template>
            </Column>

        </DataTable>

    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
interface cartOneLog {
    cart_valor: string | number;
    //fpg_descricao: string;
    pg_status: string;
    client: string;
    //client_url: string;
    created_at: string;
    update_at: string;
    user_id_validate: string;
    //description: string;
}

defineProps({
    headers: {
        type: Array as PropType<Array<{ field: string; header: string; style: string }>>,
        required: true,
        default: () => []
    },

    cartOneLog: {
        type: Object as PropType<cartOneLog[] | null>,
        required: true,
        default: () => { }
    },
    widthTable: {
        type: String,
        required: false,
        default: 'min-width: 90rem'
    }
})

</script>

<style scoped></style>