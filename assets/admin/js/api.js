var designerApi = new Object();
designerApi.getCategories=function(callback){
	// request ajax to server
	$.ajax(baseUrl  + '/index.php/designer/categories/'+currentLanguage,
		{success:function(data, textStatus, jqXHR){
			callback.call(undefined,$.parseJSON(data));
			},
		fail:function(){
			alert('Error while requesting the categories!');
		}});
};

designerApi.getSubCategories=function(id,callback){
	// request ajax to server
	$.ajax(baseUrl  + '/index.php/designer/subcategories/'+currentLanguage+ '/' + id,
		{success:function(data, textStatus, jqXHR){
			//console.log(data);
			callback.call(undefined,$.parseJSON(data));
			},
		fail:function(){
			alert('Error while requesting the categories!');
		}});
};

designerApi.getDevices=function(id,callback){
	// request ajax to server
	$.ajax(baseUrl  + '/index.php/designer/devices/'+currentLanguage + '/' + id,
		{success:function(data, textStatus, jqXHR){
			callback.call(undefined,$.parseJSON(data));
			},
		fail:function(){
			alert('Error while requesting the device list!');
		}});
};

designerApi.getCanvas=function(id,callback){
	// request ajax to server
	$.ajax(baseUrl  + '/index.php/designer/canvas/'+currentLanguage + '/' + id,
		{success:function(data, textStatus, jqXHR){
			callback.call(undefined,$.parseJSON(data));
			},
		fail:function(){
			alert('Error while requesting the device list!');
		}});
};
