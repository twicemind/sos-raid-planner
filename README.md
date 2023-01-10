# SOS-Raid-Planner

## Installation

### Discord
1. Open your Discord-API Page
2. Add a new Application
3. Configure Application as Bot
4. Enable App-Authorization
https://discordjs.guide/#before-you-begin

### Docker

1. create a file named ``config.json``

```js
export let discord = {
  token: 'YOUR_TOKEN',
  }
  
export let bot = {
  prefix: 'radr',
  activity: {
    name: 'with the Reservoir Raid',
    type: 'PLAYING'
  }
}

export let buff = {
  content: {
    color: 'blue',
    header: '__GOVERNOR HONORS:__',
    description: 'Sign up now for a buff from the Governor Honor list!',
    options: {
      cs: {
        header: '__CHIEF STRATEGIST:__',
        description: {
          header: '**Chief Strategist**',
          value: 'This title gives a 10% increase in research, construction and training speed.'
        }
      },
      mo: {
        header: '__MIGHTY OX:__',
        description: {
          header: '**Mighty Ox**',
          value: 'This title gives an 80% increase in basic resource production in their settlement.'
        }
      },
      mm: {
        header: '__MASTER MEDIC:__',
        description: {
          header: '**Master Medic**',
          value: 'This title gives an additional 5.0k capacity in your hospital and 100% increase in healing speed.'
        }
      },
      ww: {
        header: '__WAR WOLF:__',
        description: {
          header: '**War Wolf**',
          value: 'This title increases the troop lethality stats by 10%.'
        }
      },
      if: {
        header: '__IRON FIST:__',
        description: {
          header: '**Iron Fist**',
          value: 'This title increases the troop attack stats by 5% and the march capacity by 2.5k.'
        }
      },
      pa: {
        header: '__PATRIOT:__',
        description: {
          header: '**Patriot**',
          value: 'This title increases the training speed by 50% and the training capacity by 200.'
        }
      }
    }
  },
  buttons: [
    {
      id: 'buffChiefStrat',
      label: 'Chief Strategist',
      type: 'success'
    },
    {
      id: 'buffMightyOx',
      label: 'Mighty Ox',
      type: 'success'
    },
    {
      id: 'buffMasterMedic',
      label: 'Master Medic',
      type: 'success'
    },
    {
      id: 'buffWarWolf',
      label: 'War Wolf',
      type: 'success'
    },
    {
      id: 'buffIronFist',
      label: 'Iron Fist',
      type: 'success'
    },
    {
      id: 'buffPatriot',
      label: 'Patriot',
      type: 'success'
    }
  ]
}

export let raid = {
  content: {
    color: 'red',
    header: 'RESERVOIR RAID',
    options: {
      row1: '1st timeslot',
      row2: '2nd timeslot',
      row3: '3rd timeslot',
      timezone: 'UTC'
    },
    description: 'React to this message to participate or reserve a spot.',
    participant: {
      header: 'PARTICIPANTS',
      description: '(Register for Participants only if you\'ll do your best to attend all the three options)'
    },
    reserve: {
      header: 'RESERVES'
    }
  },
  buttons: [
    {
      id: 'participate',
      label: 'Participant',
      type: 'success'
    },
    {
      id: 'reserve',
      label: 'Reserve',
      type: 'primary'
    },
    {
      id: 'userParticipate',
      label: '+ Participant',
      type: 'secondary'
    },
    {
      id: 'userReserve',
      label: '+ Reserve',
      type: 'secondary'
    }
  ]
}

export let help = {
  content: {
    color: 'yellow',
    header: 'HELP',
    description: 'Raidar is a bot that helps you organize your raids. It\'s easy to use and it\'s free. Just follow the instructions below and you\'ll be ready to go in no time.',
  },
  buttons: []
}

export let svs = {
  content: {
    color: 'blue',
    header: 'STATE VS. STATE',
    options: {
      header1: ':small_red_triangle: 8:45 UTC',
      header2: ':small_red_triangle: 9:00 UTC',
      header3: ':small_red_triangle: 10:00 UTC',
      description1: 'crossing state',
      description2: 'porting to capital (our capital if we lose, opponents\' capital if we win preparation stage)',
      description3: 'fight',
      timezone: 'UTC'
    },
    description: 'React to this message to participate or reserve a spot.',
    yes: {
      header: 'YES, I\'ll participate FULL-TIME',
    },
    yesbut: {
      header: 'I\'ll play PART-TIME [from...to...] '
    },
    nope: {
      header: 'No, I can\'t. Will shield from 8:45utc to 19utc'
    }
  },
  buttons: [
    {
      id: 'svsyes',
      label: 'YES',
      type: 'success'
    },
    {
      id: 'svsyesbut',
      label: 'YES BUT',
      type: 'primary'
    },
    {
      id: 'svsnope',
      label: 'NOPE',
      type: 'danger'
    },
    {
      id: 'usersvsyes',
      label: '+ YES',
      type: 'secondary'
    },
    {
      id: 'usersvsyesbut',
      label: '+ YES BUT',
      type: 'secondary'
    },
    {
      id: 'usersvsnope',
      label: '+ NOPE',
      type: 'secondary'
    }
  ]
}

export let cc = {
  content: {
    color: 'orange',
    header: 'CAPITAL CLASH',
    options: {
      header1: ':small_red_triangle: 9:00 UTC',
      header2: ':small_red_triangle: 10:00 UTC',
      description1: 'porting to capital',
      description2: 'fight',
      timezone: 'UTC'
    },
    description: 'React to this message to participate or reserve a spot.',
    yes: {
      header: 'YES, I\'ll participate FULL-TIME',
    },
    yesbut: {
      header: 'I\'ll play PART-TIME [from...to...] '
    },
    nope: {
      header: 'No, I can\'t. Will shield from 8:45utc to 19utc'
    }
  },
  buttons: [
    {
      id: 'ccyes',
      label: 'YES',
      type: 'success'
    },
    {
      id: 'ccyesbut',
      label: 'YES BUT',
      type: 'primary'
    },
    {
      id: 'ccnope',
      label: 'NOPE',
      type: 'danger'
    },
    {
      id: 'ccyesUser',
      label: '+ YES',
      type: 'secondary'
    },
    {
      id: 'ccyesbutUser',
      label: '+ YES BUT',
      type: 'secondary'
    },
    {
      id: 'ccnopeUser',
      label: '+ NOPE',
      type: 'secondary'
    }
  ]
}
```

