# Usa a imagem do node para criar o container
FROM node 

# Local/diretório onde ficam salvos/contidos os arquivos
WORKDIR /usr/app

# Copia o arquivo package.json para a raiz do WORKDIR
COPY package.json ./package.json

# Roda o comando npm install para instalar as depedências (usa o npm porquê é padrão do Node e não tem que baixar nada)
RUN npm install

# Copia tudo para a raiz do WORKDIR
COPY . .

# Expõe a porta 3333 no container do Docker
EXPOSE 3333

# Roda comandos na máquina para startar a aplicação
CMD ["npm", "run", "dev"]

# Tudo isso gera uma imagem do nosso container que podemos rodar no Docker