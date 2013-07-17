var currentCategoryId =0;
var currentSubCategoryId =0;
var currentDeviceList = null;
var currentDevice= null;
var currentCanvasList = null;
var currentCanvas =null;
var designerCanvas =  null;
var designerWidth = 0;
var designerHeight = 0;
var currentImage = null;
var currentPrintBoundary = null;
var imageModifyDirty = false;
var currentPreviewImageUrl = '';
var printBoundaryRect = null;
var sleft;
var Fourimage;
//===================================================================================//
// UPLOAD IMAGES AND LOAD TO CANVAS 												 //
//===================================================================================//
function loadOverlayImage()
{
	startloading();
	// select it
	fabric.util.loadImage(currentCanvas.layer, function(img) {
		stoploading();
		designerCanvas.overlayImage = img;
		boundary = currentCanvas.layerboundary.split(',');
		if(boundary.length>=4)
		{
			var left = parseInt(boundary[0]);
			var top = parseInt(boundary[1]);
			var width = parseInt(boundary[2]);
			var height = parseInt(boundary[3]);
			
			// calculate the offset
			designerCanvas.overlayImageLeft = (designerWidth -(left + width/2) * 2)/2;
			currentCanvas.leftOffset = designerCanvas.overlayImageLeft;
			currentCanvas.boundary = [left,top,width,height];
			printBoundaryRect = null;

			if(draw_print_border){
				boundary = currentCanvas.printboundary.split(',');
				if(boundary.length>=4){
					left = parseInt(boundary[0]);
					top = parseInt(boundary[1]);
					width = parseInt(boundary[2]);
					height = parseInt(boundary[3]);

					var rect =new fabric.Rect({
						width: width,
						height: height,
						left: left + currentCanvas.leftOffset + width/2,
						top: top + height/2,
						fill:null,
						strokeDashArray:[7,7],
				    	strokeWidth: 1,
				    	selectable: false,
				    	rx:20,
						ry:20
				  	});
				  	currentCanvas.boundary = [left,top,width,height];
				  	rect.hasControls = rect.hasBorders = rect.selectable = false;
				  	rect.perPixelTargetFind = true;
				  	rect.opacity = currentCanvas.printboundaryvisible == '0'?0.0:1.0;
				  	printBoundaryRect = rect;
					// draw print area rectangle
					var ground =new fabric.Rect({
						width: 460,
						height: 600,
						left: 230,
						top: 300,
						fill:'#00B7EB',
						opacity:0.3,
				  	});
					var posi =new fabric.Rect({
						width: 5,
						height: 5,
						left: left + currentCanvas.leftOffset + width/2,
						top: top + height/2,
						fill:'#FF0000',
						opacity:1,
				  	});
					var posi2 =new fabric.Rect({
						width: 5,
						height: 5,
						left: left + currentCanvas.leftOffset,
						top: top,
						fill:'#FF0000',
						opacity:1,
				  	});


					//designerCanvas.add(posi);
					//designerCanvas.add(posi2);
				  	//designerCanvas.add(ground);	
					designerCanvas.add(rect);	
				}
			}
		}
		else{
			designerCanvas.overlayImageLeft = (designerWidth -img.width)/2;	
		}
		
		// calculate the offset
		checkCurrentImageFitBoundary();
    	designerCanvas.renderAll();
	}, this);			
}

