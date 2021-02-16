//hosted backend https://guvi7.herokuapp.com/
require("dotenv").config();
const port=process.env.PORT||4040
//const DBURL="mongodb+srv://training:WUJMyPMB7rW9OP5F@guvi.k00x5.mongodb.net/productManagement?retryWrites=true&w=majority
const DBURL=process.env.DBURL
 const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.json());
app.use(cors({}));

//        add register
app.post("/register", async (req, res) => {
  var user = req.body;
  var hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  try {
    const client = await mongodb.connect(DBURL);
    const db = client.db("guvitask");
    const data = await db.collection("users").insertOne(user);
    await client.close();
    res.json({ message: "registration successful" , data : data });
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" });
  }
});
//       show register
app.get("/register", async (req, res) => {
  try {
    const client = await mongodb.connect(DBURL);
    const db = client.db("guvitask");
    const data = await db.collection("users").find().toArray();
    // console.log(data);
    await client.close();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" ,err });
  }
});

//update particular register id

app.put("/register/:id", async (req, res) => {
  try {
    const client = await mongodb.connect(DBURL);
    const db = client.db("guvitask");
    const data = await db.collection("users").updateOne({_id : mongodb.ObjectID(req.params.id)} , {$set : {"name" : req.body.name , "age" : req.body.age , 'contact' : req.body.contact } } )
    // console.log(data);
    await client.close();
    res.json({ message: "updated" , data : data });
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" });
  }
});


//login

app.post("/login", async (req, res) => {
  try {
    const client = await mongodb.connect(DBURL);
    const db = client.db("guvitask");
    const data = await db
      .collection("users")
      .findOne({ email: req.body.email });
    // console.log(data);
    await client.close();
    if (data) {
      var match = await bcrypt.compare(req.body.password, data.password);
      if (match) {
        res.json({ message: "login successful" , data : data  });
      } else {
        res.status(400).json({
          message: "password did not match",
        });
      }
    } else {
      res.status(400).json({
        message: "Email not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed" });
  }
});

//display the login results
app.get("/login/:email", async (req, res) => {
  try {
    const client = await mongodb.connect(DBURL);
    const db = client.db("guvitask");
    const data = await db.collection("users").findOne({
      // _id:mongodb.ObjectID(req.params.id)
      email:req.params.email
    })
    // console.log(data);
    await client.close();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" ,err });
  }
});

// add data to profile page
// app.post("/product", async (req, res) => {
//   try {
//     const client = await mongodb.connect(DBURL);
//     const db = client.db("guvitask");
//     const data = await db.collection("products").insertOne(req.body);
//     console.log(data);
//     await client.close();
//     res.json({ message: "added" , data : data });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "failed" });
//   }
// });

// update

// app.put("/product", async (req, res) => {
//   try {
//     const client = await mongodb.connect(DBURL);
//     const db = client.db("productManagement");
//     const data = await db.collection("products").updateOne({_id : mongodb.ObjectID(req.body._id)} , {$set : {"name" : req.body.name , "age" : req.body.age , 'contact' : req.body.contact } } )
//     console.log(data);
//     await client.close();
//     res.json({ message: "updated" , data : data });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "failed" });
//   }
// });

// display the updated or added results
// app.get("/products", async (req, res) => {
//   try {
//     const client = await mongodb.connect(DBURL);
//     const db = client.db("productManagement");
//     const data = await db.collection("products").find().toArray();
//     console.log(data);
//     await client.close();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "failed" ,err });
//   }
// });


app.listen(port, () => {
  console.log("Listening .... ");
});
