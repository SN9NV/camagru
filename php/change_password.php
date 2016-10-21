<?php

session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

if ($_POST['uri']) {
    try {
        $server = 'localhost';
        $dbname = 'camagru';

        $uri = $_POST['uri'];
		$passwd = hash('whirlpool', $_POST['passwd']);
		$ciphertext_dec = base64_decode($uri);
		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		$iv_dec = substr($ciphertext_dec, 0, $iv_size);
		$ciphertext_dec = substr($ciphertext_dec, $iv_size);
		$key = pack('H*', 'A6A66F59E0D8127B2A45B648CA8C58ED3454DDF4C42085A8A556E777111D2F27');
		$id = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
		$id = trim($id);

        $conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare('UPDATE users SET password = :passwd WHERE id = :id;');
        $sql->execute([':id' => $id, ':passwd' => $passwd]);

		if ($sql->rowCount() > 0) {
			$sql = $conn->prepare('SELECT id, firstname, lastname, email FROM users WHERE id = ?;');
			$sql->execute([$id]);
			if ($sql->rowCount() === 1) {
				$user = $sql->fetch(PDO::FETCH_ASSOC);
			} else {
				die(json_encode(false));
			}

			$message = '<html><head><title>Confirm your email address</title></head><body>This email is to notify you that your password has been changed. Here is your new password, just in case you forget it again: '.$passwd.'</body></html>';
		    $headers = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'To: '.$user['firstname'].' '.$user['lastname'].' <'.$user['email'].'>'."\r\n";

		    if (mail($user['email'], 'Camagru password is reset', $message, $headers)) {
				echo json_encode(true);
			} else {
				echo json_encode(false);
			}
		} else {
			echo json_encode(false);
		}
    } catch (PDOException $e) {
        error_log($e, 3, dirname(__DIR__).'/log/errors.log');
        echo json_encode(false);
    }
    $conn = null;
} else {
    echo json_encode(false);
}