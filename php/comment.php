<?php
include_once "../config/database.php";
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST['imgid']) {
	try {
		$imgid = $_POST['imgid'];
		$comment = $_POST['comment'];
		$userid = $_SESSION['logged_on_user']['id'];

		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("INSERT INTO comments (userid, imgid, comment) VALUES (?, ?, ?);");
		$sql->execute([$userid, $imgid, $comment]);

		echo json_encode(true);
	}
	catch(PDOException $e) {
		error_log($e, 3, dirname(__DIR__)."/log/errors.log");
		echo json_encode(false);
	}
	$conn = null;
} else {
	echo json_encode(false);
}
?>