<?php
class Testapi extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
	}
	
	
	function index()
	{
		$this->load->view('testapi');
	}
}
?>