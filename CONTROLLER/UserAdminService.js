const UserSchema = require('../model/UserSchema')

class UserAdminService {

    async getUsers(req,res) {
        const users = await UserSchema.find({role:"User"})
        if(!users){
            return res.status(404).json("NO USERS FOUND")
        }
        res.status(200).json(users)
    }

    async getSingleUser(req,res) {
        
        const user = await UserSchema.findById(req.params.userId)
        if(!user){
            return res.status(404).json("NO USER FOUND")
        }
        res.status(200).json(user)
    }



}

module.exports = new UserAdminService