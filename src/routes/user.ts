const express = require("express");
const userModel = require("../models/user");
const router=express.Router()

router.use(express.json())

router.post("/", async (request: any, response: any) => {
    const user = new userModel(request.body);
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

router.get("/users", async (request: any, response: any) => {
    const users = await userModel.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });


module.exports = router;