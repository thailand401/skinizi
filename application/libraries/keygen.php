<?php

class Keygen {
    public static function unique() {
		return sha1(gethostname().mt_rand(0, 100000).microtime());
	}
}