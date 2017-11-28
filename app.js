var express=require('express')
var app=express()
var bodyParser=require('body-parser')
var multer=require('multer')
var overlay=require('./controller/overlay')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/images'))

app.set('view engine', 'ejs')
app.get('/',function(req,res){
    res.render('index',{req:req})
})
var path='';
var Storage = multer.diskStorage({
    
         destination: function(req, file, callback) {
    
             callback(null, "./public/images");
    
         },
    
         filename: function(req, file, callback) {
             path=file.fieldname + "_" + Date.now() + "_" + file.originalname
             callback(null,path );
             
    
         }
    
     });
var upload = multer({
          storage: Storage
                   }).array("imgUploader", 3);


app.post("/api/image",overlay.fixpic)
app.post("/api/image/overlay",overlay.overlay)
app.post("/api/Upload", function(req, res) {
         var error;
         var message;
         upload(req, res, function(err) {
    
             if (err) {
    
                 error=true;
                 message=err;
    
             }
             else{
                 error=false;
                 message="file uploaded successfully"
             }
             res.render('manipulate',{error:error,message:message,req:req,path:path})
         });
        
     });
app.use('/angular',express.static(__dirname+'/node_modules/angular'))
app.listen(process.env.PORT||5000,function(){
    console.log("Hello world")
})