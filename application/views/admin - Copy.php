<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="cache-control" content="no-cache" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/bootstrap.min.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/slideshow/style.css';?>" rel="stylesheet" />
	
	<!--link type="text/css" href="<?php echo base_url().'/assets/admin/css/bootstrap-responsive.css';?>" rel="stylesheet" /-->
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/custom-theme/jquery-ui-1.9.0.custom.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/ui.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/animate.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/grocery_crud/css/jquery_plugins/file_upload/fileuploader.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/grocery_crud/css/jquery_plugins/file_upload/jquery.fileupload-ui.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/thor.css';?>" rel="stylesheet" />
	<link type="text/css" href="<?php echo base_url().'assets/admin/css/admin.css';?>" rel="stylesheet" />

	<script type="text/javascript">
		var guilang = [];
		//var dcategory = <?php echo $cate; ?>;
		//var dsubcategory = <?php echo $subcate; ?>;
		//var ddevices = <?php echo $device; ?>;
		//var dcanvas = <?php echo $canvas; ?>;
	</script>
</head>
<body oncontextmenu ="return false;">
	<div id="banner">
		<div>
			<div class="slogan"></div>
			<div class="ttle">Manager Page</div>
			<div id="command">
				<div class="notice">something changed</div>
				<button class="btn btn-warning" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SAVE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
			</div>
		</div>
	</div>
	<div class="row-fluid row">
