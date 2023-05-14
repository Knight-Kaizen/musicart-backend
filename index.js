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
app.use(cors({
    origin: "http://localhost:3000"
}))


const port = 8001;
connectDB();

customCheck = (req, res, next)=>{
    console.log('I am here yo', req.body);

    next();
}

app.get('/', (req, res)=>{
    res.send('Backend Woring');
})
app.post('/user/register',  userController.validateUser, userController.createUser);
app.post('/user/login',  userController.loginUser);
app.patch('/user/cart/add/:id', userController.addItemToCart );
app.get('/user/cart/:id', userController.getUserCart);
app.patch('/user/cart/delete/:id',customCheck,  userController.removeItemFromCart);

app.post('/products/add', productController.addProduct);
app.get('/products/view', productController.getAllProducts);
app.get('/products/detail/:id', productController.getProductDetails);


app.listen(port, ()=>{
    console.log('Listening to port', port);
})

