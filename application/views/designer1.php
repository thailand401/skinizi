<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link type="text/css" href="<?php echo base_url().'/assets/designer/css/bootstrap.min.css';?>" rel="stylesheet" />
<link type="text/css" href="<?php echo base_url().'/assets/designer/css/custom-theme/jquery-ui-1.9.0.custom.css';?>" rel="stylesheet" />
<link type="text/css" href="<?php echo base_url().'/assets/designer/css/ui.css';?>" rel="stylesheet" />

<!--<link type="text/css" href="<?php echo base_url().'/assets/designer/css/fineuploader.css';?>" rel="stylesheet" />-->

<link type="text/css" href="<?php echo base_url().'/assets/grocery_crud/css/jquery_plugins/file_upload/fileuploader.css';?>" rel="stylesheet" />
<link type="text/css" href="<?php echo base_url().'/assets/grocery_crud/css/jquery_plugins/file_upload/jquery.fileupload-ui.css';?>" rel="stylesheet" />

<style type='text/css'>
<?php
	$designerWidth =$this->config->item('designer_width');
	$designerHeight =$this->config->item('designer_height');
	$toolWidth  =170;
	$toolHeight = 225;
?>


/* 3 Column settings */
.threecol { 
	width:<?php echo $designerWidth;?>px;	
	height:<?php echo $designerHeight;?>px;
	
	}
.threecol #col1{
	float:left;
	width:<?php echo ($toolWidth);?>px;
	height:<?php echo ($designerHeight);?>px;
	background:#363636;
}
.threecol .stepheader{
	float:left;
	width:<?php echo ($toolWidth);?>px;
	height:26px;
	background: #505050;
	color: white;
	
	text-align:center;
	vertical-align: middle;
	padding-top: 4px; 
}
.threecol .stepheader2{
	float:left;
	width:<?php echo ($toolWidth - 8);?>px;
	height:26px;
	background: #8a8a8a;
	color: white;
	
	text-align:left;
	vertical-align: middle;
	padding: 4px; 
}
.threecol #col1 .row1{
	float:top;
	width:<?php echo ($toolWidth);?>px;
	height:<?php echo ($toolHeight);?>px;
	background:#dadada;
	margin-left: 0px;
	text-align: center;
}
.threecol #col1 .row2{
	float:top;
	width:<?php echo ($toolWidth);?>px;
	height:175px;
	background:#dadada;
	margin-left: 0px;
	text-align: center;
}
.threecol #col1 .row3{
	float:top;
	width:<?php echo ($toolWidth);?>px;
	background:#dadada;
	margin-left: 0px;
	text-align: center;
}
.threecol #col2 {
	float:left;
	width:<?php echo ($designerWidth - 2 * $toolWidth);?>px;
	height:<?php echo ($designerHeight);?>px;
}
.threecol #col3 {
	float:left;
	width:<?php echo ($toolWidth);?>px;
	height:<?php echo ($designerHeight);?>px;
	background:#dadada;
	text-align:center;
	position: relative;
}
#name_a_design{
	<?php 
		if(!$allow_name_a_design) 
			echo 'display:none'; 
	?>
}

#innerloading{
	position:absolute;
	top:0px;
	left:<?php echo ($toolWidth);?>px;
	width:<?php echo ($designerWidth - 2 * $toolWidth);?>px;
	height:<?php echo ($designerHeight);?>px;
	background-color:#999999;
	opacity:0.5;
	display:none;
}
#outterloading{
	display:none;
	position:absolute;
	top:0px;
	left:0px;
	width:<?php echo ($designerWidth);?>px;
	height:<?php echo ($designerHeight);?>px;
	background-color:#999999;
	opacity:0.7;
	z-index: 9999;
}
#inner-loading-image{
	position:absolute;
	left:<?php echo ($designerWidth - 2 * $toolWidth - 32)/2;?>px;
	top:<?php echo ($designerHeight-32)/2;?>px;
}
#outter-loading-image{
	position:absolute;
	left:<?php echo ($designerWidth - 32)/2;?>px;
	top:<?php echo ($designerHeight-32)/2;?>px;
}
.popover-title{
	display:none;
}
</style>
<script type="text/javascript">
var currentLanguage = '<?php echo $lang;?>';
var baseUrl = '<?php echo base_url();?>';
var uploadUrl = '<?php echo base_url().'index.php/designer/upload_img';?>';
var previewUrl = '<?php echo base_url().'index.php/designer/preview';?>';
var loadingImgUrl = '<?php echo base_url();?>assets/designer/images/loading-white.gif';
var addtocartUrl = '<?php echo base_url();?>index.php/designer/addtocart';
var draw_print_border = <?php echo $draw_print_border?'true':'false';?>;
<?php
	if( isset($deviceid) && ($deviceid > 0) && (isset($categoryid))){
		// load device directly
		?>
		var autoloaddevice = true;
		var autoload_deviceid = <?php echo $deviceid;?>;
		var autoload_categoryid = <?php echo $categoryid;?>;
		var autoload_sub_categoryid = <?php echo $sub_categoryid;?>;
		var autoload_categories = <?php echo json_encode($categories);?>;
		var autoload_sub_categories = <?php echo json_encode($sub_categories);?>;
		var autoload_devices = <?php echo json_encode($devices);?>;
		<?php
	}else{
		echo 'var autoloaddevice = false;';
	}
