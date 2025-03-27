<template>
    <div class="mdk-drawer-layout__content page-content" style="transform: translate3d(0px, 0px, 0px)">
        <header-layout></header-layout>

        <div class="pt-32pt">
            <div
                class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
                <SubTitlePage :title-icon="['Dashboard']" :title-page="'Quadro Administrativo do Financeiro'">
                </SubTitlePage>

                <div class="row" role="tablist">
                    <div class="col-auto">
                        <a class="btn btn-outline-secondary">Contabilidade</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-xl page__container">
            <div class="page-section">
                <div class="row mb-32pt">
                    <div class="col-lg-12 d-flex align-items-center">
                        <div class="flex justify-content-center" style="max-width: 100%">
                            <div class="card m-0 w-100">
                                <div class="table-responsive border-pix" data-toggle="lists">

                                    <TablePixReceived :data-fim-table="dtFim" :data-inicio-table="dtInicio"
                                        @onPageChange="getPixReceived"
                                        @getPixReceivedByCpfAndCnpj="getPixReceivedByCpfAndCnpj" :loading="loading"
                                        :pix-received="pix">
                                    </TablePixReceived>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer-layout></footer-layout>
    </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import { computed, onMounted, ref } from 'vue'
import type { IError, IPixReceived } from '@/model/Index'
import { useToast } from '@/composables/Toast'
import { pixReceived } from '@/api/actions/Payment'
import TablePixReceived from '@/components/primveVue/TablePixReceived.vue'
import { getFirstDayOfMonthISO } from '@/util/Data'

const { notifyToast } = useToast()
const pixReceive = ref<IPixReceived>()

const pix = computed(() =>
    pixReceive.value && pixReceive.value.pix.length > 0 ? pixReceive.value : []
) as unknown as IPixReceived

const loading = ref(true)
const dtInicio = ref('')
const dtFim = ref('')

const getPixReceived = async ({
    page,
    rows,
    dataInicio,
    dataFim,
    cpf,
    cnpj
}: {
    page: number
    rows: number
    dataInicio: string
    dataFim: string
    cpf: string,
    cnpj: string
}) => {
    if (dataInicio === undefined && dataInicio === undefined) {
        let dataT = dataSearch()

        dataInicio = dataT.dataInicio
        dataFim = dataT.dataFim
    }

    const dtInicio = dataInicio.includes('T03:00:00.000Z') ? dataInicio : `${dataInicio}T03:00:00.000Z`;
    const dtFim = dataFim.includes('T03:00:00.000Z') ? dataFim : `${dataFim}T03:00:00.000Z`



    const { data } = await pixReceived(dtInicio, dtFim, page, rows, cpf, cnpj)
    pixReceive.value = data
    loading.value = false
}

const cpfAndCnpj = (searchItem: string) => {
    let apenasDigitos = searchItem.toString()?.replace(/\D/g, '')
    let obj: { cnpj: string, cpf: string } = { cnpj: '', cpf: '' }
    if (apenasDigitos.length >= 14) obj.cnpj = searchItem.replace(
        /[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g,
        ''
    )
    if (apenasDigitos.length === 11) obj.cpf = searchItem.replace(
        /[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g,
        ''
    )

    return obj
}

const getPixReceivedByCpfAndCnpj = async (cpf_and_cnpj: string) => {
    try {
        if (cpf_and_cnpj === '') {
            const { dataInicio, dataFim } = dataSearch()
            await getPixReceived({ page: 0, rows: 15, dataInicio: dataInicio, dataFim: dataFim, cpf: '', cnpj: '' })
            return
        }
        const { dataInicio, dataFim } = dataSearch()
        const { cpf, cnpj } = cpfAndCnpj(cpf_and_cnpj)
        await getPixReceived({ page: 0, rows: 15, dataInicio: dataInicio, dataFim: dataFim, cpf: cpf, cnpj: cnpj })
    } catch (er: unknown) {
        console.log(er)
        const error = er as IError

        if (error.response.status === 404) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }

        if (error.response.status === 400) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }
        if (error.response.status === 409) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }
    }
}
const dataSearch = () => {
    const dt = new Date()
    const data = getFirstDayOfMonthISO(dt.getFullYear(), dt.getMonth())
    const dataInicio = data.dayOne.toISOString().split('T')[0];
    const dataFim = formatDateToISO(new Date(data.dayActual.getTime() - data.dayActual.getTimezoneOffset() * 60000));

    return { dataInicio, dataFim }
}

const formatDateToISO = (date: Date) => {
    return date.toISOString().split('T')[0];
};

onMounted(async () => {
    try {

        const { dataInicio, dataFim } = dataSearch()
        await getPixReceived({ page: 0, rows: 15, dataInicio: dataInicio, dataFim: dataFim, cpf: '', cnpj: '' })

        dtInicio.value = dataInicio
        dtFim.value = dataFim
    } catch (er: unknown) {
        const error = er as IError

        if (error.response.status === 404) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }

        if (error.response.status === 400) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }
        if (error.response.status === 409) {
            notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            return
        }
    }
})
</script>

<style lang="scss" scoped>
.container-xl {
    max-width: 1280px;
}

.border-pix {
    border: 1px solid rgba(0.2, 0.2, 0.2, 0.25);
    border-radius: 1rem;
}
</style>
