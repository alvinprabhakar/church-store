const Payments = require('../models/paymentModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');

const paymentCtrl = {
    getPayments: async(req,res) => {
        try {
            const payments = await Payments.find();
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req,res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg : 'User does not exist'})

            const {cart, paymentID , address} = req.body;
            const {_id , name , email} = user;

            const newPayment = new Category({
                user_id: _id , name , email , cart , paymentID , address 
            })

            cart.filter(item => {
                return sold(item._id , item.quantity , item.sold)
            })

            await newPayment.save();
            res.json({msg: "Payment Success !"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    // ,
    // deleteCategory: async(req,res) => {
    //     try {
    //         await Category.findByIdAndDelete(req.params.id)
    //         res.json({msg: "Deleted a category"})            
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message}) 
    //     }
    // },
    // updateCategory: async(req,res) => {
    //     try {
    //         const {name} = req.body
    //         await Category.findOneAndUpdate({_id: req.params.id} , {name})
    //         res.json({msg: "Updated a category"})            
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message}) 
    //     }
    // }

}

const sold = async (id,quantity,oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        sold : quantity + oldSold
    })
}

module.exports = paymentCtrl;