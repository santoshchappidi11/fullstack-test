import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";


export const addProduct = async(req, res) => {

    try {
        const {image, title, price, category, userId} = req.body;
        
        if(!image || !price || !title || !category) return res.status(404).json({success:false, message:"All fields are required!"})
        
        if(!userId) return res.status(404).json({success:false, message:"user id is required"})
        
        const user = await UserModel.findById(userId)
        console.log(user)
    
        if(!user ||  user.role !== "Seller" ) return res.status(404).json({success:false, message:"Not a valid user"})

        const newProduct = new ProductModel({
            image,
            title,
            price,
            category,
            userId:user._id
        })
    
        await newProduct.save()
    
        return res.status(200).json({success:true, message:"New product Added!"})
    
    
    } catch (error) {
        return res.status(500).json({success:false, error:error.message})
    }
  }


  
export const getProducts = async(req, res) => {

    try {
        const {userId} = req.body;
    
        if(!userId) return res.status(404).json({success:false, message:"user id is required"})
    
        const user = await UserModel.findById(userId)
    
        if(!user || user.role !== "Seller" ) return res.status(404).json({success:false, message:"Not a valid user"})
    
       
 const yourProducts = await ProductModel.find({userId:userId})

 if(yourProducts?.length)  return res.status(200).json({success:true, products:yourProducts})

 return res.status(404).json({success:false, message:"No poducts!"})
    
    
    } catch (error) {
        return res.status(500).json({success:false, error:error.message})
    }
  }


  export const deleteProduct = async(req, res) => {

    try {
        const {userId, productId} = req.body;
        console.log(userId, productId)
    
        if(!userId) return res.status(404).json({success:false, message:"user id is required"})
        if(!productId) return res.status(404).json({success:false, message:"product id is required"})
    
        const user = await UserModel.findById(userId)
 
        if(!user || user.role !== "Seller") return res.status(404).json({success:false, message:"Not a valid user"})
     
 const deletedProduct = await ProductModel.findByIdAndDelete({ _id:productId, userId:userId})

 if(deletedProduct){
    return res.status(200).json({success:true, message:"Produt deleted!"})
 }

 return res.status(404).json({success:false, message:"Something went wrong!"})
   
    
    } catch (error) {
        return res.status(500).json({success:false, error:error.message})
    }
  }
