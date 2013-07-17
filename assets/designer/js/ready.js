var current_area = -1;
var current_layout = -1;
var current_cell = -1;
var current_pos =[];
var current_size =[];
var current_center =-1;
var current_canvas_layout;
var list_cell = [];
var pading = 10;
var isMove = -1;
var isScale = -1;
var Position;
var Scaled;
var dl = 4;
var check_variable;
var lockeffect=-1;
var checkDbclick=-1;
var checkEmpty=-1;
var checkDrag=1,isdrag=-1,isdrop=-1,cellmove=-1,current_drop=-1,intvdrag;
var fbOBJ = -1, insOBJ = -1;
var isfirst = -1;
var Queffect = [];
var intQue;
$(document).ready(function(){
	for(var i=0; i<layout.length; i++){
		$("#inner-layout").append('<a class="lo_item item'+i+'" lid="'+i+'"><img src="'+baseUrl+'assets/layout/'+layout[i].thumbnail+'" width="40" height="60"></a>');
		$("a.item"+i).click(function(){
			if(isfirst == -1){
				isfirst = 1;
			}
			else
				alert("All design will be lost");
			list_cell = [];
			_w = $("#col2").width();
			_h = $("#col2").height();
			id = parseInt($(this).attr("lid"));
			$("#layout").html("");
			$("#layout").append('<canvas id="lcanvas"></canvas><canvas id="l-temp-canvas"></canvas>');
			LayoutCanvas(layout[id].border,layout[id].size[0],layout[id].size[1]);
			$("#layout").css({width: layout[id].size[0], height: layout[id].size[1], top: (_h-layout[id].size[1])/2 +"px", left: (_w-layout[id].size[0])/2 +"px"});
			$("#layout").css("background", 'url("'+baseUrl+'assets/uploads/devices/layer/'+layout[id].layer+'") center');
			render_layout(layout[id].element);
			current_layout = layout[id];
		})
		//Auto load fisrt layout
		isfirst = -1;
		$("a.lo_item:first").click();
	}
	for(var i=0; i<effect.length; i++){
		$("#inner-effect").append('<a preset="'+effect[i].effect+'" class="lo_item effect'+i+'" lid="'+i+'" original-title="'+effect[i].name+'"><img style="margin:2px;" src="'+baseUrl+'assets/effect/thumbnail/'+effect[i].effect+'.png" width="60" height="72" alt="'+effect[i].name+'"></a>');
		$("a.effect"+i).click(function(){
			for(var j=0;j<layout.length;j++)
				if($("#item"+j).html()!="")
					checkEmpty = 1;
			if(checkEmpty==-1)
				return;
			else
				checkEmpty=-1;

			if(lockeffect!=-1)
				return;
			else
				$(".lo_item img").css("opacity","0.2");
			//lockeffect = 1;
			var pset = $(this).attr("preset");
			$("#caman").html("");
			
			if(current_area!=-1){
				lockeffect=current_area;												
	      		$("#"+current_area+" img.waiting").show();
				Convertcaman($("#canvas"+current_area),pset);
			}
			else{
				$("img.waiting").show();
				//$(".canvas-container").each(function(){Convertcaman($(this).children(0),pset);lockeffect=$(this).children(0).attr("id").split("canvas")[1]});
				$(".canvas-container").each(function(){
					if($(this).children(0).attr("id").split("canvas")[1] != "")
						Queffect.push({
							el:$(this).children(0),ef:pset,lock:$(this).children(0).attr("id").split("canvas")[1]
						})
				});
				intQue = setInterval(ApplyEffects,500);
			}
		})
		$("a.effect"+i).tipsy({gravity: 'w'});
	}
	for(var i=0; i<galery.length; i++){
		$(".ad-thumb-list").append('<li><a title="'+galery[i].title+'"><img hsrc="'+galery[i].link+'" src="'+galery[i].thumb+'" class="ui-widget-content image'+i+'" onload="resizeimage(this);" style="height:65px;opacity: 0.7;"></a></li>');
		//$(".image"+i).draggable({ revert: true, helper: "clone" });
		$(".image"+i).draggable({ revert: true, helper: "clone",
		start: function() {
	        $(".item").addClass("item_hover");
	      },
        stop: function() {
	        $(".item").removeClass("item_hover");
	      } });
	}
	for(var i=0; i<canvax.length; i++){
		$("#inner-canvas").append('<a class="lo_item cvx'+i+'" cid="'+canvax[i].id+'" original-title="'+canvax[i].title+'"><img src="'+baseUrl+'assets/uploads/devices/thumbnails/'+canvax[i].thumbnail+'" width="'+canvax[i].width+'"></a>');
		$("a.cvx"+i).tipsy({gravity: 'w'});
	}
	//--------------------------------------------------------Initial UI---------------------------------------------------------
	$(window).resize();
})

