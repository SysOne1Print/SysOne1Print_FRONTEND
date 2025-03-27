<template>
  <div class="cardBody">
    <div class="internaDir-ESQ oneScrollpedidosAtivos">
      <ul>
        <!-- Se não houverem pedidos..
                        <li class="itemNaoHaPedidos selected"></li>-->

        <!-- LISTA DAS CLASSES, DESSA UL :
                            .selected
                            .itemNaoHaPedidos
                            .itemPedidosAtivos
                            .itemPedidosConcluidos

                             SE NÃO HOUVEREM PEDIDOS :
                            .itemNaoHaPedidos

                             PEDIDOS CONCLUÍDOS :
                            .itemPedidosConcluidos .selected

                             CASO HAJA PEDIDOS :
                            .selected (para o pedido em execução)
                            .itemPedidosAtivos
                        -->

        <li class="itemPedidosAtivos selected" data-ouvintepedidoativo="">
          <span class="iconeZim">
            <i class="fas fa-file-alt"></i>
          </span>
          <span class="numPedido"> Pedido <span class="destqQ">1969</span> </span>
        </li>

        <li class="itemPedidosAtivos" data-ouvintepedidoativo="">
          <span class="iconeZim">
            <i class="fas fa-file-alt"></i>
          </span>
          <span class="numPedido"> Pedido 1969 </span>
        </li>
      </ul>
    </div>
    <div class="internaDir-DIR oneScrollpedidosAtivos">
      <div class="NaoHouveSelecaoZe d-none">
        <span class="NaoTargetado"
          ><span class="destacado">Nenhum pedido selecionado</span>, escolha um pedido ao
          lado.</span
        >
      </div>

      <div class="produtoTargetado oneScrollAtivos">
        <div class="colDupDetalhes">
          <div class="previaProduto">
            <img src="@/assets/img/iconLogo.svg" alt="" class="bgImg" />

            <div class="barRight">
              <button class="addFavorito">
                <!-- .favoritado ~se já for um item favorito! //AddClass-->
                <i class="fas fa-star"></i>
              </button>
              <div class="fixHeightBlocadao"></div>
              <button class="maximizarFoto">
                <i class="fas fa-search-plus"></i>
              </button>
            </div>
          </div>

          <div class="detalhesProduto">
            <div class="detProdNome">
              <ul class="produtoNome">
                <li>Nome do Produto</li>
              </ul>
              <!-- Voltar aqui pra fazer deferentemente certo'-->
              <span class="iconDetalhesTooltip" tooltip="80 em Estoque" flow="left"
                ><i class="fas fa-info-circle"></i
              ></span>
            </div>

            <div class="detProdValorUnitarioBase">
              <span class="produtoValorBase">0,00</span>
            </div>
          </div>
        </div>

        <!-- // -->

        <div class="colQuad">
          <div class="form-group">
            <label for="direitistaProdutoQuantidade" class="form-label">Quantidade</label>
            <input
              id="direitistaProdutoQuantidade"
              type="text"
              name="direitistaProdutoQuantidade"
              placeholder="1,00"
              class="form-control direitistaProdutoQuantidade"
            />
            <button class="produtoTargetIndireitista reduzProdQuantidade">-</button>
            <button class="produtoTargetIndireitista somaProdQuantidade">+</button>
          </div>

          <div class="form-group">
            <label class="form-label" for="direitistaProdutoDesconto">Desconto</label>
            <input
              type="text"
              class="form-control direitistaProdutoDesconto"
              id="direitistaProdutoDesconto"
              placeholder="0,00"
            />
            <button class="produtoTargetIndireitista descontoProduto">
              <!--
                                ícone do botão altera também o tipo de desconto!
                                === Dinheiro -> #porcentagem.d-none
                                === Porcentagem -> #dinheiro.d-none
                              -->
              <i id="porcentagem" class="fas fa-percentage"></i>
              <i id="dinheiro" class="fas fa-dollar-sign d-none"></i>
            </button>
          </div>

          <div class="form-group">
            <label class="form-label" for="direitistaProdutoValorUnitario">Valor unitário</label>
            <input
              type="text"
              class="form-control"
              id="direitistaProdutoValorUnitario"
              placeholder="1,00"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="direitistaProdutoSubTotal">Sub total</label>
            <input
              type="text"
              class="form-control"
              id="direitistaProdutoSubTotal"
              disabled
              placeholder="1,00"
            />
          </div>
        </div>

        <!-- // -->

        <div class="colMonoMotto oneScrollpedidosAtivos">
          <label for="direitistaProdutoComentarios">Comentários</label>
          <p id="direitistaProdutoComentarios">Comentários ...</p>
        </div>

        <!-- // -->

        <div class="colMono">
          <div class="inform-group">
            <label for="nomeVendedorEspecifico">Nome do vendedor</label>
            <span id="nomeVendedorEspecifico">Nome do vendedor</span>
          </div>

          <div class="areaButtonAct">
            <button class="btn btn-light">
              <i class="fas fa-trash-alt mr-3"></i>
              Cancelar
            </button>
            <button class="btn btn-primary">
              <i class="fas fa-save mr-3"></i>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
