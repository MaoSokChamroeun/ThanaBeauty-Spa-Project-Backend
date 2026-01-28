const bcrypt = require('bcryptjs')
const bcryptPashash =async (password) =>{
    const hashedPassword =  await bcrypt.hash(password , 10)
    return hashedPassword
}

const bcryptCompare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); 
};
module.exports = {bcryptPashash , bcryptCompare}