<template>
  <div class="etapaProduto" data-content="produto">
    <form action="">
      <div class="colDup">
        <div class="form-group">
          <label class="form-label" for="produtoListaPreco">Lista de preço</label>
          <select id="produtoListaPreco" class="form-control custom-select">
            <option value="1">Teste</option>
            <option value="2">opção 2</option>
            <option value="3">opção 3</option>
          </select>
        </div>

        <div class="form-group flex-grow checkMod">
          <label class="form-label mb-0 mr-2" for="subscribe"
            >Ler código de barras? <span>SIM</span></label
          >
          <div class="custom-control custom-checkbox-toggle custom-control-inline mb-0">
            <input checked type="checkbox" id="subscribe" class="custom-control-input" />
            <label class="custom-control-label" for="subscribe">Yes</label>
          </div>
        </div>
      </div>

      <!-- //-->

      <div class="col-Mono">
        <div class="form-group produtoBuscar">
          <input type="text" class="form-control" placeholder="Buscar ..." />
          <button class="btn" type="submit">
            <i class="material-icons">search</i>
          </button>
        </div>
        <div class="pesquisaAvancada modal-toggle" data-modal="modalPesquisaAvancada">
          <i class="fas fa-search-plus"></i> <span>Pesquisa avançada?</span>
        </div>

        <!-- MODAL PESQUISA AVANÇADA -->
        <div id="modalPesquisaAvancada" class="modal">
          <div class="modal-content w-75 oneScroll">
            <div class="modal-top">
              <span class="modal-close">×</span>
            </div>
            <div class="modal-container">
              <div class="w-100 d-flex flex-column border-bottom">
                <h4 class="mb-2">Pesquisa avançada</h4>
              </div>

              <div
                class="w-100 d-flex flex-row justify-content-between mt-3 pb-0 border-bottom gap10"
              >
                <div class="form-group searchAvancadas">
                  <label class="form-label" for="pesquisaAvancadaSearchInput">&nbsp;</label>
                  <form class="search-form navbar-search d-md-flex" action="index.html">
                    <input
                      type="text"
                      id="pesquisaAvancadaSearchInput"
                      class="form-control"
                      placeholder="Buscar ..."
                    />
                    <button class="btn" type="submit">
                      <i class="material-icons">search</i>
                    </button>
                  </form>
                </div>

                <div class="form-group flex-grow">
                  <div class="form-group">
                    <label class="form-label" for="modalPesqAvcDepositoDeEstoque">Tipo</label>
                    <select id="modalPesqAvcDepositoDeEstoque" class="form-control custom-select">
                      <option value="1">Pessoa jurídica</option>
                      <option value="2">Pessoa física</option>
                      <option value="3">Estrangeiro</option>
                    </select>
                  </div>
                </div>

                <div class="form-group checkMod mb-0">
                  <label class="form-label mb-0 mr-2" for="modalPesqAvcEstoqueDisponivel"
                    >Disponível em estoque? <span>SIM</span></label
                  >
                  <div class="custom-control custom-checkbox-toggle custom-control-inline mb-0">
                    <input
                      checked
                      type="checkbox"
                      id="modalPesqAvcEstoqueDisponivel"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="modalPesqAvcEstoqueDisponivel"
                      >Yes</label
                    >
                  </div>
                </div>
              </div>

              <div class="w-100">
                <!-- Nenhuma consulta  realizada -->
                <div class="semConsultaPrevia">
                  <span><i class="fas fa-info-circle"></i></span>
                  <span>Nenhuma consulta realizada.</span>
                  <span class="descritiva">Faça a busca por algum produto para começar.</span>
                </div>
                <!-- Se existir alguma pesquisa remove.d-none -->
                <div class="tabelaAvancadasResultados oneScroll d-none">
                  <div class="tabHead">
                    <ul>
                      <li class="tituloIt flex-grow">Descrição</li>
                      <li class="tituloIt">Código</li>
                      <li class="tituloIt">Unidade</li>
                      <li class="tituloIt">Localização</li>
                      <li class="tituloIt">Marca</li>
                      <li class="tituloIt">Fornecedor</li>
                      <li class="tituloIt">Preço</li>
                      <li class="tituloIt">Estoque</li>
                    </ul>
                  </div>

                  <div class="tabBod">
                    <ul class="individuo">
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                      <li class="itemIndividuo">
                        <ul>
                          <li class="itemIt flex-grow">Descrição</li>
                          <li class="itemIt">Código</li>
                          <li class="itemIt">Unidade</li>
                          <li class="itemIt">Localização</li>
                          <li class="itemIt">Marca</li>
                          <li class="itemIt">Fornecedor</li>
                          <li class="itemIt">Preço</li>
                          <li class="itemIt">Estoque</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="w-100 d-flex flex-row justify-content-between mt-3 pt-2 border-top">
                <button class="btn btn-primary">Exibir mais Resultados</button>
                <div>
                  <button class="modal-close btn btn-danger">cancelar</button>
                  <button class="btn btn-success">OK</button>
                </div>
              </div>
              <!-- Fim do conteúdo da modal -->
            </div>
          </div>
        </div>
        <!-- //Fim da modal PESQUISA AVANÇADA -->
      </div>
    </form>

    <!-- // -->

    <div class="produtosFavoritos">
      <div class="linhaBotaoFavoritos">
        <!-- btnFavoritos .selected (ativo//show~Content) -->
        <button class="btnFavoritos"><i class="fas fa-star"></i> Exibir favoritos</button>
      </div>
      <!-- Content TABELA Produtos Favoritos -->
      <div class="tabelaProdutosFavoritos d-none">
        <!-- SE - Não existir produtos : -->
        <div class="produtosFavoritosNull">
          <div class="iconNullFav">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="txtNullFav">
            <span>Nenhum favorito localizado</span>
          </div>
        </div>
        <!-- // Final do aviso de não existem produtos... -->

        <!-- Inicio real da tabela : -->
        <div class="tableHeader">
          <ul>
            <li class="titleFav flex-grow">Descrição</li>
            <li class="titleFav">Código</li>
            <li class="titleFav">Unidade</li>
            <li class="titleFav">Estoque</li>
          </ul>
        </div>
        <div class="tableBody">
          <ul class="listaIndividual">
            <!-- Loop de produtos favoritados -->
            <li class="individualProdutoFavorito">
              <ul>
                <li class="prodFav flex-grow">
                  Descrição do produto?sadsdsadsadsadsadsadsa quéquaquiquoqu
                </li>
                <li class="prodFav">#035BOCAdoCENOURA157</li>
                <li class="prodFav">1</li>
                <li class="prodFav">57</li>
                <li class="btnRemove" onclick="removerFavoritos">
                  <i class="fas fa-trash-alt"></i>
                </li>
              </ul>
            </li>
            <!-- // -->
          </ul>
        </div>
        <!-- // Final da tabela -->
      </div>
    </div>

    <!-- // -->

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
        <label for="produtoQuantidade" class="form-label">Quantidade</label>
        <input
          id="produtoQuantidade"
          type="text"
          name="produtoQuantidade"
          placeholder="1,00"
          class="form-control produtoQuantidade"
        />
        <button class="reduzProdQuantidade">-</button>
        <button class="somaProdQuantidade">+</button>
      </div>

      <div class="form-group">
        <label class="form-label" for="produtoDesconto">Desconto</label>
        <input
          type="text"
          class="form-control produtoDesconto"
          id="produtoDesconto"
          placeholder="0,00"
        />
        <button class="descontoProduto">
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
        <label class="form-label" for="produtoValorUnitario">Valor unitário</label>
        <input type="text" class="form-control" id="produtoValorUnitario" placeholder="1,00" />
      </div>

      <div class="form-group">
        <label class="form-label" for="produtoSubTotal">Sub total</label>
        <input type="text" class="form-control" id="produtoSubTotal" placeholder="1,00" />
      </div>
    </div>

    <!-- // -->

    <div class="colMono">
      <div class="form-group prodComentarios">
        <label class="form-label" for="produtoComentarios">Comentários</label>
        <textarea id="produtoComentarios" name="produtoComentarios" rows="2">...</textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
