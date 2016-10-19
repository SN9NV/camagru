<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
try {
    $server = 'localhost';
    $dbname = 'camagru';
	$uesr = 0;
	$offset = 0;
	if ($_SESSION['logged_on_user']) {
		$user = $_SESSION['logged_on_user']['id'];
	}
	if ($_POST['offset']) {
		$offset = intval($_POST['offset']);
	}

    $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $conn->prepare(
		"SELECT
			images.id AS 'id',
			users.username AS 'username',
			users.profilepic AS userpic,
			images.title AS 'title',
			unix_timestamp(images.date) AS 'date',
			(CASE WHEN images.userid = :userid THEN 1 ELSE 0 END) AS 'creator',
			(CASE WHEN likes.userid = :userid THEN 1 ELSE 0 END) AS 'liked',
			COUNT(comments.userid) AS 'comments',
			COUNT(likes.userid) AS 'likes'
		FROM images
			LEFT JOIN users
				ON images.userid = users.id
			LEFT JOIN comments
				ON comments.imgid = images.id
			LEFT JOIN likes
				ON likes.imgid = images.id AND likes.userid = images.userid
		GROUP BY
			images.id
		ORDER BY `date` DESC
		LIMIT 50
		OFFSET :offsetval;");
	$sql->bindValue(':offsetval', $offset, PDO::PARAM_INT);
	$sql->bindValue(':userid', $userid, PDO::PARAM_INT);
    $sql->execute();
    $images = $sql->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($images, JSON_NUMERIC_CHECK);
} catch (PDOException $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
    echo json_encode('Database error');
}

$conn = null;
?>