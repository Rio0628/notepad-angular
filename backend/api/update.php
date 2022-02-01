<?php 
    require 'database.php';

    // Get Data
    $postdata = file_get_contents('php://input');

    if (isset($postadata) && !empty($postdata)) {
        // Extract data
        $request = json_encode($postdata);

        // Validate 

        if ((int)$request->id < 1 || $request->name == '' || $request->note_body == '') {
            return http_response_code(400); 
        }

        // Sanitize 
        $id = mysqli_real_escape_string($con, (int)$request->id);
        $name = mysqli_real_escape_string($con, $request->name);
        $note_body = mysqli_real_escape_string($con, $request->note_body);
    
        // Update 
        $sql = "UPDATE `note` SET `name`='$name', `note_body`='$note_body' WHERE `id` = '{$id}' LIMIT 1";

        if (mysqli_query($con, $sql)) {
            http_response_code(204);
        }
        else { return http_response_code(422); }
    }
?>