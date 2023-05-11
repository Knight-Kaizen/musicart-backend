const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDB = require('./config/connectDB');
const userController = require('./controllers/user');
const productController = require('./controllers/product');

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const port = 8001;
connectDB();



app.get('/', (req, res)=>{
    res.send('Backend Woring');
})
app.post('/user/register', userController.validateUser, userController.createUser);
app.post('/user/login', userController.loginUser);
app.patch('/user/cart/add/:id',userController.addItemToCart );
app.patch('/user/cart/delete/:id', userController.removeItemFromCart);

app.post('/products/add', productController.addProduct);
app.get('/products/view', productController.getAllProducts);


app.listen(port, ()=>{
    console.log('Listening to port', port);
})

