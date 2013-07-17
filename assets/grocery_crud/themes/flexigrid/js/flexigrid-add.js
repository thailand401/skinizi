$(function(){
		$('.ptogtitle').click(function(){
			if($(this).hasClass('vsble'))
			{
				$(this).removeClass('vsble');
				$('#main-table-box').slideDown("slow");
			}
			else
			{
				$(this).addClass('vsble');
				$('#main-table-box').slideUp("slow");
			}
		});
		
		var save_and_close = false;
		
		$('#save-and-go-back-button').click(function(){
			save_and_close = true;
			
			$('#crudForm').trigger('submit');
		});
		
		$('#crudForm').submit(function(){
			$(this).ajaxSubmit({
				url: validation_url,
				dataType: 'json',
				cache: 'false',
				beforeSend: function(){
					$("#FormLoading").show();
				},
				success: function(data){
					$("#FormLoading").hide();
					if(data.success)
					{						
						$('#crudForm').ajaxSubmit({
							dataType: 'text',
							cache: 'false',
							beforeSend: function(){
								$("#FormLoading").show();
							},								
							success: function(result){
								result = result.split(',"success_message"');
								eval("datay="+result[0]+"}");
								$("#FormLoading").fadeOut("slow");
								if(datay.success)
								{	
									window.parent.callRefresh();
									if(save_and_close)
									{
										window.location = list_url;
										return true;
									}									
									$('#geterr').hide().html('');									
									$('.field_error').each(function(){
										$(this).removeClass('field_error');
									});									
									clearForm();
									$('#report-success').html("insert data success");
									$('#report-success').slideDown('slow');
								}
								else
								{
									alert( message_insert_error );
								}
							},
							error: function(){
								alert( message_insert_error );
								$("#FormLoading").hide();
							}
						});
					}
					else
					{
						$('.field_error').each(function(){
							$(this).removeClass('field_error');
						});
						$('#report-error').slideUp('fast');
						$('#report-error').html(data.error_message);
						$.each(data.error_fields, function(index,value){
							$('input[name='+index+']').addClass('field_error');
						});
								
						$('#report-error').slideDown('normal');
						$('#report-success').slideUp('fast').html('');
						
					}
				},
				error: function(data){
					//data = data.responseText.split('"error_xxx":');
					//data = data[1].split(',"0":"thor"');
					//eval("response="+data[0]+"}");
					data = data.responseText.split('"error_message":"');
					data = data[1].split('","error_fields');
					$('#geterr').slideDown('normal');
					$('#geterr').html(data[0]+"</p>");
					datax = $('#geterr').text().split("<\\\/p>\\n").join("</p><p>");
					$('#geterr').html('<p>'+datax+'</p>');
					$("#FormLoading").hide();
				}
			});
			return false;
		});
	});	

	function goToList()
	{
		if( confirm( message_alert_add_form ) )
		{
			window.parent.callClose();
			//window.location = list_url;
		}

		return false;	
	}
	
	function clearForm()
	{
		$('#crudForm').find(':input').each(function() {
	        switch(this.type) {
	            case 'password':
	            case 'select-multiple':
	            case 'select-one':
	            case 'text':
	            case 'textarea':
	                $(this).val('');
	                break;
	            case 'checkbox':
	            case 'radio':
	                this.checked = false;
	        }
	    });

		/* Clear upload inputs  */
		$('.open-file,.gc-file-upload,.hidden-upload-input').each(function(){
			$(this).val('');
		});
		
		$('.upload-success-url').hide();
		$('.fileinput-button').fadeIn("normal");
		/* -------------------- */		
		
		$('.remove-all').each(function(){
			$(this).trigger('click');
		});
		
		$('.chosen-multiple-select, .chosen-select, .ajax-chosen-select').each(function(){
			$(this).trigger("liszt:updated");
		});
	}