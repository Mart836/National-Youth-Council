<?php
require 'db.php';

switch ($_SERVER['REQUEST_METHOD']) {

    // GET all customers
    case 'GET':
        $result = $conn->query("SELECT * FROM customers ORDER BY id DESC");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

    // CREATE a new customer
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $conn->prepare("INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $data->name, $data->email, $data->phone, $data->address);
        $stmt->execute();
        echo json_encode(["status" => "success", "id" => $stmt->insert_id]);
        break;

    // UPDATE an existing customer
    case 'PUT':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $id = $params['id'] ?? null;

        if ($id) {
            $data = json_decode(file_get_contents("php://input"));
            $stmt = $conn->prepare("UPDATE customers SET name=?, email=?, phone=?, address=? WHERE id=?");
            $stmt->bind_param("ssssi", $data->name, $data->email, $data->phone, $data->address, $id);
            $stmt->execute();
            echo json_encode(["status" => "updated"]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Missing customer ID for update"]);
        }
        break;

    // DELETE a customer
    case 'DELETE':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $id = $params['id'] ?? null;

        if ($id) {
            $stmt = $conn->prepare("DELETE FROM customers WHERE id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["status" => "deleted"]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Missing customer ID for delete"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed"]);
        break;
}
?>
