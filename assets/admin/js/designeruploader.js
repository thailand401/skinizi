$(function(){
	var error_on_uploading = guilang['errorupload'];
	$('#userfile').each(function(){
		var unique_id 	= $(this).attr('id');
		var uploader_url = uploadUrl;
		var uploader_element = $(this);
		
		$(this).fileupload({
	        dataType: 'json',
	        url: uploader_url,
	        cache: false,
	        limitMultiFileUploads: 1,
	        maxFileSize: 5000,
	        autoUpload: true,
	        //acceptFileTypes:  'jpb',
			beforeSend: function(){
				hideUploadInstruction();
				if(currentImage == null){
					startloading();
				}
				$("#uploadThumbnail").hide();
				$("#uploadProgress").show();
				$("#uploadProgressBar").progressbar({value:0});
			},			
			send: function (e, data) {						
				var errors = '';
				
			    if (data.files.length > 1) {
			    	errors += error_max_number_of_files + "\n" ;
			    }
			    
			    
	            $.each(data.files,function(index, file){
	            	var file_name = file.name;
		            $("#uploadFileName").text(file_name);
	            });	
	            
	            if(errors != '')
	            {
	            	alert(errors);
	            	return false;
	            }
				
			    return true;
			},
	        done: function (e, data) {
	        	
	        	$("#uploadThumbnail").show();
				$("#uploadProgress").hide();
				
				if(data.result.success === true)
				{	
					var file =data.result;

	            	var file_name = file.name;
					var is_image = (file_name.substr(-4) == '.jpg'  
	            						|| file_name.substr(-4) == '.png' 
	            						|| file_name.substr(-5) == '.jpeg' 
	            						|| file_name.substr(-4) == '.gif' 
	            						|| file_name.substr(-5) == '.tiff')
						? true : false;
					$("#uploadThumbnail").attr('imgUrl',file.layer_url);
					$("#uploadThumbnail").attr('originalWidth',file.width);
					$("#uploadThumbnail").attr('originalHeight',file.height);
					$("#uploadThumbnail").empty();
					//$("#uploadThumbnail").append('<img src="' + file.thumbnail_url +'" alt="'+ file.name+'"/>');
					$("li.listitem").append('<span class="listpic"><img src="'+file.thumbnail_url+'" height="60" width="60" onclick="choice(this);"/></span>');
					onfinishupload(
						{
							url:file.layer_url,
							width:file.width,
							height:file.height
						});
				}
				
				else if(typeof data.result.errormessage != 'undefined')
				{
					alertMessage(data.result.errormessage);
				}
				else
				{
					alertMessage(error_on_uploading);
				}
	        },
	        
	        error: function()
	        {
	        	alertMessage(error_on_uploading);
			},
	        fail: function(e, data)
	        {
	        	alertMessage(error_on_uploading);
	        },	        
	        progress: function (e, data) {
                $("#uploadProgressBar").progressbar({value:parseInt(data.loaded / data.total * 100, 10)});
            }	        
	    }); 
	    
	});
	$("#uploadProgressBar").progressbar({max:100,value:0});
});