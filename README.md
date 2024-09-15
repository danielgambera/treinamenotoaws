# treinamenotoaws
A aplicação simula um motor de regras de decisão de aprovação de crédito. Devido ao fato de eu ter que ficar com o braço direito imobilizado nos próximos dias, vou precisar entregar a tarefa no estado em que está.

Como testar:

Depois do SAM build e SAM deploy, ir na página da aplicação

https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/applications/MeuTeste

1 - Na API Gateway, entre na API MeuTeste
  1a - Rode, através de um teste sem parâmetros, o endpoint popularbase (GET) - essa função irá incluir 100 pessoa, com créditos aleatórios entre 0 e 100.000
  2b - Rode, através de um teste sem parâmetros, o endpoint popularfila (GET) - essa função irá alimentar a fila SQS filaSolicitacaoEmprestimo com 100 solicitações de empréstimo

