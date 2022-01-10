const ArraySchema = require('./app/models/wifi.model');
const http = require('http');

 const dbConfig = require('./config/db.config.js');
 const mongoose = require('mongoose');
 
 
 

http.createServer(function (req, res) {
    console.log(req.method);
    console.log(req.url);
    //console.log(req);
    let x=(req.url).split('/');
    if(x[1]=="elements"){
        if(req.method==='GET'){
            let data=req.url.split("/")
            console.log(data[2]);
            index=data[2];
            ArraySchema.findById(index)
            .then(data => {
                res.write(JSON.stringify(data));
                res.end();
            }).catch(err => {
                console.log(err)
                res.write({
                    message: "Some error occurred while inserting."
                });
                res.end();
            });
            
        }
        else if(req.method==='POST'){
            // console.log(req);
            let body = '';
            // req.on('data', (data) => {

            //     body += data;
        
            // });
            // console.log(body);

            // req.on('end', () => {
                
            //     console.log(JSON.parse(data).todo); 
                
            // })var body = "";
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                console.log(body)
                let arr = [];
                let dt=body.split("&")
                console.log(dt)
                let id = (dt[0].split("="))[1]
                for(let i=1;i<dt.length;i++){
                    let dp=dt[i].split("=")
                    arr.push(Number(dp[1]))
                }
                console.log(arr)
                const details = new ArraySchema({
                    _id : id,
                    array: arr
                });
            
                // Save ArraySchema details in the database
                details.save()
                .then(data => {
                    res.write(JSON.stringify(data));
                    res.end();
                }).catch(err => {
                    console.log(err)
                    res.write({
                        message: "Some error occurred while inserting."
                    });
                    res.end();
                });
                
            });

            
            // console.log(x[2]);
            // Number(x[2]);
            // a=x[2]
            //res.write(JSON.stringify(arr));
            


        }

        else if(req.method==='PUT'){

            let body ='',dt;
            req.on('data', function (chunk) {
                body += chunk;
            })

            let data=req.url.split("/")
            console.log(data[2]);
            index=data[2];
            
            req.on('end', function () {
                console.log(body)
                console.log("***");
                dt=body.split("=")
                console.log(dt);
                value=Number(dt[1])
                arr[index]=value;
                console.log(arr);
                res.write(JSON.stringify(arr))
                res.end()
            });
            
        }
        else{  
            let data=req.url.split("/")
            console.log(data[2]);
            index=data[2];
            console.log("------------------------");
            arr.splice(index,1);
            ArraySchema.findByIdAndUpdate(
                data[2], { $pull: { "array": { _id: req.params.linkId } } }, { safe: true, upsert: true },)
            res.write(JSON.stringify(arr))
            res.end()
            
            // req.on('end', function () {
            //     console.log(body)
            //     console.log("***");
            //     dt=body.split("=")
            //     console.log(dt);
            //     value=Number(dt[1])
            //     arr[index]=value;
            //     console.log(arr);
            //     res.write(JSON.stringify(arr))
            //     res.end()
            // });                           // DELETE          
        }

    }

    // res.write(JSON.stringify(arr))
    // res.end();


}).listen(3000, function() {
    mongoose.Promise = global.Promise;
 
 // Connecting to the database
 mongoose.connect(dbConfig.url, {
     useNewUrlParser: true
 }).then(() => {
     console.log("Successfully connected to the database");
 }).catch(err => {
     console.log('Could not connect to the database.', err);
     process.exit();
 });
    console.log("server start at port 3000"); 
});