# Medicine Reminder

## Frontend

1. `cd client`
2. `npm install`
3. `npm start`

## Backend 

1. `cd server`
2. `npm install`
3. create database 
4. `npx sequelize-cli db:migrate`
5. `npx sequelize-cli db:seed:all`
6. setup `.env` file
6. `npm start`

## For bullmq

#### Run below commands into terminals

1. `sudo apt install redis-server`

2. `curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg`
3. `sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg`
4. `echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list`
5. `sudo apt-get update`
6. `sudo apt-get install redis`
