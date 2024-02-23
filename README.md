# Umami Friends
Umami Showdowns are head to head (1 versus 1 or 2 versus 2) recipe battles that take place in the Umamiverse. Umami chefs take turns combining ingredients and recipes to gain abilities and earn Umami points.

Umami Friends application is currently in development; information below includes set up for local development only; game will be dockerized and deployed once completed.

## Basic Gameplay
Rules for how to play Umami Friends can be found [here](https://umamifriends.fandom.com/wiki/Card_Game_Ruleset)

## Tech Stack
Umami Friends is based on a React framework front end and a websocket server utilizing socket.io package. As users join game sessions, the front end and server communicate to keep track of users, update game states, and reflect any changes to all screens logged into same socket.

### React Front End
#### State Management
The frontend state is managed via context/providers and custom hooks. The application itself is wrapped in a context provider that encompasses all other providers, allowing users access to all slices of state at once.

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/6e56067f-af45-463e-8030-c6e199692421)

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/6534dc75-8d36-4063-b75b-eff29ef52b2b)

These providers manage different slices of state, such as the user context and the gamestate context. In the gamestate provider, any updates to the gamestate sent from the server are automatically listened to and modify our front end game state

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/64350f1a-10f8-4875-82d1-930ee8815e1a)

All slices of this state can be accessed via custom hooks in the components on the front end, keying into any values set by the provider

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/4068cb3e-fc08-4fb6-84d3-32ab0fe26377)


#### Components
Umami Friends has the following components on screen
- Header -- This component contains user name, room code, user role icon, opponent role icon, opponent name, game title, and start game button.
- Player boards -- This component is displayed twice to show both the current user's board and their opponent's board
- Player hands -- Users can see all cards in their hands
- Card grid -- just like the original card game, 10 basic recipes and 10 rare recipes are displayed on screen
- Role choice modal -- Players will select a character prior to start of game
- Messaging box/game log -- Players can communicate with other opponents in the same game room
- Ingredient card stack -- Players can select this to draw cards
- Ingredient/Recipe cards -- These populate the player hands, player boards, and card grid
  



### Server
The websockets server is created using express in node.js and then connected to websockets using socket.io package. Note: server set-up seen below is only for local development; cors security and port numbers should be updated per deployment needs.

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/9e99adc3-5f73-4821-8d02-73e09eec32d8)

The server then uses a variety of load commands to listen to the front end and handle any actions. Any actions using "socket.emit" on the front end will be acted on by this server using the "socket.on" listener; this works the same way backend to frontend

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/4d2788d0-64de-4894-83a8-bc784e6da31d)

These helper functions will directly modify the gamestate and emit corresponding information back to the frontend server

![image](https://github.com/CaitlinConway/umami-friends/assets/65358987/e0af6c73-2fb9-4e02-8830-85d3663f7f0f)

