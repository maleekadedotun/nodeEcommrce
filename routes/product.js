const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async(req, res) =>{
    const newProduct = new Product(req.body)
    try{
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct)
    }
    catch(err){
        res.status(500).json(err)
    }
})



// // UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{

    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new: true})
        res.status(200).json(updateProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted....")
    }
    catch(err){
        res.status(500).json(err)
    }
});

//GET USER
router.get("/find/:id", async(req, res) =>{
    try{
      const product = await Product.findById(req.params.id)
        const {password, ...others} = product._doc
        return res.status(200).json(others); 
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET ALL Product
router.get("/", async(req, res) =>{
    const qNew = req.query.new
    const qCategory = req.query.category

    try{
        let products;
      if (qNew) {
        products = await Product.find().sort({creaedAt: -1}).limit(1);
      }
      else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                },
            })
        } 
        else {
            products = await Product.find();
        }
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports = router