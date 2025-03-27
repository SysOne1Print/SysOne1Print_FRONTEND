# Sistema-One1Print-Front-End

O SysOne1Print_FRONTEND é uma aplicação web desenvolvida com Vue.js, utilizando TypeScript como linguagem principal. A estrutura do projeto segue um padrão modular, organizado em diretórios específicos para cada tipo de funcionalidade.

## Estrutura Principal de Diretórios
```plaintext
SysOne1Print_FRONTEND/
├── doc/                  # Documentação do projeto
├── public/               # Arquivos estáticos acessíveis publicamente
├── src/                  # Código-fonte principal da aplicação
├── ssl/                  # Certificados SSL para desenvolvimento seguro
└── [arquivos de configuração] # Diversos arquivos de configuração na raiz
```

## Tecnologias Principais

- Framework Frontend : Vue.js
- Linguagem : TypeScript
- Gerenciador de Estado : Pinia (identificado pelos arquivos em src/stores)
- Roteamento : Vue Router (src/router)
- Estilização : SCSS/CSS
- Comunicação com Backend : Axios (src/api/Axios.ts)
- Comunicação em Tempo Real : MQTT (src/api/Mqtt.ts)

## Organização do Código-Fonte (src/)

1. API (src/api/)
Esta pasta contém os serviços responsáveis pela comunicação com o backend:

- Axios.ts : Configuração e instância do cliente HTTP Axios
- Mqtt.ts : Configuração para comunicação em tempo real via MQTT
- actions/ : Contém módulos específicos para cada tipo de requisição ao backend:
    - AccountFinanceiro.ts: Operações financeiras de contas
    - Carteira.ts: Gerenciamento de carteiras
    - Categoria.ts: Operações com categorias
    - Client.ts: Gerenciamento de clientes
    - Deposito.ts: Operações de depósito
    - Expedicao.ts: Gerenciamento de expedição
    - Fornecedor.ts: Gerenciamento de fornecedores
    - GrupoProdutos.ts: Operações com grupos de produtos
    - Login.ts: Autenticação de usuários
    - Logistica.ts: Operações logísticas
    - Orcamento.ts: Gerenciamento de orçamentos
    - Payment.ts: Processamento de pagamentos
    - Pdf.ts: Geração e manipulação de PDFs
    - Production.ts: Gerenciamento de produção
    - Produtos.ts: Operações com produtos
    - Tinta.ts: Gerenciamento de tintas
    - Upload.ts: Upload de arquivos
    - Users.ts: Gerenciamento de usuários

2. Componentes (src/components/)
Contém componentes Vue reutilizáveis organizados por funcionalidade:

- caixa/ : Componentes relacionados ao caixa/pagamento
- client/ : Componentes para gerenciamento de clientes
- finaliza-orcamento/ : Componentes para finalização de orçamentos
- finance/ : Componentes financeiros
- form/ : Componentes de formulários
- icons/ : Componentes de ícones SVG
- layout/ : Componentes de layout
- modal-content/ : Conteúdos para modais
- one-print/ : Componentes específicos do sistema One1Print
- pagination/ : Componentes de paginação
- pedido/ : Componentes relacionados a pedidos
- primveVue/ : Componentes baseados em PrimeVue
- production-components/ : Componentes para área de produção
- products/ : Componentes relacionados a produtos
- stage-step/ : Componentes para etapas de processos
- table/ : Componentes de tabelas

3. Composables (src/composables/)
Funções compostas reutilizáveis (hooks personalizados do Vue 3):

- PaymentOrc.ts
- Sidebar.ts
- Swal.ts (integração com SweetAlert)
- Toast.ts
- Upload.ts
- UseBudget.ts
- UseCarteira.ts
- UseCreateProduct.ts
- UseDiscount.ts
- UseFinance.ts
- UseGrupoProdutos.ts
- UseMQTTComposable.ts
- UseProduction.ts
- UseSelectItem.ts
- UseStatusPix.ts
- VeelidadeFinanceiro.ts

