const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CreateUser = require("../Models/CustomerModel")



//========================[ Customer ]=========================/

// const Createuser = async function (req, res) {
//     try {
//         let data = req.body;
//         let { id, first_name, last_name, city, company } = data;

//         let saveData = await CreateUser.create(data);
//         res.status(201).send({
//             status: true,
//             msg: "User Registered Successfull",
//             data: {
//                 id: saveData.id,
//                 first_name: saveData.first_name,
//                 last_name: saveData.last_name,
//                 city: saveData.city,
//                 company: saveData.company,
//             },
//         });
//     } catch (err) {
//         res.status(500).send({ status: false, error: err.message });
//     }
// };


//=====================[Get Customer ]==============================/

const GetProduct = async function (req, res) {
    try {
        const first_name = req.query.first_name;
        const last_name = req.query.last_name;
        const city = req.query.city;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;  

        const query = {};

        if (first_name) {
            query.first_name = first_name;
        }

        if (last_name) {
            query.last_name = last_name;
        }

        if (city) {
            query.city = city;
        }

        const skip = (page - 1) * limit;

        const products = await CreateUser.find(query)
            .skip(skip)
            .limit(limit);

        if (products.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No products found for the given criteria",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Customer fetched successfully",
            data: {
                Customer: products,
                page: page,
                limit: limit,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};


//=====================[Get Customer Id ]==============================/

const getCustomerId = async function (req, res) {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await CreateUser.findOne({ id: customerId });
  
      if (!customer) {
        return res.status(404).json({
          status: false,
          message: 'Customer not found',
        });
      }
  
      return res.status(200).json({
        status: true,
        message: 'Customer fetched successfully',
        data: {
          customer: customer,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
  

//=====================[Get Customer With City ]==============================/

const getCustomerCity = async function (req, res) {
    try {
      const customersByCity = await CreateUser.aggregate([
        {
          $group: {
            _id: '$city',
            totalCustomers: { $sum: 1 },
          },
        },
      ]);
  
      return res.status(200).json({
        status: true,
        message: 'Cities fetched successfully',
        data: {
          cities: customersByCity,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };


module.exports = {
    // Createuser,
    getCustomerId,
    GetProduct,
    getCustomerCity
}




