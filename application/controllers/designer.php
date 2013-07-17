<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Designer extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		
		$this->load->database();
		$this->load->helper('url');
		
		$this->path_img_upload_folder = $this->config->item('path_img_upload_folder');
		$this->path_img_thumb_upload_folder = $this->config->item('path_img_thumb_upload_folder');
		$this->path_img_layer_upload_folder =$this->config->item('path_img_layer_upload_folder');
		$this->path_img_layer_upload_black =$this->config->item('path_img_layer_upload_blackbox');
	}
	
	
	function index($lang ='en',$deviceid = 0)
	{
		$data['lang'] =$lang;
		$this->load->Model("designer_model");
		$data['guilang'] = $this->designer_model->getguilanguages($lang);
		$data['allow_name_a_design'] = $this->config->item('allow_name_a_design');
		$data['draw_print_border'] = $this->config->item('draw_print_border');
		if(($deviceid>0)){
			
			$data['deviceid'] = $deviceid;
			$this->load->Model("designer_model");
			$device = $this->designer_model->getdevice($deviceid);
			if($device != FALSE){
				$data['sub_categoryid'] = $device[0]['sub_categoryid'];
				$subcategory = $this->designer_model->getsubcategory($device[0]['sub_categoryid']);
				if($subcategory != FALSE){
					$data['categoryid'] = $subcategory[0]['categoryid'];
					$list = $this->designer_model->getcategories();
					$data['categories'] = $this->applyTranslate($lang, $list);
					
					$list = $this->designer_model->getsubcategories($subcategory[0]['categoryid']);
					$data['sub_categories'] = $this->applyTranslate($lang, $list);
					
					$devices = $this->designer_model->getdevices($device[0]['sub_categoryid']);
					$devices = $this->applyTranslate($lang, $devices);
					
					$result = array();
					// change the url to images
					for($i =0;$i<count($devices);$i++)
					{
						$devices[$i]['thumbnail'] = $this->config->base_url().$this->config->item('upload_device_thumbnail').$devices[$i]['thumbnail'];
						$devices[$i]['previewimage'] = $this->config->base_url().$this->config->item('upload_device_preview').$devices[$i]['previewimage'];
						$result[] =$devices[$i];
					}
					$data['devices'] = 	$result;
					
				}	
			}				
		}else{
			$data['device_id'] = 0;
		}
		
		$this->load->view('designer',$data);
	}
	function categories($lang){
		$this->load->Model("designer_model");
		$categories = $this->designer_model->getcategories();
		$categories = $this->applyTranslate($lang, $categories);		
		echo json_encode($categories);
	}
	function subcategories($lang,$categoryid){
		$this->load->Model("designer_model");
		$categories = $this->designer_model->getsubcategories($categoryid);
		$categories = $this->applyTranslate($lang, $categories);		
		echo json_encode($categories);
	}
	function devices($lang,$categoryid)	{
		$this->load->Model("designer_model");
		$devices = $this->designer_model->getdevices($categoryid);
		if($devices != FALSE && count($devices)>0)
		{
			$devices = $this->applyTranslate($lang, $devices);
			
			$result = array();
			// change the url to images
			for($i =0;$i<count($devices);$i++)
			{
				$devices[$i]['thumbnail'] = $this->config->base_url().$this->config->item('upload_device_thumbnail').$devices[$i]['thumbnail'];
				$devices[$i]['previewimage'] = $this->config->base_url().$this->config->item('upload_device_preview').$devices[$i]['previewimage'];
				$result[] =$devices[$i];
			}
					
			echo json_encode($result);
		}
		else
		{
			echo '{"empty":true}';	
		}
	}
	function canvas($lang,$deviceId){
		$this->load->Model("designer_model");
		$canvas = $this->designer_model->getcanvas($deviceId);
		$canvas = $this->applyTranslate($lang, $canvas);
		
		$result = array();
		// change the url to images
		for($i =0;$i<count($canvas);$i++)
		{
			$canvas[$i]['thumbnail'] = $this->config->base_url(). $this->config->item('upload_canvas_thumbnail').$canvas[$i]['thumbnail'];
			$canvas[$i]['layer'] = $this->config->base_url().$this->config->item('upload_canvas_layer').$canvas[$i]['layer'];
			$result[] =$canvas[$i];
		}
				
		echo json_encode($result);
				
		//echo json_encode($canvas);
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
	
	function addtocart(){
		// get data from Post
		$data = $this->input->post('data');
		$this->load->Model("designer_model");
		$device = $this->designer_model->getdevice($data['deviceId']);
		if($device != FALSE){
			$device = $device[0];
			$canvasPos = $this->parseBoundaries($device['printboundary']); 
			$uploadCanvasDatas = $data['canvas'];
			$print_image = $this->config->item('upload_device_print').$device['printfile'];
						
			// modify the path to canvas
			for ($i=0; $i < count($uploadCanvasDatas); $i++) { 
				$replacePos = strpos($uploadCanvasDatas[$i]['imgUrl'], $this->path_img_layer_upload_folder);
				if($replacePos>=0){
					$tmpStr = substr($uploadCanvasDatas[$i]['imgUrl'],$replacePos);
					$uploadCanvasDatas[$i]['imgUrl'] = $tmpStr ; 
					$uploadCanvasDatas[$i]['fullImgUrl'] = str_replace($this->path_img_layer_upload_folder, $this->path_img_upload_folder, $tmpStr);
				}				
				$uploadCanvasDatas[$i]['boundary'] = $this->parseBoundary($uploadCanvasDatas[$i]['canvasBoundary']);
				$uploadCanvasDatas[$i]['print'] = $this->parseBoundary($uploadCanvasDatas[$i]['printboundary']);
			}

			// Get the size of the original image into an array
			$size = getimagesize( $print_image);
			// Create a new true color image in the memory
			$result_img = imagecreatetruecolor($size[0], $size[1]);
			// make sure background is white
			imagefilledrectangle($result_img, 0, 0, $size[0], $size[1], 16777215);

			$wallpapers = array();	
			for ($i=0; $i < count($uploadCanvasDatas); $i++) {
				$canvasData = $uploadCanvasDatas[$i];
				$pos = $canvasPos[$i]; 
				$canvasDataBound= $canvasData['boundary'];
				if(($canvasData['print'] != NULL)){
					$canvasDataBound=$canvasData['print'];
				}
				
				$user_full_image = $this->imagecreatefromfile($canvasData['fullImgUrl']);
				$user_full_image_w = imagesx($user_full_image);
				$user_full_image_h = imagesy($user_full_image);
				$user_small_image_size = getimagesize($canvasData['imgUrl']);
				
				$printScale = $pos[3] /$canvasDataBound[3];// apply scale of print file
				$userImageScale = $user_full_image_w/$user_small_image_size[0];
				$scale = $canvasData['scale'] * $printScale / $userImageScale;
				
				$scaled_w = $user_full_image_w * $scale;
				$scaled_h =  $user_full_image_h * $scale;
				// scale it
				$can_tmp = imagecreatetruecolor($scaled_w,$scaled_h);
				
				imagecopyresampled($can_tmp, $user_full_image, 0, 0, 0, 0, $scaled_w, $scaled_h, $user_full_image_w, $user_full_image_h);
				
				// destroy mem
				imagedestroy($user_full_image);
				
				$can_tmp = imagerotate($can_tmp, -$canvasData['angle'], 16777215);
				$left = $canvasData['left'] - $canvasData['leftOffset'];
				$top  = $canvasData['top'];
				$left = ($left - $canvasDataBound[0]) * $printScale + $pos[0] - (imagesx($can_tmp))/2;
				$top  = ($top  - $canvasDataBound[1]) * $printScale + $pos[1] - (imagesy($can_tmp))/2;
				
				$can_big_img = imagecreatetruecolor($size[0], $size[1]);
				imagecopy($can_big_img, $can_tmp,$left,$top, 0, 0, imagesx($can_tmp), imagesy($can_tmp));
				
				// merge to final image
				imagecopymerge($result_img, $can_big_img, $pos[0], $pos[1], $pos[0], $pos[1], $pos[2], $pos[3], 100);
				
				// when this is a wallpaper
				if($canvasData['wallpaper'] == '1'){
					// generate wallpaper files
					$wallPos = $this->parseBoundary($canvasData['wallpaperboundary']);
					if($wallPos != NULL){
						$wallW = $wallPos[2] * $printScale;
						$wallH = $wallPos[3] * $printScale;
						
						
						$scaled_w = intval($canvasData['wallpaperboundaryscaledwidth']);
						$scaled_h = $wallH * $scaled_w / $wallW;
						$wall_img = imagecreatetruecolor($scaled_w, $scaled_h);
						
						$left = $pos[0] + ($wallPos[0] - $canvasDataBound[0]) * $printScale;
						$top = $pos[1] + ($wallPos[1] - $canvasDataBound[1]) * $printScale;
						//imagecopy($wall_img, $can_big_img,0,0,$left,$top, $wallW, $wallH);
						imagecopyresampled($wall_img, $can_big_img, 0, 0, $left, $top, $scaled_w, $scaled_h, $wallW, $wallH);		
						
						// scale the value
						/*
						if($scaled_w>0) {
							
							 
							$can_tmp = imagecreatetruecolor($scaled_w,$scaled_h);
							imagecopyresampled($can_tmp, $wall_img, 0, 0, 0, 0, $scaled_w, $scaled_h, $wallW, $wallH);
							$wall_img = $can_tmp;
						}*/
						$wallpapers[] = $wall_img;
					}
				}
				// clean memory
				imagedestroy($can_big_img);
				imagedestroy($can_tmp);				
			}
			
			imagecopy($result_img, imagecreatefrompng($print_image), 0, 0, 0, 0, $size[0], $size[1]);
			
			
			// we get canvas position and images and preview images
			// start us$data = array();
			$data['uniqueid'] = 'user_'.$this->uniqueFilename('');
			$folder = $this->config->item('path_generate_users').$data['uniqueid'];
			if(mkdir ($folder))
			{
				$data['file'] = $folder.'/print_'.$data['uniqueid'].'.jpg';
				// Save the image as resized.jpg
				imagejpeg($result_img, $data['file'],95);
				// save files
				imagedestroy($result_img);
				
				for ($i=0; $i < count($uploadCanvasDatas); $i++) {
					// copy full image
					copy($uploadCanvasDatas[$i]['fullImgUrl'],$folder.'/user_upload_image_'.$i.'.jpg');
				}
				
				$wallpapersData = array();
				for ($i=0; $i < count($wallpapers); $i++) {
					// copy full image
					imagejpeg($wallpapers[$i],$folder.'/wallpaper_'.$i.'.jpg',95);
					imagedestroy($wallpapers[$i]);
					$wallpapersData[] = $folder.'/wallpaper_'.$i.'.jpg';
				}
				$data['wallpapers'] = json_encode($wallpapersData);
				
				// copy preview image
				$previewImage = $data['previewUrl'];
				$pos = strpos($previewImage, $this->config->item('path_generate_preview_tmp'));
				if($pos>=0){
					$previewImage = substr($previewImage, $pos);
				}
				rename($previewImage,$folder.'/preview.jpg');
				//$data['previewurl'] = $this->config->base_url().$folder.'/preview.jpg';
				$data['previewurl'] = $folder.'/preview.jpg';
				$data['folder'] = $folder;
				$data['generatedurl'] = $data['file'];
				
				$id = $this->designer_model->createOrder($data);
				if($id != FALSE){
					$data['id'] = $id;
					$url = $this->config->item('result_url');
					if(strpos($url,'http') == FALSE)
						$url = $this->config->base_url().$url;
					$data['url'] = sprintf ($url,$id);
				}
				$data['success']= TRUE;
				echo json_encode($data);
			}
			else{
				$data['success']= FALSE;
				echo json_encode($data);				
			}
		}
	}
	function parseBoundaries($boundary){
		$canvasPos = array();
		$posArray = explode(',',$boundary);
		$posArrayCount = count($posArray); 
		for ($i=0; $i < $posArrayCount; $i+=4) { 
			if($i + 4 <= $posArrayCount ){
				$canvasPos[] = array(intval ($posArray[$i]),intval ($posArray[$i + 1]),intval ($posArray[$i + 2]),intval ($posArray[$i + 3]));
			}
		}
		return $canvasPos;
	}
	function parseBoundary($boundary){
		
		$posArray = explode(',',$boundary);
		$posArrayCount = count($posArray); 
		 
		if( $posArrayCount >=4 ){
			return array(intval ($posArray[0]),intval ($posArray[1]),intval ($posArray[ 2]),intval ($posArray[ 3]));
		}
		return NULL;
	}

//=====================================================================
// Generate the preview image
//=====================================================================
	function preview(){
		// get data from Post
		$data = $this->input->post('data');
		$this->load->Model("designer_model");
		$device = $this->designer_model->getdevice($data['deviceId']);
		if($device != FALSE){
			$device = $device[0];
			$canvasPos = $this->parseBoundaries($device['previewimagecanvaspos']);
			$uploadCanvasDatas = $data['canvas'];
			$preview_image = $this->config->item('upload_device_preview').$device['previewimage'];
			// modify the path to canvas
			for ($i=0; $i < count($uploadCanvasDatas); $i++) { 
				$replacePos = strpos($uploadCanvasDatas[$i]['imgUrl'], $this->path_img_layer_upload_folder);
				if($replacePos>=0){
					$uploadCanvasDatas[$i]['imgUrl'] = substr($uploadCanvasDatas[$i]['imgUrl'],$replacePos);
				}
			}
			
			
			// we get canvas position and images and preview images
			// start using GD2
			
			// Get the size of the original image into an array
			$size = getimagesize( $preview_image);
			// Create a new true color image in the memory
			$result_img = imagecreatetruecolor($size[0], $size[1]);
			// make sure background is white
			imagefilledrectangle($result_img, 0, 0, $size[0], $size[1], 16777215);
			
			for ($i=0; $i < count($uploadCanvasDatas); $i++) {
				$canvasImage = $uploadCanvasDatas[$i];
				$pos = $canvasPos[$i];
				//imagecopymerge($result_img, $can_img, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct)
				$can_size = getimagesize($canvasImage['imgUrl']);
				$can_img = $this->imagecreatefromfile($canvasImage['imgUrl']);
				$scaled_w = $can_size[0] * $canvasImage['scale'];
				$scaled_h = $can_size[1] * $canvasImage['scale'];
				// scale it
				$can_tmp = imagecreatetruecolor($scaled_w,$scaled_h);
				imagecopyresampled($can_tmp, $can_img, 0, 0, 0, 0, $scaled_w, $scaled_h, $can_size[0], $can_size[1]);
				
				// destroy mem
				imagedestroy($can_img);
				
				$can_img = $can_tmp;
				
				$can_img = imagerotate($can_img, -$canvasImage['angle'], 16777215);
				
				$can_big_img = imagecreatetruecolor($size[0], $size[1]);
				imagefilledrectangle($can_big_img , 0, 0, $size[0], $size[1], 16777215);
			
				imagecopy($can_big_img, $can_img, 
					$canvasImage['left'] - $canvasImage['leftOffset'] - $scaled_w/2 - (imagesx($can_img) - $scaled_w)/2, 
					$canvasImage['top'] - $scaled_h/2 - (imagesy($can_img) - $scaled_h)/2, 
					0, 0, imagesx($can_img), imagesy($can_img));
				
				
				// merge to final image
				imagecopymerge($result_img, $can_big_img, $pos[0], $pos[1], $pos[0], $pos[1], $pos[2], $pos[3], 100);
				
				// clean memory
				imagedestroy($can_big_img);
				imagedestroy($can_img);				
			}
			
			imagecopy($result_img, imagecreatefrompng($preview_image), 0, 0, 0, 0, $size[0], $size[1]);
			
			// crop the preview
			$cropdata = explode(',', $device['previewcrop']);
			$cropped_image = imagecreatetruecolor(intval($cropdata[2]), intval($cropdata[3]));
			imagecopy($cropped_image, $result_img, 0, 0, intval($cropdata[0]), intval($cropdata[1]),intval($cropdata[2]), intval($cropdata[3]));
			
			// resize the preview
			$resized_image = imagecreatetruecolor($device['previewscaledwidth'], imagesy($cropped_image) * $device['previewscaledwidth'] /imagesx($cropped_image));
			imagecopyresampled($resized_image, $cropped_image, 0, 0, 0, 0, imagesx($resized_image), imagesy($resized_image), imagesx($cropped_image), imagesy($cropped_image));
			
			$data = array();
			$data['id'] = $this->uniqueFilename('');
			$data['file'] = $this->config->item('path_generate_preview_tmp').$data['id'].'.jpg';
			$data['url'] = $this->config->base_url().$data['file'] ;
			// Save the image as resized.jpg
			imagejpeg($resized_image, $data['file'],95);
			
			// Clear the memory of the tempory image
			imagedestroy($cropped_image);
			imagedestroy($resized_image); 
			imagedestroy($result_img);			
			
			echo json_encode($data);
		}				
	}
	function uniqueFilename($strExt = '.tmp') {
	        // explode the IP of the remote client into four parts
	        $arrIp = explode('.', $_SERVER['REMOTE_ADDR']);
	 
		// get both seconds and microseconds parts of the time
	        list($usec, $sec) = explode(' ', microtime());
	 
		// fudge the time we just got to create two 16 bit words
	        $usec = (integer) ($usec * 65536);
	        $sec = ((integer) $sec) & 0xFFFF;
	 
		// fun bit--convert the remote client's IP into a 32 bit
	        // hex number then tag on the time.
	        // Result of this operation looks like this xxxxxxxx-xxxx-xxxx
	        $strUid = sprintf("%08x-%04x-%04x", ($arrIp[0] << 24) | ($arrIp[1] << 16) | ($arrIp[2] << 8) | $arrIp[3], $sec, $usec);
	 
		// tack on the extension and return the filename
	        return $strUid . $strExt;
	}
	 
	//=====================================================================
	// Upload handling
	//=====================================================================
	function imagecreatefromfile($imagepath=false) { 
	    if(!$imagepath) return false; 
	    return @imagecreatefromstring(file_get_contents($imagepath)); 
	} 
	
	
	function upload_img() {
		ini_set( "memory_limit","-1");
        $name = $_FILES['userfile']['name'];
        $name = strtr($name, 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ', 'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');
		// remplacer les caracteres autres que lettres, chiffres et point par _
        $name = preg_replace('/([^.a-z0-9]+)/i', '_', $name);

        //Your upload directory, see CI user guide
        $config['upload_path'] = $this->path_img_upload_folder;
  
        $config['allowed_types'] = 'gif|jpeg|jpg|png|JPG|GIF|PNG|JPEG';
        $config['max_size'] = '8000';
        $config['file_name'] = $name;

       //Load the upload library
        $this->load->library('upload', $config);
       if ($this->upload->do_upload()) {
            
			$data = $this->upload->data();
			$name = $data['file_name'];
			$gname = explode('.', $name);
            //If you want to resize 
            $config['new_image'] = $this->path_img_layer_upload_black;
            $config['image_library'] = 'gd2';
            $config['source_image'] = $this->path_img_upload_folder . $name;
            $config['create_thumb'] = FALSE;
            $config['maintain_ratio'] = TRUE;
            $config['width'] = 165;
            $config['height'] = 94;

            $this->load->library('image_lib', $config);
            $this->image_lib->resize();
			
			// create the image for layer
			if($data['image_width']<900){
				//copy file
				//copy ($this->path_img_upload_folder . $name,$this->path_img_layer_upload_folder . $name);
				$config['new_image'] = $this->path_img_layer_upload_black;
	            $config['image_library'] = 'gd2';
	            $config['source_image'] = $this->path_img_upload_folder . $name;
	            $config['create_thumb'] = FALSE;
	            $config['maintain_ratio'] = TRUE;
	            $config['width'] = $data['image_width'];
	            $config['height'] = $data['image_height'];
				$this->image_lib->initialize($config);
				$this->image_lib->resize();
			}
			else{
				$config['new_image'] = $this->path_img_layer_upload_black;
	            $config['image_library'] = 'gd2';
	            $config['source_image'] = $this->path_img_upload_folder . $name;
	            $config['create_thumb'] = FALSE;
	            $config['maintain_ratio'] = TRUE;
	            $config['width'] = 900;
	            $config['height'] = 700;
				$this->image_lib->initialize($config);
				$this->image_lib->resize();
			}
			
			
			/*$data = $this->upload->data();
			$name = $data['file_name'];
			$gname = explode('.', $name);
			*/
			$this->copyAndResizeImage($this->path_img_upload_folder, $this->path_img_thumb_upload_folder, $name,165);
			
			if($data['image_width']<900)
				$this->copyAndResizeImage($this->path_img_upload_folder, $this->path_img_layer_upload_folder, $name);
			else
				$this->copyAndResizeImage($this->path_img_upload_folder, $this->path_img_layer_upload_folder, $name,900);
			
            //Get info 
            
            $info = new stdClass();
            $info->nname = $gname[count($gname)-2].".png";
            $info->name = $name;
            $info->size = $data['file_size'];
            $info->type = $data['file_type'];
			$info->success = true;
            $info->url = $this->config->base_url().$this->path_img_layer_upload_folder.$gname[count($gname)-2].".png"; //$this->config->base_url().$this->path_img_upload_folder . $name;
			$info->layer_url = $this->config->base_url().$this->path_img_layer_upload_folder.$gname[count($gname)-2].".png";
            $info->thumbnail_url = $this->config->base_url().$this->path_img_thumb_upload_folder.$gname[count($gname)-2].".png"; //I set this to original file since I did not create thumbs.  change to thumbnail directory if you do = $upload_path_url .'/thumbs' .$name
            $info->width = $data['image_width'];
			$info->height = $data['image_height'];
           	echo json_encode($info);
           	
            
        } else {

           // the display_errors() function wraps error messages in <p> by default and these html chars don't parse in
           // default view on the forum so either set them to blank, or decide how you want them to display.  null is passed.
            $error = array('errormessage' => $this->upload->display_errors('',''));

            echo json_encode($error);
        }
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


	function copyAndResizeImage($srcfile, $desfile, $file, $new_width = -1) {
	    
		$src = $srcfile.$file;
		$file_path = explode(".", $file);
		$new_file = $file_path[0] . '.png';
		$file_name = $desfile.$new_file;
		$source = imagecreatefromstring(file_get_contents($src));
		list($width, $height) = getimagesize($src);
		
		if($new_width != -1){
			$newheight = ($height / $width) * $new_width;
			$newwidth = $new_width;
		}
		else{
			$newheight = $height;
			$newwidth = $width;
		}
		
		$tmp = imagecreatetruecolor($newwidth, $newheight);


	    // transparent for png/////////
	    imagealphablending($tmp, false);
	    imagesavealpha($tmp,true);
	    $transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
	    imagefilledrectangle($tmp, 0, 0, $width, $height, $transparent);
	    ///////////////

	// this line actually does the image resizing, copying from the original
	// image into the $tmp image
	    imagecopyresampled($tmp, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

	// now write the resized image to disk. I have assumed that you want the
	// resized, uploaded image file to reside in the ./images subdirectory.
	    //$filename = "images/" . $_FILES['uploadfile']['name'];
	    imagepng($tmp, $file_name);

	    imagedestroy($source);
	    imagedestroy($tmp);
	}
}