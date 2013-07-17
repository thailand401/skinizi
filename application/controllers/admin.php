<?php
class Admin extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
		$this->load->library('grocery_CRUD');	
	}
	
	function index()
	{
		$lg = "en";
		$data["cate"] = $this->categories($lg);
		$data["subcate"] = $this->subcategories($lg);
		$data["device"] = $this->devices($lg);
		$data["canvas"] = $this->canvas($lg);
		$data["devvas"] = $this->devecanvas($lg);
		$data["clips"] = $this->getClip();
		//var_dump($data);die();
		$this->load->view('admin',$data);
	}
	function render_output($output = null)
	{
		$this->load->view('manage.php',$output);	
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
			//var_dump($output);
			
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
	function devices_management()
	{
		try{
			$crud = new grocery_CRUD();

			//$crud->set_theme('datatables');
			$crud->set_table('device');
			$crud->set_subject('Product');

			$crud->display_as('name','Product Name');
			$crud->display_as('textid','Text\'s id');
			$crud->display_as('idp','Product name ID');
			$crud->display_as('price','Product Price');
			$crud->set_field_upload('thumbnail',$this->config->item('upload_device_thumbnail'));
			
			$crud->required_fields('idp','textid','name','thumbnail','price');
			$crud->set_rules('price','Product Price','numeric');
			// relation ship
			$crud->set_relation('sub_categoryid','sub_category','name');
			//$crud->set_relation_n_n('Canvas', 'device_canvas', 'canvas', 'deviceid', 'canvasid', 'name','priority');
			$output = $crud->render();
			//print_r($output->output);
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
			$crud->display_as('layerboundary','Layer Boundary');
			$crud->display_as('wallpaperboundary','Wallpaper boundary');
			$crud->display_as('wallpaperboundaryscaledwidth','Wallpaper boundary scaled width');
			
			
			$crud->set_field_upload('thumbnail',$this->config->item('upload_canvas_thumbnail'));
			$crud->set_field_upload('layer',$this->config->item('upload_canvas_layer'));
			
			// validation
			$crud->required_fields('textid','name','thumbnail','layer');
		
			$output = $crud->render();
			
			$this->render_output($output);
			
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
	//-------------------------------------------------------------------Get database--------------------------------------------------------------

	function categories($lang){
		$this->load->Model("designer_model");
		$categories = $this->designer_model->getcategories();
		$categories = $this->applyTranslate($lang, $categories);	
		return $categories;		
		//return json_encode($categories);
	}
	function subcategories($lang){
		$this->load->Model("designer_model");
		$categories = $this->designer_model->getallsubcategories();
		$categories = $this->applyTranslate($lang, $categories);
		return $categories;			
		//return json_encode($categories);
	}
	function devices($lang)	{
		$this->load->Model("designer_model");
		$devices = $this->designer_model->getalldevices();
		if($devices != FALSE && count($devices)>0)
		{
			$devices = $this->applyTranslate($lang, $devices);
			
			$result = array();
			// change the url to images
			for($i =0;$i<count($devices);$i++)
			{
				$devices[$i]['thumbnail'] = $this->config->base_url().$this->config->item('upload_device_thumbnail').$devices[$i]['thumbnail'];
				$result[] =$devices[$i];
			}
			return $result;	
			//return json_encode($result);
		}
		else
		{
			//return '{"empty":true}';
			return array();	
		}
	}
	function canvas($lang){
		$this->load->Model("designer_model");
		$canvas = $this->designer_model->getallcanvas();
		$canvas = $this->applyTranslate($lang, $canvas);
		
		$result = array();
		// change the url to images
		for($i =0;$i<count($canvas);$i++)
		{
			$canvas[$i]['thumbnail'] = $this->config->base_url(). $this->config->item('upload_canvas_thumbnail').$canvas[$i]['thumbnail'];
			$canvas[$i]['layer'] = $this->config->base_url().$this->config->item('upload_canvas_layer').$canvas[$i]['layer'];
			$result[] =$canvas[$i];
		}	
		return $result;	
		//return json_encode($result);
	}
	function devecanvas($lang){
		$this->load->Model("designer_model");
		$canvas = $this->designer_model->getalldevcan();
		return $canvas;	
		//return json_encode($result);
	}

	function order($id){
		$data = $this->input->post('data');
		$this->load->Model("designer_model");
		$order = $this->designer_model->getorder($id);
		// change the url to images
		for($i =0;$i<count($order);$i++)
		{
			$order[$i]['previewurl'] = $this->config->base_url().$order[$i]['previewurl'];
			$order[$i]['generatedurl'] = $this->config->base_url().$order[$i]['generatedurl'];
			$wallpapers = $order[$i]['wallpapers'];
			$order[$i]['wallpapers'] = json_decode($wallpapers);
			$order[$i]['designdata'] = json_decode($order[$i]['designdata']);
			$result = $order[$i];
			break;
		}		
		echo json_encode($result);
	}

	function getClip(){
		$this->load->Model("designer_model");
		$clip = $this->designer_model->getaclips();
		return $clip;	
	}

	function applyTranslate($languageid,$data){
		$this->load->Model("designer_model");
		$langList = $this->designer_model->getlanguages($languageid);
		$langDict =array();
		for($i=0;$i<count($langList);$i++){
			$langRow = $langList[$i];
			$langDict[$langRow['textid']] = $langRow['text'];
		}
		
		$result=array();
		for($i=0;$i<count($data);$i++){
			$dataRow = $data[$i];
			// check if exist translation
			if(isset($langDict[$dataRow['textid']]))
			{
				$dataRow['name'] = $langDict[$dataRow['textid']];
				//echo $dataRow['name'];
			}
			$result[]=$dataRow;
		}
		return $result;
	}
}
?>