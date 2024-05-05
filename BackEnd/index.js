const express = require("express");

const cors = require('cors');

const mongoose = require('mongoose');

const bodyparser=require('body-parser');

const jsonparser = bodyparser.json();

const User = require('./models/user.model');



mongoose.connect('mongodb://127.0.0.1:27017/employee', {

    useNewUrlParser: true,

    useUnifiedTopology:true,
    

} )

    .then(() => {

        console.log("connect");

    })

    .catch((error) => {

        console.log(error);

    })




const employee = require("./models/employee.model");
const employeeModel = require("./models/employee.model");
//const signupModel =require("./models/signup.model")
//const { convertToFalse } = require("mongoose/lib/schema/boolean");





const app = express();

app.use(cors());

app.post("/getemployee",jsonparser, (req, res) => 
    {
        const data = new employee({
            
            employeeid:req.body.employeeid,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailid:req.body.emailid,
            mobileno:req.body.mobileno,
            gender:req.body.gender,
            bankname:req.body.bankname,
            accountno:req.body.accountno,
            ifsccode:req.body.ifsccode,
            salary:req.body.salary
        })
        data.save()
        .then(val=>console.log(val))
            .catch(error =>console.log(error))
    } )



    app.put("/getemployee/:id", jsonparser, async (req, res) => 
    {
       try{
   const _id = req.params.id;
   const updateEmployee= await employee.findByIdAndUpdate(_id,req.body);
    res.send(updateEmployee);
       }catch(e){
        res.status(400).send(e);

       }
    })
        


           
  

        
app.delete("/getemployee/:id", async (req, res) => {

    try {



        console.log(req.params.id);
        const neu = await employee.findByIdAndDelete(req.params.id)

        if (!req.params.id) {

            return res.status(300).send()

        }

        res.send(neu);

    }

    catch (e) {

        res.status(500).send(e)

    }

})

/*app.get('/signupusers', async(req, res) => {
    return res.status(200).json({message:'success'});
   });*/

   app.post('/signupusers',jsonparser,async (req, res) => {
    console.log(req)
    const { email, password } = req.body;
  
    // Create a new user document using the User model
    const newUser = new User({ email, password });
  
    // Save the new user to MongoDB
    newUser.save()
      .then(() => {
        res.status(201).json({ message: 'Signup successful' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Something went wrong' });
      });
    });


    app.get('/signupusers', (req, res) => {
        // Retrieve all users from MongoDB
        User.find()
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            res.status(500).json({ error: 'Something went wrong' });
          });
      });



app.post('/signupusers', (req, res) => {
    
  const { email, password } = req.body;

  // Find the user with the given email and password in MongoDB
  User.findOne({ email, password })
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' });
    });
});





    
    

       /*const { email, password } = req.body;
         
      
        // Find the user with the given email and password in MongoDB
        User.findOne({ email, password })
          .then(user => {
            if (user) {
              res.status(200).json({ message: 'Login successful' });
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          })
          .catch(error => {
            res.status(500).json({ error: 'Something went wrong' });
          });
      });*/


  /*app.get("/",(req,res)=>{
    res.render("login")
  })  

  app.get("/signup",(req,res)=>{
    res.render("signup")
  })  

  app.post("/signupusers",async(req,res)=>
  {
   const data={
    
    email:req.body.email,
    password:req.body.password,
   }
   await employee.collection.insertMany([data])
   res.render("login")
  })

  app.post("/login",async(req,res)=>
  {
   try{
    const check = await employee.collection.findAndModify({email:req.body.email})
    if(check.password===req.body.password){
        res.render("dashboard")
   }
   else{
    res.send("wrong password")
   }
}
catch{
    res.send("wrong details")
}
  })*/
    

app.get("/getemployee", async (req, res) => {


    var emp = await employee.find();

    res.send(emp);

})

app.listen(3000)





