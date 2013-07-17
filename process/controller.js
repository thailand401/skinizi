var param = new Array();
var DIR;
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + decodeURIComponent(val));
  if(index >1)
    param.push(decodeURIComponent(val));
  DIR = val;
});

var cvs = eval(param[0]);
_width = cvs.width, _height = cvs.height;
var fs = require('fs'),                                         //Define Fabric and Canvas
    fabric = require('fabric').fabric,
    gm = require('gm'),
    out = fs.createWriteStream(DIR+cvs.fid+".png");  //Directory to save final IMAGE __dirname + '/helloworld.png'
var Cufon = require('fabric').Cufon;                            //Define Cufont _ use this as param to load font
var fonts = require("fonts");
fonts.load(Cufon);                                              //Load Cufont _ use param Cufon define above
var fabricexts = require('fabricexts');
var canvas = fabric.createCanvasForNode(_width, _height);       //Define canvas in NODE
//---------------------------------------------------------Processing Image-------------------------------
/*
canvas.add(
  new fabric.Rect({
    width: _width, height: _height,
    left: _width/2, top: _height/2,
    fill: '#AABDD0'
  }));
//----------------------
//console.log(new Image());
console.log('-------------------------------------------------<br>');
for(var i = 1; i < param.length-1; i++){
  var objtemp = eval(param[i]);
  for(var j = objtemp.list.length-1;j >= 0; j--){
      console.log(objtemp.list[j]);
      //console.log(fabricexts.createfrom(objtemp.list[j],fabric));
      //canvas.add(fabricexts.createfrom(objtemp.list[j],fabric));
  }
}
canvas.renderAll();
var stream = canvas.createPNGStream();
stream.on('data', function(chunk) {
  out.write(chunk);
});
console.log(1);
*/
param[1] = param[1].replace("items=","");
var temp = JSON.parse(param[1]);
temp.overlayImage = "";

/*
temp.objects[1].top = temp.objects[1].top - cvs.top;
temp.objects[1].left = temp.objects[1].left - cvs.left;
temp.objects[0].top = temp.objects[0].top - cvs.top;
temp.objects[0].left = temp.objects[0].left - cvs.left;
*/
for(var i = 0; i < temp.objects.length; i++){
  temp.objects[i].top = temp.objects[i].top - cvs.top;
  temp.objects[i].left = temp.objects[i].left - cvs.left;
  if(temp.objects[i].type == "text")
    temp.objects[i].text = temp.objects[i].text.split('|').join(' ');
}

param[1] = JSON.stringify(temp);
console.log(cvs.fid);
canvas.loadFromJSON(param[1], function() {
    var stream = canvas.createPNGStream();
    stream.on('data', function(chunk) {
      out.write(chunk);
    });
  }); 

