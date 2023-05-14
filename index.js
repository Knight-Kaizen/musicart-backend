const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/connectDB');
const userController = require('./controllers/user');
const productController = require('./controllers/product');

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors({
//     // origin: "http://localhost:3000"
//     origin: "https://musicart-if53ddhuf-knight-kaizen.vercel.app/"
// }))
app.use(cors());


const port = process.env.PORT ||8001;
connectDB();

customCheck = (req, res, next)=>{
    // console.log('I am here yo', req.body, req.query);
    

    next();
}

app.get('/', (req, res)=>{
    res.send('Backend Woring');
})
app.post('/user/register',  userController.validateUser, userController.createUser);
app.post('/user/login',userController.loginUser);
app.patch('/user/cart/add/:id',customCheck, userController.verifyToken, userController.addItemToCart );
app.get('/user/cart/:id', customCheck,userController.verifyToken, userController.getUserCart);
app.patch('/user/cart/delete/:id', userController.verifyToken, userController.removeItemFromCart);

app.post('/products/add', productController.addProduct);
app.get('/products/view',customCheck, productController.getAllProducts);
app.get('/products/detail/:id', productController.getProductDetails);


app.listen(port, ()=>{
    console.log('Listening to port', port);
})

