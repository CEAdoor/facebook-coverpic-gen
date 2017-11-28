var Jimp = require("jimp");
var sizeOf = require('image-size');

module.exports.fixpic=function(req,res){
 
   
var location="./public/images/"+req.body.image

        Jimp.read(location, function (err, lenna) {
            if (err) throw err;
            lenna.resize(851.5,Jimp.AUTO)            
                 .quality(60)             
                 .write("new1"+req.body.image); 
            res.json({msg:'Processing Image'})
        });

    
}
module.exports.overlay=function(req,res){
    console.log("hello")
    var i =0;
    var dimensions = sizeOf("new1"+req.body.image);
    console.log(dimensions.width+'  '+ dimensions.height);
    var heightdiff=dimensions.height-315;
    if (heightdiff<=0){
        heightdiff=0
    }else{
        heightdiff=heightdiff/4
    }
    
    var response={}
    Jimp.read("overlay.png",function(err,overlay){

      
        Jimp.read("new1"+req.body.image, function (err, lenna) {
            if (err) throw err;
            
            lenna.crop( 0, 0, 851.5, 315 )
                 .composite(overlay,0,0)               
                 .write("./public/images/final0"+req.body.image); 
            
            }
        );
        response.image1="final0"+req.body.image
        
        Jimp.read("new1"+req.body.image, function (err, lenna) {
            if (err) throw err;
            
            lenna.crop( 0,heightdiff, 851.5, 315 ).composite(overlay,0,0)               
                 .write("./public/images/final1"+req.body.image); 
            
            }
           
        );
        response.image2="final1"+req.body.image
        
        Jimp.read("new1"+req.body.image, function (err, lenna) {
            if (err) throw err;
            
            lenna.crop( 0, 2*heightdiff, 851.5, 315 ).composite(overlay,0,0)               
                 .write("./public/images/final2"+req.body.image); 
            
            }
           
        );
        response.image3="final2"+req.body.image

        Jimp.read("new1"+req.body.image, function (err, lenna) {
            if (err) throw err;
            
            lenna.crop( 0, 3*heightdiff, 851.5, 315 ).composite(overlay,0,0)               
                 .write("./public/images/final3"+req.body.image); 
            
            }
           
        );
        response.image4="final3"+req.body.image
        
        Jimp.read("new1"+req.body.image, function (err, lenna) {
            if (err) throw err;
            
            lenna.crop( 0, 4*heightdiff, 851.5, 315 ).composite(overlay,0,0)               
                 .write("./public/images/final4"+req.body.image); 
            
            }
           
        );
        response.image4="final4"+req.body.image
    res.json(response)
    })
    
}