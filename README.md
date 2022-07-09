# eventsCalendarApi (Back-End)
Repositório da API do projeto eventsCalendar.

Front-end do projeto:
https://github.com/viniciuslimaan/eventsCalendar

Para visualizar em seu computador use:

```
git clone https://github.com/viniciuslimaan/eventsCalendarApi.git
```

## Tecnologias utilizadas
* JavaScript
* MongoDB
* Node
    * Express
    * Mongoose
    * Nodemon / devDependencies
    * Date-fns
    * Jonwebtoken
    * Bcryptjs
    * Validator
    * Cors
    * Dotenv

## Variáveis de ambiente
Para utilizar essa aplicação, será necessário a criação de um arquivo ".env" na pasta raiz do projeto com as seguintes variáveis: 

```
JWT_EXPIRES=(Uma quantidade de tempo para expirar o token das contas. Ex: 7d)
JWT_SECRET_TOKEN=(Algum texto aleatório que seja o mesmo colocado no token do FrontEnd. Ex: 5fg1h5fdg1hf5dgh41fd5g)
```