$(".accordion-heading").click(function(){
	$(".accordion-heading").removeClass("act");
	$(".fright").removeClass("icon-chevron-up");
	$(".fright").addClass("icon-chevron-down");
	$(this).children(2).children().eq(1).removeClass("icon-chevron-down");
	$(this).children(2).children().eq(1).addClass("icon-chevron-up");
	$(this).addClass("act");

})
var Img_source = Array(); //this is array contains all image get from url and use for restore image in effect
function render_layout(e){
	for(var i=0; i<e.length; i++){
		$("#layout").append('<div id="item'+i+'" class="item" path="'+e[i].path+'"></div>');
		$("#item"+i).css({width: e[i].boundary[2], height: e[i].boundary[3], top: e[i].boundary[0], left: e[i].boundary[1]});
		$('#item'+i).droppable({
	      drop: function( event, ui ) {
	      	AppendItem(event, $(ui.draggable).attr("hsrc"), this);
	      }
	    });
	    $('#item'+i).mousedown(function(e){

	    	//alert(($("#layout").position().top+$(this).position().top)+"-"+($("#layout").position().left+$(this).position().left)+" / "+e.pageY+"-"+e.pageX)
	    	if(checkDrag == 1){
		    	intvdrag = setInterval(callDrag,200,this);
		    }
	    	//
	    })
	    $('#item'+i).mouseover(function(e){
	    	current_drop = this;
	    })
	    $('#item'+i).click(function(){
	    	;
	    })
	    $('#item'+i).hammer().on("doubletap", function(event) {
	        //console.log(this, event);
	        //alert("db tab");
	        $(this).dblclick();
	    });
	    $('#item'+i).dblclick(function(){
	    	if($(this).html() != ""){
	    		if(current_area==-1 || current_area!=$(this).attr("id")){
			    	$('.item').removeClass("lo_hover");
			    	$(this).addClass("lo_hover");
			    	current_area = $(this).attr("id");
		    	}
		    	$('.item').hide();
		    	$(this).show();
		    	checkDbclick = -1;
		    	checkDrag = -1;
		    	isdrag = -1;
		    	var tinfo=$("#canvas"+$(this).attr("id")).attr("style").split(";");
		    	for(var i = 0; i < tinfo.length; i++){
		    		dinfo = tinfo[i].split(":");
		    		if(dinfo[0].indexOf("width") != -1)
		    			current_size[0] = parseFloat(dinfo[1]);
		    		else if(dinfo[0].indexOf("height") != -1)
		    			current_size[1] = parseFloat(dinfo[1]);
		    		else if(dinfo[0].indexOf("left") != -1)
		    			current_pos[0] = parseFloat(dinfo[1]);
		    		else if(dinfo[0].indexOf("top") != -1)
						current_pos[1] = parseFloat(dinfo[1]);
		    	}
		    	
				id = $(this).attr("id");
				for(var i=0;i<list_cell.length;i++)
					if(list_cell[i].item == id){
						current_cell = list_cell[i];

						break;
					}
				$(".source."+id).fadeIn();
				$(".blurlayer."+id).fadeIn();
				$(".boundary."+id).fadeIn();
				
				current_centerx = [];
				current_centerx[0] = $(".blurlayer."+id).offset().left+$(".blurlayer."+id).width()/2;
				current_centerx[1] = $(".blurlayer."+id).offset().top+$(".blurlayer."+id).height()/2;
				current_centerx[2] = $(".blurlayer."+id).width();
				current_centerx[3] = $(".blurlayer."+id).height();
				if(current_cell.ccenter == undefined)
					current_cell.ccenter = current_centerx;
				//console.log(current_center[0]+"/"+current_center[1])
				//$(".blurlayer.item3").offset().left+"/"+$(".blurlayer.item3").offset().top
			}
		})
	}
}
function AppendItem(events, src, el){
	var _w = $(el).width();
  	var _h = $(el).height();
  	$(el).html("");														//http://loadinggif.com/images/image-selection/6.gif
  	$(el).append('<img style="margin:'+(_h/2-5)+'px 0 0 '+(_w/2-5)+'px" src="http://loadinggif.com/images/image-selection/1.gif" />');
  	//var ap = $(el).attr("id");
  	if(src.indexOf("data:image") != -1)
  		_appenditem(src,$(el).attr("id"));
  	else
	  	$.post("http://local.beesightsoft.com/skinizi/index.php/camanproxy?camanProxyUrl=" + (encodeURIComponent(src)),function(data){
	  		_appenditem(data,$(el).attr("id"));
	  	})
}
function _appenditem(data, ap){
	var _w = $("#"+ap).width();
  	var _h = $("#"+ap).height();
	$("#"+ap).html("");
	$("#"+ap).append('<div class="source '+ap+'"><img src="'+data+'" style="opacity:0.4;" width="100%" height="100%"><div class="button_cmd lt '+ap+'"><i class="jcon"></i></div><div class="button_cmd lb '+ap+'"><i class="jcon"></i></div><div class="button_cmd rt '+ap+'"><i class="jcon"></i></div><div class="button_cmd rb '+ap+'"><i class="jcon"></i></div></div><div class="blurlayer '+ap+'"></div><div class="boundary '+ap+'"><canvas id="canvas'+ap+'"></canvas></div><img class="waiting" style="display:none;z-index:99999;position:absolute;top:'+(_h/2-5)+'px; left:'+(_w/2-5)+'px;" src="http://loadinggif.com/images/image-selection/14.gif" />');
	data_path = $("#"+ap).attr("path");
	for(var i=0;i<list_cell.length;i++)
		if(list_cell[i].item==ap){
			list_cell[i] = AppendCanvas(ap,'canvas'+ap, $("#"+ap).position().top, $("#"+ap).position().left, $("#"+ap).width(), $("#"+ap).height(), data, data_path);
			check_variable=1;
			break;
		}
	if(check_variable!=1)
		list_cell.push(AppendCanvas(ap,'canvas'+ap, $("#"+ap).position().top, $("#"+ap).position().left, $("#"+ap).width(), $("#"+ap).height(), data, data_path));
	else
		check_variable=-1;
	current_canvas_layout._objects=[];
	for(var i=0;i<list_cell.length;i++)
		SavetoCanvas(list_cell[i].canvas.toDataURL("image/png"),list_cell[i]._cellleft, list_cell[i]._celltop);
	$(".source."+ap).hide();
	$(".blurlayer."+ap).hide();
	$(".boundary."+ap).hide();

	$(".lt."+ap).bind("mousedown", function(e){ 
		isMove *= -1;
		Position = e;
	})
	$(".lt."+ap).bind("mouseup", function(){
		isMove = -1;
	})
	$(".lt."+ap).bind("mousemove", function(e){
		
	})
	$(".rt."+ap).bind("mousedown", function(e){
		isScale *= -1;
		current_cell.naturalscale = $(".source."+current_cell.item+" > img")[0].naturalHeight / $(".source."+current_cell.item+" > img")[0].naturalWidth;
		Scaled = e;
		current_cell.ccenter[0] = $(".blurlayer."+current_cell.item).offset().left+$(".blurlayer."+current_cell.item).width()/2;
		current_cell.ccenter[1] = $(".blurlayer."+current_cell.item).offset().top+$(".blurlayer."+current_cell.item).height()/2;
		//console.log(current_center[0]+"/"+current_center[1]);
	})
	$(".rb."+ap).bind("click", function(){
		current_canvas_layout._objects=[];
		for(var i=0;i<list_cell.length;i++)
			SavetoCanvas(list_cell[i].canvas.toDataURL("image/png"),list_cell[i]._cellleft, list_cell[i]._celltop);
		current_cell = -1;
		$('.item').show();
		$(".source."+ap).fadeOut();
		$(".blurlayer."+ap).fadeOut();
		$(".boundary."+ap).fadeOut();
		$('.item').removeClass("lo_hover");
	    current_area = -1;
		checkDrag = 1;
	})
	$(".lb."+ap).bind("click", function(){
		removeCell(current_cell.item);
		$('.item').show();
		$(".source."+ap).fadeOut();
		$(".blurlayer."+ap).fadeOut();
		$("#"+current_cell.item).html("");
		$('.item').removeClass("lo_hover");
	    current_area = -1;
		current_cell = -1;
		checkDrag = 1;
	})

	for(var i=0;i < Img_source.length;i++)
		if(Img_source[i].id == ap){
		Img_source[i].src = data;
		return;
	}
	Img_source.push({id:ap,src:data});
}
function AppendCanvas(cell, canvaid, celltop, cellleft, cellwidth, cellheight, data, clipdata){
	var objcell = new Object();
	var designerCanvas;
	objcell.item = cell;
	objcell.canvasid = canvaid;
	objcell._cellleft = cellleft;
	objcell._celltop = celltop;
	canvas = $("#"+canvaid);
	boundary = $(".boundary");
	designerWidth =boundary.width();
	designerHeight =boundary.height();
	// initialize the canvas
	canvas.width(cellwidth);
	canvas.height(cellheight);
	canvas.attr("width",cellwidth);
	canvas.attr("height",cellheight);
	if(clipdata=="0")
		designerCanvas = new fabric.Canvas(canvaid);
	else
		designerCanvas = new fabric.Canvas(canvaid, {
		  clipTo: function(ctx) {
		    var pathx = new Kinetic.Path({
	            data: clipdata
	          });
	        pathx.ClipxFunc(ctx);
	      }
	  });
	objcell.canvas = designerCanvas;
	if(current_cell==-1)
		current_cell = objcell;
	//
	//Add image to Canvas
	fabric.Image.fromURL(data, function(obj) {
		var w = obj.get('width');
		var h = obj.get('height');
		var expectW= designerCanvas.width;
		var expectH = designerCanvas.height;

		var scale = expectW / w;
		if(h*scale < expectH) scale = expectH / h;
		if(scale>2) scale = 2;
		var _top = boundary.position().top;
		var _left = boundary.position().left;
		if(objcell.mleft == undefined){
			
			objcell.mleft = -pading-(w*scale-designerCanvas.width)/2;
			objcell.mtop = -pading-(h*scale-designerCanvas.height)/2;
		}
		updatesize(w*scale, h*scale, objcell);
		updatepos(_left-pading-(w*scale-designerCanvas.width)/2, _top-pading-(h*scale-designerCanvas.height)/2, objcell);
		obj.scale(scale);
		obj.set({ left:designerCanvas.width/2, top: designerCanvas.height/2,hasControls:false,hasBorders:false});
		objcell.imgOBJ = obj;
		obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;
	    designerCanvas.insertAt(obj,0);
	    designerCanvas.renderAll();
	    SavetoCanvas(designerCanvas.toDataURL("image/png") ,objcell._cellleft, objcell._celltop);
	})
	$("div.boundary."+cell).mousedown(function(e){
		if(checkDbclick == 1){
			console.log(e);
			isMove = 1;
			Position = e;
		}
	})
	return objcell;
}
function SavetoCanvas(Fullimg, Fullleft, Fulltop){
	fabric.Image.fromURL(Fullimg, function(obj) {
		var w = obj.get('width');
		var h = obj.get('height');
		obj.set({ left: Fullleft+w/2, top: Fulltop+h/2,hasControls:false,hasBorders:false});
		obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;
		current_canvas_layout.insertAt(obj, 0);
		current_canvas_layout.renderAll();

	});
}
var pathx;
function LayoutCanvas(ldata, lwidth, lheight){
	pathx = new Kinetic.Path({
    	x: 0,
      	y: 0,
      	stroke: 'rgba(255,0,0,0.9)',
      	strokeWidth : 5,
        data: ldata
      });
	
	tempcanvas = $("#l-temp-canvas");
	canvas = $("#lcanvas");
	// initialize the canvas
	tempcanvas.width(lwidth);
	tempcanvas.height(lheight);
	tempcanvas.attr("width",lwidth);
	tempcanvas.attr("height",lheight);

	canvas.width(lwidth);
	canvas.height(lheight);
	canvas.attr("width",lwidth);
	canvas.attr("height",lheight);

	temp_canvas = new fabric.Canvas("l-temp-canvas");
	current_canvas_layout = new fabric.Canvas("lcanvas", {
	  clipTo: function(ctx) {
        pathx.ClipxFunc(ctx);
      }
    });

    
    var pathy = new fabric.Path(ldata);
	pathy.set({ left: (lwidth/2)-1, top: (lheight/2), fill: 'transparent', strokeWidth: 2, stroke: 'white', opacity: 0.7, hasControls:false, hasBorders:false });
	pathy.lockRotation = pathy.lockUniScaling = pathy.lockMovementX = pathy.lockMovementY = pathy.lockScalingX = pathy.lockScalingY = true;
	temp_canvas.add(pathy);
	temp_canvas.renderAll();
	$(".canvas-container").css("position","absolute");

    fabric.Image.fromURL("http://favim.com/orig/201105/13/artistic-color-girl-messy-painty-Favim.com-42800.jpg", function(obj) {
		var w = obj.get('width');
		var h = obj.get('height');
		obj.set({ left:w/2, top: h/2,hasControls:false,hasBorders:true});
	    //current_canvas_layout.insertAt(obj,0);
		current_canvas_layout.renderAll();
	});
}
function removeCell(idr){
	for(var i=0;i<list_cell.length;i++)
		if(list_cell[i].item==idr){
			var index = list_cell.indexOf(list_cell[i]);
			list_cell.splice(index,1);
			current_canvas_layout._objects=[];
			current_canvas_layout.renderAll();
			for(var j=0;j<list_cell.length;j++)
				SavetoCanvas(list_cell[j].canvas.toDataURL("image/png"),list_cell[j]._cellleft, list_cell[j]._celltop);
			break;
		}

}
function callDrag(e){
	if(checkDrag == 1 && $(e).html() != ""){
		$(".dragcell").attr("src",$(".source."+$(e).attr("id")+" img").attr("src"));
    	$(".dragcell").css("background","url("+$(".source."+$(e).attr("id")+" img").attr("src")+") center no-repeat");
    	$(".dragcell").css("background-size","70px");
		isdrag = e;
	}
	else
		isdrag = -1;
	clearInterval(intvdrag);
}
function updatesize(_ew, _eh, _cc){
	$(".blurlayer."+_cc.item).css({width: _ew+"px" , height: _eh+"px"});
	$(".source."+_cc.item).css({width: _ew+"px" , height: _eh+"px"});
	$(".rt."+_cc.item).css("left", _ew+pading+5+"px");
	$(".lb."+_cc.item).css("top", _eh+pading+5+"px");
	$(".rb."+_cc.item).css({top: _eh+pading+7+"px", left: _ew+pading+7+"px"});
}
function updatepos(_el, _et, _cc){
	$(".source."+_cc.item).css({top: _et+"px" , left: _el+"px"});
	$(".blurlayer."+_cc.item).css({top: _et+1+"px" , left: _el+1+"px"});
}
function updatecanvas_size(_ew, _eh, _cc){
	_cc.imgOBJ.width = _ew;
	_cc.imgOBJ.height = _eh;
	_cc.imgOBJ.scale(1);
	_cc.canvas.renderAll();
}
function updatecanvas_pos(_el, _et, _cc){
	_cc.imgOBJ.top += _et;
	_cc.imgOBJ.left += _el;
	_cc.canvas.renderAll();
}
function scaling(dx, dy, _cc){
	var _width = $(".source."+_cc.item).width();
	var _height = $(".source."+_cc.item).height();
	var _cwidth = $(".boundary."+_cc.item).width();
	var _cheight = $(".boundary."+_cc.item).height();
	var _top = $(".source."+_cc.item).position().top;
	var _left = $(".source."+_cc.item).position().left;
	if(dx < dy){
		var dh = dx*_cc.naturalscale;
		var dw = dx;
	}
	else{
		dh = dy;
		dw = dh/_cc.naturalscale;
	}
	dh*=2;dw*=2;
	if(checkSize(10+_cc.mtop+(dh-_cc.ccenter[3])/-2, 10+_cc.mleft+(dw-_cc.ccenter[2])/-2, 10+_left+dw, 10+_top+dh )){
		updatesize(dw, dh, _cc);
		updatepos(_cc.mleft+(dw-_cc.ccenter[2])/-2, _cc.mtop+(dh-_cc.ccenter[3])/-2, _cc);
		updatecanvas_size(dw, dh, _cc);
	}
		/*
	if(checkSize(10+_top+(dh/-2), 10+_left+(dh/_cc.naturalscale)/-2, 10+(_height+dh)/_cc.naturalscale+_left+(dh/_cc.naturalscale)/-2, 10+_height+dh+_top+(dh/-2))){
		updatesize((_height+dh)/_cc.naturalscale, _height+dh, _cc);
		updatepos(_left+(dh/_cc.naturalscale)/-2, _top+(dh/-2), _cc);
		updatecanvas_size((_height+dh)/_cc.naturalscale, _height+dh, _cc);
	}
	*/
}
function scaling2(dw, dh, _cc){
	var _width = $(".source."+_cc.item).width();
	var _height = $(".source."+_cc.item).height();
	var _cwidth = $(".boundary."+_cc.item).width();
	var _cheight = $(".boundary."+_cc.item).height();
	var _top = $(".source."+_cc.item).position().top;
	var _left = $(".source."+_cc.item).position().left;
	if(checkSize(10+_top+(dh/-2), 10+_left+(dh/+_cc.naturalscale)/-2, 10+(_height+dh)/+_cc.naturalscale+_left+(dh/+_cc.naturalscale)/-2, 10+_height+dh+_top+(dh/-2))){
		updatesize((_height+dh)/+_cc.naturalscale, _height+dh, _cc);
		updatepos(_left+(dh/+_cc.naturalscale)/-2, _top+(dh/-2), _cc);
		updatecanvas_size((_height+dh)/+_cc.naturalscale, _height+dh, _cc);
	}
}
/*
	Event : Scale And Moving
*/
$(window).resize(function() {
	_wdHeight=$(window).height();
	//alert(_wdHeight)
	_wdHeight -= 170;
	if(_wdHeight < 510)
		return;
	else{
		$(".row").css("height",_wdHeight+"px");
		var _w = $("#col2").width();
		var _h = $("#col2").height();
		$("#layout").css({width: layout[id].size[0], height: layout[id].size[1], top: (_h-current_layout.size[1])/2 +"px", left: (_w-current_layout.size[0])/2 +"px"});
	}
});
$("body").dblclick(function(){
	if(checkDbclick==-1 && current_cell!=-1)
		checkDbclick=1;
	else
		$(".rb."+current_cell.item).click();
})

