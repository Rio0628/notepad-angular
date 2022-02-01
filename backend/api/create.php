<?php 
    require('database.php');

    // Get posted data
    $postdata = file_get_contents('php://input');

    if (isset($postdata) && !empty($postdata)) {
      
        // Get data
        $request = json_encode($postdata);

        // Validate
        if ($request->name === '' || $request->note_body === '') {
            return http_response_code(400);
        }

        // Sanitize
        $name = mysqli_real_escape_string($con, $request->name);
        $note_body = mysqli_real_escape_string($con, $request->note_body);

        // Create 
        $sql = "INSERT INTO `note`(`id`, `name`, `note_body`) VALUES (null, '{$name}', '{$note_body}')";

        if (mysqli_query($con, $sql)) {
            http_response_code(201);
            $note = [
                'name' => $name,
                'note_body' => $note_body,
                'id'     => mysqli_insert_id($con)
            ];
            echo json_encode($notel);
        }
        else { http_response_code(422); }
    }
?>