4. Layout (src/layout/)
Componentes de layout principal da aplicação:

- header/ : Componentes de cabeçalho
- side-bar-menu/ : Componentes da barra lateral
- Default-layout.vue: Layout padrão da aplicação
- Footer-layout.vue: Rodapé da aplicação
- Sub-title-page.vue: Componente para subtítulos de páginas

5. Modelos (src/model/)
Interfaces TypeScript que definem a estrutura dos dados:

- ICategoria.ts
- IClient.ts
- IErrorHandler.ts
- IFinanceiro.ts
- IGrupo.ts
- IMetragem.ts
- Index.ts
- IOption.ts
- IOrcamento.ts
- IPayment.ts
- IPix.ts
- IProducePrinter.ts
- IProduct.ts
- ISideBarSubMenu.ts
- ITinta.ts
- IUnidade.ts
- IUpload.ts
- IUser.ts

6. Plugins (src/plugins/)
Plugins para estender a funcionalidade do Vue:

- Reset-store.ts: Plugin para resetar o estado das stores

7. Roteamento (src/router/)
Configuração de rotas da aplicação:

- operator/ : Rotas específicas para operadores
- Administrador-router.ts: Rotas para administradores
- Cliente-router.ts: Rotas para clientes
- Expedicao-router.ts: Rotas para expedição
- Financeiro-router.ts: Rotas para área financeira
- Index.ts: Configuração principal de rotas
- Production-router.ts: Rotas para produção
- Vendedor-router.ts: Rotas para vendedores

8. Stores (src/stores/)
Gerenciamento de estado global usando Pinia:

- ClientStore.ts
- DomStore.ts
- GlobalProductStore.ts
- LoginStore.ts
- ProductFormStore.ts
- ProductionStageStore.ts
- ProductStore.ts
- StepsForm.ts

9. Utilitários (src/util/)
Funções utilitárias:

- Cor.ts
- Data.ts
- Document.ts
- Metragem.ts
- RefsDefaultProduct.ts
- Sidebar.ts
- SizeFile.ts
- TableHeaderPrime.ts
- TableInfo.ts
- Util.ts
- ZodHandler.ts

10. Views (src/views/)
Páginas principais da aplicação:

- dashboard/ : Páginas do painel principal
    - expedicao/ : Páginas de expedição
    - financeiro/ : Páginas financeiras
    - operador/ : Páginas para operadores
    - orcamento/ : Páginas de orçamentos
    - pedido/ : Páginas de pedidos
    - producao/ : Páginas de produção
    - produto/ : Páginas de produtos
    - vendedor/ : Páginas para vendedores
- AccompanyOrderView.vue: Página para acompanhamento de pedidos
- LoginView.vue: Página de login
- PageNotFound.vue: Página 404

## Arquivos de Configuração

- **.editorconfig** : Configurações do editor
- **.env** e .env.production : Variáveis de ambiente
- **.gitignore** : Arquivos ignorados pelo Git
- **.prettierrc.json** : Configuração do Prettier
- **docker.script.sh e dockerfile** : Configurações para Docker
- **env.d.ts** : Tipagem para variáveis de ambiente
- **eslint.config.js** : Configuração do ESLint
- **jsconfig.json** : Configuração JavaScript
- **nginx.conf** : Configuração do Nginx para produção
- **package.json e pnpm-lock.yaml** : Dependências do projeto
- **tsconfig.json , tsconfig.app.json , tsconfig.node.json** : Configurações TypeScript
- **vite.config.ts** : Configuração do Vite (bundler)

## Fluxo Principal da Aplicação

1. O usuário acessa a aplicação e é redirecionado para a página de login (LoginView.vue)
2. Após autenticação, o usuário é direcionado para o dashboard apropriado baseado em seu perfil
3. O sistema utiliza rotas protegidas para garantir que apenas usuários autorizados acessem determinadas áreas
4. A comunicação com o backend é feita através dos serviços em src/api/actions
5. O estado global é gerenciado através das stores em src/stores
6. Componentes reutilizáveis são utilizados para construir as interfaces

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
