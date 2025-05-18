<?php
require 'db.php';

$result = $conn->query("SELECT * FROM users ORDER BY id DESC");

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch users"]);
    exit;
}

$users = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($users);
?>
