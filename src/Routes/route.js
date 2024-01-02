const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Controller = require("../Controllers/user")
const Middleware = require("../Middleware/auth")


// Router.post("/createUser", Controller.Createuser);
Router.get("/getCustomer", Controller.GetProduct);
Router.get("/customers/:id", Controller.getCustomerId);
Router.get("/:cities", Controller.getCustomerCity);




Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));


//========================== checking your end point valid or Not =======================/


Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make sure Your Endpoint is Correct or Not!"
    })
});



module.exports = Router;