<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
if ($_SESSION['logged_on_user']) {
	try {
	    $server = 'localhost';
	    $dbname = 'camagru';
	    $img = $_POST['img'];
	    $title = $_POST['title'];
	    $uid = $_SESSION['logged_on_user']['id'];
	    $overlay = imagecreatefrompng(dirname(__DIR__).'/img/'.$_POST['overlay'].'.png');
	    $img = str_replace('data:image/png;base64,', '', $img);
	    $img = str_replace(' ', '+', $img);
	    $data = base64_decode($img);
	    $dir = dirname(__DIR__).'/images';
		$uniqid = uniqid();
	    $file = $dir.'/'.$uniqid.'.png';
	    if (!is_dir($dir)) {
	        mkdir($dir, 0777);
	    }
	    $im = imagecreatefromstring($data);
	    imagealphablending($im, true);
	    imagesavealpha($im, true);
	    imagealphablending($overlay, true);
	    imagesavealpha($overlay, true);
	    imagecopy($im, $overlay, 0, 0, 0, 0, 480, 360);
	    $success = imagepng($im, $file);
	    imagedestroy($im);
	    imagedestroy($overlay);
	    if ($success) {
	        $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $sql = $conn->prepare("INSERT INTO `images` (`id`, `userid`, `title`) VALUES ('$uniqid', '$uid', '$title');");
	        $sql->execute();

	        echo json_encode(true);
	    } else {
	        echo json_encode(false);
	    }
	} catch (PDOException $e) {
	    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
	    echo json_encode('Database error');
	}

	$conn = null;
} else {
	echo json_encode(false);
}
?>