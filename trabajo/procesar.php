<?php
require_once 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$action = isset($_POST['action']) ? $_POST['action'] : '';

switch ($action) {
    case 'guardar':
        guardarRegistro($conn);
        break;
        
    case 'listar':
        listarRegistros($conn);
        break;
        
    case 'editar':
        editarRegistro($conn);
        break;
        
    case 'eliminar':
        eliminarRegistro($conn);
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        break;
}

$conn->close();

function guardarRegistro($conn) {
    $nombre = $conn->real_escape_string(trim($_POST['nombre']));
    $apellido = $conn->real_escape_string(trim($_POST['apellido']));
    $telefono = $conn->real_escape_string(trim($_POST['telefono']));
    $curso = $conn->real_escape_string(trim($_POST['curso']));
    
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($curso)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
        return;
    }
    
    if (!preg_match('/^\d+$/', $telefono)) {
        echo json_encode(['success' => false, 'message' => 'El teléfono debe contener solo números']);
        return;
    }
    
    $sql = "INSERT INTO registros (nombre, apellido, telefono, curso) 
            VALUES ('$nombre', '$apellido', '$telefono', '$curso')";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Registro guardado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $conn->error]);
    }
}

function listarRegistros($conn) {
    $sql = "SELECT * FROM registros ORDER BY id DESC";
    $result = $conn->query($sql);
    $registros = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $registros[] = $row;
        }
    }
    
    echo json_encode(['success' => true, 'data' => $registros]);
}

function editarRegistro($conn) {
    $id = intval($_POST['id']);
    $nombre = $conn->real_escape_string(trim($_POST['nombre']));
    $apellido = $conn->real_escape_string(trim($_POST['apellido']));
    $telefono = $conn->real_escape_string(trim($_POST['telefono']));
    $curso = $conn->real_escape_string(trim($_POST['curso']));
    
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($curso)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
        return;
    }
    
    if (!preg_match('/^\d+$/', $telefono)) {
        echo json_encode(['success' => false, 'message' => 'El teléfono debe contener solo números']);
        return;
    }
    
    $sql = "UPDATE registros SET 
            nombre='$nombre', 
            apellido='$apellido', 
            telefono='$telefono', 
            curso='$curso' 
            WHERE id=$id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Registro actualizado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $conn->error]);
    }
}

function eliminarRegistro($conn) {
    $id = intval($_POST['id']);
    
    $sql = "DELETE FROM registros WHERE id=$id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Registro eliminado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar: ' . $conn->error]);
    }
}
?>