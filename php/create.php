<?php

session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

//if ($_POST['first'] && $_POST['last'] && $_POST['user'] && $_POST['passwd'] && $_POST['email']) {
    try {
        $server = 'localhost';
        $dbname = 'camagru';

        /*$first = $_POST['first'];
        $last = $_POST['last'];
        $user = '?'.$_POST['user'];
        $email = $_POST['email'];
        $passwd = hash('whirlpool', $_POST['passwd']); */
		$first = "Angus";
		$last = "Dippenaar";
		$user = "SN9NV";
		$email = "yoloswaggins@mailinator.com";
		$passwd = hash('whirlpool', "asdf");

		$key = pack('H*', 'B2929BFB7E57F934D7D0E2CA994884B4E4EF1C27AC742D52A73699309D16698F');
        $iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC), MCRYPT_RAND);
        $cyphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $user, MCRYPT_MODE_CBC, $iv);
        $cyphertext = $iv.$cyphertext;
        $cyphertext_base64 = urlencode(base64_encode($cyphertext));

        $message = '<html><head><title>Confirm your email address</title></head><body><h4>Please click the link below to verify your account on Camagru</h4><br /><a href="http://localhost/#/confirm/'.$cyphertext_base64.'">Confirm email address</a></body></html>';
		$headers = 'MIME-Version: 1.0'."\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		$headers .= 'To: '.$first.' '.$last.' <'.$email.'>'."\r\n";

		if (mail($email, 'Confirm your Camagru password', $message, $headers)) {
			$conn = new PDO("mysql:host=$server;dbname=$dbname", 'root', 'sparewheel');
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $sql = $conn->prepare('INSERT INTO `users` (`firstname`, `lastname`, `username`, `password`, `email`) VALUES (?, ?, ?, ?, ?);');
	        $sql->execute([$first, $last, "?".$user, $passwd, $email]);
			echo json_encode(true);
		} else {
			echo json_encode(false);
		}
    } catch (Exception $e) {
		var_dump($e->getMessage());
        error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
        echo json_encode(false);
    }
    $conn = null;
//} else {
//    echo json_encode(false);
//}
