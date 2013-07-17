<?php
class Instagram extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$content = $this->Curljson("https://api.instagram.com/oauth/access_token/", $_GET["code"]);
        echo '<script>
                try {
                        window.opener.INS_albums('.$content.');
                    } 
                catch (err) {}
                window.close();
              </script>';
		//var_dump($content);
	}
	function Curljson($url, $code){
        $ch = curl_init($url);        
        curl_setopt ($ch, CURLOPT_POST, 1);        
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        
        curl_setopt($ch, CURLOPT_POSTFIELDS,
               array("client_id"=>"fdd6bcec0bf046bb8ef90beb5a703ddc",
                     "client_secret"=>"e70dacd496e54e23897b7ef5698fb9f3",
                     "grant_type"=>"authorization_code",
                     'redirect_uri'=>"http://local.beesightsoft.com/skinizi/index.php/instagram",
                     "code"=>$code
                     ));
        
        $content = curl_exec($ch);
        curl_close($ch);
        return $content;
    }
}
?>