?>
<?php 
$guilangstr ='var guilang ={';
$hasElement = FALSE;
for ($i=0; $i < count($guilang); $i++) {
	$guilangstr .= '"'.htmlspecialchars($guilang[$i]['textid']).'" : "'.htmlspecialchars($guilang[$i]['text']).'",';
	
	$hasElement = TRUE;
}
if($hasElement)
{
	$guilangstr = substr($guilangstr, 0,strlen($guilangstr)-1);
}
$guilangstr .= "};";
echo $guilangstr;  
?>
</script>
</head>
<body>
<div class="threecol" id="container">
	
	<div id="col1">
		<div id="selectdevicebox" class="row1">
			<img class="number-bg-left" src="<?php echo base_url().'/assets/designer/images/number-bg1.jpg';?>"/>
			<span class="stepheader" langid='selectdevice'>Select your device</span>
			<br/>
			<div id="category_selector" class="btn-group">
		    	<a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#" id="category-select" langid='category'>
		  			Category
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
				</ul>
				<input name="category_selector_value" id="category_selector_value" type="hidden"/>
			</div><!--category_selector-->
			<br/>
			<div id="sub_category_selector" class="btn-group">
		    	<a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#" id="sub-category-select" langid='subcategory'>
		  			Sub Category
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
				</ul>
				<input name="sub_category_selector_value" id="sub_category_selector_value" type="hidden"/>
			</div><!--category_selector-->
			<br/>
			
			<div id="device_selector" class="btn-group">
		    	<a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#" id="device-select" >
		  			<span langid='device'>Device</span>
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu thumbnails span7" role="menu" aria-labelledby="dropdownMenu">
					
				</ul>
				<input name="device_selector_value" id="device_selector_value" type="hidden"/>
			</div>
			
			<div class="thumbnail" id="deviceThumbnail">
			</div>
		</div><!--row-->
		<div id="uploadphotobox" class="row2">
			<img class="number-bg-left" src="<?php echo base_url().'/assets/designer/images/number-bg2.jpg';?>"/>
			<span class="stepheader" langid='uploadimage' style="margin-bottom: 5px;">Upload your image</span>
			<div style="margin-bottom:5px;">
            	<div id="uploadThumbnail" class="draggable" style='margin:5px;height:120px;'>
            		
				</div>
				<div id='uploadProgress' style='margin:5px;height:110px;display:none'>
					<span id='uploadFileName'></span>
					<div style="height:10px" id='uploadProgressBar' >
					</div>
				</div>
				
				<div style="padding-top: 10px;text-align: center">
					<span class="fileinput-button btn btn-success">
						<i class="icon-upload icon-white"></i> <span langid='upload'>Upload image</span>
						<input type="file" id="userfile" name="userfile" rel="<?php echo base_url();?>designer/upload_img" >
					</span>
				</div>
			</div>
			<div class='clear'></div>
				
		</div>
		<div class="row3">
			<span class="stepheader2">
				<table>
					<tr>
						<td width="100%"><span langid='tools'>Tools</span></td>
						<td><a class="btn btn-small btn-success" href="#" id="device-select" onclick="resetSliders();" langid='reset'>Reset</a></span></td>
					</tr>
				</table>
			</span>
			<div class="imagetool">
				<table>
					<tr>
						<td><span langid="imagequalityprogress">Quality</span>&nbsp;</td>
						<td  width="100%">
							<div id="imagequalityprogress" class="progress" style="160px;margin-left:5px;height:15px;margin-bottom:4px;margin-top:2px;margin-right:4px;">
								<div class="bar bar-danger" style="width: 0%;"></div>
								<div class="bar bar-warning" style="width: 0%;"></div>
								<div class="bar bar-success" style="width: 0%;"></div>
							</div>
						</td>
					</tr>
				</table>
				
				
				<span langid="scale">Scale</span>&nbsp;<span id="scaleDisplay">100%</span>
				<div style="width:140px;margin-left:5px"><div id="scale"></div></div>
				
				<span langid="rotation">Rotation</span>
				<div style="margin-left:5px"><div style="float:left;"><input style="width:20px;" id="rotation"></div><div style="float:left;margin-left:10px; margin-bottom:10px;margin-top:6px;width:80px;" id="rotationSlider"></div></div>
			</div>
			<br/>
			
		</div>
	</div>
	<div id="col2" class="droppable">
		<canvas id="designerCanvas"></canvas>
	</div>
	<div id="innerloading">
		<img id="inner-loading-image" src="<?php echo base_url().'/assets/designer/images/loading.gif';?>"/>
	</div>
	<div id="col3">
		<img class="number-bg-right" src="<?php echo base_url().'/assets/designer/images/number-bg3.jpg';?>"/>
		<span class="stepheader" langid='customizedevice'>Customize device</span>
		<br/><br/>
		<ul class="thumbnails" id="canvasThumbnails">
			
		</ul>
		<br/>
		
		<div id="addtocard" onclick="generatePreview();">
			<!--<a class="btn btn-small btn-success" data-toggle="dropdown" href="javascript:void(0)" onclick="generatePreview();" id="device-preview" langid='preview'>Preview</a>-->
			<img class="number-bg-right" src="<?php echo base_url().'/assets/designer/images/number-bg3.jpg';?>"/>
			<div id="addtocardtext" langid='addtocart' >
				
			</div>
		</div>
		<div id="price">0€</div>
	</div>
