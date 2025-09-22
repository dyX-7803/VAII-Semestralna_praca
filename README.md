Pre spustenie aplikácie je potrebné mať nainštalované node.js a postresql databázu.
Následne je potrebné vytvoriť .env súbor podľa predlohy s údajmi databázy.

Tabuľky do databázy načítať pomocou príkazu:

node dbSetup.js

Potom v priečinku server spustiť server príkazmi:

npm install
node server.js

Následne spustiť klienta v priečinku client pomocou:

npm install
npm start
