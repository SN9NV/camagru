<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST['imgid']) {
	try {
		$server = "localhost";
		$dbname = "camagru";

		$imgid = $_POST['imgid'];
		$userid = $_SESSION['logged_on_user']['id'];

		$conn = new PDO("mysql:host=$server;dbname=$dbname", "root", "sparewheel");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("INSERT INTO likes (userid, imgid) VALUES ('$userid', '$imgid');");
		$sql->execute();

		echo json_encode(true);
	}
	catch(PDOException $e) {
		error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
		echo json_encode($e);
	}
	$conn = null;
} else {
	echo json_encode(false);
}
?>