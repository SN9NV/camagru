<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
try {
    $server = 'localhost';
    $dbname = 'camagru';
	if ($_SESSION['logged_on_user']) {
		$user = $_SESSION['logged_on_user']['id'];
	} else {
		$user = 0;
	}

    $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare(
		"SELECT images.id AS 'id', users.username AS 'username', users.profilepic AS userpic, images.title AS 'title', unix_timestamp(images.date) AS 'date', (CASE WHEN images.userid=$user THEN 1 ELSE 0 END) AS 'creator'
		FROM images
		INNER JOIN users
		ON images.userid=users.id
		ORDER BY `date` DESC
		LIMIT 50;");
    $sql->execute();
    $images = $sql->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($images, JSON_NUMERIC_CHECK);
} catch (PDOException $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
    echo json_encode('Database error');
}

$conn = null;
?>