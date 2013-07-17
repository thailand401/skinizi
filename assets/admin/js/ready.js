var current_area = -1;
var current_cell = -1;
var list_cell = [];
var pading = 10;
var isMove = -1;
var isScale = -1;
var Position;
var Scaled;
var dl = 2;
var check_variable;
var shfkey=-1,ctrkey=-1;
$(document).ready(function(){
	$(window).resize();
	$( "#slider-vertical1" ).slider({
      orientation: "vertical",
      range: "min",
      min: 10,
      max: 100,
      value: 50,
      slide: function( event, ui ) {
      	Updatelayout(ui.value,-1);
        $( "#amount1" ).val( ui.value );
      }
    });
    $( "#slider-vertical2" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 50,
      value: 5,
      slide: function( event, ui ) {
      	Updatelayout(-1,ui.value);
        $( "#amount2" ).val( ui.value );
      }
    });
    $( "#slider-vertical" ).slider( "value" )

    for(var i=0; i<clips.length; i++){
		$(".ad-thumb-list").append('<li original-title="'+clips[i].name+'"><a title="'+clips[i].name+'"><img data-id="'+clips[i].id+'" src="'+baseurl+"assets/vector/"+clips[i].thumbnail+'" class="ui-widget-content image'+i+'" style="height:50px;opacity: 0.7;"></a></li>');
		$(".ad-thumb-list li:last").tipsy({gravity: 's'});
		$(".image"+i).draggable({ revert: true, helper: "clone",
		start: function() {
	        $(".item").addClass("item_hover");
	      },
        stop: function() {
	        $(".item").removeClass("item_hover");
	      } });
		$(".image"+i).dblclick(function(){
			applyVector(this);
		})
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

/*
	Event : 
*/
$(window).resize(function() {
	_wdHeight=$(window).height();
	//alert(_wdHeight)
	_wdHeight -= 120;
	if(_wdHeight < 560)
		return;
	else{
		$(".row").css("height",_wdHeight+"px");
		$(".tlt").css("left",$("#col1").width()+($("#col2").width()-500)/2);
		
		var _w = $("#col2").width();
		var _h = $("#col2").height();
		$("#gallery").css("width", _w-50);
		//$("#layout").css({width: layout[id].size[0], height: layout[id].size[1], top: (_h-current_layout.size[1])/2 +"px", left: (_w-current_layout.size[0])/2 +"px"});
	}
});

$(document).keydown(function(e) {
	if(e.shiftKey) {
		shfkey = 1;
		ctrkey = -1;
	}
	if(e.ctrlKey) {
		shfkey = -1;
		ctrkey = 1;
		if(e.keyCode == 73)
			Cellinvert();
	}
	if(e.altKey) {
	;
	}
});

$(document).keyup(function(e){
	if(e.keyCode=16) 
    	shfkey = -1;
    if(e.keyCode=17)
    	ctrkey = -1;

});

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
		scaling(dh , dw, current_cell);
		Scaled = e;
	}
})