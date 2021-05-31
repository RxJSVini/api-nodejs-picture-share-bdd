const supertest = require('supertest');
const app = require('../src/app');


const request = supertest(app);

/**
    Globais do Jest
    
    beforeAll(() =>{
        //Antes de tudo - Insere um usuário teste
    })

    afterAll(()=>{
        //Depois de tudo - Remove o usuário teste
    })

    beforeEach(() =>{
        //Roda antes de cada teste
    })

    afterEach(() =>{
    //Roda após cada teste 
    })

 */


const mainUser = {name:'vinicius pereira', email:'vinicius@gmail.com', password:"12345"};

 beforeAll(() =>{
     return request.post("/user")
     .send(mainUser)
     .then(res =>{})
     .catch(err => { console.log(err)});
 })




 afterAll(() =>{
     return request.delete(`/user/${mainUser.email}`)
     .send(main)
     .then(res => {})
     .catch(res =>{})

 })

describe("Cadastro de usuário", () =>{
    test("Deve cadastrar um usuário com sucesso", () =>{
    
        const time =  Date.now();
        const email = `${time}@gmail.com`;
        const user = {"name":"Usuario de teste", "email":email, "password":"12345"}
     
        return request.post("/user")
        .send(user).then(res =>{
            expect(res.statusCode).toEqual(201);

        
        }).catch(err =>{
            fail(err);
        })
    })

    test("Deve validar se os dados estão vindo vazios no formulario", () =>{
        const user = {name:"", email:"", password:""}
     
       return request.post("/user")
        .send(user).then(res =>{
            expect(res.statusCode).toEqual(400);
  
        
        }).catch(err =>{
            fail(err);
        })
    })


    test("Deve validar se o usuário já está cadastrado", () =>{
        const user = {name:"vinicius pereira", email:"viniciuspoa2@yahoo.com", password:"12345"}
     
        return request.post("/user")
        .send(user).then(res =>{
            expect(res.statusCode).toEqual(400);
        
        }).catch(err =>{
            fail(err);
        })
    })
}) 



describe("Autenticação de usuários", () =>{
    test("Deve me terornar um token quando logar", () =>{
        return request.post("/user/auth")
        .send({email:mainUser.email, password:mainUser.password})
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined();
        })
        .catch(err => {
            fail(err)
        })
    })

    test("Deve impedir que um usuário se logue com a senha errada", ()=>{
        return request.post("/users/auth")
        .send({email:mainUser.email, password:"bolinha"})
        .then(res =>{
            expect(res.statusCode).toEqual("Senha incorreta")
            expect(res.body.errors.password).toEqual("senha incorreta")
        })
        .catch(err =>{
            fail(err)
        })
    })

})