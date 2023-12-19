const UserModel = require('../models/User')
const bcrypt = require('bcrypt')

async function getUsers(page=1, size=10, searchTxt=''){
    
    let skip = (page - 1) * size
    let condition = {}
    if(searchTxt){
       condition.$text = {$search: searchTxt}
    }
    // --------------------------------------------

    let congviec = UserModel.find(condition).limit(size).skip(skip).lean().exec()


    // --------------------------------------------
    const [ results, itemCount ] = await Promise.all([
        congviec,
        UserModel.countDocuments({})
    ]);
    return {
        status: 200,
        data: {
            data: results,
            page: page,
            prev: page - 1 < 0 ? 1 : page - 1,
            next: page + 1,
            total: itemCount
        }
    }
}

async function createUser(user, image1){
    const { email, password, name } = user;
    const image = `/uploads/avatars/${image1.filename}`

    
    console.log(email,password);
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw {
            status: 400,
            message: 'Email da ton tai'
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        email,
        password: hashedPassword,
        name,
        image
    });
    await newUser.save();
    return {
        status: 200,
        message: 'Tao thanh cong'
    }
}



module.exports = {
    createUser,
    getUsers
}