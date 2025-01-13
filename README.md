Pre spustenie aplikácie je potrebné mať nainštalované node.js a postresql databázu.
Následne je potrebné vytvoriť .env súbor podľa predlohy s údajmi databázy.

Tabuľky do databázy načítať pomocou príkazu:

node dbSetup.js

Pre inštalciu v koreňovom priečinku spustiť príkaz:

npm start

Potom v priečinku server spustiť server príkazom:

node server.js

Následne spustiť klienta v priečinku client pomocou:

npm start
