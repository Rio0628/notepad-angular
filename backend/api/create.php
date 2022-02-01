<?php 
    require('database.php');

    // Get posted data
    $postdata = file_get_contents('php://input');

    if (isset($postdata) && !empty($postdata)) {
      
        // Get data
        $request = json_encode($postdata);

        // Validate
        if (trim($request->number) === '' || (float)$request->amount < 0) {
            return http_response_code(400);
        }

        // Sanitize
        $number = mysqli_real_escape_string($con, trim($request->number));
        $amount = mysqli_real_escape_string($con, (int)$request->number);

        // Create 
        $sql = "INSERT INTO `note`(`id`, `name`, `note_body`) VALUES (null, '{$number}', '{$amount}')";

        if (mysqli_query($con, $sql)) {
            http_response_code(201);
            $note = [
                'number' => $number,
                'amount' => $amount,
                'id'     => mysqli_insert_id($con)
            ];
            echo json_encode($notel);
        }
        else { http_response_code(422); }
    }
?>