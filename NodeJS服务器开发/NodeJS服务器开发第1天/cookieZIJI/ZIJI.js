const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();


app.use(express.static('web'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/login',(require,response)=>{
    if (require.body.username=='kevin' && require.body.password=='123456') {
        response.cookies('pingZheng',require.body.username,{magAge})
    }
})
