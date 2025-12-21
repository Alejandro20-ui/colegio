<?php
require_once '../backend/conexion.php';
$conn = $conn;

$orden = $_GET['orden'] ?? 'nuevo';
$order_sql = ($orden === 'antiguo') ? 'ASC' : 'DESC';

$sql = "SELECT nombre, mensaje, fecha_creacion FROM comentarios 
        ORDER BY fecha_creacion " . $order_sql;

$resultado = $conn->query($sql);

$comentarios_array = [];
if ($resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        // Formatear la fecha para que se vea bonita en el HTML
        $row['fecha_formato'] = date("d/m/Y H:i", strtotime($row['fecha_creacion']));
        // Si no hay nombre, usar "Anónimo"
        $row['nombre'] = empty($row['nombre']) ? 'Anónimo' : htmlspecialchars($row['nombre']);
        $comentarios_array[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($comentarios_array);

$conn->close();
?>