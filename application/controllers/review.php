<?php
class review extends CI_Controller {

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
	public function index($folder,$file1,$file2,$file3)
	{
		$this->load->helper('url');
		$sfile1 = str_replace($folder, "/", $file1);
		$sfile2 = str_replace($folder, "/", $file2);
		$sfile3 = str_replace($folder, "/", $file3);

		$data['file1'] = base_url().'assets/renders/'.$sfile1.".png";
		$data['file2'] = base_url().'assets/renders/'.$sfile2.".png";
		$data['file3'] = base_url().'assets/renders/'.$sfile3.".png";
		//echo '<img src="'.$data['file1'].'" />';
		//echo '<img src="'.$data['file2'].'" />';
		//echo '<img src="'.$data['file3'].'" />';
		$this->load->view('review',$data);
	}
}
?>