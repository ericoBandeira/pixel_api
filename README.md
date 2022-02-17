# pixel_api

Esta é a API do projeto pixel

# Deploy

1 - Configure as variáveis de ambiente

```bash
touch .env
echo DB_HOST=pixel-api-database > .env
echo APP_PORT=3001 >> .env
echo DB_PORT=5432 >> .env
echo DB_NAME=database >> .env
echo DB_USER=admin >> .env
echo DB_PASS=postgres >> .env
echo SECRET=key >> .env
```

2 - Execute a aplicação

```bash
sudo docker-compose up -d --build
```

3 - Verifique se a aplicação está rodando

```bash
curl localhost:$APP_PORT/health
```

_IMPORTANTE_: substitua a variável `$APP_PORT` pela porta da aplicação (Padrão: 3001).

4 - Suba as tabelas do banco

```bash
export DATABASE_URL=url do banco
npx sequelize db:migrate
npx sequelize db:seed:all
```

_IMPORTANTE_: a url do banco é construída da seguinte maneira: `postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME`

4.1 - Deploy no heroku

Para realizar o deploy no heroku, configure a `DATABASE_URL` usando a URL fornecida pelo heroku. Após isso, configure a
variável de ambiente `SECURE_MODE` e altere o seu valor para 1, conforme a seguir:

```bash
echo SECURE_MODE=1 >> .env
```

Para rodar as migrations no banco de dados do heroku, passe a flag `--env production` para o sequelize:

```bash
npx sequelize db:migrate --env production
npx sequelize db:seed:all --env production
```

As configurações de deploy estão localizadas em [config.json](./src/database/config/config.json)
