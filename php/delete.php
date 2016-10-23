<?php
include_once "../config/database.php";
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST['id']) {
	try {
		$imgid = $_POST['id'];
		$userid = $_SESSION['logged_on_user']['id'];

		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("DELETE FROM images WHERE id = :img AND userid = :id LIMIT 1;");
		$sql->execute([':id' => $userid, ':img' => $imgid]);

		echo json_encode(true);
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