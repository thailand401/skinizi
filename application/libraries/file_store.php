<?php

require_once('vendor/s3.php');

class FileStore {
			
	public static $default_bucket = "atthackathon";
	public static $key = "AKIAIIGR7BM7SDLQY4LA";
	public static $secret = "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";		
			
	public function __construct() {
		$this->s3 = new S3(self::$key, self::$secret);
		$this->baseURL = "https://s3.amazonaws.com";
	}
	
	public function upload($bucket, $path, $physical_file, $permissions = 'public-read', $meta_headers=array(), $request_headers=array()) {
		$r = $this->s3->putObjectFile($physical_file, $bucket, $path, $permissions, $meta_headers, $request_headers);
		return ($r) ? $this->url($path, $bucket) : false;
	}
	
	public function url($bucket, $path) {
		return "{$this->baseURL}/{$bucket}/{$path}";
	}	
}