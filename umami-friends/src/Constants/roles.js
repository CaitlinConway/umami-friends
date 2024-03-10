const dig = (socket, roomCode) => console.log("Sasha is taking an action");
const doubleFronkBurger = (socket, roomCode) => console.log("Fronk is taking an action");
const wellRested = (socket, roomCode) => console.log("Coco is taking an action");
const hatch = (socket, roomCode) => console.log("Damien is taking an action");
const inflame = (socket, roomCode) => console.log("Shinra is taking an action");
const leftovers = (socket, roomCode) => console.log("Ramona is taking an action");

export const playerRoles = {
  "Sasha": {
    userActionIsPassive: true,
    userAction: (socket, roomCode) => dig(socket, roomCode)
  },
  "Coco": {
    userActionIsPassive: true,
    userAction: (socket, roomCode) => wellRested(socket, roomCode)
  },
  "Damien": {
    userActionIsPassive: false,
    userAction: (socket, roomCode) => hatch(socket, roomCode)
  },
  "Fronk": {
    userActionIsPassive: false,
    userAction: (socket, roomCode) => doubleFronkBurger(socket, roomCode)
  },
  "Shinra": {
    userActionIsPassive: false,
    userAction: (socket, roomCode) => inflame(socket, roomCode)
  },
  "Ramona": {
    userActionIsPassive: false,
    userAction: (socket, roomCode) => leftovers(socket, roomCode)
  }
}