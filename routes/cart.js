const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async(req, res) =>{
    const newCart = new Cart(req.body)
    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart)
    }
    catch(err){
        res.status(500).json(err)
    }
})



// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) =>{

    try {
        const updateCart = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new: true})
        res.status(200).json(updateCart);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted....")
    }
    catch(err){
        res.status(500).json(err)
    }
});

//GET USER Cart
router.get("/find/:userId", async(req, res) =>{
    try{
      const cart = await Cart.findOne({userId: req.params.userId})
        return res.status(200).json(cart); 
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET ALL Product
router.get("/", verifyTokenAndAdmin, async(req, res) =>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports = router