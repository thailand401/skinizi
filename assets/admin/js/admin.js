var ismenu,curidc,stardrag=-1,minhei,minwid,dopos=0,isgrid=1;
$("#submenu").mouseover(function(){ismenu=1;})
$("#submenu").mouseleave(function(){ismenu=-1;})
$(".accordionButton").mouseup(function(e){
	if(e.button==2){
		$("#submenu").html("");
		$("#submenu").css({top: e.pageY, left: e.pageX});
		$("#submenu").append('<p id="new">New Category</p> <p id="new2">New Subcategory</p> <p id="edit">Edit Category</p> <p id="devide"></p> <p id="exit">Exit</p>')
		var id = $(this).attr("data-id");
		$("#submenu #new").click(function(){newe(1);});
		$("#submenu #new2").click(function(){newe(2);});
		$("#submenu #edit").click(function(){edit(1,parseInt(id));});
		$("#submenu #exit").click(function(){exit();});
		$("#submenu").show();
	}
})
$(".subheader").mouseup(function(e){
	if(e.button==2){
		$("#submenu").html("");
		$("#submenu").css({top: e.pageY, left: e.pageX});
		$("#submenu").append('<p id="new">New Device</p> <p id="edit">Edit Subcategory</p> <p id="delete">Delete Subcategory</p> <p id="devide"></p> <p id="exit">Exit</p>')
		var id = $(this).attr("data-id");
		$("#submenu #new").click(function(){newe(3);});
		$("#submenu #edit").click(function(){edit(2,parseInt(id));});
		$("#submenu #delete").click(function(){delet(2,parseInt(id));});
		$("#submenu #exit").click(function(){exit();});
		$("#submenu").show();
	}
})
$("ul.branditem li:not(.subheader)").mouseup(function(e){
	if(e.button==2){
		$("#submenu").html("");
		$("#submenu").css({top: e.pageY, left: e.pageX});
		$("#submenu").append('<p id="new">New Canvas</p> <p id="edit">Edit Device</p> <p id="delete">Delete Device</p> <p id="devide"></p> <p id="exit">Exit</p>')
		var id = $(this).attr("data-id");
		$("#submenu #new").click(function(){newe(4);});
		$("#submenu #edit").click(function(){edit(3,parseInt(id));});
		$("#submenu #delete").click(function(){delet(3,parseInt(id));});
		$("#submenu #exit").click(function(){exit();});
		$("#submenu").show();
	}
	if(e.button==0){
		$("ul.branditem li").removeClass("dselect");
		$(this).addClass("dselect");
		$("#inner-canvas").html("");
		for(var i = 0; i < devvas.length; i++)
			if(devvas[i].deviceid == parseInt($(this).attr("data-id"))){
				$("#inner-canvas").append('<a onclick="loadcanvas('+i+');" class="lo_item" cid="'+dcanvas[i].id+'" original-title="'+dcanvas[i].name+'"><img src="'+dcanvas[i].thumbnail+'" width="50"></a>');
				$("#inner-canvas a:last").mouseup(function(e){
					if(e.button==2){
						$("#submenu").html("");
						$("#submenu").css({top: e.pageY, left: e.pageX});
						$("#submenu").append('<p id="new">New Layout</p> <p id="edit">Edit Canvas</p> <p id="delete">Delete Canvas</p> <p id="devide"></p> <p id="exit">Exit</p>')
						curidc = parseInt($(this).attr("cid"));
						curselectvas = this;
						$("#submenu #new").click(function(){curselectvas.click();newe(9,curidc)});
						$("#submenu #edit").click(function(){edit(4,curidc);});
						$("#submenu #exit").click(function(){exit();});
						$("#submenu").show();
					}
				})
			}
	}
})
$("#m_canvasx").mouseup(function(e){
	if(e.button==2){
		$("#submenu").html("");
		$("#submenu").css({top: e.pageY, left: e.pageX});
		$("#submenu").append('<p id="new">New Layout</p> <p id="edit">Edit Canvas</p> <p id="delete">Delete Canvas</p> <p id="devide"></p> <p id="exit">Exit</p>')
		
		$("#submenu #new").click(function(){newe(9);});
		$("#submenu #edit").click(function(){edit(4);});
		$("#submenu #exit").click(function(){exit();});
		$("#submenu").show();
	}
})

$("body").mouseup(function(e){
	if(e.button==0 && ismenu !=1){
		exit();
	}
})
$("#reset").click(function(){
	Renderlayout(tlayout.cell);
})
$("#grid").click(function(){
	if(isgrid==1)
		$(".item").css("border-width",0);
	else
		$(".item").css("border-width",1);
	isgrid*=-1;
})
$("#undo").click(function(){
	dopos--;
	if(dopos < 0)
		dopos = 0;
	updateCell();
})
$("#redo").click(function(){
	dopos++;
	if(dopos > Listdos.length-1)
		dopos--;
	updateCell();
})








