<?php
class designer_model extends CI_Model{
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }
	
	//public function createOrder($deviceid,$name,$uniqueid,$previewurl,$generatedfolder,$generatedurl,$price,$designdata){
	public function createOrder($data){
		$sql = 'INSERT INTO coverorder (`id`, `createddate`, `deviceid`, `name`, 
				`uniqueid`, `previewurl`, `generatedfolder`, `generatedurl`,`price`,`designdata`,`wallpapers`) 
				VALUES (NULL,now(), ?, ?, ?, ?, ?, ?,?,?,?)';
		$query = $this->db->query($sql, array(
			$data['deviceId'], 
			$data['designName'],
			$data['uniqueid'],
			$data['previewurl'],
			$data['folder'],
			$data['generatedurl'],
			$data['price'],
			json_encode($data['canvas']),
			$data['wallpapers']));
		if($this->db->affected_rows() > 0)
	        return $this->db->insert_id();
	    else 
	        return FALSE;
	}
	public function getorder($id){
		$sql = "select c.*,d.name as devicename from coverorder as c,device as d where c.id = ? and c.deviceid = d.id";
		$dt = $this->db->query($sql,array($id));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getlanguages($countryid){
		$sql ="select * from language where idcountry = ?";
	    $dt = $this->db->query($sql,array($countryid));

	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getguilanguages($countryid){
		$sql ="select * from language where idcountry = ? and guitext = true";
	    $dt = $this->db->query($sql,array($countryid));

	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}

	public function getdevice($id){
		$sql = "select * from device where id = ?";
		$dt = $this->db->query($sql,array($id));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getsubcategory($id){
		$sql = "select * from sub_category where id = ?";
		$dt = $this->db->query($sql,array($id));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getcategory($id){
		$sql = "select * from category where id = ?";
		$dt = $this->db->query($sql,array($id));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
		
	public function getdevices($subcategoryid){
		$sql = "select * from device where sub_categoryid = ?";
		$dt = $this->db->query($sql,array($subcategoryid));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getsubcategories($categoryid){
		$sql = "select * from sub_category where categoryid = ?";
		$dt = $this->db->query($sql,array($categoryid));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getcategories(){
		$sql = "select * from category";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getcanvas($deviceid){
		//$sql = "select * from canvas where id in (select canvasid from device_canvas where deviceid = ? order by priority)";
		//$sql = "select c.id,c.name,c.thumbnail,c.textid,c.minwidth,c.minlength,c.sizewidth,c.sizelength,c.layer,c.layerboundary,c.printboundary,c.printboundaryvisible,c.wallpaper,c.wallpaperboundary,c.wallpaperboundaryscaledwidth,d.priority from canvas c INNER JOIN (select canvasid,priority from device_canvas where deviceid = ?) d ON c.id = d.canvasid order by priority";
		$sql = "select c.*,d.priority from canvas c INNER JOIN (select canvasid,priority from device_canvas where deviceid = ?) d ON c.id = d.canvasid order by priority";
		$dt = $this->db->query($sql,array($deviceid));
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
//--------------------------------------Get all database------------------------------------
	public function getalldevices(){
		$sql = "select * from device";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getallsubcategories(){
		$sql = "select * from sub_category";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getallcategories(){
		$sql = "select * from category";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getallcanvas(){
		$sql = "select * from canvas";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getalldevcan(){
		$sql = "select * from device_canvas";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getaclips(){
		$sql = "select id,thumbnail,name from gallery where type='clip'";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
	public function getallclip(){
		$sql = "select * from gallery where type='clip'";
		$dt = $this->db->query($sql);
	    if($dt->num_rows() > 0)
	        return $dt->result_array();
	    else 
	        return FALSE;
	}
}
?>