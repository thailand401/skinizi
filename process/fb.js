var param = new Array();
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + decodeURIComponent(val));
  if(index >1)
    param.push(decodeURIComponent(val));
});
var cvs = eval(param[0]);
_width = 600, _height = 400;
var fs = require('fs'),                                         //Define Fabric and Canvas
    fabric = require('fabric').fabric,
    caman = require('caman').Caman,
    out = fs.createWriteStream(__dirname + '/helloworld.png');  //Directory to save final IMAGE
console.log(__dirname + '/helloworld.png');
var Cufon = require('fabric').Cufon;                            //Define Cufont _ use this as param to load font
var fonts = require("fonts");
fonts.load(Cufon);                                              //Load Cufont _ use param Cufon define above
var fabricexts = require('fabricexts');
var canvas = fabric.createCanvasForNode(_width, _height);       //Define canvas in NODE
//---------------------------------------------------------Processing Image-------------------------------
canvas.add(
  new fabric.Rect({
    width: _width, height: _height,
    left: _width/2, top: _height/2,
    fill: '#AABDD0'
  }));
//----------------------
for(var i = 1; i < param.length; i++){
  console.log(eval(param[i]));
  canvas.add(fabricexts.createfrom(eval(param[i]),fabric));
}
canvas.renderAll();
var stream = canvas.createPNGStream();
stream.on('data', function(chunk) {
  out.write(chunk);
});
