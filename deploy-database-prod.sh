#!/bin/bash
# Script shell para executar as migrations no banco de dados do heroku

if [ -z "$DATABASE_URL" ]; then
    echo "[!] A variável DATABASE_URL está indefinida"
    echo "[+] Rode o comando: export DATABASE_URL..."
    exit 1
fi

npx sequelize db:migrate --config src/database/config/config.json
if [ "$?" != 0 ]; then
    echo "[!] Ocorreu um erro ao executar o deploy"
    exit 1
fi

npx sequelize db:seed:all --config src/database/config/config.json
if [ "$?" != 0 ]; then
    echo "[!] Ocorreu um erro ao rodar as migrations"
    exit 1
fi