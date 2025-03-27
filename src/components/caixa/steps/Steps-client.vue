<template>
  <div class="etapaCliente" data-content="cliente">
    <form action="">
      <div class="colDup">
        <div class="form-group flex-grow">
          <label class="form-label" for="clienteName"
            ><span style="color: red; font-size: 14px; font-weight: bold">*</span>Nome</label
          >
          <input
            type="text"
            class="form-control"
            id="clienteName"
            placeholder="Consumidor final"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="clienteTipo">Tipo</label>
          <select id="clienteTipo" class="form-control custom-select">
            <option value="1">Pessoa jurídica</option>
            <option value="2">Pessoa física</option>
            <option value="3">Estrangeiro</option>
          </select>
        </div>
      </div>

      <!-- //-->

      <div class="colTrip">
        <!-- IF ~ select#clienteTipo == "1" (Pessoa Jurídica) -->
        <div class="form-group flex-grow d-none">
          <!-- remove .d-none -->
          <label class="form-label" for="clienteCNPJ">CNPJ </label>
          <input
            type="text"
            class="form-control"
            id="clienteCNPJ"
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <!-- ELSE ~ select#clienteTipo == "2" (Pessoa Física) -->
        <div class="form-group flex-grow">
          <label class="form-label" for="clienteCPF">CPF </label>
          <input
            type="text"
            class="form-control"
            id="clienteCPF"
            placeholder="000.000.000-00"
            required
          />
        </div>

        <!-- ELSE ~ select#clienteTipo == "3" (Estrangeiro) -->
        <div class="form-group d-none">
          <!-- MANTÉM! .d-none (não exibirá essa input ~~Apenas salva o VALUE?)-->
          <label class="form-label" for="clienteEstrangeiro">&nbsp;</label>
          <input
            type="text"
            class="form-control"
            id="clienteEstrangeiro"
            value="Cliente estrangeiro"
            required
          />
        </div>

        <!-- Final das condicionais da select#clienteTipo // -->

        <div class="form-group flex-grow">
          <label class="form-label" for="clienteCodigo">Código </label>
          <input type="text" class="form-control" id="clienteCodigo" placeholder="" />
        </div>

        <div class="form-group flex-grow">
          <label class="form-label" for="clienteFantasia">Fantasia </label>
          <input type="text" class="form-control" id="clienteFantasia" placeholder="" />
        </div>
      </div>

      <!-- //-->

      <div @click.prevent="check = !check" class="controleOpcAvancadas" :class="{ active: check }">
        <span>Opções avançadas</span>
      </div>

      <!-- SE ~ div.controleOpcAvancadas == .active (remove .d-none) -->
      <div class="opcAvancadas" :class="{ 'd-none': !check }">
        <div class="colTrip">
          <div class="form-group flex-grow">
            <label class="form-label" for="clienteName">Inscrição estadual</label>
            <input
              type="text"
              class="form-control"
              id="clienteName"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="extraClienteContribuente">Contribuente</label>
            <select id="extraClienteContribuente" class="form-control custom-select">
              <option value="1">autoComplete_db ..</option>
              <option value="2">Pessoa jurídica</option>
              <option value="3">Estrangeiro</option>
            </select>
          </div>

          <!-- IF select#clienteTipo == "2" Pessoa Física: show -->
          <div class="form-group flex-grow">
            <label class="form-label" for="clienteName">RG</label>
            <input
              type="text"
              class="form-control"
              id="clienteName"
              placeholder="Consumidor final"
            />
          </div>
          <!-- Visível apenas para valor 2 (select#clienteTipo). //END -->
        </div>

        <!-- // -->

        <div class="colTrip">
          <div class="form-group flex-grow">
            <label class="form-label" for="clienteName">CEP</label>
            <input
              type="text"
              class="form-control"
              id="clienteName"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteCidade">CIDADE</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteCidade"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteEstado">UF</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteEstado"
              placeholder="autoComplete_db .."
            />
          </div>
        </div>

        <!-- // -->

        <div class="colDup">
          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteEndereco">Endereço</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteEndereco"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="extraClienteNumeroCasa">Número</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteNumeroCasa"
              placeholder="autoComplete_db .."
            />
          </div>
        </div>

        <!-- // -->

        <div class="colDup">
          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteComplemento">Complemento</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteComplemento"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="extraClienteBairro">Bairro</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteBairro"
              placeholder="autoComplete_db .."
            />
          </div>
        </div>

        <!-- // -->

        <div class="colDup">
          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteEmail">Email</label>
            <input
              type="email"
              class="form-control"
              id="extraClienteEmail"
              placeholder="autoComplete_db .."
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="extraClienteFone">Fone</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteFone"
              placeholder="autoComplete_db .."
            />
          </div>
        </div>

        <!-- // -->

        <div class="colMono">
          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteEmailNFE">Email para envio da NFe</label>
            <input
              type="email"
              class="form-control"
              id="extraClienteEmailNFE"
              placeholder="autoComplete_db .."
            />
          </div>
        </div>

        <!-- // -->

        <div class="colDup">
          <div class="form-group flex-grow">
            <label class="form-label" for="extraClienteCelular">Celular</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteCelular"
              placeholder="autoComplete_db .."
            />
          </div>

          <!-- IF select#clienteTipo == "2" Pessoa física -->
          <div class="form-group">
            <label class="form-label" for="extraClienteDataNascimento">Data de nascimento</label>
            <input
              type="text"
              class="form-control"
              id="extraClienteDataNascimento"
              placeholder="autoComplete_db .."
            />
          </div>
          <!-- Visível apenas se a select#clienteTipo tiver o valor 2, se não adiciona classe "d-none" //END -->
        </div>

        <!-- // -->

        <div class="colMono">
          <div class="form-group removeMbottom">
            <label class="form-label" for="extraClienteObservacoes">Data de nascimento</label>
            <textarea id="extraClienteObservacoes" name="extraClienteObservacoes" rows="2">
A asdsadsdasd</textarea
            >
          </div>
        </div>
      </div>
      <!-- //END -->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const check = ref(false)
</script>

<style scoped></style>
