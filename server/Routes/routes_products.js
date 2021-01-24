import express from 'express';
import pkg from 'pg';
import jwt from 'jsonwebtoken';

const {Client} = pkg;

function initDb(){
    return new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5432",
    database:"willnimmahabendb"
});
}

const router = express.Router();

router.get("/", (req,res)=> {
    const client = initDb();

client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from products")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows));
    })
    .then(() => client.query("select * from products"))
    .then(results => console.table(results.rows))
    
   .catch(() => console.log("Error connecting to db"))
   .finally(() => client.end);
});

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

router.post("/", authenticateToken,(req,res) =>{
    //Building Client
    const client = initDb();

    //Getting data from body
    const params= req.body;
   
    //Connecting to Client
    client.connect()
        .then(() => console.log("connected"))
        .then(() =>{
            //Submit data to DB per query
            client.query("INSERT INTO products(fotourl, name, beschreibung, kontakt, auto, elektronik, haushalt, andere) VALUES('"+params.fotourl+"','"+params.name+"','"+params.beschreibung+"','" +params.kontakt +"','"+params.auto+"','"+params.elektronik+"','" +params.haushalt + "','"+params.andere+"')");
            console.log("Done");
        })
        .then(() =>{
            res.send(params);
        })
        .catch(()=> res.send("ERROR"))
        .finally(()=> client.end);
})

router.delete("/:id", authenticateToken,(req, res) => {

    const { id } = req.params;

    //Building Client
    const client = initDb();

    client.connect()
    .then(() => console.log("connected"))
    .then(() =>{
        //Submit data to DB per query
        client.query("DELETE FROM products WHERE id='"+id+"';");
        console.log("Done");
        res.send("DELETED");
    })
    .catch(()=> res.send("ERROR"))
    .finally(()=> client.end);

});

router.put("/:id", authenticateToken,(req, res) => {
    const { id } = req.params;
    const params = req.body;

//Building Client
const client = initDb();

client.connect()
.then(() => console.log("connected"))
.then(() =>{
    //Submit data to DB per query
    client.query("UPDATE products SET fotourl ='" +params.fotourl +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET name ='" +params.name +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET beschreibung ='" +params.beschreibung +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET kontakt ='" +params.kontakt +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET auto ='" +params.auto +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET elektronik ='" +params.elektronik +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET haushalt ='" +params.haushalt +"' WHERE id ='"+id+"';");
    client.query("UPDATE products SET andere ='" +params.andere +"' WHERE id ='"+id+"';");
    console.log("Done");
})
.then(() =>{
    res.send("UPDATED");
})
.catch(()=> res.send("ERROR"))
.finally(()=> client.end);

    
});

router.get("/detail/:id", (req, res) => {
    const { id } = req.params;
//Building Client
    const client = initDb();

client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from products WHERE id='" +id+"';")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows[0]));
    })
    .then(() => client.query("select * from products WHERE id='" +id+"';"))
    .then(results => console.table(results.rows))
    
   .catch(() => console.log("Error connecting to db"))
   .finally(() => client.end);
});

router.get("/category/:cat", (req,res) =>{
    const {cat} =req.params;
    //Building Client
    const client = initDb();

client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from products WHERE "+ cat +" ='1';")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows));
    })
   .catch(() => console.log("Error connecting to db"))
   .finally(() => client.end);
});
router.get(("/byUser/:contact"),(req,res)=>{
    const {contact} =req.params;
    //Building Client
    const client = initDb();

client.connect()
    .then(() => console.log("connected"))
    .then(() => 
       client.query("select * from products WHERE kontakt ='"+ contact +"';")
)
    .then((results) => {
        const { rows } = results;
        res.send(JSON.stringify(rows));
    })
   .catch(() => console.log("Error connecting to db"))
   .finally(() => client.end);
});

export default router;
