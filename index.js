const Discord = require('discord.js');
const fs =  require('fs');
const config = require('./config.json');
const { Kayn, REGIONS } = require('kayn');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)    {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const kayn = Kayn(config.riot_api_key)({
    region: REGIONS.NORTH_AMERICA,
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
});

client.on('ready', () => {
    console.log('This bot is online!');
})

client.on('message', msg =>{

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

})

client.login(config.token);
