<?php

session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

try {
    $server = 'localhost';
    $dbname = 'camagru';

    $value = $_POST['value'];

	$conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql = $conn->prepare('SELECT id, firstname, lastname, email FROM users WHERE email = :value OR username = :value;');
	$sql->execute([':value' => $value]);
	if ($sql->rowCount() === 1) {
		$user = $sql->fetch(PDO::FETCH_ASSOC);
	} else {
		die(json_encode(false));
	}

    $key = pack('H*', 'A6A66F59E0D8127B2A45B648CA8C58ED3454DDF4C42085A8A556E777111D2F27');
    $iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC), MCRYPT_RAND);
    $cyphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $user['id'], MCRYPT_MODE_CBC, $iv);
    $cyphertext = $iv.$cyphertext;
    $cyphertext_base64 = urlencode(base64_encode($cyphertext));

    $message = '<html><head><title>Confirm your email address</title></head><body><h4>Please click the link below to reset your password on Camagru</h4><br /><a href="http://localhost/#/reset/'.$cyphertext_base64.'">Reset password</a></body></html>';
    $headers = 'MIME-Version: 1.0'."\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
    $headers .= 'To: '.$user['firstname'].' '.$user['lastname'].' <'.$user['email'].'>'."\r\n";

    if (mail($user['email'], 'Camagru password reset', $message, $headers)) {
		echo json_encode(true);
	} else {
		echo json_encode(false);
	}
} catch (Exception $e) {
    error_log($e, 3, '/home/angus/Documents/wtc/camagru/log/errors.log');
    echo json_encode(false);
}
$conn = null;