//--------------------------------------------------------COMMAND--------------------------------------------------------
function cloze(){
	$(".modal").hide();
}
function exit(){
	$("#submenu").hide();
}
function newe(op,ic){
	$("#modal1.modal").show();
	switch(op){
		case 1: Newbranch(); exit();
				break;
		case 2: Newcatelog(); exit();
				break;
		case 3: Newdevice(); exit();
				break;	
		case 4: Newcanvas(); exit();
				break;		
		case 9 : Newlayout(ic); exit(); break;
	}
	
}
function edit(op,ic){
	$("#modal1.modal").show();
	switch(op){
		case 1: Editbranch(ic); exit();
				break;
		case 2: Editcatelog(ic); exit();
				break;
		case 3: Editdevice(ic); exit();
				break;	
		case 4: Editcanvas(ic); exit();
				break;		
		case 9 : Editlayout(ic); exit(); break;
	}
	
}
function merge(op){
	var numbercell = checkMerge();
	if(!numbercell)
		callNFC(1,Errors[0]);
	else{
		var newwidth = numbercell.x*numbercell.w + (numbercell.x-1)*$("#slider-vertical2").slider( "value")*2;
		var newheight = numbercell.y*numbercell.h + (numbercell.y-1)*$("#slider-vertical2").slider( "value")*2;
		$(".lo_hover:first").attr("merge",numbercell.x*numbercell.y-1);
		$(".lo_hover:first").css({width : newwidth, height : newheight});
		$(".lo_hover").not(':first').remove();
		saveState();
	}	
	exit();
}
function Crudsave(){
	var formdata = $("#crudForm").serialize();
	var formurl = $("#crudForm").attr("action");
    $.ajax({
        type: "POST",
        url: formurl,
        data: formdata,
        success: function(response){
        			eval("data="+response);
        			if(data.success == true)
	               		console.log(data);
	               	else
	               		console.log("Have something error");
	            }
    });
}
function saveState(){
	Listdos.push($("#layout").html());
	dopos = Listdos.length-1;
}
//000000000000000000000000000000000000000000000000000
function loadcanvas(p){
	_w = $("#col2").width();
	_h = $("#col2").height();
	$("#layout").html("");
	$("#layout").css({width: dcanvas[p].width, height: dcanvas[p].height, top: -90 +"px", left: (_w-dcanvas[p].width)/2 +"px"});
	$("#layout").css("background", 'url("'+dcanvas[p].layer+'") center');
	$("#layout").show();
}
//-----------------------------------------------------------------
function Newlayout(idc){
	$("#modal2 .modal-body").html("");
	$("#modal2 .modal-header h3").html(Formol[0].title);
	$("#modal2 .modal-body").append(Formol[0].forms);
	for(var i=0;i<dcanvas.length;i++)
		if(parseInt(dcanvas[i].id) == idc){
			$("#width").val(dcanvas[i].width);
			$("#height").val(dcanvas[i].height);
			break;
		}
	$("#padding").val(4);
	$("#size").val(54);
	$("div#modal1").hide();
	$("div#modal2").show();
}
function Newbranch(){
	$("#fmng").attr("src",window.location+"/category_management/add");
	
}
function Newcatelog(){
	$("#fmng").attr("src",window.location+"/sub_category_management/add");
	
}
function Newdevice(){
	$("#fmng").attr("src",window.location+"/devices_management/add");
	
}
function Newcanvas(){
	$("#fmng").attr("src",window.location+"/canvas_management/add");
	
}
//--------------------------------------------------------------------
function Editbranch(id){
	$("#fmng").attr("src",window.location+"/category_management/edit/"+id);
	
}
function Editcatelog(id){
	$("#fmng").attr("src",window.location+"/sub_category_management/edit/"+id);
	
}
function Editdevice(id){
	$("#fmng").attr("src",window.location+"/devices_management/edit/"+id);
	
}
function Editcanvas(id){
	$("#fmng").attr("src",window.location+"/canvas_management/edit/"+id);
	
}
var tlayout;
function AcceptLayout(){
	tlayout = Layout($("#name"),parseFloat($("#width").val()), parseFloat($("#height").val()), parseFloat($("#padding").val()), parseFloat($("#size").val()));
	$("#cellctr").fadeIn();
	if($("#auto").attr("checked") == 'checked')
		Autocreate(tlayout);
	Layouts.push(tlayout);
    $( "#slider-vertical1" ).slider( "value", parseFloat($("#size").val()) );
    $( "#slider-vertical2" ).slider( "value", parseFloat($("#padding").val()) );
    $( "#amount1" ).val( parseFloat($("#size").val()) );
    $( "#amount2" ).val( parseFloat($("#padding").val()) );
    callClose();
	Renderlayout(tlayout.cell);
}
function Renderlayout(list){
	$("#layout").html("");
	for(var i = 0; i < list.length; i++){
		$("#layout").append('<div id="item'+i+'" dataclip="-1" merge="0" datacol="'+list[i].col+'" datarow="'+list[i].row+'" class="item" path="0" style="width: '+list[i].width+'px; height: '+list[i].height+'px; top: '+list[i].top+'px; left: '+list[i].left+'px;"></div>');
		if(i==list.length-1){
			saveState();
			minwid = $(".item:first").width();
			minhei = $(".item:first").height();
			bindCell();
		}
	}
}	
function Cellinvert(){
	var notX = $("#layout div:not(.lo_hover)");
	var isX = $("#layout div.lo_hover");
	isX.removeClass("lo_hover");
	notX.addClass("lo_hover");
}
function Updatelayout(sz, pd){
	tlayout.cell = [];
	if(sz != -1)
		tlayout.minsize = sz;
	if(pd != -1)
		tlayout.padding = pd;
	Autocreate(tlayout);
	Renderlayout(tlayout.cell);
}
function checkMerge(){
	var smerge = 0;
	$(".lo_hover").each(function(){
		smerge+=parseInt($(this).attr("merge"));
	})
	var stcol = $(".lo_hover:first").attr("datacol");
	var strow = $(".lo_hover:first").attr("datarow");
	var edcol = $(".lo_hover:last").attr("datacol");
	var edrow = $(".lo_hover:last").attr("datarow");
	var vez = edcol - stcol + 1;
	var hoz = edrow - strow + 1;
	console.log(vez+'/'+hoz+"/"+smerge);
	if((vez*hoz-smerge) != $(".lo_hover").length)
		return false;
	else
		return {x:vez,y:hoz,w:minwid,h:minhei};
}
function updateCell(){
	$("#layout").html("");
	$("#layout").append(Listdos[dopos]);
	bindCell();
}
function bindCell(){
	$(".item").mouseup(function(e){
		if(e.button==2 && $(this).attr("class").indexOf("lo_hover")!=-1){
			$("#submenu").html("");
			$("#submenu").css({top: e.pageY, left: e.pageX});
			$("#submenu").append('<p id="merge">Merge Cell</p> <p id="edit">Resize Cell</p> <p id="move">Move Cell</p> <p id="delete">Delete Cell</p> <p id="devide"></p> <p id="exit">Exit</p>')
			
			$("#submenu #merge").click(function(){merge(1);});
			$("#submenu #exit").click(function(){exit();});
			$("#submenu").show();
		}
	})
	$(".item").click(function(e){
		if(shfkey == 1){
			if(stardrag != -1)
			{
				var scol = parseInt($(stardrag).attr("datacol"));
				var srow = parseInt($(stardrag).attr("datarow"));
				var ecol = parseInt($(this).attr("datacol"));
				var erow = parseInt($(this).attr("datarow"));
				$(".item").each(function(){
					var icol = parseInt($(this).attr("datacol"));
					var irow = parseInt($(this).attr("datarow"));
					if(scol > ecol)
						if(ecol <= icol && icol <= scol);
						else icol = -1;
					else if(scol < ecol)
						if(scol <= icol && icol <= ecol);
						else icol = -1;

					if(srow > erow)
						if(erow <= irow && irow <= srow);
						else irow = -1;
					else if(srow < erow)
						if(srow <= irow && irow <= erow);
						else irow = -1;

					if(scol == ecol)
						if(ecol == icol);
						else icol = -1;
					if(srow == erow)
						if(erow == irow);
						else irow = -1;
					if(icol == -1 || irow == -1)
						;
					else
						$(this).addClass("lo_hover");
				})
				stardrag = -1;
			}
			else{
				$(".item").removeClass("lo_hover");
				$(this).addClass("lo_hover");
				stardrag = this;
			}
		}
		else if(ctrkey == -1){
					$(".item").removeClass("lo_hover");
					$(this).addClass("lo_hover");
					stardrag = -1;
				}
			else
				if($(this).attr("class").indexOf("lo_hover")!=-1)
					$(this).removeClass("lo_hover");
				else
					$(this).addClass("lo_hover");
		
	})
}
function applyVector(e){
	if($(".lo_hover").length > 0){
		$(".lo_hover").each(function(){
			$(this).css("background", "url("+$(e).attr("src")+") center no-repeat");
			$(this).attr("dataclip",$(e).attr("data-id"))
		})
		saveState();
	}
}
function callClose(){
	$(".modal").hide();
	//alert(xes.length);
}
function callRefresh(){
	window.location.href = window.location.href;
}