</div>

 <div id="print-boundary-restrict-alert" class="alert alert-error" style="position: absolute; top:514px;left:250px;width:350px;height:16px;text-align: center;display:none;">
  <p langid='printboundaryrestrict'/>
</div>
<!-- Preview dialog -->
<div id="dialog-preview" class="modal hide fade" tabindex="-1" role="dialog" 
	aria-labelledby="myModalLabel" 
	aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel" ><span langid='preview'>Preview </span>&nbsp;<span id="preview-device-name"></span></h3>
  </div>
  <div id="preview-modal" class="modal-body">
  	<div id="preview-image-container">
		<table width="100%" height="100%" align="center" valign="center">
	   	<tr><td align="center" valign="center">
	      	<img id="preview-image"/>
	   	</td></tr>
	   	</table>
  	</div>
    
    <div id="preview-info">
    	<table width="100%" height="100%" align="center" valign="center">
	   	<tr><td align="center" valign="center">
	    	<h4><span langid="price"></span>&nbsp;<span id="preview-price"></span>€</h4>
	    	<div id="name_a_design">
	    	<span langid="nameyourdesign"></span>
	    	<input type="text" id="preview-design-name"/>
	    	</div>
    	</td></tr>
	   	</table>
    </div>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true" langid='close'>Close</button>
    <button onclick="addtocart();" class="btn btn-primary" langid='addtocart'>Add to cart</button>
  </div>
</div>

<div id="dialog-alert" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>Message</h3>
  </div>
  <div class="modal-body">
    <p id="dialog-alert-message"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true" langid='close'>Close</button>
  </div>
</div>
  
<div id="outterloading">
	<img id="outter-loading-image" src="<?php echo base_url().'/assets/designer/images/loading.gif';?>"/>
</div>



<!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery-1.8.3.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/bootstrap.min.js';?>"></script>
    <!-- restyle the select box-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.tbs_dd.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery-ui-1.9.0.custom.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.ui.touch-punch.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/chosen.jquery.min.js';?>"></script>
    
	<!-- fabric -->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/fabric.min.js';?>"></script>
	<!--<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/fabric.min0.7.js';?>"></script>-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/Delicious_500.font.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/api.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/ui.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/designer.js';?>"></script>
	
	
	
	<script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/fileupload/jquery.iframe-transport.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/fileupload/jquery.fileupload.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/designeruploader.js';?>" ></script>
   
</body>
</html>

