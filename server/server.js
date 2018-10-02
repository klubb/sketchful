require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const app = express();
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const ctrl = require("../server/controller");

app.use(express.json());

const {
  SERVER_PORT,
  SESSION_SECRET,
  REACT_APP_DOMAIN,
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET,
  CONNECTION_STRING,
  ENVIRONMENT
} = process.env;

massive(CONNECTION_STRING).then(db => app.set("db", db));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  if (ENVIRONMENT === "dev") {
    req.app
      .get("db")
      .set_data()
      .then(userData => {
        req.session.user = userData[0];
        next();
      });
  } else {
    next();
  }
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on('join room', data => {
    console.log('Room joined', data.room)
    
    socket.join(data.room);
    io.to(data.room).emit('room joined', data.room);

  })

  socket.on("chat", data => {
      // console.log(data.room)
      // io.emit('chat', data)
    io.to(data.room).emit("chat", data);
  });

  socket.on('message sent', function(data) {
   
    io.to(data.room).emit('message dispatched', data);
  })


  socket.on("cursor", data => {
    io.to(data.room).emit("cursor", {
      lineWidth: data.lineWidth,
      lineColor: data.lineColor,
      lineCoordinates: data.lineCoordinates,
        //  name: sessions[data.sessionKey]
    });
  });
  socket.on("line", data => {
    io.to(data.room).emit("line", {
      lineWidth: data.lineWidth,
      lineColor: data.lineColor,
      lineCoordinates: data.lineCoordinates
    });
  });
});

app.get("/auth/callback", async (req, res) => {
  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };
  // post request with code for token
  let tokenRes = await axios.post(
    `https://${REACT_APP_DOMAIN}/oauth/token`,
    payload
  );
  // use token to get user data
  let userRes = await axios.get(
    `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
      tokenRes.data.access_token
    }`
  );

  const db = req.app.get("db");
  const { name, picture, sub } = userRes.data;

  let foundUser = await db.find_user([sub]);

  if (foundUser[0]) {
    req.session.user = foundUser[0];
  } else {
    let createUser = await db.create_user([name, picture, sub]);
    req.session.user = createUser[0];
  }
  res.redirect("/#/dashboard");
});

app.get("/api/user-data", ctrl.checkUser);

app.get("/logout", ctrl.logout);

app.post("/api/create", ctrl.createMessage);

app.get("/api/getMessage", ctrl.getMessage);

app.delete("/api/delete/:id", ctrl.delete);

app.put("/api/edituser", ctrl.editUser);

app.delete("/api/deleteuser", ctrl.deleteUser);

server.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
