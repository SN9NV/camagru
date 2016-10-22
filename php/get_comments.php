<?php

session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
try {
    $server = 'localhost';
    $dbname = 'camagru';
    $id = $_POST['id'];

    $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare(
        "SELECT
			users.username AS 'username',
			comments.comment AS 'comment'
		FROM comments
			LEFT JOIN users
				ON comments.userid = users.id
		WHERE
			comments.imgid = :imgid
		GROUP BY
			comments.id
		ORDER BY `date` ASC;");
    $sql->execute([':imgid' => $id]);
    $comments = $sql->fetchAll(PDO::FETCH_CLASS);
	$res = $conn->prepare(
		"SELECT title FROM images WHERE images.id = :imgid AND LENGTH(title) > 0;"
	);
	$res->execute([':imgid' => $id]);
	$title = $res->rowCount();
	file_put_contents("log.log", $title);
	$return = ['title' => $title, 'comments' => $comments];

    echo json_encode($return);
} catch (Exception $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
	echo json_encode(false);
}

$conn = null;