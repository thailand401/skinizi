<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Manage extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		
		$this->load->database();
		$this->load->helper('url');
		
		$this->load->library('grocery_CRUD');	
	}
	
	function render_output($output = null)
	{
		$this->load->view('manage.php',$output);	
	}
	
	function index()
	{
		$this->render_output((object)array('output' => '' , 'js_files' => array() , 'css_files' => array()));
	}
	function orders_management()
	{
		try{
			$crud = new grocery_CRUD();

			//$crud->set_theme('datatables');
			$crud->set_table('coverorder');
			$crud->set_subject('Order');
			
			$crud->display_as('deviceid','Device');
			$crud->display_as('createddate','Order date');
			$crud->display_as('previewurl','Preview image');
			$crud->display_as('uniqueid','Unique ID');
			$crud->display_as('generatedfolder','Generated folder');
			$crud->display_as('generatedurl','Generated image');
			$crud->display_as('designdata','Design data');
			
			$crud->columns('deviceid','name','createddate','uniqueid','previewurl','generatedfolder','generatedurl','price');
			
			$crud->set_field_upload('previewurl','');
			$crud->set_field_upload('generatedurl','');
			// relation ship
			$crud->set_relation('deviceid','device','name');
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	function devices_management()
	{
		try{
			$crud = new grocery_CRUD();

			//$crud->set_theme('datatables');
			$crud->set_table('device');
			$crud->set_subject('Device');
			
			$crud->display_as('textid','Text\'s id');
			$crud->display_as('idp','Product name ID');
			$crud->display_as('previewimagecanvaspos','Preview image canvas positions');
			$crud->display_as('previewimage','Preview image');
			$crud->display_as('previewcrop','Preview crop area');
			$crud->display_as('previewscaledwidth','Preview scaled to width (px)');
			$crud->display_as('printfile','Print image');
			$crud->display_as('printboundary','Print boundary');
			
			
			$crud->set_field_upload('thumbnail',$this->config->item('upload_device_thumbnail'));
			$crud->set_field_upload('previewimage',$this->config->item('upload_device_preview'));
			$crud->set_field_upload('printfile',$this->config->item('upload_device_print'));
			// relation ship
			$crud->set_relation('sub_categoryid','sub_category','name');
			$crud->set_relation_n_n('Canvas', 'device_canvas', 'canvas', 'deviceid', 'canvasid', 'name','priority');
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	
	function canvas_management()
	{
		try{
			$crud = new grocery_CRUD();
			$crud->set_table('canvas');
			$crud->set_subject('Canvas');
			$crud->display_as('textid','Text\'s id');
			$crud->display_as('minwidth','Minimum width upload file');
			$crud->display_as('minheight','Minimum height upload file');
			$crud->display_as('bestwidth','Best width upload file');
			$crud->display_as('bestheight','Best height upload file');
			$crud->display_as('layerboundary','Layer Boundary');
			$crud->display_as('printboundary','Print Boundary');
			$crud->display_as('printboundaryvisible','Print Boundary visible');
			$crud->display_as('wallpaperboundary','Wallpaper boundary');
			$crud->display_as('wallpaperboundaryscaledwidth','Wallpaper boundary scaled width');
			
			
			$crud->set_field_upload('thumbnail',$this->config->item('upload_canvas_thumbnail'));
			$crud->set_field_upload('layer',$this->config->item('upload_canvas_layer'));
			
			// validation
			$crud->required_fields('textid','name','thumbnail','layer','minwidth','minlength','sizewidth','sizelength');
			$crud->set_rules('minwidth','Minimum width upload file','numeric');
			$crud->set_rules('minlength','Minimum length upload file','numeric');
			$crud->set_rules('sizewidth','Size Width','numeric');
			$crud->set_rules('sizelength','Size Length','numeric');
		
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	function sub_category_management(){
		try{
			$crud = new grocery_CRUD();
			$crud->set_table('sub_category');
			$crud->set_subject('Sub category');
			
			$crud->display_as('textid','Text\'s id');
			$crud->display_as('categoryid','Category');
			$crud->required_fields('name','textid');
			$crud->set_relation('categoryid','category','name');
			
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	function category_management()
	{
		try{
			$crud = new grocery_CRUD();
			$crud->set_table('category');
			$crud->set_subject('Category');
			
			$crud->display_as('textid','Text\'s id');
			$crud->required_fields('name','textid');
			
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	function language_management()
	{
		try{
			$crud = new grocery_CRUD();

			//$crud->set_theme('datatables');
			$crud->set_table('language');
			$crud->set_subject('Language');
			$crud->display_as('textid','Text\'s id');
			$crud->display_as('idcountry','Country');
			$crud->display_as('guitext','GUI');
			$crud->field_type('guitext', 'true_false');
			$crud->required_fields('idcountry','text','textid');
			
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}

}