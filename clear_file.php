<?php
$filePath = 'events.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!file_exists($filePath)) {
        file_put_contents($filePath, json_encode([]));
    }
    file_put_contents($filePath, json_encode([]));
    echo json_encode(['status' => 'success', 'message' => 'JSON file has been cleared.']);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
