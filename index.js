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

  if (user){
    const isWeekend = new Date().getDay() % 6 == 0;
    const healPotionPrize = determineHealPotionPrize(user.hero.rank)
    const yesterday = new Date(Date.now() - 86400000)

    /* if (user.hero.inventory.Carrot === undefined){
      user.hero.inventory.Carrot = 0
    } */
    if (user.hero.inventory[healPotionPrize] === undefined){
      user.hero.inventory[healPotionPrize] = 0
    }

    // user.hero.inventory.Carrot += 1
    user.hero.inventory[healPotionPrize]+=1
    user.cooldowns.miniboss = yesterday
    if (isWeekend){
      user.cooldowns.dungeon = yesterday
    }
    await user.save()
  }
  return false
});


const determineHealPotionPrize = rank =>{
  
  const healPotions= ["Small Healing Potion","Large Healing Potion","Enourmous Healing Potion","Quality Healing Potion","Mega Healing Potion"]
  let prize;
  switch (true) {
    case rank < 3:
      prize= healPotions[0]
      break;
    case rank < 6:
      prize= healPotions[1]
      break;
    case rank < 9:
      prize= healPotions[2]
      break;
    case rank < 15:
      prize= healPotions[3]
      break;
    case rank < 20:
      prize= healPotions[4]
      break;
    default:
      prize = healPotions[4]
      break;
  }
  return prize

}