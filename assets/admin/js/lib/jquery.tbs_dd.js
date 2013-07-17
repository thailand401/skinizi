(function( $ ) {
  $.fn.dd_select = function( options ) {
    // Create some defaults, extending them with any options that were provided
    var opts = $.extend({}, $.fn.dd_select.defaults, options);

    // $.fn.dd_select.set_default(opts);

    //Get dropdown list items
    var dd_li = this.find("li");
    
    // Get node where current item is shown
    var current_a_node = this.find("> a");
    
    var icon_node = null;
    var caret_node = null;
    var selected_item_html = null;

    // The text and href of the current item
    var current_text = null;
    var current_href = null;

    // The newly selected href and text
    var updated_href = null;
    var updated_text = null;

    // Check if the select box has an icon

    var icon = null;
    var selected_str = null;

    if ($( current_a_node, " i").length > 0 )
    {
    	var icon_class = $(current_a_node).find("> i").attr("class");
    }

    var set_hidden_field = function(hiddenFieldName) {
        val = updated_href.replace("#","");
        $("input[name=" + hiddenFieldName + "]").val( val ).trigger('change');
    }
	current_a_node.html(options.prefix + "&nbsp;<span class='caret'></span>");
	
    return dd_li.on("click", "a", function(e){
    	e.preventDefault();
    	if(new Date().getTime() - $(this).lastClicked < 2 * 1000)
    	{
    		return;
    	}
    	$(this).lastClicked = new Date().getTime();
    	//alert('click');
    	var that = this;
    	var o = opts;
        var default_option = o.default;
    	var caret_node = "&nbsp;<span class='caret'></span>";
    	var prefix = (o.prefix) ? o.prefix + ':' : null;
        var hiddenFieldName = (o.hiddenFieldName) ? o.hiddenFieldName : null;
        
        var submitOnChange = (o.submitOnChange) ? o.submitOnChange : null;
        var ajax_call = (o.ajax_call) ? o.ajax_call : null;

   		//These will be attached to the current node
	    if ( icon_class ) {
	    	icon_node = "<i class='" + icon_class + "'></i> ";
	    }

    	//Update variables
    	// If there is a prefix, strip it before setting the variable
    	tmp_current_text = $(current_a_node).text();
    	current_text = tmp_current_text.replace(prefix,'');
    	current_href = $(current_a_node).attr("href");
    	updated_href = $(this).attr("href");
    	updated_text = $(this).text();

        if ( hiddenFieldName) {
            set_hidden_field( hiddenFieldName);
        }

    	// Change selected display text to just clicked option
    	// Construct String
    	if (icon_class)
    	{
    		selected_str = icon_node;
    	}
    	else
    	{
    		selected_str = '';
    	}
    	
    	if (prefix)
    	{
    		selected_str += prefix;
    	}

    	selected_str += updated_text + caret_node;

    	$(current_a_node).html(selected_str);

    	$(current_a_node).attr("href", updated_href);

    });      
  };

  $.fn.dd_select.defaults = {
  		prefix: null,
  		hiddenFieldName: null
  };
})( jQuery );