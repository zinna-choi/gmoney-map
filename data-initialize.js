require("dotenv").config();

const databaseProvider = require("./dist/server/database/database.provider")
  .databaseProvider;

const gSave = require("./dist/server/gmoney/gmoney.service").default;

console.log(databaseProvider);

(async () => {
  await databaseProvider();
  await gSave.savedGmoneyData();
})();
