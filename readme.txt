Spustění projektu -
BACKEND
cd do složky backend
npm install / jen poprvé
npm run dev | npm run start
-----------------------------------
FRONTEND
nový split terminal
cd do složky frontend
npm install / jen poprvé
npm start
-----------------------------------
Spuštění databáze
// pokud neni vytvořená složka mongo-data, tak ji vytvořit!!
// musí byt nainstalován a spuštěn Docker
cd do main složky projektu
Docker-compose up -d --build (aby se vytvořil nový image)
Docker-compose up (spuštění databáze)