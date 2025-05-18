<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"));
$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $data->name, $data->email, $data->message);
$stmt->execute();
echo json_encode(["status" => "message saved"]);
?>
