$(function(){
	
	var save_and_close = false;
	
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
								
								$('#report-success').html("sending data success!!!");
								$('#report-success').slideDown('slow');
							}
							else
							{
								console.log(result);
								alert( message_update_error );
							}
						},
						error: function(data){
							data = data.responseText.split('"error_message":"');
							data = data[1].split('","error_fields');
							$('#geterr').slideDown('normal');
							$('#geterr').html(data[0]+"</p>");
							datax = $('#geterr').text().split("<\\\/p>\\n").join("</p><p>");
							$('#geterr').html('<p>'+datax+'</p>');
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
	if( confirm( message_alert_edit_form ) )
	{
		window.parent.callClose();
		//window.location = list_url;
	}

	return false;	
}