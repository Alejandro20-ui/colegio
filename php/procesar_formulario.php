<?php
require_once '../backend/conexion.php';
// Ya tienes la conexión en $conn, la línea $conn = $conn; es innecesaria.


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Eliminar real_escape_string, ya que se usa prepare/bind_param
    $nombres = isset($_POST['nombres']) ? $_POST['nombres'] : '';
    $apellidos = isset($_POST['apellidos']) ? $_POST['apellidos'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
    $tema = isset($_POST['tema']) ? $_POST['tema'] : 'Solicitud de Visita Guiada'; 
    $consulta = isset($_POST['consulta']) ? $_POST['consulta'] : '';

    // 5. Validar campos requeridos
    if (empty($nombres) || empty($apellidos) || empty($email)) {
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "Por favor, complete todos los campos obligatorios."]);
        // Usar $conn.close() al final
        $conn->close(); 
        exit();
    }
    
    // 6. Preparar la consulta SQL
    $sql = "INSERT INTO solicitudes_visita (nombres, apellidos, email, telefono, tema, consulta) VALUES (?, ?, ?, ?, ?, ?)";
    
    // 2. Usar $conn en lugar de $conexion
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        http_response_code(500);
        // Usar $conn.error
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    // 7. Vincular los parámetros ('s' = string)
    $stmt->bind_param("ssssss", $nombres, $apellidos, $email, $telefono, $tema, $consulta);
    
    // 8. Ejecutar la consulta
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "¡Su solicitud ha sido enviada con éxito! Nos pondremos en contacto pronto."]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["success" => false, "message" => "Error al guardar la solicitud: " . $stmt->error]);
    }
    
    // 9. Cerrar la declaración y la conexión
    $stmt->close();
    // Usar $conn.close()
    $conn->close(); 

} else {
    // Si no es un método POST, rechazar la solicitud
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

?>