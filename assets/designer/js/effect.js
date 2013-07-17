function Effect(e,p){
	var id = $(e).attr("id");
	var src = -1;
	for(var i=0; i<Img_source.length;i++)
		if(Img_source[i].id==id){
			src = Img_source[i].src;
			break;
		}

	var _w = $(e).width();
	var _h = $(e).height();
    if(src!=-1)
    	Callcaman(id, src, p);
}

function Convertcaman(e,p){
	var id = $(e).attr("id");
	console.log(id);
	id=id.split("canvas")[1];
	var src = -1;
	for(var i=0; i<Img_source.length;i++)
		if(Img_source[i].id==id){
			src = Img_source[i].src;
			break;
		}
	if(src!=-1)
	{
		$("#caman").append('<img id="caman'+id+'" src="'+src+'" />');
		Callcaman('caman'+id, src, p);
	}
}
function Callcaman(id, src, p){
	Caman("#"+id, function () {
    	/*this.resize({
		    width: _w,
		    height: _h
		});*/
		switch(p){
			case "vintage": this.newLayer(function () { this.overlayImage(src);});this.vintage();break;
			case "lomo": 	this.newLayer(function () { this.overlayImage(src);});this.lomo();break;
			case "clarity": this.newLayer(function () { this.overlayImage(src);});this.clarity();break;
			case "sinCity": this.newLayer(function () { this.overlayImage(src);});this.sinCity();break;
			case "sunrise": this.newLayer(function () { this.overlayImage(src);});this.sunrise();break;
			case "crossProcess": this.newLayer(function () { this.overlayImage(src);});this.crossProcess();break;
			case "orangePeel": this.newLayer(function () { this.overlayImage(src);});this.orangePeel();break;
			case "love": this.newLayer(function () { this.overlayImage(src);});this.love();break;
			case "grungy": this.newLayer(function () { this.overlayImage(src);});this.grungy();break;
			case "jarques": this.newLayer(function () { this.overlayImage(src);});this.jarques();break;
			case "pinhole": this.newLayer(function () { this.overlayImage(src);});this.pinhole();break;
			case "oldBoot": this.newLayer(function () { this.overlayImage(src);});this.oldBoot();break;
			case "glowingSun": this.newLayer(function () { this.overlayImage(src);});this.glowingSun();break;
			case "hazyDays": this.newLayer(function () { this.overlayImage(src);});this.hazyDays();break;
			case "herMajesty": this.newLayer(function () { this.overlayImage(src);});this.herMajesty();break;
			case "nostalgia": this.newLayer(function () { this.overlayImage(src);});this.nostalgia();break;
			case "hemingway": this.newLayer(function () { this.overlayImage(src);});this.hemingway();break;
			case "concentrate": this.newLayer(function () { this.overlayImage(src);});this.concentrate();break;
			case "none": this.newLayer(function () { this.overlayImage(src);});break;
		}
	    this.render(function(){
	    	UpdateEffect(id,this.toBase64());
	    });
	});
}
var sleep = [];
function UpdateEffect(id, src){
	var i;
	for(i=0;i<list_cell.length;i++)
	    if(list_cell[i].item==id.split("caman")[1]){
	    	list_cell[i].imgOBJ._originalImage.src = src;
	    	list_cell[i].imgOBJ._element.src = src;
	    	break;
	    }
	sleep[i] = setInterval(checkRenderAll,500,i,id.split("caman")[1]);
	$("#"+id.split("caman")[1]+" img.waiting").hide();
}
function checkRenderAll(s,id){
	list_cell[s].canvas.renderAll();
	current_canvas_layout._objects=[];
	for(var i=0;i<list_cell.length;i++)
		SavetoCanvas(list_cell[i].canvas.toDataURL("image/png"),list_cell[i]._cellleft, list_cell[i]._celltop);

	if(id==lockeffect){
		lockeffect=-1;
		$(".lo_item img").css("opacity","1");
	}
	clearInterval(sleep[s]);
}
//NOTE CAMANJS : if use overlayImage(images) after render canvas will have 2 images inside.One for original and one of camanjs create with Effect
