# treinamenotoaws
A aplicação simula um motor de regras de decisão de aprovação de crédito. Devido ao fato de eu ter que ficar com o braço direito imobilizado nos próximos dias, vou precisar entregar a tarefa no estado em que está.

Como testar:

Depois do SAM build e SAM deploy, ir na página da aplicação

https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/applications/MeuTeste

1 - Na API Gateway, entre na API MeuTeste

  1a - Rode, através de um teste sem parâmetros, o endpoint popularbase (GET) - essa função irá incluir 100 pessoa, com créditos aleatórios entre 0 e 100.000 na tabela TabelaCredito.
  
  2b - Rode, através de um teste sem parâmetros, o endpoint popularfila (GET) - essa função irá alimentar a fila SQS filaSolicitacaoEmprestimo com 100 solicitações de empréstimo.

2 - Na página de Step Functions entre na chamada Workflow, o fluxo será:

  2a - Ler uma solicitação de emprestimo (na fila filaSolicitacaoEmprestimo), encontrar o credito pre-aprovado para a pessoa na tabela TabelaCredito. Passar essas informações para a decisão.
  
  2b - Se valor solicitado <= creditoPreAprovado - creditoUtilizado - Aprovar crédito

  2c - Se não - Negar Crédito

  2d - Gravar o log de ações na tabela TransactionTable

  ----------------------------------------------------------------------

O que faltou fazer : 
  
  - Limpar os códigos antigos das funções/scripts que usei de exemplo
  - Definir melhor os outputs para facilitar acessar os recursos

O que eu queria ter feito a mais:

  - criar mais três filas (uma para casos aprovados, outra para casos rejeitados e outra para decisão manual) a idéia era que esse motor de decisão poderiam para outro motores de ação, através das filas
    
  - criar, na tabela de créditos, um campo, que reservaria o crédito, no momento da decisão, sendo que o crédito realmente utilizado s´seria marcado quando o motor da fila de empréstimo fizesse, de fato o empréstimo (fora do escopo desse teste)