$("body").mouseup(function(e){
	if(cellmove!=-1){
		cellmove = -1;
		if(current_drop != -1){
			AppendItem(null, $(".dragcell").attr("src"), current_drop);
		}
		$(".item").removeClass("item_hover");
	}
	isdrag = -1;
	isScale = -1;
	isMove = -1;
	$(".dragcell").hide();
	clearInterval(intvdrag);
	//console.log(e.pageX+"/"+e.pageY);
	//console.log("-----------------------")
	//console.log($(".blurlayer.item3").offset().left+"/"+$(".blurlayer.item3").offset().top);
})

$("body").mousemove(function(e){
	/*
		Scale Action: 	Get x/y and calculate new scale number.
						Update scale of object and position of div image boundary
	*/
	if(isdrag != -1){
		$(".item").addClass("item_hover");
		removeCell($(isdrag).attr("id"));
		$(isdrag).html("");
		$(".dragcell").show();
		var dw = $(".dragcell").width()/2;
		$(".dragcell").css({top: e.pageY - 30, left: e.pageX - dw});
		cellmove = 1;
		//isdrag = -1;
	}
	if(isScale == 1){

		var dx = e.pageX - current_cell.ccenter[0];
		var dy = e.pageY - current_cell.ccenter[1];
		if(dx < 0) dx *= -1;
		if(dy < 0) dy *= -1;
		scaling(dx , dy, current_cell);
		/*var dx = e.pageX - Scaled.pageX;
		var dy = e.pageY - Scaled.pageY;
		if(dy == 0)if(dx < 0){dw = dl;dh = dl;}else{dw = -dl;dh = -dl;}
		else if(dx == 0)if(dy < 0){dw = dl;dh = dl;}else{dw = -dl;dh = -dl;}
		else if(dx > 0 && dy < 0){dw = dl;dh = dl;}
		else{dw = -dl;dh = -dl;}
		scaling(dh , dw, current_cell);
		Scaled = e;*/
	}

	if(isMove == 1){//check move boundary
		var dx = e.pageX - Position.pageX;
		var dy = e.pageY - Position.pageY;
		var _top = $(".source."+current_cell.item).position().top;
		var _left = $(".source."+current_cell.item).position().left;
		var _width = $(".source."+current_cell.item).width();
		var _height = $(".source."+current_cell.item).height();
		if(checkSize(_top+dy+10, _left+dx+10, _width+_left+dx+10, _height+_top+dy+10)){
			updatecanvas_pos(dx, dy, current_cell);
			updatepos(_left+dx, _top+dy, current_cell);
			current_cell.mleft += dx;
			current_cell.mtop += dy;
		}
		Position = e;
	}
})
function checkSize(top, left, right, bottom){
	//console.log(top+"/"+left+" : "+right+"/"+bottom)
	console.log(left+"/"+current_pos[0]);
	if(left > current_pos[0])
		return false;
	if(top > current_pos[1])
		return false;
	if(right < (current_pos[0]+current_size[0]))
		return false;
	if(bottom < (current_pos[1]+current_size[1]))
		return false;
	return true;
}
/*-----------------------------------------SOCIAL COMMAND---------------------------------------*/
//click to change style and call action of facebook and instagram
$("ul.nav li a").click(function(){
	$("ul.nav li select").hide();
	$("ul.nav li").attr("style","");
	$("ul.nav li").removeClass("active");
})
$(".fbook").click(function(){
	$(".ad-thumb-list").html("");
	$("ul.nav li").removeClass("active");
	$(this).parent().addClass("active");
	FB_login();
	$(".fbctr").css("width","200px");
	$(".fbalbums").show();
	$(".ad-thumb-list").css("width","6000px");
})
$(".insta").click(function(){
	$(".ad-thumb-list").html("");
	$("ul.nav li").removeClass("active");
	$(this).parent().addClass("active");
	window.open("https://instagram.com/oauth/authorize/?client_id=fdd6bcec0bf046bb8ef90beb5a703ddc&redirect_uri=http://local.beesightsoft.com/skinizi/index.php/instagram&response_type=code", 'popUpWindow', "width=450, height=300");
	
})
$(".upload").click(function(){
	$(".ad-thumb-list").html("");
	$("ul.nav li").removeClass("active");
	$(this).parent().addClass("active");
})
$('.fbalbums').change(function() {
  	//console.log($("select.fbalbums option:selected").val());
  	var gal_size=0;
  	$(".ad-thumb-list").html("");
  	if($("select.fbalbums option:selected").val() == "friends"){
  		for(var i = 0; i < fbOBJ[2].data.length;i++){
  			gal_size+=88;
  			var xobj = fbOBJ[2].data[i];
  			$.get("http://graph.facebook.com/"+fbOBJ[2].data[i].id+"/picture?width=300&redirect=false", function(data){ 
		      callAddimage(xobj, data);
		    },"json"); 
  		}
  		$(".ad-thumb-list").css("width",gal_size);
  	}
  	else
	  	FB.api("/"+$("select.fbalbums option:selected").val()+"/photos",function(response){
			for(var i=0; i<response.data.length; i++){
				gal_size+=100;
				Addgallery(response.data[i].id, name, response.data[i].picture, response.data[i].source.split("https").join("http"));
				$(".ad-thumb-list").css("width",gal_size);
			}
			$(".ad-thumb-list").css("width",gal_size);
		})
	
});
$('.rdom').click(function(){
	randomimage();
})
function randomimage(){
	var count = $(".ad-thumb-list li").length;
	if(count<=0)
		return;
	for(var i=0; i< current_layout.element.length;i++){
		var ichoice = Math.floor((Math.random()*count));
		AppendItem(null, $(".ad-thumb-list li:eq("+ichoice+") a img").attr("hsrc"), $("#item"+i));
	}
	
}
/*----------------------------------------------SOCIAL CONNECT-----------------------------------------*/
//FACEBOOK - CONNECT
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '472898372792971',                        // App ID from the app dashboard
      channelUrl : '//local.beesightsoft.com/skinizi/index.php/designer', // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true                                  // Look for social plugins on the page
    });

    FB.getLoginStatus(function(response) {
	    if (response.status == 'connected') {
	        FB.api('/'+response.authResponse.userID, function(response) {
		        FB.api('/me/albums', function(resalbum){
			   		for(var i=0; i<resalbum.data.length; i++)
			   			;
			   			//FB_albums(resalbum.data[i].name, resalbum.data[i].id);
			   })
		    });
		    
	    } else if (response.status == 'not_authorized') {
	        //FB_login();
	    } else {
	        //FB_login();
	    }
	});
};
function FB_login(){
	FB.login(function(response) {
		fbOBJ = [];
	    FB.api('/me/albums', function(resalbum){
	   		fbOBJ[0] = resalbum;
	   		if($(".fbalbums").html() == "")
	   			for(var i=0; i<resalbum.data.length; i++){
	   				FB_albums(resalbum.data[i].name, resalbum.data[i].id);
	   				if(i==(resalbum.data.length-1))
	   					FB_albums("Friend's avatar", "friends");
	   			}
	   })
	    FB.api('/'+response.authResponse.userID+'/photos', function(albums2){
	   		fbOBJ[1] = albums2;
	   })
	    FB.api('/me/friends', function(friends_list){
	   		fbOBJ[2] = friends_list;
	   })
	}, {scope: 'email,read_stream,publish_stream,offline_access,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});
}

function FB_albums(name, id){
	if($(".fbalbums").html() != ""){
		$(".fbalbums").append('<option value="'+id+'">'+name+'</option>');
		FB.api("/"+id+"/photos",function(response){
			for(var i=0; i<response.data.length; i++)
				for(var j=0; j< response.data[i].images.length; j++)
        			if(response.data[i].images[j].height < 400 || response.data[i].images[j].width < 400){
						Addgallery(response.data[i].id, name, response.data[i].picture, response.data[i].images[j].source.split("https").join("http"));
						break;
					}
		})
	}
	else
		$(".fbalbums").append('<option value="'+id+'">'+name+'</option>');
}

function INS_albums(ins){
	//console.log(ins)
	$.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/"+ins.user.id+"/media/recent/?access_token="+ins.access_token,
        success: function(data) {
        	for(var i=0; i< data.data.length; i++)
        		Addgallery(data.data[i].created_time, data.data[i].caption, data.data[i].images.thumbnail.url, data.data[i].images.standard_resolution.url);
        }
    });
}
function callAddimage(fbj, data){
	console.log(data);
	Addgallery(fbj.id, fbj.name, data.data.url, data.data.url);
}
function getBase64FromImageUrl(id, URL) {
    var imgz = new Image();
    imgz.src = URL;
    imgz.onload = function () {
	    var canvas = document.createElement("canvas"); canvas.width =this.width; canvas.height =this.height;
	    canvas.id = "cv"+id;
	    temporary_canvas = new fabric.Canvas("cv"+id);
	    fabric.Image.fromURL(URL, function(obj) {
	    	temporary_canvas.insertAt(obj,0);
	    	temporary_canvas.renderAll();
	    	console.log(temporary_canvas.toDataURL('png'));
	    })
	    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}
function ApplyEffects(){
	if(Queffect.length > 0){
		if(lockeffect == -1){
			$(".lo_item img").css("opacity","0.2");
			var applyeffect = Queffect.pop();
			lockeffect = applyeffect.lock;
			Convertcaman(applyeffect.el,applyeffect.ef);
		}
	}
	else{
		$(".lo_item img").css("opacity","1");
		clearInterval(intQue);
	}
}
function Addgallery(id,title,thumbnail,source){
	$(".ad-thumb-list").append('<li><a title="'+title+'"><img hsrc="'+source+'" src="'+thumbnail+'" class="adgallery ui-widget-content image'+id+'" onload="resizeimage(this);" style="height:65px;opacity: 0.7;"></a></li>');
	$(".image"+id).draggable({ revert: true, helper: "clone",
		start: function() {
	        $(".item").addClass("item_hover");
	      },
        stop: function() {
	        $(".item").removeClass("item_hover");
	      } });
	$(".image"+id).hover(function(){$(this).css("opacity","1")},function(){$(this).css("opacity","0.5")})
}
function resizeimage(e){
	$(e).css("width",e.naturalWidth*(65/e.naturalHeight)+"px");
}
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));