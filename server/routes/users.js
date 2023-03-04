var express = require("express");
var router = express.Router();
var Redis = require("ioredis");
const jwt = require("jsonwebtoken");
const config = require("config");
const { v4: uuidv4 } = require("uuid");

var redis = new Redis();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var name = redis.get("myname");
  res.send(name);
});
// router.post("/register", function (req, res, next) {
//   var fName = req.body.email;
//   var name = redis.get("myname");
//   res.send(name);
// });

router.post("/register", function (req, res) {
  redis.hset(req.body.email, "username", req.body.username);
  console.log(req.body.username);

  redis.hset(req.body.email, "email", req.body.email);
  console.log(req.body.email);

  redis.hset(req.body.email, "phone", req.body.phone);
  console.log(req.body.phone);

  redis.hset(req.body.email, "password", req.body.password);
  console.log(req.body.password);
  let count = 0;
  redis.hset(req.body.email, "count", count);
  res.status(200).send("login success");
});

router.post("/note/update/:id/:email", function (req, res) {
  console.log("vannu");
  redis.hget(req.params.email, "note", function (err, obj) {
    var temp = JSON.parse(obj);
    console.log(req.body);
    var note = [];

    const removeById = async (temp, id) => {
      const requiredIndex = temp.findIndex((el) => {
        return el.id === String(id);
      });
      if (requiredIndex === -1) {
        return false;
      }
      // if (temp.length == 1) {
      //   // await redis.hdel(req.params.email, "note");
      // } else {
      !!temp.splice(requiredIndex, 1);
      if (temp.length > 0) {
        for (var i = 0; i < temp.length; i++) {
          note.push(temp[i]);
        }
      } else {
        note.push(temp);
      }
      var newid = uuidv4();
      note.push({ ...req.body, id: newid });
      // const updatedNote =
      redis.hset(req.params.email, "note", JSON.stringify(note));
      // }
    };
    removeById(temp, req.params.id);
  });
  res.status(200).send("note updated");
});

router.post("/note", function (req, res, next) {
  var id = uuidv4();
  var note = [];
  var x = [];
  redis.hget(req.body.email, "note", function (err, obj) {
    //console.dir(obj);
    if (obj == null) {
      // JSON.stringify({ ...req.body, id: id });
      note.push({ ...req.body, id: id });
      // x = [...note,"id",id];
      jsonStr = JSON.stringify(note);
      redis.hset(req.body.email, "note", jsonStr);
      console.log(id);
    } else {
      var temp = JSON.parse(obj);
      // console.log(temp);
      if (temp.length > 0) {
        for (var i = 0; i < temp.length; i++) {
          note.push(temp[i]);
        }
      } else {
        note.push(temp);
      }
      note.push({ ...req.body, id: id });
      // x = [...note,"id",id];
      jsonStr = JSON.stringify(note);
      redis.hset(req.body.email, "note", jsonStr);
    }
    res.status(200).json("note added");
  });
});

router.get("/note/:email", function (req, res) {
  // console.log("email:"+req.params.email)
  // req.params.email
  redis.hget(req.params.email, "note", function (err, obj) {
    // console.log(obj);
    if (obj == null) {
      res.status(400).send("no note");
    } else {
      res.status(200).send(obj);
      // res.send(JSON.stringify(data));
      // res.status(200).send("note added");
    }
  });
});


router.delete("/note/:id/:email", (req, res) => {
  // const indexToRemove = playlists.findIndex((pl) => pl.id === '2');
  // playlists.splice(indexToRemove, 1);

  redis.hget(req.params.email, "note", function (err, obj) {
    // console.log(obj);
    var arr = [];

    if (obj == null) {
      console.log(obj);
    } else {
      var temp = JSON.parse(obj);
      const removeById = async (temp, id) => {
        const requiredIndex = temp.findIndex((el) => {
          return el.id === String(id);
        });
        if (requiredIndex === -1) {
          return false;
        }
        if (temp.length == 1) {
          await redis.hdel(req.params.email, "note");
        } else {
          !!temp.splice(requiredIndex, 1);
          redis.hset(req.params.email, "note", JSON.stringify(temp));
        }
      };
      removeById(temp, req.params.id);
    }
  });

  // console.log("id:"+req.params.id)
  res.send("DELETE Request Called");
});

