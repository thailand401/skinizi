var Layouts = [];
function Layout(_name, _width, _height, _padding, _minsize){
	var layout = {
		id: -1,
		name : _name,
		cell : [],
		padding: _padding,
		minsize: _minsize,
		width : _width,
		height : _height
	}
	return layout;
}
function Autocreate(e){
	if(e.minsize == undefined)
		e.minsize = 10;
	if(e.padding == undefined)
		e.padding = 0;
	var realsize = e.minsize+e.padding*2;
	//e.minsize+= e.padding*2;
	var hcell = e.width/realsize;
	for(var i = 0; i < hcell; i++){
		for(var j = 0; j*realsize<=e.height;j++)
			e.cell.push({top: e.padding+j*realsize, left: e.padding+i*realsize, width: e.minsize, height: e.minsize, col: i, row: j});
	}
}

function callNFC(type, notice){
	switch(type){
		case 1 : $("#notice").html(""); 
				$("#notice").append('<p class="snotice">'+notice+'</p>'); 
				$("#jseyeslayer").attr("src",$("#jseyeslayer").attr("src").replace("normal","naviga"));
				$("#notice").fadeIn(); break;
	}
}
//00000000000000000000000000000000000000000000000
/*
var device =[
				{name : "Iphone 5", id : 1}
			];
var canvas =[
				{id: 1, idp: 1, name: "Back Side", layer: "ip5_back_layer.png", thumb: "ip5_back.png", width : 247, height : 478}
			];
*/
var Errors =[
				"Can't combine this block, see example"
			];
				//This is error notice length size of
var Listdos =[];

var Vector =[
				{id:0, title:"Heart", thumb: "heart.png"},
				{id:1, title:"Polygon", thumb: "polygon.png"},
				{id:2, title:"Flower", thumb: "flower.png"}
			]
var Formol = 	[
				{ title : 'New Layout', forms : '<div class="control-group"><label class="control-label" for="name">Name</label><div class="controls"><input type="text" id="name" placeholder="name"></div></div><div class="control-group"><label class="control-label" for="width">Width</label><div class="controls"><input type="text" id="width" placeholder="width"></div></div><div class="control-group"><label class="control-label" for="height">Height</label><div class="controls"><input type="text" id="height" placeholder="height"></div></div><div class="control-group"><label class="control-label" for="size">Size</label><div class="controls"><input type="text" id="size" placeholder="size"></div></div><div class="control-group"><label class="control-label" for="padding">Padding</label><div class="controls"><input type="text" id="padding" placeholder="padding"></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="auto" checked="checked"> Auto-celling</label></div></div>'},
				{ title : 'New Branch', forms : '<div class="control-group"><label class="control-label" for="name">Name</label><div class="controls">	<input type="text" id="name" placeholder="name"></div></div><div class="control-group"><label class="control-label" for="name">Textid</label><div class="controls">	<input type="text" id="txtid" placeholder="Text\'s id"></div></div>'},
				{ title : 'New Subcategory', forms : '<div class="control-group"><label class="control-label" for="name">Name</label><div class="controls">	<input type="text" id="name" placeholder="name"></div></div><div class="control-group"><label class="control-label" for="name">Textid</label><div class="controls">	<input type="text" id="txtid" placeholder="Text\'s id"></div></div><div class="control-group"><label class="control-label" for="name">Category</label><div class="controls"><select id="cate"></select></div></div>'},
				{ title : 'New Device', forms : '<div class="control-group"><label class="control-label" for="mark">Mark\'s Id</label><div class="controls"><input type="text" id="mark" placeholder="mark\'s id"></div></div><div class="control-group"><label class="control-label" for="txtid">Name</label><div class="controls"><input type="text" id="name" placeholder="name"></div></div><div class="control-group"><label class="control-label" for="txtid">Textid</label><div class="controls"><input type="text" id="txtid" placeholder="Text\'s id"></div></div><div class="control-group"><label class="control-label" for="thumb">Thumbnail</label><div class="controls"><input type="text" id="thumb" placeholder="Image upload"></div></div><div class="control-group"><label class="control-label" for="name">Category</label><div class="controls"><select id="subcate"></select></div></div>'},
				{ title : 'New Layout', forms : ''},
			]