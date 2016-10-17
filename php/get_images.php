<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
try {
    $server = 'localhost';
    $dbname = 'camagru';

    $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare("SELECT `id`, `userid`, `title`, `path`, unix_timestamp(date) AS 'date' FROM `images` ORDER BY `date` ASC LIMIT 50;");
    $sql->execute();
    $images = $sql->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($images);
} catch (PDOException $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
    echo json_encode('Database error');
}

$conn = null;
?>