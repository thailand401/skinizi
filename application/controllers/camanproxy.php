<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once(APPPATH."libraries/image.php");  
class Camanproxy extends CI_Controller {
	function __construct(){
		parent::__construct();
	}
	function index(){
		if (!$_GET['camanProxyUrl']) {
		  exit;
		}
		ob_start();
		$url = trim(urldecode($_GET['camanProxyUrl']));
		$urlinfo = parse_url($url, PHP_URL_PATH);
		$ext = array_reverse(explode(".", $urlinfo));
		$ctype = null;
		switch ($ext[0]) {
		case 'gif': $ctype = 'image/gif'; break;
		case 'png': $ctype = 'image/png'; $im = imagecreatefrompng($url); break;
		case 'jpeg':$ctype = 'image/png'; $im = imagecreatefromjpeg($url); break;
		case 'jpg': $ctype = 'image/png'; $im = imagecreatefromjpeg($url); break;
		default:
		  if (ALLOW_NO_EXT) {
		    $ctype = 'application/octet-stream';
		  } else {
		    exit;
		  }
		}	
		//$im = imagecreatefromjpeg($url);
	    $width=imagesx($im);
	    $height=imagesy($im);
	    $new_image = imagecreatetruecolor($width, $height);
	    imagecopyresampled($new_image, $im, 0, 0, 0, 0, $width, $height, imagesx($im), imagesy($im));

	    ob_start();
 		imagepng($new_image);
	    //print '<img src="data:'.$ctype.';base64,'.$base64.'" />';
	    //print '<img src="data:'.$ctype.';base64,'.base64_encode(ob_get_clean()).'" />';
	    print "data:$ctype;base64,".base64_encode(ob_get_clean());
	}



	function index2(){
		if (!$_GET['camanProxyUrl']) {
		  exit;
		}

		$url = trim(urldecode($_GET['camanProxyUrl']));

		$urlinfo = parse_url($url, PHP_URL_PATH);
		$ext = array_reverse(explode(".", $urlinfo));

		$ctype = null;
		switch ($ext[0]) {
		case 'gif': $ctype = 'image/gif'; break;
		case 'png': $ctype = 'image/png'; break;
		case 'jpeg':
		case 'jpg': $ctype = 'image/jpg'; break;
		default:
		  if (ALLOW_NO_EXT) {
		    $ctype = 'application/octet-stream';
		  } else {
		    exit;
		  }
		}

		//require_once("../lib/helpers/image.php");
		$url = Image::thumb($url, true);

		header("Content-Type: $ctype");
		readfile($url);
	}
}