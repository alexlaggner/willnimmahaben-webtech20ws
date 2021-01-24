import express from 'express';   
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from '../server/Routes/routes_products.js';
import userRouter from '../server/Routes/routes_users.js';
import multer from 'multer';
import fs from 'fs';


const app = express();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./Pictures/");
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ file.originalname);
    }
});
const upload = multer({storage:storage, dest:'Pictures'});

app.use(bodyParser.json());


//Enabling CORS
app.use(cors({origin : "*"}));
app.use(function (req, res, next) {   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Use Routes
app.use("/products", productRouter);
app.use("/users", userRouter);

//Image Upload
app.use(express.static('/Pictures/private'));

app.post('/upload', upload.single('file'),(req,res,next)=>{
    const file = req.file;
    console.log(file.originalname);
    if(!file){
        const error= new Error("No File Uploaded");
        error.httpStatusCode = 400;
        return next(error);
    }
res.send(file);
});
app.get('/Pictures/:url', (req,res) =>{
    const {url} = req.params;
    fs.readFile('Pictures/' + url, function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
});


app.listen('3000', (req, res) => {
    console.log("server running on port 3000")
});