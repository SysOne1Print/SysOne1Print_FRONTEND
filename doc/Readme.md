Esse Documento tem tudo o que está funcionando no codigo, ou ate os que está funcionando e com erro
Segue a lista abaixo:

  - Sistema de Login (Token de validação 8 horas)
  - Sistema de Logout
  - Sistema de controle de acesso (Vendedor, administrador, financeiro e etc);
    * cada tipo de acesso poderá ver determinada pagina;

  - Sistema de envio de msg via WhatsApp por estagio (quando pedido é aprovado e quando o pedido está em expedição)
  - Sistema de visualização de estagio pelo cliente (e uma pagina exclusiva para os clientes, o link da visualização é enviado por MSG WhatsApp)
  - Crud de Clientes, inclui
    _ create/update/read/delete
    * Cadastro/create de clientes
      1 - com envio de imagem
      2 - busca de endereço por meio do CEP por meio do (https://www.republicavirtual.com.br/cep/)
    * atualização/update de clientes
    * busca todos os clientes/read de clientes
    * delete de Clientes (Porém so funciona se o cliente nao tiver nada vinculado a ele, respeitando as regras do banco de dados, ou se ele estiver vinculado a alguma coisa);

  - Gerenciamento de nivel de desconto dos produtos por Cliente
    - Crud - create/update/read/delete
    * cadastro de desconto  por produto e tipo de produto também
    * alteração de desconto por produto
    * lista de produtos com desconto
    * delete desconto de produto

  - Crud de orçamento
    _ create/update/read/delete
    * cadastro/create de orçamento baseado no cliente
      1 nivel de desconto por produto, baseado no cliente que está sendo criado no orçamento
      2 desconto Por Porcentagem,
      3 desconto Real,
      4 upload de arquivos

    * atualização/update de orçamento
      1 nivel de desconto por produto, baseado no cliente que está sendo criado no orçamento
      2 desconto Por Porcentagem,
      3 desconto Real,

    * busca todos orçamento/pedidos
    * delete orçamento so em pequenos casos pois normalmente um orçamento nao pode ser excluido so desativado.
  - Meios de pagamento habilitado
    * Carteira one (caso meio de pagamento for carteira one ele é aprovado automaticamente sem Interferência do financiero),
    * dinheiro (Presencial)
    * Sys.Pix (sicoob) (caso meio de pagamento for Sys.pix ele é aprovado automaticamente sem Interferência do financiero)
    * envio de comprovante de pagamento

  - Sistema de indicações por vendedor
  - Sistema de pagamento parcial
  - Valor de frete adicional no valor do orçamento.

  - Crud de produtos
    _ create/update/read/delete
    * cadastro/create de produtos
      1 - envio de arquivo

    * atualização/update de produtos
      1 - envio de arquivo

    * lista ou busca/read de produtos
    * deletar/delete produtos

  - Financeiro (Opções)
    * Lista de todos os orçamento existente para que o usuario do tipo financeiro possa aprovar, e ver detalhes do orçamento
    * Crud - contabilidade (create/update/read/delete) -> esse modulo, seria ou será reescrito do zero
      - cadastro/create de contabilidade
      - atualização/update de contabilidade
      - Deletar/delete contabilidade
      - lista/read contabilidade

  - Cadastro de saldo na carteira one
    * Gerenciar carteira one
      - Aqui você aprova o saldo que está em espera da carteira one que é cadastrado
      - Visualizar detalhes de uma determinada saldo em espera da carteira one

  - Visualizar Pix recebidos pela sistema (Sys.Pix) via QRCODE gerado pela sicoob

  - Sistema de produção
    * Orçamentos aprovados vão cair aqui no sistema de produção e por exemplo se o orçamento 20 estiver com 10 itens dtf, os mesmo vão aparecer tudo na produção, caso tiver um item do tipo camiseta irá direto para "Expedição"
    - Pedidos aprovados
      * detalhes do item
      * avançar item para o proximo estagio
      * copiar nome do arquivo

    - Arte Final
      * detalhes do item
      * abrit pasta onde os arquivos estão
      * Mover par o estagio anterior
      * avançar item para o proximo estagio
      * copiar nome do arquivo

    - Produção
      * detalhes do item
      * configurar maquina que o item rodar
      * Modo variado (com varios pedidos rodando, e fazendo uma fila de itens para rodar em sequencia)
      * Prioridade de item rodando em modo variado
      * abrit pasta onde os arquivos estão
      * Mover par o estagio anterior
      * avançar item para o proximo estagio (somente quando o item que está rodando é concluido)
      * copiar nome do arquivo

    - Controle de qualidade
      * detalhes do item
      * reposição de layot
      * abrit pasta onde os arquivos estão
      * Mover par o estagio anterior
      * avançar item para o proximo estagio
      * copiar nome do arquivo

  - Sistema de Expedição
    * Itens dos pedidos que estão prontos para serem entregues vão cair aqui, mas antes precisão de uma confirmação;
