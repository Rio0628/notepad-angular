<?php 
    // Method to return all Notes

    require 'database.php';

    $notes = [];
    $sql = "SELECT id, name, note_body FROM note";

    if ($result = mysqli_query($con, $sql)) {
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $notes[$i]['id'] = $row['id'];
            $notes[$i]['name'] = $row['name'];
            $notes[$i]['note_body'] = $row['note_body'];
            $i++;
        }

        echo json_encode($notes);
    }
    else { http_response_code(404); }
?>
