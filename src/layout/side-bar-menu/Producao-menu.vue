<template>
    <ul class="sidebar-menu">
        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="material-icons sidebar-menu-icon sidebar-menu-icon--left"
                    style="width: 25px;">visibility</span>
                <span class="sidebar-menu-text">Visão Geral</span>
                <span class="badge badge-notifications badge-accent ml-2">2</span><!-- Processos -->
            </router-link>
        </li>

        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="sidebar-menu-icon sidebar-menu-icon--left" style="width: 25px;"><i
                        class="far fa-id-card"></i></span>
                <span class="sidebar-menu-text">Pedidos Aprovados</span>
            </router-link>
        </li>

        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="sidebar-menu-icon sidebar-menu-icon--left" style="width: 25px;"><i
                        class="fas fa-file-image"></i></span>
                <span class="sidebar-menu-text">Arte Final</span>
            </router-link>
        </li>

        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="sidebar-menu-icon sidebar-menu-icon--left" style="width: 25px;"><i
                        class="fas fa-print"></i></span>
                <span class="sidebar-menu-text">Produção</span>
            </router-link>
        </li>

        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="sidebar-menu-icon sidebar-menu-icon--left" style="width: 25px;"><i
                        class="fas fa-hat-wizard"></i></span>
                <span class="sidebar-menu-text">Controle de Qualidade</span>
            </router-link>
        </li>

        <li class="sidebar-menu-item">
            <router-link class="sidebar-menu-button" :to="{ name: 'orçamento cliente' }">
                <span class="sidebar-menu-icon sidebar-menu-icon--left" style="width: 25px;"><i
                        class="fas fa-thumbs-up"></i></span>
                <span class="sidebar-menu-text">Expedição</span>
            </router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">

</script>

<style scoped></style>