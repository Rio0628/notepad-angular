<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: PUT, GET, DELETE, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charser=UTF-8");

    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', 'Martiofto700.');
    define('DB_NAME', 'Notes');

    function connect() {
        $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if (msqli_connect_errno($connect)) {
            die("Failed to connect:" . mysqli_connect_error());
        }

        mysqli_set_charset($connect, "utf8");
    
        return $connect;
    }

    $con = connect();

    echo 'mario';
    echo connect();
?>