<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
<?php 
foreach($css_files as $file): ?>
	<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>
<?php foreach($js_files as $file): ?>
	<script src="<?php echo $file; ?>"></script>
<?php endforeach; ?>
<style type='text/css'>
body
{
	font-family: Arial;
	font-size: 14px;
}
a {
    color: blue;
    text-decoration: none;
    font-size: 14px;
}
a:hover
{
	text-decoration: underline;
}
#geterr{
	margin-top: 10px;
}
#geterr p{
	padding: 2;
	margin: 0;
	font-family: arial;
	font-size: 12px;
	color: #B50000;
}
</style>
</head>
<body>
	<div id="geterr"></div>
    <div>
		<?php echo $output; ?>
    </div>
    
</body>
</html>
