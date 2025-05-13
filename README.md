# PshhhOfertas - Editor de Templates para Instagram

Este projeto é um aplicativo web para criar e editar templates profissionais de 1080x1080 pixels para o Instagram da loja PshhhOfertas, destacando produtos e promoções de Shopee, Amazon e Mercado Livre.

## Funcionalidades

- ✅ Interface amigável para criação de templates para Instagram
- ✅ Personalização de cores, textos e imagens 
- ✅ Exibição de preços originais, descontos calculados automaticamente e links de afiliados
- ✅ Suporte para produtos das principais lojas online (Shopee, Amazon, Mercado Livre)
- ✅ Exportação dos templates criados

## Estrutura do Projeto

```
├── client
│   ├── src
│   │   ├── components      // Componentes da interface do usuário
│   │   ├── hooks           // React hooks personalizados  
│   │   ├── lib             // Utilitários e funções auxiliares
│   │   ├── pages           // Páginas principais do aplicativo
│   │   ├── App.tsx         // Componente principal da aplicação
│   │   ├── index.css       // Estilos globais
│   │   └── main.tsx        // Ponto de entrada do React
│   └── index.html          // HTML base
├── server
│   ├── index.ts            // Servidor Express
│   ├── routes.ts           // Rotas da API
│   ├── storage.ts          // Camada de armazenamento
│   └── vite.ts             // Configuração do Vite
├── shared
│   └── schema.ts           // Esquemas compartilhados
├── package.json            // Dependências do projeto
└── outros arquivos de configuração
```

## Pré-requisitos

- Node.js (versão 16.x ou superior)
- npm (versão 8.x ou superior)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   cd pshhhofertas-templates
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar localmente

1. Inicie o servidor de desenvolvimento:

   **Para macOS/Linux**:
   ```bash
   npx cross-env NODE_ENV=development tsx server/index.ts
   ```

   **Para Windows**:
   ```bash
   npx cross-env NODE_ENV=development tsx server/index.ts
   ```
   ou
   ```bash
   set NODE_ENV=development && tsx server/index.ts
   ```

2. Acesse a aplicação em seu navegador (a porta será exibida no console quando o servidor iniciar):
   ```
   http://localhost:3000
   ```

**Nota**: O projeto agora usa a porta 3000 por padrão. Se houver algum problema com a porta, você pode definir uma porta personalizada através da variável de ambiente PORT:

```bash
npx cross-env PORT=4000 NODE_ENV=development tsx server/index.ts
```

## Solução de problemas comuns

### Erro de porta em uso
Se você receber um erro indicando que a porta já está em uso, tente:
```bash
PORT=3001 npm run dev
```

### Problemas com tipos do TypeScript
Se encontrar erros relacionados a tipos do TypeScript, certifique-se de que todas as dependências foram instaladas corretamente:
```bash
npm install --force
```

## Tecnologias utilizadas

- **Frontend**: React, TypeScript, TailwindCSS, shadcn UI
- **Backend**: Express.js, Node.js
- **Armazenamento**: Memória (para desenvolvimento)

## Licença

Este projeto é licenciado sob a licença MIT.