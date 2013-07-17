var isLoadingDevice = false; 
var list_layer;
var layerArt = new Array();
var getpostlayer = -1;
$(document).ready(function(){
	// change the gui language
	$('[langid]').each(function(){
		var langid = $(this).attr('langid');
		$(this).text(guilang[langid]);
	});
	
    //$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) {
    	 //e.stopPropagation();});
	if(autoloaddevice) {
		isLoadingDevice = true;
		startloading();
	}else
	{
		//showStep1Instruction(); 
	}
	$('#category_selector_value').change(function(){		
			selectCategory($(this).val());
	});
	$('#sub_category_selector_value').change(function(){
			selectSubCategory($(this).val());
	});
	$('#device_selector_value').change(function(){
		if(getpostlayer != $(this).val()){
			selectDevice($(this).val());
			getpostlayer = $(this).val();
		}
	});
	loadCategoryDropdown();
	selectCategory(24);
});

//===================================================================================
// FOR SELECTIONS BOXES
//===================================================================================

function loadCategoryDropdown(){
	if(isLoadingDevice)
	{	
		var categories = autoload_categories;
		var select = $('#category_selector .dropdown-menu');
		for(var i=0;i<categories.length;i++){
			select.append('<li><a id="category_' + categories[i]['id'] +'" href="#' + categories[i]['id'] + '">'+ categories[i]['name'] + '</a></li>');
		};
		$("#category_selector").dd_select({prefix:guilang['category'],icon_class:null,formID:'designform',hiddenFieldName:'category_selector_value'});
		
		// now select it
		$("#category_" + autoload_categoryid).trigger('click');
	}
	else{
		// load the category list
		designerApi.getCategories(function(categories){
			var select = $('#category_selector .dropdown-menu');
			for(var i=0;i<categories.length;i++){
				select.append('<li><a href="#' + categories[i]['id'] + '">'+ categories[i]['name'] + '</a></li>');
			};
			$("#category_selector").dd_select({prefix:guilang['category'],icon_class:null,formID:'designform',hiddenFieldName:'category_selector_value'});		
		});	
	}
}
var subcategory_temp,isloadyet,device_temp = new Array();
function selectCategory(id){
	var select = $('#device_selector .dropdown-menu');
	select.empty();
	select = $('#sub_category_selector .dropdown-menu');
	select.empty();
	
	currentCategoryId=id;
	if(isLoadingDevice)
	{	
		hideStep1Instruction();
		var subcategories = autoload_sub_categories;
		if((subcategories !== null) && (typeof subcategories != 'undefined')){
			for(var i=0;i<subcategories.length;i++)
			{
				select.append('<li><a id="sub_category_'+subcategories[i]['id'] +'" href="#'+subcategories[i]['id'] +'">'+subcategories[i]['name']+'</a> </li>');
			}		
		}	
  		$("#sub_category_selector").dd_select({prefix:guilang['subcategory'],icon_class:null,formID:'designform',hiddenFieldName:'sub_category_selector_value'});
	  		
		// now select it
		$("#sub_category_" + autoload_sub_categoryid).trigger('click');
	}
	else{
		// load sub categories
		designerApi.getSubCategories(id,function(subcategories)
		{	
			hideStep1Instruction();
			if((subcategories !== null) && (typeof subcategories != 'undefined')){
				for(var i=0;i<subcategories.length;i++)
				{
					select.append('<li><a href="#'+subcategories[i]['id'] +'">'+subcategories[i]['name']+'</a> </li>');
				}		
			}	
	  		$("#sub_category_selector").dd_select({prefix:guilang['subcategory'],icon_class:null,formID:'designform',hiddenFieldName:'sub_category_selector_value'});
			subcategory_temp = subcategories;
			isloadyet = setInterval(function(){mycheck()},10);
		});
	}
}
function selectSubCategory(id){
	var select = $('#device_selector .dropdown-menu');
	select.empty();
	currentSubCategoryId=id;
	if(isLoadingDevice)
	{	
		hideStep1Instruction();
		devices = autoload_devices
		currentDevice = null;
		currentCanvas = null;	
		currentDeviceList= devices;
		for(var i=0;i<devices.length;i++)
		{
			select.append('<li class="span2"><a id="device_'+devices[i]['id'] +'" href="#'+devices[i]['id'] +'"> <div class="thumbnail"><img src="' + devices[i]['thumbnail'] +'" alt=""><p class="thumbnail-caption">'+ devices[i]['name'] +'</p></div> </a> </li>');
  		}
  		
  		$("#deviceThumbnail").empty();
  		$("#canvasThumbnails").empty();
  		$("#device_selector").dd_select({prefix:guilang['device'],icon_class:null,formID:'designform',hiddenFieldName:'device_selector_value'});
		// now select it
		//$("#device_" + autoload_deviceid).trigger('click');
		isLoadingDevice= false;
	}
	else{
		// reset
		designerApi.getDevices(id,function(devices)
		{	
			hideStep1Instruction();
			currentDevice = null;
			currentCanvas = null;	
			currentDeviceList= devices;
			for(var i=0;i<devices.length;i++)
			{
				select.append('<li class="span2"><a href="#'+devices[i]['id'] +'"> <div class="thumbnail"><img src="' + devices[i]['thumbnail'] +'" alt=""><p class="thumbnail-caption">'+ devices[i]['name'] +'</p></div> </a> </li>');
	  			device_temp.push(devices[i]);
	  		}
	  		
	  		$("#deviceThumbnail").empty();
	  		$("#canvasThumbnails").empty();
	  		$("#device_selector").dd_select({prefix:guilang['device'],icon_class:null,formID:'designform',hiddenFieldName:'device_selector_value'});
	  		//$("#device_" + autoload_deviceid).trigger('click');

		});
	}
}
function selectDevice(id)
{
	list_layer = new Array();
	layerArt = new Array();
	poslayer = 0;
	if(currentDeviceList != null)
	{
		currentDevice = null;
		currentCanvas = null;

		for(var i=0;i<device_temp.length;i++)
		{
			if(device_temp[i]['id'] === id){
				currentDevice= device_temp[i];
				break;
			}
		}
		
		if(currentDevice!=null)
		{
			hideStep1Instruction();
			showUploadInstruction();
			// load image
			$("#deviceThumbnail").empty();
			$("#deviceThumbnail").append('<img src="' + currentDevice['thumbnail'] +'" alt="">');
			currentCanvasList = null;
			currentCanvas = null;
			var thumbs =  $("#canvasThumbnails");
			thumbs.empty();
			// show the price
			try{
				$("p#named").text(currentDevice['name']);
				$("p#price").text(addCommas(parseFloat(currentDevice['price']).toFixed(2)) + " €");
			}
			catch(err)
			{
			}
			designerApi.getCanvas(id,function(canvasList)
			{		
				currentCanvasList = canvasList;
				var isFirst = true;
				var firstId =-1;
				for(var i=0;i<canvasList.length;i++)
				{
					if(isFirst)
					{
						firstId = canvasList[i]['id'];
						isFirst = false;	
					}
					//thumbs.append('<li class="span2"><a href="javascript:selectCanvas('+canvasList[i]['id'] +');"> <div class="thumbnail"><img src="' + canvasList[i]['thumbnail'] +'" alt=""><p class="thumbnail-caption">'+ canvasList[i]['name'] +'</p></div> </a> </li>');
		  			list_layer.push(canvasList[i]['id']);
		  			layerArt.push(layer(canvasList[i]['id'],canvasList[i]['name']));
		  		}
		  		
		  		// select the first canvas
		  		selectCanvas(firstId);
		  		clearStep1();
		  		$('#nonactive').show();
			});	
		}
		
	}
}
function selectCanvas(id)
{
	id = id.toString();
	texts = -1;
	if(currentCanvas !=null)
	{
		// exit if current cavas is same
		//if(currentCanvas.id === id) return;
		if(currentImage!=null)
		{
			saveCurrentDesignData();
		}
	}
	// load layer
	currentCanvas = null;
	for(var i=0;i<currentCanvasList.length;i++)
	{
		if(currentCanvasList[i]['id'] === id){
			currentCanvas = currentCanvasList[i];
			break;
		}
	}
	currentImage = null;
	
	if(currentCanvas!=null){
		/*
		if ((typeof currentCanvas.designData !== "undefined") && (currentCanvas.designData != null)){
			// when load finished
			designerCanvas.clear();
			loadOverlayImage();
			currentImage = currentCanvas.designData.image;
			console.log(currentImage);
			designerCanvas.insertAt(currentImage,0);
			measureImageQuality();
		}
		else{
			designerCanvas.clear();
			loadOverlayImage();	
				
			currentImage = null;
		}*/
		//console.log(layerArt);
		designerCanvas.clear();
		loadOverlayImage();

		for(var i = layerArt[poslayer].list.length -1; i >= 0; i--){
			designerCanvas.insertAt(layerArt[poslayer].list[i],0);
			if (layerArt[poslayer].list[i].type == 'image')
				currentImage = layerArt[poslayer].list[i];
			if (layerArt[poslayer].list[i].type == 'text')
				texts = layerArt[poslayer].list[i];
			
		}
		if(currentImage == null){
			showStep2Instruction();
			layerArt[poslayer].list.push({type:'image'});
		}
		else
			clearStep2();
		designerCanvas.renderAll();
	}
	
	
}
//===========================================================================================
//	MISC UI METHODS
//===========================================================================================
var curcolor = "#7EBA00",curbor;
var anicolor;
var checkstep = 0;
function showStep1Instruction(){
	$("#deviceView").popover({
		title:'Step One',
		content:guilang['instruction-step1'],
		placement:'right',
		trigger:'manual'
	});
	$("#deviceView").popover('show');
	$("#deviceView").css('border','3px solid #7EBA00');
	curbor = "#deviceView";
	anicolor = setInterval(masscolor,100);
	
}
function clearStep1(){
	$("#deviceView").css('border','none');
	checkstep = 1;
	clearInterval(anicolor);
	$("#deviceView").popover('hide');
	loadfont();
}


