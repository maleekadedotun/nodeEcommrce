const mongoose = require("mongoose");


const CartSchema = mongoose.Schema(
    {
        userId: {type: String, required: true},
        product: [
            {
                productId:{
                    type: String,
                },
                quantity:{
                    type: Number,
                    default: 1,
                }
            }
        ]
       
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);