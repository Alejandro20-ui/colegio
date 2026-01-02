<?php
require_once '../backend/conexion.php';

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$nombre = $conn->real_escape_string(trim($_POST['nombre'] ?? ''));
$email = $conn->real_escape_string(trim($_POST['email'] ?? ''));
$mensaje = $conn->real_escape_string(trim($_POST['mensaje']));

$sql = "INSERT INTO comentarios (nombre, email, mensaje) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $email, $mensaje);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => '¡Comentario publicado con éxito!']); 
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el comentario: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>