const  connect =  require('./FZ MYSQL');

connect.query('select * from students',(err,result,fieldinfo)=>{
    if (err==null) {
        console.log(result);
    }else{
        console.log(err.message);
    }
})


connect.end();

