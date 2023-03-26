import tmi from 'tmi.js';
import * as dotenv from 'dotenv'
import { connection } from './connection.js';
import { supports } from './supports.js';

dotenv.config()
let lastId = 60;
let newParticipant = [];

function fetchData() {
  connection.query(
    `SELECT * FROM users WHERE id > ${lastId} AND created_at >= DATE_ADD(NOW(), INTERVAL -2 HOUR)`,
    (error, results, fields) => {
      if (error) throw error;
      results.forEach((row) => {
        newParticipant.push(row.name);
        lastId = row.id;
      });
      client.channels = newParticipant;
    }
  );
  console.log(`add new participants to bot -> ${newParticipant}`);
  botToAll(newParticipant);
  newParticipant.splice(0, newParticipant.length);
}


const client = new tmi.Client({
  options: { debug: true },
	identity: {
    username: process.env.PRIVATE_USERNAME,
		password: process.env.PRIVATE_AUTH,
	},
  channels: newParticipant
});

client.connect();

const botToAll = (newParticipant) => {
  newParticipant?.map((participant, index) => {
    setTimeout(() => {
      client.say(participant, `🎉 Merci d'avoir participé à Findmeastreamer ! Votre soutien est grandement apprécié 🙌`);
    }, 2000 * index)
  })
}

//Each 20 secondes
setInterval(() => {
  fetchData();
  botToAll();
}, 20000)


//Each 30 minutes
setInterval(async () => {
  try {
    const data = await supports();
    console.log(data);
    data?.map((user) => {
      client.say(user.name, `Si tu aimes FindMeAStreamer, n'hésite pas à nous soutenir en faisant un petit don pour couvrir les coûts des serveurs, situé en bas de notre page Findmeastreamer. Tu peux également faire connaître notre site à tes amis pour nous aider à grandir. Bon streaming !`);
    })
  } catch (error) {
    console.error(error);
  }
}, 1800000);





