## Peoples Map Front

Api desenvolvida utilizando o framework React, utilizando as seguintes bibliotecas:
 - material-ui
 - material-ui-pickers
 - materialize-css
 - axios
 - moment
 - date-fns
 - react-leaflet
 - react-router
 - simple-react-validator


O projeto pode ser rodado localmente, através dos comandos:


### `yarn install`
Para instalar todas dependencias


### `yarn start`
Para iniciar a aplicação


Após a execução a api estará disponível na url:
 - http://localhost:3000


O projeto também se encontra disponível hospedado no Heroku:
- http://http://peoplesmap-front.herokuapp.com/:8000

OBS:. A aplicação deve ser acessada com o protocolo HTTP.

OBS:. Ao entrar em hibernação a instância do Postgres é resetada, apagando os dados salvos.

está hospedado no plano gratuito onde tem acesso a uma instancia do Postgres
e a cada 1 hora sem acessos entra em modo de hibernação, demorando alguns segundos
para retornar ao seu funcionamento após o primeiro acesso.
