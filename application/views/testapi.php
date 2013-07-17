<script type="text/javascript" src="<?php echo base_url().'assets/designer/js/lib/jquery-1.8.3.min.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js/lib/fabric.min10c.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/kinectic.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/config.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/initialize.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/ready.js';?>"></script>
<script type="text/javascript" src="<?php echo base_url().'assets/designer/js2/data.js';?>"></script>
<style>
	body{
		margin: 0;
		padding: 0;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.cell{
		position: absolute;
		top: 100px;
		left: 100px;
		width: 300px;
		height: 450px;
	}
	.boundary{
		position: absolute;
		top: 70px;
		left: 70px;
		width: 250px;
		height: 280px;
		background: #FFF;
	}
	.source{
		position: absolute;
		padding: 10px;
		background: transparent;
		border: 1px solid #fff;
	}
	.blurlayer{
		position: absolute;
		padding: 10px;
		background: rgba(0,0,0,.4);
	}
	.button_cmd{
		background: #F00;
		position: absolute;
		width: 20px;
		height: 20px;
		border: 1px solid #FFF;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		z-index: 90;
	}
	.lt{
		top: -15px;
		left: -15px;
	}
	.lb{
		top: 255px;
		left: -15px;
	}
	.rt{
		top: -15px;
		left: 205px;
	}
	.rb{
		top: 255px;
		left: -15px;
	}
</style>
<div class="cell">
	<div class="source">
		<img src="<?php echo base_url().'assets/DinhBoLinh.jpg';?>" width="100%" height="100%">
		<div class="button_cmd lt"></div>
		<div class="button_cmd lb"></div>
		<div class="button_cmd rt"></div>
		<div class="button_cmd rb"></div>
	</div>
	<div class="blurlayer"></div>
	<div class="boundary">
		<canvas id="boundary1"></canvas>
	</div>
</div>