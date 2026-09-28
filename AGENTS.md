# Contexto de trabalho — Banco TRI e FinUp

Leia este arquivo antes de implementar qualquer alteração neste repositório. Ele vale para pessoas e agentes de qualquer modelo que trabalhem no projeto. Siga também as instruções do solicitante e confira o estado atual do código, das Issues e dos PRs antes de agir.

## Produto e escopo

- **Banco TRI:** protótipo bancário e fonte demonstrativa de conta/transações.
- **FinUp:** projeto acadêmico de organização e educação financeira e de indicação **preliminar** de possíveis benefícios sociais. Não confundir transações do banco com registros próprios do FinUp.
- O TAP e o projeto de intervenção no CEEP orientam o escopo acadêmico. Confira as versões vigentes desses documentos quando disponíveis. Não apresente módulos planejados como concluídos nem prometa concessão de benefícios.
- Verifique o código e o README para saber o que já funciona. Supabase e deploy somente devem ser descritos como ativos depois de implementados e validados.

## Antes de começar uma tarefa

1. Procure uma **Issue** específica para o trabalho. Se não existir, crie uma antes de implementar. Separe tarefas independentes em Issues próprias.
2. Classifique a Issue no título com **`[Correção]`**, **`[Melhoria]`** ou **`[Nova função]`**. Inclua objetivo/problema, critérios de aceite e dependências ou limitações relevantes. Não misture os três tipos numa Issue genérica.
3. Confira dependências, código e PRs em andamento para evitar repetir trabalho ou sobrescrever uma alteração ainda em revisão.
4. Trabalhe em uma branch com nome descritivo, criada a partir da base apropriada. Evite commits diretos na `main`.

## Entrega por Pull Request

- Abra um **Pull Request** para mudanças em código, documentação, configuração, infraestrutura e fluxo de deploy. Use o PR para revisão antes da integração à `main`.
- Todo PR deve conter, no corpo: **Issue(s) relacionada(s)** com referência `#n` (use `Closes #n` apenas quando o PR conclui a Issue), **o que mudou**, **como foi validado**, **riscos e limitações**, **próximos passos**. Use o modelo em `.github/pull_request_template.md`.
- Diferencie verificações executadas de verificações pendentes. Registre comandos e resultados; não declare teste visual ou deploy se não ocorreram.
- Mantenha o PR focado nas Issues citadas. Atualize a descrição e os testes quando o escopo mudar; peça revisão antes de mesclar.
- Para uma publicação, configure ou altere o processo via PR, informe ambiente, impacto, forma de verificar e caminho de reversão. Use as verificações e aprovações combinadas pela equipe antes de integrar/publicar. Hoje o repositório não tem fluxo de deploy confirmado; a definição está na Issue #14.

## Verificações do projeto

- Rode `npm run lint`, `npm test` (quando existir na branch) e `npm run build` para alterações de código, além de testar manualmente o fluxo afetado quando possível.
- Preserve a separação entre interface, regras de negócio e acesso a dados. Descreva no PR eventuais diferenças entre o protótipo e o TAP.
- Para mudanças somente em Markdown, confira links, numeração das Issues/PRs e clareza do texto; explique no PR que não há build de produto a validar.
