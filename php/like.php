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
		$sql = $conn->prepare("SELECT id FROM likes WHERE imgid = :img AND userid = :id;");
		$sql->execute([':id' => $userid, ':img' => $imgid]);
		if ($sql->rowCount() > 0) {
			echo json_encode(false);
		} else {
			$sql = $conn->prepare("INSERT INTO likes (userid, imgid) VALUES (:id, :img);");
			$sql->execute([':id' => $userid, ':img' => $imgid]);
			echo json_encode(($sql->rowCount() > 0));
		}
	}
	catch(PDOException $e) {
		error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
		echo json_encode(false);
	}
	$conn = null;
} else {
	echo json_encode(false);
}
?>