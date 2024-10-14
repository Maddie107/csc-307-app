// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      id: "qwe123",
      job: "Zookeeper",
      name: "Cindy"
    }
  ]
};

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};


const deleteUser = (id) =>{ 
 const newLst = users["users_list"].filter(
  (user) => user["id"] != id
 );
 users["users_list"] = newLst;
}
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deletedUser = findUserById(id);
  if( deletedUser != undefined){
    let result = deleteUser(id);
    res.send(result);
  }else{
    res.status(404).send("Delete failed.");
  }
});

const findUserByNameAndJob = (name, job) =>{
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (job && name != undefined ){
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result};
    res.send(result);
  }
  else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  }else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});