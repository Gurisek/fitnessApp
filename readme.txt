Spustění projektu -
cd do složky backend
npm install
npm run dev | npm run start
-----------------------------------
nový split terminal
cd do složky frontend
npm install
npm start
-----------------------------------
Spištění databáze
// pokud neni vytvořená složka mongo-data, tak ji vytvořit!!
cd do main složky projektu
Docker-compose up -d --build (aby se vytvořil nový image)
Docker-compose up (spuštění databáze)