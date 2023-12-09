const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs'); 
const path = require('path')
const privateKey = fs.readFileSync(path.join(__dirname, '../key/private-key.pem'), 'utf8');

async function login(data){
    const { email, password } = data;
    // Tìm kiếm người dùng theo email
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw { status: 400, message: 'K tim thay email' }
    }

    // Kiểm tra mật khẩu sử dụng bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: 'Mat khau sai' }
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h' // Thời gian hết hạn của token,
    });

    // Trả về token cho người dùng
    return { token, userId: user._id, expiresIn: 3600 }
}


module.exports = {
    login
}