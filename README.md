# ETLmateusPUC
Atvidade ETL backend PUC 18/06/2024

Francisco Cardoso de Oliveira Filho RA:22007663
Eduardo Yuki RA:22013592
Fabricio Martello Martins  RA:22002646
Lucas Canto  RA: 22018007

npm install: Instala as dependencias 
node setupDataBase.js: Executa o script de configuração do banco de dados.
npx tsc: Compila os arquivos TypeScript para JavaScript.
npm start: Compila o TypeScript e inicia o servidor.

O servidor estará rodando em http://localhost:3000.

No POSTMAN:
Listar Ações
Método: GET
Endpoint: /acoes
Descrição: Retorna uma lista de todas as ações disponíveis.
Exemplo de Uso no Postman:
Selecione o método GET.
Insira a URL: http://localhost:3000/acoes.


Criar Ordem
Método: POST
Endpoint: /ordens
Descrição: Cria uma nova ordem de compra ou venda.

EXEMPLO: 
{
  "tipo": "compra",
  "quantidade": 15,
  "usuario": "usuario1",
  "acao": "Apple"
}



Cancelar Ordem

Método: DELETE
Endpoint: /ordens/:id
Descrição: Cancela uma ordem existente pelo ID.
Exemplo de Uso no Postman:
Selecione o método DELETE.
Insira a URL: http://localhost:3000/ordens/11 (substitua 11 pelo ID da ordem que deseja cancelar)

Obter Carteira do Usuário
Método: GET
Endpoint: /carteira/:usuario
Descrição: Retorna a carteira de um usuário específico.
Exemplo de Uso no Postman:
Selecione o método GET.
Insira a URL: http://localhost:3000/carteira/usuario1 (substitua usuario1 pelo nome do usuário).