function showStep2Instruction(){
	$("#imageView").popover({
		title:'Step Two',
		content:guilang['instruction-step2'],
		placement:'right',
		trigger:'manual'
	});
	$("#imageView").popover('show');
	$("#imageView").css('border','3px solid #7EBA00');
	curbor = "#imageView";
	anicolor = setInterval(masscolor,150);
}
function clearStep2(){
	$("#imageView").css('border','none');
	checkstep = 2;
	clearInterval(anicolor);
	$("#imageView").popover('hide');
	$('#popup').hide();
}


function showStep3Instruction(){
	$("#textView").popover({
		title:'Step Three',
		content:guilang['instruction-step2'],
		placement:'right',
		trigger:'manual'
	});
	$("#textView").popover('show');
}
function masscolor(){
	if(curbor != -1){
		$(curbor).animate({borderColor: curcolor},function(){
			if(curcolor == '#7EBA00')
				curcolor = '#177FC2';
			else
				curcolor = '#7EBA00';
		})
	}
}


function hideStep1Instruction(){
	$("#selectdevicebox").popover('hide');
}
function showUploadInstruction(){
	$("#uploadphotobox").popover({
		content:guilang['instruction-upload'],
		placement:'right',
		trigger:'manual'
	});
	$("#uploadphotobox").popover('show');
}
function hideUploadInstruction(){
	$("#uploadphotobox").popover('hide');
}

