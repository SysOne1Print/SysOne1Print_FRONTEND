<template>
  <div class="col-lg-6">
    <!-- IF ~ Se tiver algum item/produto a ser exibido em lista -->
    <div class="listCard d-none">
      <div class="listCardHeader">
        <ul>
          <li class="itemTitle flex-grow">Produto</li>
          <li class="itemTitle">Qtde. (1,00)</li>
          <li class="itemTitle">Preço</li>
          <li class="itemTitle">Sub Total</li>
          <li class="itemTitle">Ações</li>
        </ul>
      </div>

      <div class="listCardBody oneScroll">
        <ul>
          <li class="item">
            <ul>
              <li class="itemInfo flex-grow">Nome</li>
              <li class="itemInfo">Qtde</li>
              <li class="itemInfo">Preço</li>
              <li class="itemInfo">SubTotal</li>
              <li class="itemInfo">
                <button class="print"><i class="fas fa-print"></i></button>
                <button class="edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="remove"><i class="fas fa-trash-alt"></i></button>
              </li>
            </ul>
          </li>

          <!-- // -->

          <li class="item">
            <ul>
              <li class="itemInfo flex-grow">Nome</li>
              <li class="itemInfo">Qtde</li>
              <li class="itemInfo">Preço</li>
              <li class="itemInfo">SubTotal</li>
              <li class="itemInfo">
                <button class="print"><i class="fas fa-print"></i></button>
                <button class="edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="remove"><i class="fas fa-trash-alt"></i></button>
              </li>
            </ul>
          </li>

          <!-- // -->

          <li class="item">
            <ul>
              <li class="itemInfo flex-grow">Nome</li>
              <li class="itemInfo">Qtde</li>
              <li class="itemInfo">Preço</li>
              <li class="itemInfo">SubTotal</li>
              <li class="itemInfo">
                <button class="print"><i class="fas fa-print"></i></button>
                <button class="edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="remove"><i class="fas fa-trash-alt"></i></button>
              </li>
            </ul>
          </li>

          <!-- // -->

          <li class="item">
            <ul>
              <li class="itemInfo flex-grow">Nome</li>
              <li class="itemInfo">Qtde</li>
              <li class="itemInfo">Preço</li>
              <li class="itemInfo">SubTotal</li>
              <li class="itemInfo">
                <button class="print"><i class="fas fa-print"></i></button>
                <button class="edit"><i class="fas fa-pencil-alt"></i></button>
                <button class="remove"><i class="fas fa-trash-alt"></i></button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- ELSE -->
    <div class="listNull">
      <!-- Remover .d-none ao ter itens na lista -->
      <i class="fas fa-store"></i>
    </div>
    <!-- //END -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
