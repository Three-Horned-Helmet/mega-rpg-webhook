require("dotenv").config();
const DBL = require("dblapi.js");
const User = require("./User");

const token = process.env.TOPGG_TOKEN
const port = process.env.PORT
const auth = process.env.TOPGG_AUTH

const dbl = new DBL(token, { webhookPort: port, webhookAuth: auth });

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async vote => {
  console.log(`User with ID ${vote.user} just voted!`);
  let user;
  try {
    user = await User.findOne({'account.userId': vote.user})
  } catch (err){
    console.error('error: ', err)
  }
  console.log(user,'user0')

  if (user){
    console.log(user,'user')
    if (user.hero.inventory.carrots === undefined){
      user.hero.inventory.carrots = 0
    }
    user.hero.inventory.carrots += 1
    await user.save()
  }
  return false
});
