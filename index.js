import { defineServer, defineRoom, Room } from "colyseus";
import { schema, t } from "@colyseus/schema";
import express from "express";

// 1. Estado: cada jugador tiene x, y
const Jugador = schema({ x: t.number().default(100), y: t.number().default(100) }, "Jugador");
const Estado = schema({ jugadores: t.map(Jugador) }, "Estado");

// 2. Sala
class MiSala extends Room {
  state = new Estado();

  messages = {
    mover: (client, pos) => {
      const jugador = this.state.jugadores.get(client.sessionId);
      console.log(client.sessionId);
      jugador.x = pos.x;
      jugador.y = pos.y;

    },

  };


  onJoin(client) {
    this.state.jugadores.set(client.sessionId, new Jugador());
    console.log(client.sessionId)
  }

  onLeave(client) {
    this.state.jugadores.delete(client.sessionId);
  }
}

// 3. Servidor + Express
const server = defineServer({
  rooms: { mi_sala: defineRoom(MiSala) },
  express: (app) => {
    app.use(express.json())
    app.get("/hola", (req, res) => res.send("Hola desde Express"))
    app.post("/login", (req, res) => {
      console.log(req.body)
      res.send("Hola desde Express")
    })

  },
});

server.listen(2567);