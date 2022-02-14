# pixel_api

Esta é a API do projeto pixel

# Deploy

1 - Configure as variáveis de ambiente

```bash
touch .env
echo DB_HOST=localhost > .env
echo APP_PORT=3001 >> .env
echo DB_PORT=5432 >> .env
echo DB_NAME=database >> .env
echo DB_USER=admin >> .env
echo DB_PASS=postgres >> .env
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