function addImageToCanvas(imageObj){
	if(currentDevice==null) 
	{
		showStep1Instruction();
		return;
	}
	stoploading();
	hideUploadInstruction();
	startloading();
	var url = imageObj.url;
	fabric.Image.fromURL(url, function(obj) {
		stoploading();
		if(currentImage!=null)	designerCanvas.remove(currentImage);
		var gap = -20;
		var w = obj.get('width');
		var h = obj.get('height');
		var expectW= designerCanvas.width;
		var expectH = designerCanvas.height;
		if(currentCanvas!=null)
		{
			expectW = currentCanvas.boundary[2];
			expectH = currentCanvas.boundary[3];
		}
		var scale = (expectW - gap ) / w;
		if(h * scale < (expectH -gap ) ) scale = (expectH - gap )/ h;
		if(scale>2) scale = 2;
		obj.scale(scale);
		obj.set({ left:designerCanvas.width/2, top: designerCanvas.height/2,hasControls:false,hasBorders:true});
		//console.log(obj);
	    designerCanvas.insertAt(obj,0);
	    var xi,isi = 0;
	    for(xi = 0; xi < layerArt[poslayer].list.length; xi++)
	    	if(layerArt[poslayer].list[xi].type == 'image'){
	    		isi = 0;
	    		break;
	    	}
	    	else
	    		isi = -1;
	    if(isi == -1)
	    	layerArt[poslayer].list.push(obj);
	    else
	    	layerArt[poslayer].list[xi] = obj;
		// update slider
		currentImage = obj;
		currentImage.originalWidth = parseInt(imageObj.width);
		currentImage.originalHeight = parseInt(imageObj.height);
		//measureImageQuality();
		//updateSliders(); 
		clearStep2();
		designerCanvas.renderAll();
	});
}
function saveCurrentDesignData(){
	currentCanvas.designData = {
		image:currentImage,
		top:currentImage.get('top'),
		left:currentImage.get('left')
	} ;	
}
function onfinishupload(imageObj){
	if(currentImage == null)
		addImageToCanvas(imageObj);
}

