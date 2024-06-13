module.exports = app => {
    const ads = require("../controllers/ads.controller.js");
    const router = require("express").Router();
  
    // Create a new Ad
    router.post("/", ads.create);
  
    // Retrieve all Ads
    router.get("/", ads.findAll);
  
    // Retrieve all published Ads
    router.get("/published", ads.findAllPublished);
  
    // Retrieve a single Ad with id
    router.get("/:id", ads.findOne);
  
    // Update an Ad with id
    router.put("/:id", ads.update);
  
    // Delete an Ad with id
    router.delete("/:id", ads.delete);
  
    // Delete all Ads
    router.delete("/", ads.deleteAll);
  
    app.use('/api/ads', router);
  };