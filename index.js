const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")
const cors = require("cors")
const router = require("./src/Routes/route")
const CreateUser = require('./src/Models/CustomerModel');
const { body, validationResult } = require('express-validator');    

const port = process.env.PORT || 5000;

app.use(cors());


app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



//========================[ Customer ]=========================/

const validateCreateUser = [
    body('id').isInt().withMessage('ID must be an integer'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('company').notEmpty().withMessage('Company is required'),

  ];

app.post('/createUser', validateCreateUser, async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          errors: errors.array(),
        });
      }
  
      const data = req.body;
      const saveData = await CreateUser.create(data);
  
      res.status(201).json({
        status: true,
        msg: 'User Registered Successfully',
        data: {
          id: saveData.id,
          first_name: saveData.first_name,
          last_name: saveData.last_name,
          city: saveData.city,
          company: saveData.company,
        },
      });
    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
  });







module.exports = router;


//===============================[ Database Connection ]=======================/

mongoose
    .connect("mongodb+srv://pradumgurjar2:zfewbpVWApgd2wNy@cluster0.e10eigb.mongodb.net/")
    .then(() => console.log("Database connected Successfully"))
    .catch((Err) => console.log(Err));
    
    
app.use("/", router);


app.listen(port, function(){
    console.log(`Server is Connected on Port ${port} !!! `)
});


// mongodb+srv://pradumgurjar2:zfewbpVWApgd2wNy@cluster0.e10eigb.mongodb.net/
// zfewbpVWApgd2wNy