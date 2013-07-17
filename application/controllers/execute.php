<?php
class execute extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		//$DIR = str_replace("\\", "\\",getcwd());
		$DIR = getcwd();
		$this->load->helper('url'); 
		$FPR = "\process";
		$today = getdate();
		$CPATH = $DIR."/assets\\renders\\".$today['mday'].'_'.$today['month'];
		if (!is_dir($CPATH)) {
		    mkdir($CPATH);
		}
		$FILE = $DIR."/assets\\renders\\".$today['mday'].'_'.$today['month'].'/'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds'];
		//$URLS = base_url()."assets/renders/".$today['mday'].'_'.$today['month'].'/'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds'].".png";
		//$URLS = base_url()."index.php/review/index/".$today['mday'].'_'.$today['month'].'/'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds']."_1".'/'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds']."_2";
		$this->load->helper('form');
		

		$json = $_POST["data"].' '.$FILE;
		$data = array(); // define array
		$cmd = "cd ".$DIR.$FPR." & node controller.js ".$json;
		//exec("cd ".$DIR.$FPR." & node fb.js");
		//echo $cmd ;die();
		exec($cmd, $data, $ret); // execute command, output is array
		if ($ret == 0)
		{ 
			foreach ($data as $line){
				//echo "$line<br>";
					//echo '<a target="_blank" href="'.$URLS.'">click to view result</a>';die();
				echo $today['mday'].'_'.$today['month'].'Y'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds'].$line;die();
				
			}
		}
		else
		{
			echo "Error in command"; // if unsuccessful display error
		}
	}
}
?>