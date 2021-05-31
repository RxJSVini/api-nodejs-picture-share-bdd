const jwtConfig = require('../config/jwtConfig');
const jwt = require('jsonwebtoken')
const Auth = async(req, res, next) =>{
    try{
        const headerBaerer = req.headers.authorization;
        const brokenBaerer = headerBaerer.split(" ");
        const token = brokenBaerer[1]
        const { secret } = jwtConfig;
        const decoded = await jwt.verify(token, secret);
      
        if(!decoded){
            return res.status(401).json({err:'Inválid token JWT'})
        } else {
            return next()
        }
    }catch(e){
        return  res.status(401).json({err:'Inválid token JWT'})
    }

    
}

module.exports = Auth;

