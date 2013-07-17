var Service = new initialize();
var Device =  [];
var Grid = [];
var isMove = -1;
var isScale = -1;
var Position;
var Scaled;
var dl = 2; //
var tempOBJ;
var canvas;
var boundary;
var pading = 10;
$(document).ready(function () {
	console.log(Service);
	Service.getdevice(function(device){
		//for(var i=0; i<device.length; i++)
		console.log(device);
	})
	Service.getgrid(function(grid){
		console.log(grid);
	})

	canvas = $("#boundary1");
	boundary = $(".boundary");
	designerWidth =boundary.width();
	designerHeight =boundary.height();
	// initialize the canvas
	canvas.width(designerWidth);
	canvas.height(designerHeight);
	canvas.attr("width",designerWidth);
	canvas.attr("height",designerHeight);
	designerCanvas = new fabric.Canvas('boundary1', {
	  clipTo: function(ctx) {
	    var pathx = new Kinetic.Path({
            data: 'M 50.75 22.0 C 47.75 17.25 47.75 17.25 47.75 17.25 C 45.25 11.0 45.25 11.0 45.25 11.0 C 42.0 7.25 42.0 7.25 42.0 7.25 C 33.5 2.25 33.5 2.25 33.5 2.25 C 25.5 1.5 25.5 1.5 25.5 1.5 C 16.5 4.5 16.5 4.5 16.5 4.5 C 9.25 10.0 9.25 10.0 9.25 10.0 C 5.75 15.75 5.75 15.75 5.75 15.75 C 2.0 29.25 2.0 29.25 2.0 29.25 C 2.0 40.75 2.0 40.75 2.0 40.75 C 6.75 55.25 6.75 55.25 6.75 55.25 C 13.75 63.25 13.75 63.25 13.75 63.25 C 23.25 68.5 23.25 68.5 23.25 68.5 C 30.25 73.75 30.25 73.75 30.25 73.75 C 47.5 97.5 47.5 97.5 47.5 97.5 C 50.0 95.5 50.0 95.5 50.0 95.5 C 55.25 87.0 55.25 87.0 55.25 87.0 C 65.25 78.25 65.25 78.25 65.25 78.25 C 75.5 72.25 75.5 72.25 75.5 72.25 C 78.75 67.5 78.75 67.5 78.75 67.5 C 83.0 63.25 83.0 63.25 83.0 63.25 C 91.5 50.5 91.5 50.5 91.5 50.5 C 96.5 39.5 96.5 39.5 96.5 39.5 C 97.75 34.0 97.75 34.0 97.75 34.0 C 97.75 22.25 97.75 22.25 97.75 22.25 C 94.75 15.5 94.75 15.5 94.75 15.5 C 92.25 12.0 92.25 12.0 92.25 12.0 C 83.25 6.25 83.25 6.25 83.25 6.25 C 73.0 2.25 73.0 2.25 73.0 2.25 C 66.25 3.0 66.25 3.0 66.25 3.0 C 58.5 8.5 58.5 8.5 58.5 8.5 C 56.5 10.75 56.5 10.75 56.5 10.75 C 52.0 21.25 52.0 21.25 52.0 21.25 z'
          });
          pathx.ClipxFunc(ctx);
	  }
	});
	//Add image to Canvas
	fabric.Image.fromURL("http://local.beesightsoft.com/skinizi/assets/DinhBoLinh.jpg", function(obj) {

		var w = obj.get('width');
		var h = obj.get('height');
		var expectW= designerCanvas.width;
		var expectH = designerCanvas.height;

		var scale = expectW / w;
		if(h*scale < expectH) scale = expectH / h;
		if(scale>2) scale = 2;
		var _top = boundary.position().top;
		var _left = boundary.position().left;
		updatesize(w*scale, h*scale);
		updatepos(_left-pading, _top-pading-(h*scale-designerCanvas.height)/2);
		obj.scale(scale);
		obj.set({ left:designerCanvas.width/2, top: designerCanvas.height/2,hasControls:false,hasBorders:false});
		tempOBJ = obj;
		obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;
	    designerCanvas.insertAt(obj,0);
	})
	//

	$(".lt").mousedown(function(e){
		isMove *= -1;
		Position = e;
	})
	$(".lt").mouseup(function(){
		isMove = -1;
	})
	$(".lt").mousemove(function(e){
		if(isMove == 1){//check move boundary
			var dx = e.pageX - Position.pageX;
			var dy = e.pageY - Position.pageY;
			var _top = $(".source").position().top;
			var _left = $(".source").position().left;
			updatecanvas_pos(dx, dy);
			updatepos(_left+dx, _top+dy);
			Position = e;
		}
	})
	$(".rt").mousedown(function(e){
		isScale *= -1;
		naturalscale = $(".source > img")[0].naturalHeight / $(".source > img")[0].naturalWidth;
		Scaled = e;
	})
	$(".rb").click(function(){
		$(".source").fadeOut();
		$(".blurlayer").fadeOut();
	})

	$(".boundary").dblclick(function(){
		$(".source").fadeIn();
		$(".blurlayer").fadeIn();
	})

	$("body").mouseup(function(){
		isScale = -1;
	})
	$("body").mousemove(function(e){
		/*
			Scale Action: 	Get x/y and calculate new scale number.
							Update scale of object and position of div image boundary
		*/
		if(isScale == 1){
			var dx = e.pageX - Scaled.pageX;
			var dy = e.pageY - Scaled.pageY;
			if(dy == 0)if(dx < 0){dw = dl;dh = dl;}else{dw = -dl;dh = -dl;}
			else if(dx == 0)if(dy < 0){dw = dl;dh = dl;}else{dw = -dl;dh = -dl;}
			else if(dx > 0 && dy < 0){dw = dl;dh = dl;}
			else{dw = -dl;dh = -dl;}
			scaling(dh , dw);
			Scaled = e;
		}
	})
})
fshif = 0;
function updatesize(_ew, _eh){
	$(".blurlayer").css({width: _ew+"px" , height: _eh+"px"});
	$(".source").css({width: _ew+"px" , height: _eh+"px"});
	$(".rt").css("left", _ew+pading+"px");
	$(".lb").css("top", _eh+pading+"px");
	$(".rb").css({top: _eh+pading+"px", left: _ew+pading+"px"});
}
function updatepos(_el, _et){
	$(".source").css({top: _et+"px" , left: _el+"px"});
	$(".blurlayer").css({top: _et+1+"px" , left: _el+1+"px"});
}
function updatecanvas_size(_ew, _eh){
	tempOBJ.width = _ew;
	tempOBJ.height = _eh;
	tempOBJ.scale(1);
	designerCanvas.renderAll();
}
function updatecanvas_pos(_el, _et){
	tempOBJ.top += _et;
	tempOBJ.left += _el;
	designerCanvas.renderAll();
}
function scaling(dw, dh){
	var _width = $(".source").width();
	var _height = $(".source").height();
	var _cwidth = $(".boundary").width();
	var _cheight = $(".boundary").height();

	updatesize((_height+dh)/naturalscale, _height+dh);
	var _top = $(".source").position().top;
	var _left = $(".source").position().left;
	updatepos(_left+(dh/naturalscale)/-2, _top+(dh/-2));
	updatecanvas_size((_height+dh)/naturalscale, _height+dh);
}