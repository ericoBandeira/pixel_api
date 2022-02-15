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
