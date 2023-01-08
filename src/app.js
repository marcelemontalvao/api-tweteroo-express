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

server.post("/tweets", (request, response) => {
    const {username, tweet} = request.body

    if (!username) {
	    response.send('Preencha seu nome!');
        return;
	} else if (!tweet){
        response.send('Preencha seu tweet!');
        return;
    }

    if(users.find((user) => user.username === username)) {
        const tweetObj = {
            username: username,
            tweet: tweet
        }
        
        tweets.push(tweetObj)
        response.send("OK")
    } else {
        response.send("UNAUTHORIZED")
    }
})

server.get("/tweets", (request, response) => {

    tweets.forEach((tweet) => {
        const { avatar }  = users.find((user) => user.username === tweet.username)
        tweet.avatar = avatar
    })

    if(tweets.length <= 10) {
        return response.send([...tweets].reverse())
    } else {
        return response.send([...tweets].reverse().slice(0, 10))
    }
})