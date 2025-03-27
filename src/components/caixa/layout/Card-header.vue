<template>
  <div class="cardHeader">
    <span>Venda</span>
    <div class="grupoFerramentas">
      <form class="search-form navbar-search d-md-flex" action="">
        <input type="text" class="form-control" placeholder="Buscar ..." />
        <button class="btn" type="submit">
          <i class="material-icons">search</i>
        </button>
      </form>
      <button class="novaVenda">Nova venda</button>
      <button class="btnMoreTools">
        <i class="fas fa-ellipsis-h"></i>
        <!-- Escondidinha, dropzin jeitosin -->
        <div class="dropMore d-none">
          <span class="opTitle">Operações</span>
          <ul>
            <li class="umas opItem" onclick="oeoe">
              <i class="fas fa-print"></i> Imprimir (Alt+i)
            </li>
            <li class="opItem"><i class="fas fa-print"></i> Re-imprimir última operação</li>
            <li class="opItem"><i class="fas fa-level-down-alt"></i> Gerar devolução</li>
            <li class="opItem">
              <span class="balancaLabel"><i class="fas fa-balance-scale"></i> Balança</span>
            </li>
          </ul>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
