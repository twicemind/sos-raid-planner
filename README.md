# SOS-Raid-Planner

## Installation

### Local

### Docker

1. create a file named ``config.json``

```json
{
  "discord": {
    "token": "your_token"
  },
  "raid": {
    "content": {
      "header": "__RESERVOIR RAID:__",
      "options": {
        "row1": "1st:",
        "row2": "2nd:",
        "row3": "3rd:",
        "timezone": "UTC"
      },
      "description": "React to this message to participate or reserve a spot.",
      "participant": {
        "header": "__PARTICIPANTS:__",
        "description": "(Register for Participants only if you'll do your best to attend all the three options)"
      },
      "reserve": {
        "header": "__RESERVES:__"
      }
    },
    "buttons": [
      {
        "id": "participate",
        "label": "Participant",
        "type": "success"
      },
      {
        "id": "reserve",
        "label": "Reserve",
        "type": "primary"
      },
      {
        "id": "userParticipate",
        "label": "Add User to Participant",
        "type": "secondary"
      },
      {
        "id": "userReserve",
        "label": "Add User to Reserve",
        "type": "secondary"
      }
    ]
  },
  "cc": {
    "content": {
      "header": "__CAPITAL CLASH:__",
      "description": "React to this message to participate or not",
      "yes": "__YES, I'll participate until is needed:__",
      "yesbut": "__I'll play only a few hours [from ....to...]:__",
      "nope": "__NOPE, can not participate:__"
    },
    "buttons": [
      {
        "id": "ccyes",
        "label": "YES",
        "type": "success"
      },
      {
        "id": "ccyesbut",
        "label": "YES BUT",
        "type": "primary"
      },
      {
        "id": "ccnope",
        "label": "NOPE",
        "type": "danger"
      }
    ]
  },
  "svs": {
    "content": {
      "header": "__STATE VS. STATE:__",
      "description1": "crossing state from 08:45 UTC",
      "description2": "porting to capital (our capital if we lose, opponents' capital if we win preparation stage) at 09:00 UTC",
      "description3": "fight: 10:00 UTC",
      "description4": "React to this message to participate or not",
      "yes": "__YES, I'll participate until is needed:__",
      "yesbut": "__I'll play only a few hours [from ....to...]:__",
      "nope": "__NOPE, can not participate:__"
    },
    "buttons": [
      {
        "id": "svsyes",
        "label": "YES",
        "type": "success"
      },
      {
        "id": "svsyesbut",
        "label": "YES BUT",
        "type": "primary"
      },
      {
        "id": "svsnope",
        "label": "NOPE",
        "type": "danger"
      }
    ]
  }
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

3. create a file named ``docker.sh``

```bash
#!/bin/bash

docker stop raidar || :
docker rm raidar || :

docker run --name raidar \
-v %YOUR_PATH_TO_CONFIG/config.json:/app/config.json \
-v %YOUR_PATH_TO_CONFIG/config.deploy.json:/app/config.deploy.json \
-v /etc/localtime:/etc/localtime:ro \
--restart=unless-stopped \
-d raraesh/raidar:alpine-latest
```