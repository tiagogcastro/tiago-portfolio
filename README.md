# Tiago G Castro | Portfolio

Portfólio profissional de Tiago Castro, Desenvolvedor Full Stack com mais de seis anos de experiência em produtos digitais, backend, cloud, dados e infraestrutura.

[tiagogcastro.com.br](https://tiagogcastro.com.br)

## Sobre o projeto

O site apresenta minha trajetória por meio de casos reais, responsabilidades e resultados. Em vez de funcionar como uma cópia do currículo, a experiência conecta contexto, trabalho realizado e impacto em produção.

Os principais casos apresentados são:

- LakeIT: plataforma enterprise de dados, infraestrutura AWS, Terraform e IA aplicada a dados.
- Futbuynow: marketplace, pagamentos, SEO, analytics e automações para a operação.
- Projetos autorais e open source voltados a IA, cloud e produtividade.

## Diferenciais

- Design editorial responsivo para desktop e mobile.
- Conteúdo localizado com `next-intl`.
- Casos profissionais orientados a impacto e métricas.
- Open Graph dinâmico, metadados, JSON-LD, sitemap e robots.
- Currículos em português e inglês para download.
- Animações com suporte a `prefers-reduced-motion`.

## Tecnologias

- Next.js 16 e React 19
- TypeScript em modo estrito
- Tailwind CSS 4
- next-intl
- Motion
- Lucide React
- Yarn 4

## Executando localmente

Requisitos:

- Node.js 20.9 ou superior
- Corepack habilitado

```bash
corepack enable
yarn install
yarn dev
```

O servidor de desenvolvimento inicia em [localhost:3000](http://localhost:3000).

## Scripts

```bash
yarn dev        # servidor de desenvolvimento
yarn lint       # análise estática
yarn typecheck  # verificação do TypeScript
yarn build      # build de produção
yarn check      # lint, tipos e build
yarn format     # formatação com Prettier
```

## Estrutura

```text
messages/               traduções da interface
public/resume/          currículos para download
src/app/                rotas, metadados e estilos globais
src/components/         componentes compartilhados
src/config/             configuração pública do site
src/content/            dados estruturados
src/features/home/      seções e componentes da página inicial
src/i18n/               roteamento e configuração de idiomas
```

## Internacionalização

O idioma padrão é português do Brasil, servido em `/`. O roteamento está preparado para receber novos idiomas com prefixo de locale.

Todo texto visível é mantido em `messages/pt-BR.json`, incluindo labels, períodos e textos acessíveis.

## Deploy

O projeto pode ser publicado diretamente na Vercel. Atualmente não depende de variáveis de ambiente.

```bash
yarn check
```

Execute a verificação completa antes de publicar.

## Licença

Este é um projeto pessoal e está marcado como `UNLICENSED`. O conteúdo, a identidade visual e os dados profissionais não possuem permissão automática para redistribuição.
