#!/bin/bash
echo $1
if [ -n "$1" ]; then
  echo "Rodando o comando build do projeto"
  sleep 2

  pnpm run build-only


  echo "criando a imagem do docker"

  docker build -t joreel/one-print:front-end$1 .

  docker push joreel/one-print:front-end$1


else
  echo "Digite a versão para criar o docker e compilar"
  ls

fi

trap "echo 'Script interrompido'; exit" SIGINT
