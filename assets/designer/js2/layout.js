

function Layout (types, options) {
	Cells = new Array();
}



/*
	Create cell info base on:
		- stye, option
		
	Return cell:
		- location
		- path
		- canvas object

*/
function CellGenerator (type, option){
	_option = option;
	_drawingObj;
	initial = function(id, type, width, height){
		$('#'+id).append('<canvas id="canvas_'+id+'" width="'+width+'" height="'+height+'"></canvas>')
		_drawingObj = new fabric.Canvas('canvas_'+id);
		_option.
		fabric.util.addListener(_drawingObj.document, 'dblclick', dblClickHandler);
	}
	dblClickHandler = function(){
		alert("Double Click On "+_drawingObj);
	}
}


/*
	Generate skin base 
		- device(width - height)
		- grid style(combine cell base info) - cellInfos
*/
function SkinGenerator(gridstyle, size){
	
	switch(gridstyle)
	{
		case 'heart':
			foreacch(cellInfos, function(info)
			{
				info.clientInfo = CellGenerator(info, option);
			});
			break;
		case 'square':
			foreacch(cellInfos, function(info)
			{
				info.clientInfo = CellGenerator(info, option);
			});
			break;
	}
}

/*
	cells base info genertor base on 
		- device(width - height)
		- grid stlye

	run by administrator
*/
function LayoutGenerator(gridstyle, size)
{
	case 'heart':
			foreacch(cellInfos, function(info)
			{
				info.clientInfo = CellGenerator(info, option);
			});
			break;
		case 'square':
			foreacch(cellInfos, function(info)
			{
				info.clientInfo = CellGenerator(info, option);
			});
			break;
}

//skin layout con