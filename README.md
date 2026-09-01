# contratos-taubate

Esse projeto é um formulário eletrônico para o registro de contratos públicos e a geração de planilhas padronizadas.

---

## Sumário

* [Sobre o projeto](#sobre-o-projeto)
* [Funções](#funções)
* [Tecnologias usadas](#tecnologias-usadas)
* [Instalação](#instalação)
* [Desenvolvimento e deploy](#desenvolvimento-e-deploy)

---

## Sobre o projeto

Havia a necessidade de padronizar a forma como eram preenchidas as informações relacionadas a contratos públicos, com o objetivo de possibilitar a implementação de fluxos de automação e facilitar a utilização de ferramentas de visualização de dados, como o Power BI.

Essa aplicação busca estabelecer uma base de dados sólida e padronizada para esses fins.

O público-alvo do projeto são servidores públicos da Prefeitura de Taubaté responsáveis pelo fornecimento de informações e dados referentes aos contratos de suas respectivas secretarias.

---

## Funções

* Simplifica o registro de grandes volumes de contratos;
* Padroniza a base de dados gerada a partir dos registros, disponibilizada em planilhas no formato `.xlsx`;
* Facilita o registro de contratos com informações repetitivas;
* Permite a união de múltiplas bases de dados em um único arquivo `.xlsx`.

---

## Tecnologias usadas

* **Linguagem principal:** TypeScript
* **Frontend:** React (Vite)
* **Backend:** A aplicação não possui um backend
* **Persistência de dados:** Os dados são armazenados em arquivos `.xlsx` gerados pela aplicação
* **Gerenciamento de pacotes:** pnpm
* **Deploy:** Vercel

---

## Instalação

Assumindo que o dispositivo utilizado para contribuir com o desenvolvimento da aplicação já possua o gerenciador de pacotes `pnpm` e o Git instalados, siga os passos abaixo para clonar e instalar o código-fonte da aplicação.

### 1. Clonar o repositório

Clone o repositório e acesse a pasta do projeto:

```shell
git clone https://github.com/gustavoZuin237/contratos-taubate.git
cd contratos-taubate
```

### 2. Instalar as dependências

Instale as dependências do projeto utilizando o `pnpm`:

```shell
pnpm install
```

### 3. Iniciar o ambiente de desenvolvimento

Inicie a aplicação em ambiente de desenvolvimento:

```shell
pnpm run dev
```

Após iniciar a aplicação, acesse `http://localhost:5173/` em seu navegador para utilizá-la.

### Instalação das ferramentas necessárias

Caso o dispositivo não possua o Git ou o `pnpm` instalados, consulte as referências abaixo:

* [Instalação do Git](https://git-scm.com/install/)
* [Instalação do pnpm](https://pnpm.io/installation)

---

## Desenvolvimento e deploy

Durante o desenvolvimento, recomenda-se utilizar **branches separados** para cada nova funcionalidade ou alteração, realizando implementações graduais e iterativas.

Também é recomendado testar todos os aspectos do sistema que possam ser afetados pelas alterações desenvolvidas e solicitar a revisão e aprovação de outros membros envolvidos no desenvolvimento antes de realizar o *merge* das alterações na branch `main`.

Após o *merge* na branch `main`, a versão de produção da aplicação é atualizada automaticamente pela plataforma Vercel.

A versão de produção está disponível no seguinte endereço:

https://contratos-taubate.vercel.app/