router.post("/auth", function (req, res) {
  redis.hgetall(req.body.email, function (err, results) {
    if (err) {
      console.log("Invalid Error");
    } else {
      if (results.password != req.body.password) {
        // setError('Invalid password');
        console.log(results.password);
        console.log(req.body.password);
        console.log("Invalid password");
        return res.status(400).json({ msg: "Login Failed.", err });
        return;
      } else {
        jwt.sign(
          {
            name: results.username,
          },
          config.get("jwtSecret"),
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) {
              return res.status(400).json({ msg: "Login Failed.", err });
            }
            return res.status(200).json({
              name: results.username,
              email: results.email,
              phone: results.phone,
              token,
              msg: "Login Successful.",
            });
          }
        );
        //res.status(200).send("login success");
      }
      // console.log(results)
    }
  });
});
//---------------------LOGOUT
router.post("/logout", async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send({ message: "Successfully logged out" });
});
//---------------------NODE
router.post("/node", async (req, res, next) => {
  const nodeName = "node:" + req.body.email;
  await redis.lpush(nodeName, req.body.node);
  res.status(200).json("node created");
});

router.get("/getnode/:email", async (req, res) => {
  const nodeName = "node:" + req.params.email;
  const node = await redis.lrange(nodeName, 0, -1);
  console.log(node);
  res.status(200).send(node);
});
router.get("/POPnode/:email/:item", async (req, res) => {
  const nodeName = "node:" + req.params.email;
  const element = req.params.item;
  redis.lrem(nodeName, 0, element, (err, data) => {
    console.log(data);
  });
  res.send("deleted");
});
//---------------------SUBNODE
router.post("/snode", async (req, res, next) => {
  const snodeName = "snode:" + req.body.email;
  await redis.lpush(snodeName, req.body.snode);
  res.status(200).json("node created");
});
router.get("/getsnode/:email", async (req, res) => {
  const snodeName = "snode:" + req.params.email;
  const snode = await redis.lrange(snodeName, 0, -1);
  console.log(snode);
  res.status(200).send(snode);
});
router.get("/POPsnode/:email/:item", async (req, res) => {
  const nodeName = "snode:" + req.params.email;
  const element = req.params.item;
  redis.lrem(nodeName, 0, element, (err, data) => {
    console.log(data);
  });
  res.send("deleted");
});

//---------------------ToDo
router.post("/todo", async (req, res, next) => {
  const todoName = "todo:" + req.body.email;
  const unixTimestamp = Math.floor(Date.now() / 1000);
  await redis.zadd(todoName, unixTimestamp, req.body.todo, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send("node created");
      console.log("added");
    }
  });
});

router.get("/todo/:email", async (req, res) => {
  const todoName = "todo:" + req.params.email;
  const todo = await redis.zrange(todoName, 0, -1, "WITHSCORES");
  console.log(todo);
  res.status(200).send(todo);
});
router.get("/gettodo/:email", async (req, res) => {
  const todo = await redis.hget(req.params.email, "count");
  console.log(todo);
  res.status(200).send(todo);
});
router.get("/POPtodo/:email/:item", async (req, res) => {
  let count = 0;
  redis.hget(req.params.email, "count", (err, value) => {
    if (!value) {
      redis.hset(req.params.email, "count", count);
    } else {
      count = value;
      console.log(count);
      let countUp = ++count;
      console.log(countUp);
      redis.hset(req.params.email, "count", countUp);
    }
  });

  const todoName = "todo:" + req.params.email;
  const element = req.params.item;
  redis.zrem(todoName, element, (err, data) => {
    console.error(err);
  });
  res.status(200).send("deleted");
});

router.get("/POPaccount/:email/:item", async (req, res) => {
  
  redis.hget(req.params.email, "password", (err, value) => {
    if (value===req.params.item) {
      const snodeName = "snode:" + req.params.email;
      const nodeName = "node:" + req.params.email;
      const todoName = "todo:" + req.params.email;
      const hname =  req.params.email;
      redis.del(snodeName);
      redis.del(nodeName);
      redis.del(todoName);
      redis.del(hname, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Deleted ${result} keys.`);
          res.status(200).send("deactivated");
        }
      })
    } else {
      res.status(500).send("Error deleting user account");
      
    }
  });

});

module.exports = router;
