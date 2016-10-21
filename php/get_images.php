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
			(SELECT COUNT(id) FROM comments WHERE comments.imgid = images.id) AS 'comments',
			(SELECT COUNT(id) FROM likes WHERE likes.imgid = images.id) AS 'likes'
		FROM images
			LEFT JOIN users
				ON images.userid = users.id
			LEFT JOIN likes
				ON images.id = likes.imgid AND likes.userid = :userid
		GROUP BY
			images.id
		ORDER BY `date` DESC
		LIMIT 50
		OFFSET :offsetval;");

/*
SELECT
            images.id AS 'id',
            users.username AS 'username',
            users.profilepic AS userpic,
            images.title AS 'title',
            unix_timestamp(images.date) AS 'date',
            (CASE WHEN images.userid = 19 THEN 1 ELSE 0 END) AS 'creator',
            (CASE WHEN likes.userid = 19 THEN 1 ELSE 0 END) AS 'liked',
            (SELECT COUNT(id) FROM comments WHERE comments.imgid = images.id) AS 'comments',
            (SELECT COUNT(id) FROM likes WHERE likes.imgid = images.id) AS 'likes'
        FROM images
            LEFT JOIN users
                ON images.userid = users.id
            LEFT JOIN likes
                ON images.id = likes.imgid AND likes.userid = 19
        GROUP BY
            images.id
        ORDER BY `date` DESC
        LIMIT 50
        OFFSET 0;
*/    $sql->bindValue(':offsetval', $offset, PDO::PARAM_INT);
    $sql->bindValue(':userid', $user, PDO::PARAM_INT);
    $sql->execute();
    $images = $sql->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($images, JSON_NUMERIC_CHECK);
} catch (PDOException $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
    echo json_encode('Database error');
}

$conn = null;
