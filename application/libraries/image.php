<?php

require_once("file_store.php");
require_once("keygen.php");

class Image {
    
    public static function thumb($url, $remote=true, $size=600, $quality=90) {
        try{    
            
            $image_id = Keygen::unique();
            
            $old_filename = "/tmp/{$image_id}";
            
            // downlooad file first
            $contents = file_get_contents($url);
            file_put_contents($old_filename, $contents);
            
            $new_filename = "/tmp/{$image_id}.new";            
            
			// do image manipulation
			$canvas = new Imagick($old_filename);
	 		$canvas->cropThumbnailImage($size, $size);
	 		$canvas->setImageCompression(Imagick::COMPRESSION_JPEG); 
            $canvas->setImageCompressionQuality($quality); // setting quality to 50
	 		$canvas->setImageFormat('JPG');
	 		$canvas->setFormat("JPG");
	 		$canvas->writeImage($new_filename);
			$canvas->clear();
			$canvas->destroy();
						
			if ($remote) {
			
    			// upload to s3
    			$bucket = "atthackathon";
    			$remote_uri = "thumbs/{$image_id}.jpg";
    			$filestore = new FileStore();
    			$filestore->upload($bucket, $remote_uri, $new_filename);
    			$url = $filestore->url($bucket, $remote_uri);
    			
    			unlink($old_filename);
    			unlink($new_filename);
    			
    			return $url;
			} else {
                unlink($old_filename);
                return $new_filename;
			}
			
		} catch(Exception $e){
			error_log('Error: '.$e->getMessage());
			
			return false;
		}
    }
}   