2. create a file named ``config.deploy.json``

```json
{
  "discord": {
    "token": "your_token",
    "client_id": "your_client_id",
    "guilds": [
      {
        "id": "your_guild_id",
        "name": "your_guild_name"
      },
      {
        "id": "your_guild_id",
        "name": "your_guild_name"
      }
    ]
  }
}
```

3. create a file named ``config.deploy.js``
```js
export const discord = {
  token: 'your_token',
  client_id: 'your_client_id',
  guilds: [
    {
      id: 'your_guild_id',
      name: 'your_guild_name'
    },
    {
      id: 'your_guild_id2',
      name: 'your_guild_name2'
    }
  ]
}
```

4. create a file named ``docker.sh``

```bash
#!/bin/bash

docker stop raidar || :
docker rm raidar || :

docker run --name raidar \
-v %YOUR_PATH_TO_CONFIG/config.js:/app/srv/config.js \
-v %YOUR_PATH_TO_CONFIG/config.deploy.js:/app/src/config.deploy.js \
-v /etc/localtime:/etc/localtime:ro \
--restart=unless-stopped \
-d raraesh/raidar:alpine-latest
```

## Guild Create and Guild Delete
The bot is now configured to respond to GuildCreate and GuildDelete events and update the config.deploy.js file. This ensures that even after restarting the container, command-deploys are possible on all Discord servers on which the bot is invited.