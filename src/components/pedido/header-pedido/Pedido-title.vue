<template>
    <div class="col-lg-12 p-0">
        <div class="card">
            <div class="card-header">
                <p class="h5 mb-0">LEGENDA DAS CORES DOS STATUS</p>
            </div>
            <div class="card-body d-flex flex-row justify-content-around">
                <div class="d-flex flex-column">
                    <small class="js-lists-values-status text-50 mb-4pt">Orçamento</small>
                    <span class="indicator-line rounded bg-secondary"></span>
                </div>

                <div class="d-flex flex-column">
                    <small class="js-lists-values-status text-50 mb-4pt">Aguardando Aprovação</small>
                    <span class="indicator-line rounded bg-warning"></span>
                </div>

                <div class="d-flex flex-column">
                    <small class="js-lists-values-status text-50 mb-4pt">Aprovados</small>
                    <span class="indicator-line rounded bg-success"></span>
                </div>

                <div class="d-flex flex-column">
                    <small class="js-lists-values-status text-50 mb-4pt">Em Produção</small>
                    <span class="indicator-line rounded bg-primary"></span>
                </div>

                <div class="d-flex flex-column">
                    <small class="js-lists-values-status text-50 mb-4pt">Finalizados</small>
                    <span class="indicator-line rounded bg-accent"></span>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">

</script>

<style scoped></style>