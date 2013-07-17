
function initialize()
{
	obj = new Object();
	obj.getdevice = function(callback){
		$.ajax(url_device,
		{success:function(data, textStatus, jqXHR){
			callback.call(undefined,$.parseJSON(data));
			Device = $.parseJSON(data);
			},
		fail:function(){
			alert('Error while requesting the device!');
		}});
	}
	obj.getgrid = function(callback){
		$.ajax(url_grid,
		{success:function(data, textStatus, jqXHR){
			callback.call(undefined,$.parseJSON(data));
			Grid = $.parseJSON(data);
			},
		fail:function(){
			alert('Error while requesting the grid!');
		}});
	}
	return obj;
}