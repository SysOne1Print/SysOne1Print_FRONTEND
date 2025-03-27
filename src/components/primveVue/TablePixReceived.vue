<template>

    <Toolbar class="m-4">
        <template #end>
            <ButtonPrime rounded label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="receveidPix" showGridlines filterDisplay="menu" :loading="loading" paginator
        :rows="rows" :total-records="totalItens" lazy :first="first"
        :rowsPerPageOptions="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" scrollable scrollHeight="600px"
        tableStyle="min-width: 50rem" column-resize-mode="fit" @page="onPageChange"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #loading> Carregando Dados.... </template>

        <template #header>
            <div class="flex justify-content-between my-4">
                <!-- <ButtonPrime type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="() => { }" /> -->
                <IconField iconPosition="left">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters" @change="$emit('getPixReceivedByCpfAndCnpj', filters)" v-maska
                        data-maska="['###.###.###-##','##.###.###/####-##']"
                        placeholder="Insira o CPF ou CNPJ 000.000.000-00 | 00.000.000/0000-00" />
                </IconField>

                <div class="d-flex gap-2">
                    <FloatLabel>
                        <Calendar @input="onDateChange('inicio')" dateFormat="dd/mm/yy" v-model="dataInicio"
                            inputId="DataInicio" />
                        <label for="DataInicio">Data de Inicio</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Calendar @input="onDateChange('fim')" dateFormat="dd/mm/yy" v-model="dataFim"
                            inputId="DataFim" />
                        <label for="DataFim">Data de Fim</label>
                    </FloatLabel>

                    <div class="flex flex-wrap">
                        <ButtonPrime @click="getSearchByData" icon="pi pi-refresh" rounded raised />
                    </div>
                </div>
            </div>
        </template>

        <template #empty> Nenhum dado encontrado </template>

        <Column field="endToEndId" header="Identificador (Pix)" style="width: 15%"></Column>
        <Column field="horario" header="Data" style="width: 10%"></Column>
        <Column field="nomePagador" header="Nome Pagador" style="width: 20%"></Column>
        <Column field="pagador.cpf" header="CPF Pagador" style="width: 20%"></Column>
        <Column field="pagador.cnpj" header="CNPJ Pagador" style="width: 20%"></Column>
        <Column field="valor" header="Valor do Pix" style="width: 30%"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import type { IPixReceived } from '@/model/Index'
import { DateAndHour, DatePtBR, parseDateBRToISO } from '@/util/Data'
import { maskNumberCPF, maskNumbersCNPJ } from '@/util/Util'
import { computed, ref, toRefs, watch, type PropType } from 'vue'
import { vMaska } from 'maska'

const prop = defineProps({
    pixReceived: { type: Object as PropType<IPixReceived>, required: true },
    loading: { type: Boolean, required: true },
    dataInicioTable: { type: String, required: true, },
    dataFimTable: { type: String, required: true }
})

const emit = defineEmits(['onPageChange', 'getPixReceivedByCpfAndCnpj'])

const { pixReceived, dataInicioTable, dataFimTable } = toRefs(prop)

const first = ref(0); // Índice do primeiro item
const filters = ref('');
const rows = ref<number>(15)
const page = ref<number>(0)
const dataInicio = ref()
const dataFim = ref()

const dt = ref()
const receveidPix = computed(() => {
    return pixReceived.value &&
        pixReceived.value.pix !== undefined &&
        pixReceived.value.pix?.length > 0
        ? pixReceived.value?.pix.map((v) => ({
            ...v,
            pagador: {
                cpf: v.pagador.cpf ? maskNumberCPF(v.pagador.cpf) : ' - ',
                cnpj: v.pagador.cnpj ? maskNumbersCNPJ(v.pagador.cnpj) : ' - '
            },
            horario: DateAndHour(new Date(v.horario))
        }))
        : []
})


const totalItens = computed(() => pixReceived.value.parametros?.paginacao?.quantidadeTotalDeItens)

const getSearchByData = () => {
    try {
        if (!dataInicio.value || !dataFim.value) {
            console.error('As datas de início ou fim estão inválidas ou não foram definidas.');
            return;
        }

        const isDateBR = (date: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(date); // Formato dd/mm/yyyy
        const isDateISO = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date); // Formato yyyy-mm-dd

        const parseDate = (date: string) => isDateBR(date) ? parseDateBRToISO(date) : date;

        console.log(parseDate(dataInicio.value))
        const inicio = new Date(parseDate(dataInicio.value));
        const fim = new Date(parseDate(dataFim.value));

        //const dt = getFirstDayOfMonthISO(inicio.getFullYear(), inicio.getMonth())

        if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
            console.error('Datas inválidas. Não foi possível converter para ISO.');
            return;
        }

        emit('onPageChange', {
            page: 0,
            rows: 15,
            dataInicio: inicio.toISOString().split('T')[0],
            dataFim: fim.toISOString().split('T')[0]
        })
    } catch (error) {
        alert('Erro ao buscar pois a data está mal formatada')
    }

}

const onPageChange = (event: { page: number; rows: number, first: number }) => {
    page.value = event.page
    rows.value = event.rows
    first.value = event.first;
    emit('onPageChange', { page: page.value, rows: rows.value })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportCSV = (event: any) => {
    if (pixReceived.value?.parametros) {
        emit('onPageChange', {
            page: page.value, rows: pixReceived.value.parametros.paginacao.quantidadeTotalDeItens
        })
        setTimeout(() => {
            dt.value.exportCSV()
        }, 3000)

    }
};

const onDateChange = (type: string) => {
    if (type === 'inicio' && dataInicio.value) {
        const parsed = new Date(dataInicio.value);
        if (!isNaN(parsed.getTime())) {
            dataInicio.value = parsed.toLocaleDateString();
        }
    } else if (type === 'fim' && dataFim.value) {
        const parsed = new Date(dataFim.value);
        if (!isNaN(parsed.getTime())) {
            dataFim.value = parsed.toLocaleDateString()
        }
    }
};

watch(dataInicioTable, (newV, old) => {
    if (newV) {
        const parsedDate = new Date(newV);
        if (!isNaN(parsedDate.getTime())) {
            dataInicio.value = DatePtBR(parsedDate) // Apenas data
        } else {
            console.error('dataInicioTable contém valor inválido:', newV);
        }
    }
})

watch(dataFimTable, (newV, old) => {
    if (newV) {
        const parsedDate = new Date(newV);
        if (!isNaN(parsedDate.getTime())) {
            dataFim.value = DatePtBR(new Date(newV)); // Apenas data
        } else {
            console.error('dataFimTable contém valor inválido:', newV);
        }
    }
})

</script>

<style scoped>
.p-button {
    border-radius: 6px;
}

.p-component {
    font-size: small;
}
</style>
