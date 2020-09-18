const Discord = require('discord.js');
const config = require('./config.json');

let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(config.riot_api_key, Region.NA);

const client = new Discord.Client();

client.on('ready', () => {
    console.log('This bot is online!');

})

client.on('message', message =>{

    const args = message.content.slice(config.prefix.length).split(/ +/);

    if (args[0] == "summoner")  {
        LeagueAPI.getSummonerByName(args[1])
        .then(function(accountInfo) {
        message.channel.send(accountInfo.name.toString() + "'s account level is: " + accountInfo.summonerLevel.toString());
	    console.log(accountInfo);
        })
        .catch(console.log);
    }

    else if (args[0] == "current"){

        LeagueAPI.getSummonerByName(args[1])
	    .then(function(accountObject) {
		    // Gets active games. Will return 404 if not currently in an active game
		    return LeagueAPI.getActiveGames(accountObject);
	    })
	    .then(function(activeGames) { 
            console.log(activeGames);
            var players = "";
            for (var i = 0; i < activeGames.participants.length; i++)   {
                if (i == 0) {
                    players = "On " + args[1] + "'s team:";
                }
                if (i == 5) {
                    players = players + "\n\nOn enemy team:";
                }
                players = players + "\n" + activeGames.participants[i].summonerName.toString();
            }
            message.channel.send(players);
            
	    })
	    .catch(console.log);
    }



})

client.login(config.token);
