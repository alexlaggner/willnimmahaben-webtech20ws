import express from 'express';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import {v4 as uuid4} from 'uuid';


const {Client} = pkg;
const router = express.Router();

function initDb(){
    return new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5432",
    database:"willnimmahabendb"
});
}

//verifies token for protected routes
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, 'secretkey', (err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

//Get request (just to check)
router.get(('/'),(req,res) =>{
    const client = initDb();

    client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from users")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows));
    })
   .catch((err) => console.log(err))
   .finally(() => client.end);
});

//login route
router.post(('/login'),(req,res) =>{
    //Getting user input login data
    const {userName} =  req.body;
    const {passWord} = req.body;
    console.table(req.body);
    
    let foundUser ; 

    const client = initDb();

    //Connecting to Client
    client.connect()
        .then(() => console.log("connected"))
        .then(() =>{
            //Search for user
            client.query("SELECT * FROM users WHERE username ='"+userName+"';")
            .then((results) => {
                foundUser = results.rows;
                console.log("founduserneu: ");
                console.table(foundUser);
                console.log(foundUser[0].password);
                console.log(passWord);
            })
            .then(()=>{
            if(passWord == foundUser[0].password){
                jwt.sign({user : foundUser}, 'secretkey', (err, token) =>{
                    res.cookie("token", token, { maxAge: 1800000});
                    res.json(token);
                });
                
            }
            else{
                res.send("Wrong username or Password");
                console.log("error pw");
            }
            })
        
        })
        .catch(()=> res.send("ERROR"))
        .finally(()=> client.end);
});

    //new user route
    router.post(('/newUser'),(req,res) =>{
        //Set up req.body data and userId
        console.log("entry");
        const newUserName= req.body.userName;
        const newUserPassword= req.body.passWord;
        const newUserEmail = req.body.email;
        const newUserTel = req.body.tel;

        const newUserId = uuid4();

        //To do: Check if user/email already exists
        
        //Build client
        const client = initDb();

        //Connect to client
        client.connect()
            .then(() => console.log("connected"))
            .then(() =>{
                if(newUserTel != "-"){
                client.query("INSERT INTO users(id, username, password, email, tel) VALUES('"+newUserId+"','"+newUserName+"','"+newUserPassword+"','"+newUserEmail+"','"+newUserTel+"');");
                console.log("queried");
            }
                else{
                    client.query("INSERT INTO users(id, username, password, email) VALUES('"+newUserId+"','"+newUserName+"','"+newUserPassword+"','"+newUserEmail+"');");
                }
            })
            .then(() =>{
                res.send(newUserName +" was added");
            })
            .catch(()=>{
                res.send(newUserName +" could not be added");
            })
            .finally(()=>{
                client.end;
            })
    });

    //Update users credentials
    router.patch(('/update'),authenticateToken,(req,res) => {
        //Set up req.body data and userId
        const newUserName= req.body.userName;
        const newUserPassword= req.body.passWord;
        const newUserEmail = req.body.email;
        const newUserTel = req.body.tel;
        console.log(newUserName);
        console.log(newUserPassword);
        console.log(newUserTel);
        const userId = req.body.id;

        let userToBeUpdated;

        //Build client
        const client = initDb();

        //Connect to Client
        client.connect()
            .then(()=>console.log("connected"))
            //client.query("UPDATE products SET fotourl ='" +params.fotourl +"' WHERE id ='"+id+"';");
            .then(()=>{
                client.query("UPDATE users SET password ='" + newUserPassword+ "' WHERE id='" + userId+"';");
                client.query("UPDATE users SET username ='" + newUserName+ "' WHERE id='" + userId+"';");
                client.query("UPDATE users SET tel ='" + newUserTel+ "' WHERE id='" + userId+"';");
            })
            

    })
    //Delete User from DB
    router.delete(('/delete/:id'),authenticateToken,(req,res) =>{
        const {id} = req.params;

        const client = initDb();
        client.connect()
    .then(() => console.log("connected"))
    .then(() =>{
        //Submit data to DB per query
        client.query("DELETE FROM users WHERE id='"+id+"';");
        console.log("Done");
    })
    .then(() =>{
        res.send("DONE");
    })
    .catch((err)=> res.send(err + "fo"))
    .finally(()=> client.end);

});
router.get(('/userdetail/:uname'), authenticateToken,(req,res) =>{
    console.log(req.headers['Authorization']);
    const {uname} = req.params;
    const client = initDb();

    client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from users where username ='"+uname+"'")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows));
    })
   .catch((err) => console.log(err))
   .finally(() => client.end);
});

export default router;