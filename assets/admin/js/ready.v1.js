var current_area = -1;
$(document).ready(function(){
	for(var i=0; i<layout.length; i++){
		$("#inner-layout").append('<a class="lo_item item'+i+'" lid="'+i+'"><img src="'+baseUrl+'assets/layout/'+layout[i].thumbnail+'" width="40" height="60"></a>');
		$("a.item"+i).click(function(){
			_w = $("#col2").width();
			_h = $("#col2").height();
			id = parseInt($(this).attr("lid"));
			$("#layout").html("");
			$("#layout").css({width: layout[id].size[0], height: layout[id].size[1], top: "13px", left: (_w-layout[id].size[0])/2 +"px"});
			render_layout(layout[id].element);
		})
	}
	for(var i=0; i<effect.length; i++){
		$("#inner-effect").append('<a preset="'+effect[i].effect+'" class="lo_item effect'+i+'" lid="'+i+'" original-title="'+effect[i].name+'"><img style="margin:2px;" src="'+baseUrl+'assets/effect/thumbnail/'+effect[i].effect+'.png" width="60" height="72" alt="'+effect[i].name+'"></a>');
		$("a.effect"+i).click(function(){
			var pset = $(this).attr("preset");
			if(current_area!=-1)
				$('#'+current_area).children().each(function(){
					Effect(this,pset);
				});
			else{
				$("#layout").children().find("img").each(function(){
					Effect(this,pset);
				});
				$("#layout").children().find("canvas").each(function(){
					Effect(this,pset);
				});
			}
		})
		$("a.effect"+i).tipsy({gravity: 'w'});
	}
	for(var i=0; i<galery.length; i++){
		$(".ad-thumb-list").append('<li><a title="'+galery[i].title+'"><img hsrc="'+galery[i].link+'" src="'+galery[i].thumb+'" class="ui-widget-content image'+i+'" style="opacity: 0.7;"></a></li>');
		$(".image"+i).draggable({ revert: true, helper: "clone" });
	}
	for(var i=0; i<canvax.length; i++){
		$("#inner-canvas").append('<a class="lo_item cvx'+i+'" cid="'+canvax[i].id+'" original-title="'+canvax[i].title+'"><img src="'+baseUrl+'assets/uploads/devices/thumbnails/'+canvax[i].thumbnail+'" width="'+canvax[i].width+'"></a>');
		$("a.cvx"+i).tipsy({gravity: 'w'});
	}
})

$(".accordion-heading").click(function(){
	$(".accordion-heading").removeClass("act");
	$(".fright").removeClass("icon-chevron-up");
	$(".fright").addClass("icon-chevron-down");
	$(this).children(2).children().eq(1).removeClass("icon-chevron-down");
	$(this).children(2).children().eq(1).addClass("icon-chevron-up");
	$(this).addClass("act");

})
var Img_source = Array();
function render_layout(e){
	for(var i=0; i<e.length; i++){
		$("#layout").append('<div id="item'+i+'" class="droppable item"></div>');
		$("#item"+i).css({width: e[i].boundary[2], height: e[i].boundary[3], top: e[i].boundary[0], left: e[i].boundary[1]});
		$('#item'+i).droppable({
	      drop: function( event, ui ) {
	      	_w = $(this).width();
	      	_h = $(this).height();
	      	$(this).html("");
	      	$(this).append('<img style="margin:'+(_h/2-5)+'px 0 0 '+(_w/2-5)+'px" src="http://www.bmccinsurance.com/img/loading_mini.gif" />');
	      	var ap = $(this).attr("id");
	      	$.post("http://local.beesightsoft.com/skinizi/index.php/camanproxy?camanProxyUrl=" + (encodeURIComponent($(ui.draggable).attr("hsrc"))),function(data){
	      		//(ap).append('<img id="'+$(ap).attr("id")+'0" src="'+data+'" width="'+_w+'" height="'+_h+'"/>');
	      		$("#"+ap).html("");
	      		$("#"+ap).append('<img data="imgcell" id="'+$("#"+ap).attr("id")+'0" src="'+data+'"/>');
	      		for(var i=0;i < Img_source.length;i++)
	      			if(Img_source[i].id == ap+'0'){
						Img_source[i].src = data;
						return;
					}
				Img_source.push({id:ap+'0',src:data});
	      	})
	      }
	    });
	    $('#item'+i).click(function(){
	    	if(current_area==-1 || current_area!=$(this).attr("id")){
		    	$('.item').removeClass("lo_hover");
		    	$(this).addClass("lo_hover");
		    	current_area = $(this).attr("id");
	    	}
	    	else{
	    		$('.item').removeClass("lo_hover");
	    		current_area = -1;
	    	}
	    })
	}
}