function alertMessage(message){
	//alert(message);
	$('#dialog-alert-message').text(message);
	$('#dialog-alert').modal('show');
}
function startloading(){
	$("#innerloading").show();
}
function stoploading(){
	$("#innerloading").hide();
}
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function mycheck(){
	if(isLoadingDevice == false){
		for(var i=0;i<subcategory_temp.length;i++)
		{
			selectSubCategory(subcategory_temp[i]['id']);
		}
		clearInterval(isloadyet);
	}
}
function layer(id,name){
	var obj = new Object();
	obj.id = id;
	obj.name = name;
	obj.list = new Array();
	return obj;
}
function Stepchecked(){

}
var list_font = [
					{name: "1942_Report",source: "1942_Report.js"},
					{name: "BadTattoo",source: "BadTattoo.js"},
					{name: "Chopin_Script",source: "Chopin_Script.js"},
					{name: "Delicious",source: "Delicious.js"},
					{name: "Destroy",source: "Destroy.js"},
					{name: "Encient_German_Gothic",source: "Encient_German_Gothic.js"},
					{name: "Fiolex_Girls",source: "Fiolex_Girls.js"},
					{name: "Geneva",source: "Geneva.js"},
					{name: "Helvetica",source: "Helvetica.js"},
					{name: "Impact",source: "Impact.js"},
					{name: "Jellyka",source: "Jellyka.js"},
					{name: "Scriptina_Pro",source: "Scriptina_Pro.js"}
				]
function loadfont(){
	for(var i = 0; i < list_font.length; i++){
		$.getScript(url_script+"font/"+list_font[i].source)
			.done(function(script, textStatus) {
			})
			.fail(function(jqxhr, settings, exception) {
			  console.log( "Triggered ajaxError handler." );
		});
	}
}