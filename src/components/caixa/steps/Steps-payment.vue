<template>
  <div class="etapaPagamento" data-content="pagamento">
    <form action="">
      <label for="firstColTotais" class="mt-2">Totais</label>
      <div id="firstColTotais" class="colTrip">
        <div class="form-group">
          <label class="form-label" for="pagamentoSubTotal">Sub total</label>
          <input
            type="email"
            class="form-control"
            id="pagamentoSubTotal"
            disabled
            placeholder="1,00"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="pagamentoDesconto">Desconto</label>
          <input
            type="email"
            class="form-control pagamentoDesconto"
            id="pagamentoDesconto"
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
          <label class="form-label" for="pagamentoTotalVenda">Total da venda</label>
          <input
            type="email"
            class="form-control"
            id="pagamentoTotalVenda"
            disabled
            placeholder="1,00"
          />
        </div>
      </div>

      <!-- // -->

      <div class="colDup">
        <div class="form-group">
          <label class="form-label" for="pagamentoSubTotal">Número de pessoas</label>
          <input type="text" class="form-control" id="pagamentoSubTotal" placeholder="1,00" />
        </div>
        <div class="form-group">
          <label class="form-label" for="pagamentoSubTotal">Total por pessoa</label>
          <input type="text" class="form-control" id="pagamentoSubTotal" placeholder="1,00" />
        </div>
      </div>

      <!-- // -->

      <div class="colDup">
        <div class="form-group">
          <label class="form-label" for="pagamentoSubTotal">Total recebido em dinheiro</label>
          <input type="text" class="form-control" id="pagamentoSubTotal" placeholder="1,00" />
        </div>
        <div class="form-group">
          <label class="form-label" for="pagamentoSubTotal">Troco em dinheiro</label>
          <input
            type="text"
            class="form-control"
            id="pagamentoSubTotal"
            disabled
            placeholder="1,00"
          />
        </div>
      </div>

      <!-- // -->

      <label for="formasDePagamento" class="mt-2">Formas de pagamento</label>
      <div id="formasDePagamento" class="colTrip pagamentoAreaCards">
        <div class="cardPagamentoEstilo">
          <input type="radio" name="pagamentoTipo" id="tipoQrCode" />
          <label for="tipoQrCode" class="cardLabel">
            <h5>qrCode</h5>
            <span>Gerar qr-code</span>
          </label>
        </div>

        <div class="cardPagamentoEstilo">
          <input type="radio" name="pagamentoTipo" id="tipoDinheiro" />
          <label for="tipoDinheiro" class="cardLabel">
            <h5>Dinheiro</h5>
            <span>Em espécie</span>
          </label>
        </div>

        <div class="cardPagamentoEstilo">
          <input type="radio" name="pagamentoTipo" id="tipoMaquininha" />
          <label for="tipoMaquininha" class="cardLabel">
            <h5>Maquininha</h5>
            <span>Máq. Cartão</span>
          </label>
        </div>

        <div class="cardPagamentoEstilo">
          <input type="radio" name="pagamentoTipo" id="tipoCarteiraOne" />
          <label for="tipoCarteiraOne" class="cardLabel">
            <h5>Cart. One1</h5>
            <span>Saldo ONE1</span>
          </label>
        </div>
      </div>

      <!-- // -->

      <div class="colTrip mt-2">
        <div class="form-group">
          <label class="form-label" for="pagamentoCondicao">Condição</label>
          <input type="text" class="form-control" id="pagamentoCondicao" placeholder="0" />
        </div>

        <div class="form-group">
          <button class="pagamentoGerarParcelas">Gerar parcelas</button>
        </div>

        <div class="form-group">
          <label class="form-label" for="pagamentoCategoriaDeReceitaDespesa">Categoria</label>
          <select id="pagamentoCategoriaDeReceitaDespesa" class="form-control custom-select">
            <option value="1" selected>Categoria 1</option>
            <option value="2">Categoria 2</option>
            <option value="3">Categoria 3</option>
          </select>
        </div>
      </div>

      <!-- // -->

      <div class="colMono">
        <div class="tabelaPagamentoParcelas">
          <div class="tableHeader">
            <ul>
              <li class="tituloItem ponta"></li>
              <li class="tituloItem minimoFixo">Dias</li>
              <li class="tituloItem maximoFixo">Data</li>
              <li class="tituloItem minimoFixo">Valor</li>
              <li class="tituloItem maximoFixo">Forma</li>
              <li class="tituloItem maximoFixo">Observação</li>
              <li class="tituloItem ponta">
                <button class="btnAddParcela" tooltip="Adicionar nova parcela." flow="left">
                  <i class="fas fa-plus"></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="tableBody">
            <ul class="external">
              <!-- Início do loop -->
              <li class="internalItem">
                <ul class="internaUl">
                  <li class="internalInfo ponta">1</li>
                  <li class="internalInfo minimoFixo">
                    <input type="text" name="" id="" value="0" />
                  </li>
                  <li class="internalInfo maximoFixo">
                    <input type="text" name="" id="" value="01/01/2024" />
                  </li>
                  <li class="internalInfo minimoFixo">
                    <input type="text" name="" id="" value="R$5,00" />
                  </li>
                  <li class="internalInfo maximoFixo">
                    <select id="pagamentoForma">
                      <option value="">Selecione</option>
                      <option value="1" selected>Dinheiro</option>
                      <option value="2">Opção 2</option>
                      <option value="3">Opção 3</option>
                    </select>
                  </li>
                  <li class="internalInfo maximoFixo">
                    <input type="text" name="" id="" value="..." />
                  </li>
                  <li class="internalInfo ponta">
                    <button class="btnRetirarParcela" tooltip="Removerá essa parcela!" flow="left">
                      <i class="fas fa-calendar-times"></i>
                    </button>
                  </li>
                </ul>
              </li>
              <!-- // -->
              <li class="internalItem">
                <ul class="internaUl">
                  <li class="internalInfo ponta">2</li>
                  <li class="internalInfo minimoFixo">
                    <input type="text" name="" id="" placeholder="0" />
                  </li>
                  <li class="internalInfo maximoFixo">
                    <input type="text" name="" id="" placeholder="00/00/0000" />
                  </li>
                  <li class="internalInfo minimoFixo">
                    <input type="text" name="" id="" placeholder="R$0,00" />
                  </li>
                  <li class="internalInfo maximoFixo">
                    <select id="pagamentoForma">
                      <option value="" selected>Selecione</option>
                      <option value="1">Dinheiro</option>
                      <option value="2">Opção 2</option>
                      <option value="3">Opção 3</option>
                    </select>
                  </li>
                  <li class="internalInfo maximoFixo">
                    <input type="text" name="" id="" placeholder="..." />
                  </li>
                  <li class="internalInfo ponta">
                    <button class="btnRetirarParcela" tooltip="Removerá essa parcela!" flow="left">
                      <i class="fas fa-calendar-times"></i>
                    </button>
                  </li>
                </ul>
              </li>
              <!-- Final do loop //Zz -->

              <li class="addParcelaNe">
                <!-- Votão para inserir uma nova <li> ao loop -->
                <span class="botaoImaginario">
                  <i class="fas fa-plus-circle"></i>
                  <span>Adicionar uma nova parcela</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- // -->

      <label for="outrasInformacoes">Outras informações</label>
      <div id="outrasInformacoes" class="colDup">
        <div class="form-group prodComentarios">
          <label class="form-label" for="pagamentoVendedor">Vendedor</label>
          <input
            type="text"
            name="pagamentoVendedor"
            id="pagamentoVendedor"
            class="form-control"
            value="Autocomplete"
            disabled
          />
        </div>

        <div class="form-group prodComentarios">
          <label class="form-label" for="pagamentoDataPrevista">Data prevista</label>
          <input
            type="text"
            name="pagamentoDataPrevista"
            id="pagamentoDataPrevista"
            class="form-control"
          />
        </div>
      </div>

      <!-- // -->

      <div class="colDup">
        <div class="form-group prodComentarios">
          <label class="form-label" for="pagamentoDepositoLancamento"
            >Depósito para lançamento</label
          >
          <input
            type="text"
            name="pagamentoDepositoLancamento"
            id="pagamentoDepositoLancamento"
            class="form-control"
            value=""
          />
        </div>

        <div class="form-group prodComentarios">
          <label class="form-label" for="pagamentoFrete">Frete</label>
          <input
            type="text"
            name="pagamentoFrete"
            id="pagamentoFrete"
            class="form-control"
            value=""
          />
        </div>
      </div>

      <!-- // -->

      <div class="colMono">
        <div class="form-group prodComentarios">
          <label class="form-label" for="pagamentoObservacoes">Observações</label>
          <textarea id="pagamentoObservacoes" name="pagamentoObservacoes" rows="2">...</textarea>
        </div>
      </div>

      <!-- // -->

      <div class="colMono">
        <div class="form-group prodComentarios">
          <label class="form-label" for="produtoComentarios">
            <span>Observações internas</span>
            <span tooltip="Não será impresso!" flow="right"
              ><i class="fas fa-info-circle iconMicroInfo"></i
            ></span>
          </label>
          <textarea id="produtoComentarios" name="produtoComentarios" rows="2">...</textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
