<?php
include_once "../config/database.php";
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

try {
	$user = $_POST['user'];

    $conn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare("SELECT `id` FROM `users` WHERE username=?;");
    $sql->execute([$user]);
	echo json_encode(($sql->rowCount() > 0));
} catch (PDOException $e) {
        error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
        echo json_encode(false);
    }
$conn = null;