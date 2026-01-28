const jwt = require('jsonwebtoken')
const createToken = (data) => {
    const token = jwt.sign(data , process.env.JWT_SECRET, {
        expiresIn : process.env.EXPIER_IN
    })
    return token
}

const verifyToken = (token) => {
    const payload = jwt.verify(token , process.env.JWT_SECRET)
    return payload
}
module.exports = {createToken , verifyToken}