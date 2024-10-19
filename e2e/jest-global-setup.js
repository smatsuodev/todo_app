const setupPuppeteer = require("jest-environment-puppeteer/setup");
const {setup: setupDevServer} = require("jest-dev-server");

module.exports = async function globalSetup(globalConfig, projectConfig) {
  await setupPuppeteer(globalConfig);

  globalThis.servers = await setupDevServer([
    {
      command: `PORT=${projectConfig.globals.FRONT_PORT} API_PORT=${projectConfig.globals.API_PORT} npm run start:test -w front`,
      port: projectConfig.globals.FRONT_PORT,
      launchTimeout: 30000,
    },
    {
      command: `npm run db:reset:test -prefix ../api && PORT=${projectConfig.globals.API_PORT} npm run start:test -w api`,
      port: projectConfig.globals.API_PORT,
      launchTimeout: 30000,
    },
  ]);
};
