<?php
class test extends CI_Controller {

	public function index()
	{
		$DIR = str_replace("\\", "/",getcwd());
		$FPR = "/process";
		$json = "dskkj";
		//echo "cd ".$DIR.$FPR." & node fb.js ".$json;
		$today = getdate();
		$FILE = "/renders/".$today['mday'].'_'.$today['month'].'/'.$today['hours'].'_'.$today['minutes'].'_'.$today['seconds'].'.png';
		echo $FILE;
	}
}
?>