# Dossiê Lula

Aplicação editorial em React, TypeScript e Vite. Reúne oito fichas iniciais em oito categorias, com pesquisa, filtros, leitura detalhada, situação jurídica e links diretos para as fontes.

## Requisitos

- Node.js 20.19+ (ou 22.12+)
- npm

## Instalação e desenvolvimento

```bash
npm install
npm run dev
```

O Vite mostra o endereço local no terminal. Para gerar a versão de produção e validar os registros editoriais:

```bash
npm test
npm run build
npm run preview
```

O build de produção é gerado em `dist/`. Os testes verificam a cobertura das oito categorias, os campos obrigatórios, as referências HTTPS e as datas de verificação.

## Publicação no Cloudflare Pages

1. Envie este diretório para um repositório Git.
2. No Cloudflare Pages, conecte o repositório.
3. Configure o comando de build como `npm run build` e o diretório de saída como `dist`.
4. Use Node.js 20.19+ ou 22.12+ no ambiente de build.

Também é possível publicar o conteúdo já compilado usando `npx wrangler pages deploy dist`. O arquivo `public/_redirects` habilita o fallback de navegação da aplicação; `public/_headers` define cabeçalhos básicos para os arquivos estáticos.

## Atualizar ou corrigir uma ficha

Os registros ficam em `src/data/cases.json`; as categorias, em `src/data/categories.json`. Para cada atualização:

1. Verifique a fonte original e o andamento atual, especialmente em processos judiciais.
2. Separe investigação, denúncia, decisão, condenação, anulação, prescrição e arquivamento.
3. Atualize a data `lastVerified` em formato `AAAA-MM-DD` e mantenha as fontes com endereço HTTPS direto.
4. Descreva o contexto e as limitações dos números e registre uma nota editorial.
5. Execute `npm test` e `npm run build`.

O botão “Sugerir correção” abre um rascunho de e-mail com campos para indicar a ficha, o trecho e uma fonte. Antes de publicar, configure um endereço real no destinatário do link `mailto:` em `src/App.tsx` ou substitua-o por um canal editorial ativo. As fontes são abertas em nova aba com `noopener` e `noreferrer`.

## Fontes e escopo

As fichas iniciais consultam principalmente STF, MPF, Câmara dos Deputados, IBGE, Banco Central, Planalto e Senado. Reportagens de referência aparecem identificadas como reportagens. O arquivo é editorial, não substitui consulta processual ou leitura dos documentos originais. Datas, valores e situações jurídicas são apresentados com período e ressalvas nas próprias fichas.

## Acessibilidade e desempenho

Inclui navegação por teclado, atalho para o conteúdo, busca rotulada, modal com semântica nativa de diálogo, estados vazios, foco visível e suporte a redução de movimento. Os dados são locais e estáticos; o Google Fonts é carregado externamente. Para uma publicação sem dependência de terceiros, remova a importação de fonte externa em `src/styles.css` e mantenha as fontes de sistema definidas como fallback.
