require("dotenv").config();
const DBL = require("dblapi.js");

const token = process.env.TOPGG_TOKEN
const port = process.env.PORT
const auth = process.env.TOPGG_AUTH

const dbl = new DBL(token, { webhookPort: port, webhookAuth: auth });

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
  // call database here
});
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})