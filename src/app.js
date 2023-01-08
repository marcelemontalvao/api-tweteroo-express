import express from "express";
import cors from "cors";

const server = express();

server.use(express.json())
server.use(cors());

server.listen("5000", () => {
    console.log("servidor executado com sucesso")
})

const users = []

const tweets = []

server.post("/sign-up", (request, response) => {
    const { username, avatar } = request.body

	if (!username) {
	    response.send('Preencha seu nome!');
        return;
	} else if (!avatar){
        response.send('Preencha seu avatar!');
        return;
    }

    const user = {
      username: username,
      avatar: avatar
    }

    users.push(user)
    response.send("OK")
})