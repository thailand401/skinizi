<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="cache-control" content="no-cache" />
	<link type="text/css" href="<?php echo base_url().'assets/designer/css/bootstrap.min.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/designer/css/slideshow/style.css';?>" rel="stylesheet" />
	
	<!--link type="text/css" href="<?php echo base_url().'/assets/designer/css/bootstrap-responsive.css';?>" rel="stylesheet" /-->
	<link type="text/css" href="<?php echo base_url().'assets/designer/css/custom-theme/jquery-ui-1.9.0.custom.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/designer/css/ui.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/grocery_crud/css/jquery_plugins/file_upload/fileuploader.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/grocery_crud/css/jquery_plugins/file_upload/jquery.fileupload-ui.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/designer/css/thor.css';?>" rel="stylesheet" />
	<script type="text/javascript" src="<?php echo base_url().'assets/designer/js/lib/cufonx.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'assets/designer/js/allfontsx.js';?>"></script>
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
	<div id="banner">
		<div>
			<div class="slogan"></div>
			<div class="ttle">Creation Tool</div>
			<div id="command">
				<div class="price">$22.99</div>
				<button class="btn btn-warning" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SAVE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
			</div>
		</div>
	</div>
	<div class="row-fluid row">
<!--...............................................Colum one.......................................................................-->
		<div class="span3 row12 ground">
			<div class="accordion" id="accordion2">
				<div class="accordion-group">
				  <div class="accordion-heading">
				    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
				      <i class="icon-fire white"></i>Device<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseOne" class="accordion-body collapse">
				    <div class="accordion-inner">
						<div class="accordionButton">Iphone <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item">
									<li>Iphone 3</li>
									<li>Iphone 4</li>
									<li>Iphone 4S</li>
									<li>Iphone 5</li>
								</ul>
							</div>
						<div class="accordionButton">Ipad <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item">
									<li>Ipad 2</li>
									<li>Iphone 3</li>
									<li>Iphone Mini</li>
								</ul>
							</div>
						<div class="accordionButton">Samsung <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item">
									<li>Galaxy Note II</li>
									<li>Galaxy S II</li>
									<li>Galaxy S III</li>
									<li>Galaxy S IV</li>
									<li>Galaxy Mini</li>
									<li>Galaxy Ace</li>
									<li>Google Nexus</li>
								</ul>
							</div>
						<div class="accordionButton">Sony <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item">
									<li>Xperia Go</li>
									<li>Xperia Z</li>
									<li>Xperia J</li>
									<li>Xperia Acro</li>
									<li>Xperia Tipo</li>
									<li>Xperia Play</li>
								</ul>
							</div>
				    </div>
				  </div>
				</div>
				<div class="accordion-group">
				  <div class="accordion-heading">
				    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
				      <i class="icon-th white"></i>Canvas<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseTwo" class="accordion-body collapse">
				    <div id="inner-canvas" class="accordion-inner">
				      
				    </div>
				  </div>
				</div>
				<div class="accordion-group">
				  <div class="accordion-heading">
				    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
				      <i class="icon-asterisk white"></i>Layout<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseThree" class="accordion-body collapse">
				    <div id="inner-layout" class="accordion-inner">
				    </div>
				  </div>
				</div>
				<div class="accordion-group">
				  <div class="accordion-heading">
				    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour">
				      <i class="icon-adjust white"></i>Effects<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseFour" class="accordion-body collapse">
				    <div id="inner-effect" class="accordion-inner" align="center">
				    	
				    </div>
				  </div>
				</div>
			</div>
		</div>
		<div class="dragcell" style="display: none;"><img src="" style="height:70px;"/><div style="width:100%; height:100%;"></div></div>
<!--...............................................Colum two.......................................................................-->
		<div id="waiting" align="center" style="display:none;padding-top:200px;">
			<img src="<?php echo base_url().'/assets/designer/images/loading-white.gif';?>" />
			<p>Rendering...</p>
		</div>
		<div id="col2" class="span9 row12">
			<div id="layout"></div>
		</div>
	</div>
<!--...............................................Image Gallery...................................................................-->
	<ul class="nav nav-tabs">
		<li class="btnmth method"><a class="rdom">Random</a></li>
		<li class="inctr"><a class="insta"><i class="icon-volume-down white"></i>Instagram</a></li>
		<li class="fbctr"><a class="fbook nbor"><i class="icon-volume-off white"></i>FaceBook</a> <select style="display:none;" class="fbalbums"></select></li>
		<li><a class="upload"><i class="icon-camera white"></i>Upload</a></li>
	</ul>
	<div id="container"><div id="gallery" class="ad-gallery">
      <div class="ad-nav">
        <div class="ad-thumbs">
        	<ul class="ad-thumb-list" style="width: 6000px;">
	            
	        </ul>
        </div>
      </div>
    </div></div>
    <div id="caman" style="display:none;"></div>
    <iframe id="ifrim" src="" style="display:none;"></iframe>
<!--..................................................ENDing.......................................................................-->
	<form id="sending">
		<input id="vdata" type="hidden" name="canvas" >
		<input id="ddata" type="hidden" name="items" >
		<input id="tdata" type="hidden" name="texts" >
	</form>
</body>

	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery-1.8.3.min.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.easing.min.js';?>"></script>
	
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/bootstrap.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/bootstrap.tooltip.js';?>"></script>

    <!-- restyle the select box-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.tbs_dd.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery-ui-1.9.0.custom.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.ui.touch-punch.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/chosen.jquery.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/color-animation.js';?>"></script>
	<!-- fabric -->
	

	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/fabric.min10c.js';?>"></script>
	<!--script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/fabrix.text.class.js';?>"></script-->
	<!--<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/fabric.min0.7.js';?>"></script>-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/bootstrap-collapse.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.accord.stupid.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jtinyscrollbar.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.ad-gallery.js';?>"></script>

	<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/config.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/kinectic.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/caman.full.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/hammer.js';?>"></script>

	<!--script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/allfontsx.js';?>"></script-->

	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/api.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/ui.js';?>"></script>
	<!--script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/designer.js';?>"></script-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/data.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/ready.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/effect.js';?>"></script>
	
	<script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/fileupload/jquery.iframe-transport.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/fileupload/jquery.fileupload.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/designer/js/designeruploader.js';?>" ></script>

    <script type="text/javascript">
    	var url_script = "<?php echo base_url().'/assets/designer/js/';?>";
    	$(function() {
		    var galleries = $('.ad-gallery').adGallery();
		    $('#switch-effect').change(
		      function() {
		        galleries[0].settings.effect = $(this).val();
		        return false;
		      }
		    );
		    $('#toggle-slideshow').click(
		      function() {
		        galleries[0].slideshow.toggle();
		        return false;
		      }
		    );
		  });
    </script>
</html>