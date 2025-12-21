<?php
require_once __DIR__ . '/config_db.php'; 

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    error_log("Fallo la conexión a MySQL: " . $conn->connect_error);
    
    header('Content-Type: application/json');
    http_response_code(500); 
    echo json_encode(['error' => 'Error de conexión a la base de datos.']);
    exit(); 
}
$conn->set_charset("utf8mb4");

?>