function measureImageQuality(){
	if((currentCanvas!=null) && (currentImage!=null))
	{
		if(currentImage.originalWidth >0)
		{
			
			var children = $("#imagequalityprogress").children();
			$('#imagequalityprogress').popover('destroy');
			$('#imagequalityprogress').popover(
				{
					content:'<div style="width:208px">'+ guilang['imagesizeinfoline1'] + currentImage.originalWidth  + ' x ' + currentImage.originalHeight
							+'<br/>' + guilang['imagesizeinfoline2'] + currentCanvas.bestwidth + ' x ' + currentCanvas.bestheight + '</div>',
					html:true,
					trigger:'hover' 
				});
			// reset
			$(children[0]).css('width','0%');
			$(children[1]).css('width','0%');
			$(children[2]).css('width','0%');
			
			var total = (currentCanvas.bestwidth - currentCanvas.minwidth);
			if(total >0)
			{
				var quality = (currentImage.originalWidth - currentCanvas.minwidth) * 100/ total;
				
				// measure by height
				total =  (currentCanvas.bestheight - currentCanvas.minheight);
				var tmp = (currentImage.originalHeight - currentCanvas.minheight) * 100/ total;
				if(tmp < quality) quality = tmp;
				
				if(quality<10) // less than 10%
				{
					$(children[0]).css('width','10%');
					$('#imagequalityprogress').popover('show');	
				}
				else if (quality <80){
					$(children[1]).css('width', quality + '%');
				}
				else
				{
					$(children[2]).css('width', quality + '%');
				}
			}
			 
		}
	}
}
//==============================================================================================
// TOOLBOX TO MODIFY IMAGE
//==============================================================================================
function rotationSpinnerChanged()
{
	if(imageModifyDirty) return;
	imageModifyDirty = true;
	$("#rotationSlider").slider('value',$("#rotation").spinner("value"));
	updateImage();
	imageModifyDirty = false;
}
function designerHandleDrop(ui){
	var url = ui.draggable.attr("imgUrl");
	if((url!=null) && (typeof url != undefined))
	{
		
		addImageToCanvas(
			{
				url:url,
				width:ui.draggable.attr("originalWidth"),
				height:ui.draggable.attr("originalHeight")
			});
	}
}
function updateSliders()
{
	if(currentImage!=null)
	{
		imageModifyDirty = true;
		$("#scale").slider('value',currentImage.getScaleX() * 100);
		$("#scaleDisplay").text($("#scale").slider("value") + "%");
		$("#rotationSlider").slider('value',currentImage.getAngle());
		$("#rotation").spinner('value',currentImage.getAngle());
		imageModifyDirty = false;
	}
}
function resetSliders(){
	if(currentImage!=null){
		var gap = -20;
		var w = currentImage.get('width');
		var h = currentImage.get('height');
		var expectW= designerCanvas.width;
		var expectH = designerCanvas.height;
		if(currentCanvas!=null)
		{
			expectW = currentCanvas.boundary[2];
			expectH = currentCanvas.boundary[3];
		}
		var scale = (expectW - gap ) / w;
		if(h * scale < (expectH -gap ) ) scale = (expectH - gap )/ h;
		if(scale>2) scale = 2;
		currentImage.scale(scale);
		currentImage.setAngle(0);
		updateSliders();
		designerCanvas.renderAll();
	}
}
function updateImage()
{
	if(currentImage!=null){
		setTimeout(function(){
			currentImage.scale($("#scale").slider('value')/100);
			//console.log('rotation:'+$("#rotation").spinner('value'));
			currentImage.setAngle($("#rotation").spinner('value'));
			checkCurrentImageFitBoundary();
			designerCanvas.renderAll();	
		},50);
		
	}
}
function onObjectModified(e){
	checkCurrentImageFitBoundary();
}
function onObjectMoving(e){
	checkCurrentImageFitBoundary();
}
function showPrintBoundaryAlert(){
	if(printBoundaryRect !=null){
		$("#print-boundary-restrict-alert").fadeIn	();
		printBoundaryRect.set('stroke','red');
		designerCanvas.renderAll();
	}
}
function hidePrintBoundaryAlert(){
	if(printBoundaryRect !=null){
		$("#print-boundary-restrict-alert").fadeOut();
		printBoundaryRect.set('stroke','black');
		designerCanvas.renderAll();
	}
}
function checkCurrentImageFitBoundary(){
	if(draw_print_border){
		if(printBoundaryRect!=null){
			if(checkFitPrintBoundary(currentCanvas,currentImage,
					{
						left:printBoundaryRect.left - printBoundaryRect.width/2,
						top:printBoundaryRect.top - printBoundaryRect.height/2,
						width : printBoundaryRect.width,
						height: printBoundaryRect.height 
					})){
				hidePrintBoundaryAlert();
				return 0;	
			}
			else{
				showPrintBoundaryAlert();
				return 1;
			}
		}
	}
}
function checkFitPrintBoundary(canvas,image,boundary){
	if(draw_print_border){
		if((image ==null) || (typeof image == 'undefined')){
			return false;
		}
		else if((boundary == null) || (typeof boundary == 'undefined')){
			// no need to check
			return true;
		}
		var scale = image.get('scaleX');
		
		var width = image.get('width');
		var height = image.get('height');
		var top = image.get('top');
		var left = image.get('left');
		width= scale * width;
		height= scale * height;
		top -= height/2;
		left -= width/2;
		
		var boundWidth = boundary.width;
		var boundHeight = boundary.height;
		var boundTop = boundary.top;
		var boundLeft = boundary.left;
		//boundTop -= boundHeight/2;;
		//boundLeft -=  boundWidth/2;
		var result = false;
		var angle = image.get('angle');// get angle and convert to radian
		if(angle == 0){
			result = ((left<boundLeft) && (top<boundTop)&& (left + width > boundLeft + boundWidth) && (top + height >boundTop + boundHeight));
			//console.log('Image:' + left+',' +top+',' +(left + width)+',' +(top +height)+'; Bound' +boundLeft+',' +boundTop+',' +(boundLeft + boundWidth)+',' +(boundTop + boundHeight)+'; Result' +result);	
		}
		else{
			var rect = {top:top,left:left,width:width,height:height};
			//console.log("==================");
			//console.log("Rect:" + rect.left + "," + rect.top + "," + (rect.left + rect.width)  + "," + (rect.top + rect.height));
			result = isPointInRotatedRect({x:boundLeft,y:boundTop},rect,angle)
				&& isPointInRotatedRect({x:boundLeft + boundWidth,y:boundTop},rect,angle)
				&& isPointInRotatedRect({x:boundLeft ,y:boundTop + boundHeight},rect,angle)
				&& isPointInRotatedRect({x:boundLeft + boundWidth,y:boundTop + boundHeight},rect,angle);
		}		
		return result;
	}
	return true;// do not print when not need to check boundary
}
function isPointInRotatedRect(point,rect,angle){
	angle = angle * Math.PI /180;
	angle = -angle;
	var cp = { x: rect.left + rect.width/2, y : rect.top + rect.height/2};
	
	// 
	var cosTheta = Math.cos(angle);
    var sinTheta = Math.sin(angle);
    
    // calculate point
    x =     (cosTheta * (point.x - cp.x) -
            sinTheta * (point.y - cp.y) + cp.x);
	y =     (sinTheta * (point.x - cp.x) +
            cosTheta * (point.y - cp.y) + cp.y);
	//console.log('Point:' + point.x + ',' + point.y + "=>" + x + "," + y);
	return (x>rect.left) && (y>rect.top) && (x< rect.left + rect.width) && (y<rect.top + rect.height);
}
//==============================================================================================
// ADD TO CART AND GENERATE PREVIEW
//==============================================================================================
function addtocart(){
	var designData = getDesignData();
	if(designData)
	{
		// hide the dialog
		$('#dialog-preview').modal('hide');
		$('#outterloading').show();
		designData.designName =$("#preview-design-name").val();
		designData.previewUrl = currentPreviewImageUrl; 
		$.ajax({
		  	type: 'POST',
		  	url: addtocartUrl,
		  	data: {"data":designData},
		  	dataType: 'json',
			success: function(data){
				window.top.location = data.url;
				//alert(data.url);
			},
			error: function(){
				alertMessage(guilang['addtocarterror']);
			},
			complete:function(){
				$('#outterloading').hide();
			}
		});
	}
}
function generatePreview(){
	var designData = getDesignData();
	if(designData)
	{	
		currentPreviewImageUrl = null;
		// show loading indicator to image
		$("#preview-image").attr('src',loadingImgUrl);
		$('#dialog-preview').modal('show');
		$("#preview-device-name").text(designData.deviceName);
		$("#preview-price").text(designData.price);	
		$.ajax({
		  	type: 'POST',
		  	url: previewUrl,
		  	data: {"data":designData},
		  	dataType: 'json',
			success: function(data){
				// when post success
				$("#preview-image").attr('src',data.url);
				currentPreviewImageUrl  = data.url;
			},
			complete:function(){
			}
		});		
	}
	
}
function getDesignData(){
	//return $.parseJSON('{"deviceId":"28","deviceName":"iPhone 5","price":"2.3","canvas":[{"leftOffset":-66.5,"canvasId":"11","canvasBoundary":"240,45,213,454","printboundary":"200,35,293,474","wallpaper":"0","wallpaperboundary":"0","wallpaperboundaryscaledwidth":"0","imgUrl":"http://localhost/coverdesigner/html5/assets/uploads/user/layer/12.jpg","scale":1.0905077262693157,"left":392,"top":268,"width":503,"height":453,"angle":0},{"leftOffset":-212.5,"canvasId":"10","canvasBoundary":"386,45,213,454","printboundary":"386,45,213,454","wallpaper":"1","wallpaperboundary":"400,107,185,330","wallpaperboundaryscaledwidth":"200","imgUrl":"http://localhost/coverdesigner/html5/assets/uploads/user/layer/12.jpg","scale":1.0463576158940397,"left":138,"top":279,"width":503,"height":453,"angle":0}]}');
	if(currentCanvas !=null)
	{
		if(currentImage!=null)
		{
			saveCurrentDesignData();	
		}
	}
	if(currentCanvasList==null){
		alertMessage(guilang['designcanvasrequired']);
		return false;
	}
	// prepare data
	var allData = new Array();
	var allHasDesigns = true;
	var allDesignFitPrintArea = true;
	for (var i=0; i < currentCanvasList.length; i++) {
		var designData = currentCanvasList[i].designData;
		if((designData!=null) && (typeof designData !== "undefined")){				
			var img = designData.image;
			var printBoundary = currentCanvasList[i].printboundary;
			var isFitPrint = true;
			if((printBoundary!=null) && (typeof printBoundary != 'undefined'))
			{
				boundary = printBoundary.split(',');
				if(boundary.length>=4){
					
					isFitPrint = checkFitPrintBoundary(currentCanvasList[i],img,
						{left : parseInt(boundary[0]) + currentCanvasList[i].leftOffset,
						top : parseInt(boundary[1]),
						width : parseInt(boundary[2]),
						height : parseInt(boundary[3])}
						);
				}	
			}
			
			if(isFitPrint)
			{
				var data = new Object();
				data.leftOffset = currentCanvasList[i].leftOffset;
				data.canvasId = currentCanvasList[i].id;
				data.canvasBoundary = currentCanvasList[i].layerboundary;
				data.printboundary = currentCanvasList[i].printboundary;
				data.wallpaper = currentCanvasList[i].wallpaper;
				data.wallpaperboundary = currentCanvasList[i].wallpaperboundary;
				data.wallpaperboundaryscaledwidth = currentCanvasList[i].wallpaperboundaryscaledwidth;
				
				data.imgUrl = img.getSrc();
				data.scale = img.scaleX;
				data.left = img.left;
				data.top = img.top;
				data.width = img.width;
				data.height = img.height;
				data.angle = img.angle;
				
				allData[i] = data;	
			}
			else{
				allDesignFitPrintArea = false;
				break;
			}
		}
		else{
			// found one design don't have design
			allHasDesigns = false;
			break;
		}
	}
	if(!allHasDesigns){
		alertMessage(guilang['designcanvasrequired']);
		return false;
	}
	if(!allDesignFitPrintArea){
		alertMessage(guilang['printboundaryrestrictalert']);
		return false;	
	}
	
	var designData = {
			deviceId: currentDevice.id,
			deviceId : currentDevice.id,
			deviceName : currentDevice.name,
			price : currentDevice.price,
			canvas:allData
		};
	return designData;
}



