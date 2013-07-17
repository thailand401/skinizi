<?php
class Content extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function devices(){
		echo '{"a":"1","b":2}';
	}

	function grids(){
		echo '{"a":3,"b":4}';
	}
}
?>