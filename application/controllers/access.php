<?php
class Access extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		var_dump($_GET);
        var_dump($_POST);
	}
	
}
?>