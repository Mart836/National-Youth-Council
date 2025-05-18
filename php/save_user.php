<?php
require 'db.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

$firebase_uid = $data->firebase_uid;
$name = $data->name;
$email = $data->email;

// Check if already exists (avoid duplicate entry)
$stmt = $conn->prepare("SELECT id FROM users WHERE firebase_uid = ?");
$stmt->bind_param("s", $firebase_uid);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    // Insert user if not exists
    $stmt = $conn->prepare("INSERT INTO users (firebase_uid, name, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $firebase_uid, $name, $email);
    $stmt->execute();
}

echo json_encode(["status" => "ok"]);