<!--...............................................Colum one.......................................................................-->
		<div id="col1" class="span3 row12 ground">
			<div class="accordion" id="accordion2">
				<div class="accordion-group">
				  <div id="m_device" class="accordion-heading">
				    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
				      <i class="icon-fire white"></i>Device<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseOne" class="accordion-body collapse in">
				    <div class="accordion-inner">
				    	<?php for($i = 0; $i < count($cate); $i++){ ?>
						<div data-id="1" class="accordionButton">Cover <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item branditem">
									<li data-id="1" class="subheader">Iphone</li>
									<li>Iphone 3</li>
									<li>Iphone 4</li>
									<li data-id="1">Iphone 5</li>

									<li data-id="2" class="subheader">Ipad</li>
									<li>Ipad 3</li>
									<li>Ipad Mini</li>

									<li class="subheader">Samsung</li>
									<li>Galaxy Note II</li>
									<li>Google Nexus</li>

									<li class="subheader">Sony</li>
									<li>Xperia Z</li>
									<li>Xperia Play</li>
								</ul>
							</div>
						<div data-id="2" class="accordionButton">Sticker <i class="moredv icon-question-sign"></i></div>
							<div class="accordionContent" style="display: none;">
								<ul class="device_item branditem">
									<li class="subheader">Iphone</li>
									<li>Iphone 3</li>
									<li>Iphone 4</li>
									<li>Iphone 5</li>

									<li class="subheader">Ipad</li>
									<li>Ipad 3</li>
									<li>Ipad Mini</li>

									<li class="subheader">Samsung</li>
									<li>Galaxy Note II</li>
									<li>Google Nexus</li>

									<li class="subheader">Sony</li>
									<li>Xperia Z</li>
									<li>Xperia Play</li>
								</ul>
							</div>
				    </div>
				  </div>
				</div>

				<div class="accordion-group">
				  <div id="m_canvas" class="accordion-heading">
				    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
				      <i class="icon-th white"></i>Canvas<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseTwo" class="accordion-body collapse" style="height: 0px;">
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
				  <div id="collapseThree" class="accordion-body collapse" style="height: 0px;">
				    <div id="inner-layout" class="accordion-inner">
				    </div>
				  </div>
				</div>

				<div class="accordion-group">
				  <div class="accordion-heading">
				    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour">
				      <i class="icon-adjust white"></i>Data Manager<i class="icon-chevron-down white fright"></i>
				    </a>
				  </div>
				  <div id="collapseFour" class="accordion-body collapse" style="height: 0px;">
				    <div id="inner-data" class="accordion-inner" align="center">
				    	<ul>
				    		<li><a>Category</a></li>
				    		<li><a>Device</a></li>
				    		<li><a>Layout</a></li>
				    		<li><a>Users</a></li>
				    	</ul>
				    </div>
				  </div>
				</div>
			</div>
		</div>
<!--...............................................Colum two.......................................................................-->
		<div id="waiting" align="center" style="display:none;padding-top:200px;">
			<img src="<?php echo base_url().'/assets/designer/images/loading-white.gif';?>" />
			<p>Rendering...</p>
		</div>
		<div id="col2" class="span9 row12">
			<div id="sphere">
				<ul>
					<li>&#x2652;</li>
					<li>&#x2648;</li>
					<li>&#x2649;</li>
					<li>&#x264A;</li>
					<li>&#x264D;</li>
					<li>&#x264E;</li>
					<li>&#x264F;</li>
					<li>&#x2650;</li>
					<li>&#x2651;</li>
					<li>&#x2652;</li>
					<li>&#x2653;</li>
					<li>&#x264B;</li>
					<li>&#x264C;</li>
					<li>&#x2652;</li>
					<li>&#x2648;</li>
					<li>&#x2649;</li>
					<li>&#x264A;</li>
					<li>&#x264D;</li>
					<li>&#x264E;</li>
					<li>&#x264F;</li>
				</ul>
			</div>
			<div class="tlt" align="center">
	            <ul class="texts" style="display: none">
	              <li>Right Click to header of Collapse to choosen command</li>
	              <li>Canvas's items only appear when you choosen a device</li>
	              <li>Click to choosen a canvas before create a layout for it</li>
	              
	              <li>Press Control to select multiple cell various</li>
	              <li>Press Shift to select a block - click start and end Cell</li>
	              <li>Right click on selected cell to call command menu</li>

	            </ul>
	        </div>
	        <div id="layout"></div>
	        <div id="cellctr" style="position: absolute;top:60px;margin-left:20px; display:block;width:200px;">
		        <p>
				  <label for="amount">Size</label>
				  <input type="text" id="amount1" style="border: 0; color: #f6931f; font-weight: bold; width:20px;" />
				</p>
		        <div id="slider-vertical1" style="height: 120px;"></div>
		        <p>
				  <label for="amount">Padding</label>
				  <input type="text" id="amount2" style="border: 0; color: #f6931f; font-weight: bold; width:20px;" />
				</p>
		        <div id="slider-vertical2" style="height: 120px;"></div><br>
		        <div id="reset" class="btn btn-small btn-info" style="margin:0 0 0 -5px;padding: 2px 4px;"><i class="icon-refresh" style="padding-right: 2px"></i></div><br>
		        <div id="undo" class="btn btn-small btn-info" style="margin:4px 0 0 -5px;padding: 2px 4px;"><i class="icon-cog" style="padding-right: 2px"></i></div><br>
		        <div id="redo" class="btn btn-small btn-info" style="margin:4px 0 0 -5px;padding: 2px 4px;"><i class="icon-share-alt" style="padding-right: 2px"></i></div><br>
		    	<img id="jseyeslayer" style="width:100px;position:absolute;top:425px;left:40px;" src="<?php echo base_url().'assets/admin/images/normal.png';?>" />
		    	<img id="jseye1" style="width:100px;position:absolute;top:425px;left:40px;" src="<?php echo base_url().'assets/admin/images/eyes.png';?>" />
		    	<div align="center" id="notice" style="display:none;opacity:0.7;width:130px;height:90px;position:absolute;top:340px;left:70px;background: url(<?php echo base_url().'assets/admin/images/notice.png'?>);">
		    		<p class="snotice">This is error notice length size of</p>
		    	</div>
		    </div>
		</div>
	</div>
	<div class="modal hide">
		 <div class="modal-header">
		    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$('.modal').hide();">&times;</button>
		    <h3>Data Manager</h3>
		  </div>
		  <div class="modal-body">
		    <iframe id="fmng" src="" width="99%" height="590px" style="border:none;"></iframe>
		  </div>
	</div>
<!--...............................................Image Gallery...................................................................-->
	<div id="container"><div id="gallery" class="ad-gallery">
      <div class="ad-nav">
        <div class="ad-thumbs">
        	<ul class="ad-thumb-list" style="width: 1454px;">
	            
	        </ul>
        </div>
      </div>
    </div></div>
<!--..................................................ENDing.......................................................................-->
	<div id="submenu"></div>

	<form id="sending">
		<input id="vdata" type="hidden" name="canvas" >
		<input id="ddata" type="hidden" name="items" >
		<input id="tdata" type="hidden" name="texts" >
	</form>
</body>

	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery-1.8.3.min.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/designer/js/lib/jquery.easing.min.js';?>"></script>
	
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/bootstrap.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/bootstrap.tooltip.js';?>"></script>

    <!-- restyle the select box-->
	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.tbs_dd.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery-ui-1.9.0.custom.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.ui.touch-punch.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/chosen.jquery.min.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.lettering.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.textillate.js';?>"></script>
    <script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/color-animation.js';?>"></script>

    <script src="<?php echo base_url().'/assets/grocery_crud/js/jquery_plugins/jquery.iframe-transport.js'; ?>"></script>
	<script src="<?php echo base_url().'/assets/grocery_crud/js/jquery_plugins/jquery.fileupload.js'; ?>"></script>
	<script src="<?php echo base_url().'/assets/grocery_crud/js/jquery_plugins/config/jquery.fileupload.config.js'; ?>"></script>
	<!-- fabric -->
	<script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/3DEngine.js';?>" ></script>
	<script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/Cube.js';?>" ></script>

	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/bootstrap-collapse.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.accord.stupid.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jtinyscrollbar.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/jquery.ad-gallery.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'/assets/admin/js/lib/eyes.nojquery.js';?>"></script>

	<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/config.js';?>"></script>
	
	<script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/fileupload/jquery.iframe-transport.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/fileupload/jquery.fileupload.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/designeruploader.js';?>" ></script>
    <script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/model.js';?>" ></script>
	<script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/admin.js';?>" ></script>
	<script  type="text/javascript" src="<?php echo base_url().'/assets/admin/js/ready.js';?>" ></script>
    <script type="text/javascript">
    	var baseurl = "<?php echo base_url(); ?>";
    	var url_script = "<?php echo base_url().'/assets/admin/js/'; ?>";
    	jseyes();
    	$(document).ready(function() {
			var camera = new Camera3D();
			camera.init(0,0,0,300);
			var item = new Object3D($("#sphere"));
			item.addChild(new Cube(100));
			var scene = new Scene3D();
			scene.addToScene(item);
			var animateIt = function(){
				axisRotation.y += .01
				axisRotation.x -= .01
				scene.renderCamera(camera);
			};
			setInterval(animateIt, 20);
		});

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

		$(function (){
			var obj = {"loop":true,"in":{"effect":"fadeInLeft","sync":false,"shuffle":true},"out":{"effect":"fadeOutLeft","sync":false,"shuffle":true}};
			$('.tlt').textillate(obj);
		});
    </script>
</html>