//======================================================================
// Ready function
//======================================================================
var tracko = -1, debug;
var texts = -1;
var subtext;
var r_text;
var poslayer = 0;
$(document).ready(function(){
	Cufon.replace('h1', { fontFamily: 'BadTattoo' });
	Cufon.now();
	$('#waiting').hide();
	showStep1Instruction();
	$('#review').hide();
	var canvas =$("#designerCanvas");
	var column2 =$("#col2");
	designerWidth =column2.width();
	designerHeight =column2.height();
	// initialize the canvas
	canvas.width(designerWidth);
	canvas.height(designerHeight);
	canvas.attr("width",designerWidth);
	canvas.attr("height",designerHeight);
	designerCanvas = new fabric.Canvas('designerCanvas');
	designerCanvas.on("object:modified",onObjectModified);
	designerCanvas.on("object:moving",onObjectMoving);


	designerCanvas.on('object:scaling', function(options) {
	  if (options.target) {
	  	if(options.target.type == "text")
	  	{
	  		options.target.width = options.target.currentWidth;
	  		options.target.height = options.target.currentHeight;
	  	}
	  }
	});
	designerCanvas.on('object:moving', function(options) {
	  if (options.target) {
	  	tracko = options.target;
	  	debug.text = options.target.top+" / "+options.target.left;
	  }
	});
	designerCanvas.on('mouse:up', function(options) {
	  if (options.target != undefined)
	  	if(options.target.type=="text") {
	  		texts = options.target;
	  		//texts.textAlign = "center";
	  		//console.log(texts.textAlign);
	  	}
	  	else if (options.target.type=="image")
	  		currentImage = options.target;
	});

	var textx = new fabric.Text('Step One! Please Choose Device!', {
		  	fontSize: 25,
		  	left: 70,
		  	top: 200,
		  	lineHeight: 1,
		  	originX: 'left',
		  	fontFamily: 'Times_New_Roman',
		  	fontWeight: 'bold'
		});
	textx.hasRotatingPoint = true;
	debug = new fabric.Text('100 / 100', {
	  	fontSize: 12,
	  	left: 398,
	  	top: 8,
	  	fill: 'red',
	  	lineHeight: 1,
	  	originX: 'left',
	  	fontFamily: 'geneva'
	});
	//designerCanvas.add(debug);
	designerCanvas.add(textx);
	designerCanvas.renderAll();

	$("#scale").slider({min:0,max:200,value:100,slide: function( e , ui ) {
		if(imageModifyDirty) return;
		imageModifyDirty = true;
		$("#scaleDisplay").text($("#scale").slider("value") + "%");
		updateImage();
		imageModifyDirty = false;
	}});
	$("#rotationSlider").slider({min:0,max:360,value:0,slide: function( e , ui ) {
		if(imageModifyDirty) return;
		imageModifyDirty = true;
		$("#rotation").spinner('value',$("#rotationSlider").slider("value"));
		updateImage();
		imageModifyDirty = false;
	}});
	$("#rotation").spinner({min:0,max:360,value:0
		,create:function(){
			// hack to listening to event
			$('#rotation').on('keyup change', function() {
		       rotationSpinnerChanged();
		    });
		}
		,spin: function( e , ui ) { rotationSpinnerChanged();}
		,change: function( e , ui ) {rotationSpinnerChanged();}});
		
	$("#rotation").spinner("value",0);
	
	$(".draggable").draggable({
		containment:'body',
		appendTo:'body',
		revert:'invalid',
		helper:'clone',
		distance:40,
		scroll:false
	});	
	$(".droppable").droppable({
			destroy:true,
			drop: function( event, ui ) {
				designerHandleDrop(ui);
			}
		});
	$("#uploadThumbnail").on('dblclick',function(){
		var url = $(this).attr("imgUrl");
		if((url!=null) && (typeof url != undefined))
		{
			//addImageToCanvas(url);
			addImageToCanvas(
				{
					url:url,
					width:$(this).attr("originalWidth"),
					height:$(this).attr("originalHeight")
				});
		}
	});

	$(".addtext").keyup(function(){
		if(checkstep == 0){return;}
		if(texts == -1){
			var sub_text = new fabric.LayoutText(' ', {
			  fontSize: 50,
			  left: 50,
			  top: 50,
			  width: 300,
			  height: 200,
			  lineHeight: 1,
			  originX: 'left',
			  fontFamily: '1942_report',
			  fontWeight: 'bold',
			  textAlign: 'right',
			  textVAlign : 'top',
			});
			texts = sub_text;
		    //sub_text.hasRotatingPoint = true;
			designerCanvas.add(texts);
			layerArt[poslayer].list.push(texts);
		}
		$("#pre_render").text(this.value);
		texts.text = this.value;
		designerCanvas.renderAll();
		this.value = texts.text;
		r_text = this.value.split(' ').join('|');
		
	})
	$("ul#selectfont li").click(function(){
		$("#fontselected").text($(this).text());
		tracko.fontFamily = $(this).attr("data");
		designerCanvas.renderAll();
	})
	$("ul#selectcolor li").click(function(){
		$("#colorselected").text($(this).text());
		tracko.fill = $(this).attr("data");
		designerCanvas.renderAll();
	})
	$("ul#selectsize li").click(function(){
		$("#sizeselected").text($(this).text());
		tracko.fontSize = $(this).attr("data");
		designerCanvas.renderAll();
	})
	
	//addImageToCanvas listitem
	$("li.listitem span img").click(function(){
		var srr=this.src.replace("thumbnail","layer");
		addImageToCanvas(
				{
					url:srr,
					width:$("#uploadThumbnail").attr("originalWidth"),
					height:$("#uploadThumbnail").attr("originalHeight")
				});
	})
	var cvs;
	var count = 1;
	$("#addtocart").click(function(){
		$("#preview").click();
	})
	$("#preview").click(function(){
		cvs = new Object();
		if(checkstep == 0)
		{
			alert("Design is empty!!!");
			return;
		}
		$('#review a').attr('href','');
	    if(checkCurrentImageFitBoundary() == 1){alert('The image not fit in area printing!!!'); return;};
	    $('#waiting').show();
	    bak_text = texts.text;
	    texts.text = r_text;
		var tpos = 0;
		bound1 = designerCanvas.toJSON();
		for(tpos = 0; tpos < bound1.objects.length; tpos++)
			if(bound1.objects[tpos].type == "rect")
				break;
		bound2 = currentCanvas.printboundary.split(',');		
		cvs.width = bound1.objects[tpos].width; cvs.height = bound1.objects[tpos].height; cvs.top = parseInt(bound2[1]); cvs.left = parseInt(bound2[0])+designerCanvas.overlayImageLeft;
		cvs.fid = count;
		$("#vdata").val(JSON.stringify(cvs));
		$("#ddata").val(JSON.stringify(designerCanvas.toJSON()));
		$.post("execute", { data:$("#vdata").serialize() + " " + $("#ddata").serialize() },
		    function(data){
		    	//console.log(data);
	   			$('#review a').attr('href','review/index/Y/backgroundYtheme1'+$('#review a').attr('href')+"/"+data);
	   			count = 1;
	   			ReviewAll($('#review a').attr('href'));
		});
		texts.text = bak_text;
	})
	$("#checkterms").click(function(){
		if($("#checkterms").attr("checked") == 'checked'){
			$("#preview").hide();
			$("#addtocart").show();
		}
		else{
			$("#addtocart").hide();
			$("#preview").show();
		}
	})
	$('#review').click(function(){
		//$('#review').html("click roi");
	})
	$('.btnleft').click(function(){
		if(checkCurrentImageFitBoundary() == 1){alert('The image not fit in area printing!!!'); return;};
		if(poslayer == 0){
			poslayer=list_layer.length-1;
			selectCanvas(list_layer[poslayer]);
		}
		else{
			poslayer--;
			selectCanvas(list_layer[poslayer]);
		}
	})
	$('.btnright').click(function(){
		if(checkCurrentImageFitBoundary() == 1){alert('The image not fit in area printing!!!'); return;};
		if(poslayer == (list_layer.length -1)){
			poslayer=0;
			selectCanvas(list_layer[poslayer]);
		}
		else{
			poslayer++;
			selectCanvas(list_layer[poslayer]);
		}
	})
	
});
function choice(e){
	var srr=e.src.replace("thumbnail","layer");
	addImageToCanvas(
			{
				url:srr,
				width:$("#uploadThumbnail").attr("originalWidth"),
				height:$("#uploadThumbnail").attr("originalHeight")
			});
}
var Fourcount = 0,intercount;
function ReviewAll(src){
	//$('#col2').html(src);
	Fourimage = new Array();
	src = src.split('/');
	strrep = src[2];
	src[3] = src[3].replace(strrep,"/");
	src[4] = src[4].replace(strrep,"/");
	basesrc = 'http://local.beesightsoft.com/phone/assets/renders/';
	halfleft = 'http://local.beesightsoft.com/phone/assets/uploads/devices/preview/iphone5h1view.png';
	halfright = 'http://local.beesightsoft.com/phone/assets/uploads/devices/preview/iphone5h2view.png';
	src[3] = basesrc+src[3]+".png";
	src[4] = basesrc+src[4]+".png";

	fabric.Image.fromURL(halfleft, function(obj) {
		var kobj = new Object();
		kobj.id = 0;
		kobj.dt = obj;
		Fourimage.push(kobj);
		Fourcount++;
	});

	fabric.Image.fromURL(halfright, function(obj) {
		var kobj = new Object();
		kobj.id = 1;
		kobj.dt = obj;
		Fourimage.push(kobj);
		Fourcount++;
	});

	fabric.Image.fromURL(src[3], function(obj) {
		var kobj = new Object();
		kobj.id = 2;
		kobj.dt = obj;
		Fourimage.push(kobj);
		Fourcount++;
	});

	fabric.Image.fromURL(src[4], function(obj) {
		var kobj = new Object();
		kobj.id = 3;
		kobj.dt = obj;
		Fourimage.push(kobj);
		Fourcount++;
	});
	intercount = setInterval(checkfour,100);
}
function checkfour(){
	if(Fourcount >= 4){
		RenderAgain();
		clearInterval(intercount);
	}

}
function RenderAgain(){
	var temp0, nx = 0;
	designerCanvas.clear();
	discount = 0;
	var big,sml;
	while(discount < 4){
		for (var i = Fourimage.length - 1; i >= 0; i--) {
			if(Fourimage[i].id == discount){
				if(Fourimage[i].id == 0){
					Fourimage[i].dt.set({ left: Fourimage[i].dt.width/2 - nx, top: Fourimage[i].dt.height/2});
					designerCanvas.insertAt(Fourimage[i].dt,0);
					temp0 = Fourimage[i].dt;
					discount++;
					break;
				}
				if(Fourimage[i].id == 1){
					Fourimage[i].dt.set({ left: Fourimage[i].dt.width/2 - nx + temp0.width-1, top: Fourimage[i].dt.height/2});
					designerCanvas.insertAt(Fourimage[i].dt,0);
					discount++;
					break;
				}
				if(Fourimage[i].id == 2){
					var j;
					for(j = 0;j < Fourimage.length; j++)
						if(Fourimage[j].id == 3)
							break;
					if(Fourimage[i].dt.height > Fourimage[j].height){
						big = Fourimage[i].dt;
						sml = Fourimage[j].dt;
					}
					else{
						big = Fourimage[j].dt;
						sml = Fourimage[i].dt;
					}
					console.log(big);
					console.log(sml);
					discount++;
					break;
				}
				else{
					discount++;
				}
			}
		}
	}
	//15 - 39
	big.set({ left: big.width/2 + 188 - nx - 10, top: big.height/2 + 35});
	designerCanvas.insertAt(big,0);

	sml.set({ left: sml.width/2 - nx + temp0.width - 25, top: sml.height/2 + 121});
	designerCanvas.insertAt(sml,0);

	designerCanvas.overlayImage = "";
	cvs = new Object();
	cvs.width = 800; cvs.height = 550; cvs.top = 0; cvs.left = nx;
	cvs.fid = "x";
	$("#vdata").val(JSON.stringify(cvs));
	$("#ddata").val(JSON.stringify(designerCanvas.toJSON()));
	$.post("execute", { data:$("#vdata").serialize() + " " + $("#ddata").serialize() },
	    function(data){
	    	$('#review a').attr('href',$('#review a').attr('href')+"/"+data);
	    	window.open($('#review a').attr('href'), '_blank')
	    	selectCanvas(list_layer[0]); 
	    	$('#waiting').hide();
	});

}
function cloze(e){
	//console.log($(e).parent().parent());
	$(e).parent().hide();
}

//--------------------------------------------------------------------NEW DESIGN----------------------------------------------------------------------
