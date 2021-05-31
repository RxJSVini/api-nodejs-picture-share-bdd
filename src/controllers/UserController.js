const UserScheme = require("../models/User");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwtConfig')
class UserController{

    async create(req, res){
        try{
            const { name, email, password } = req.body;
            if(name == "" || email == "" || password == ""){
                return res.status(400).json({err:'Bad request - O Formulário de cadastro não pode receber parametros vazios'})
            } else if(name == undefined || email == undefined || password == undefined) {
                return res.status(400).json({err:'Bad request - O Formulário de cadastro não pode receber parametros vazios'})

            } else {
                const userExists = await UserScheme.find({email:email})
                const salt = bcryptjs.genSaltSync(10);
                const hash = bcryptjs.hashSync(password, salt)
                if(userExists.length == 0){
                    const User = new UserScheme({ name, email, password:hash});
                    await User.save()
                    return res.status(201).json({message:User})
                }else{
                    return res.status(409).json({err:'Usuário já cadastrado!'})
                }
        

            }

        }catch(err){
            console.log(err);
            return res.status(500).json({e:err})
        }


    }


    async users(req, res){
        try{
            const users = await UserScheme.find({})
            const user = []
            users.forEach((data, index) =>{
                user.push({id:data._id, name:data.name, email:data.email})
            })
            return res.status(200).json(user)
        }catch(err){
            console.log(err);
            return res.status(503).json({e:err})
        }
    }


    async update(req, res){
        
       const _id = req.params.id; 
       const { name, email, password} = req.body;
       const salt = bcryptjs.genSaltSync(10);
       const hash = bcryptjs.hashSync(password, salt);


        const userExists = await UserScheme.findById(_id); 
        const emailExists = await UserScheme.findOne({email:email})
        const someOneMail = [emailExists];
        if(someOneMail[0] == null || userExists.email == email){
            try {
                await UserScheme.findByIdAndUpdate(_id, {name, email, password:hash})
                return res.status(200).send('usuário atualizado com sucesso!')
                
            } catch (error) {
                return res.status(500).json({err:'Error'})
            } 
        }else {
            console.log(someOneMail)
            return res.status(409).json({err:'Email já cadastrado por outro usuário!'})
        }
        

    }


    async remove(req, res){
        
        try {
            const _id = req.params.id;
            const userId = await UserScheme.findByIdAndDelete(_id); 
            return res.status(201).json({msg:'Usuário removido com sucesso!'})
        } catch (error) {
            return res.status(404).json({err:'Usuario não localizado!'})
        }


    }

    async auth(req, res){
        const { email, password} = req.body;
        try{
            const userExists = await UserScheme.findOne({email:email})
            console.log(userExists.email)
            if(userExists){
                const verifyPassword = await bcryptjs.compare(password, userExists.password)
                if(verifyPassword){           
                    const { secret, expiresIn} = jwtconfig;
                    const tk = jwt.sign({}, secret, {subject:String(userExists.email)}, {expiresIn:expiresIn})
                    return res.status(200).json({status:'Usuário autenticado com sucesso!', username:userExists.email,token:tk})
                }else {
                    return res.status(401).json({err:'Usuário ou senha invalido(a)!'})
                }
            } 
            
        }catch(err){
    
            return res.status(404).json({err:'Usuário não encontrado!'})
        }
        
    }
    

}


module.exports = new UserController();