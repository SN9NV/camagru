<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

try {
    $server = 'localhost';
    $dbname = 'camagru';
	$user = $_POST['user'];

    $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare("SELECT `id` FROM `users` WHERE username='$user';");
    $sql->execute();
	echo json_encode(($sql->rowCount() > 0));
} catch (PDOException $e) {
        error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
        echo json_encode(false);
    }
$conn = null;