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
    Caman("#"+id, function () {
    	this.resize({
		    width: _w,
		    height: _h
		});
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
		}
	    this.render();
	});
}