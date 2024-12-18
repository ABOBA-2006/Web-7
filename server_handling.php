<?php
$filePath = 'events.json';

if (!file_exists($filePath)) {
    file_put_contents($filePath, json_encode([]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $event = json_decode($input, true);

    if (!isset($event['index'], $event['timestamp'], $event['description'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $events = json_decode(file_get_contents($filePath), true);
    $events[$event['index']] = [
        'timestamp' => $event['timestamp'],
        'description' => $event['description']
    ];
    file_put_contents($filePath, json_encode($events, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'event' => $events[$event['index']]]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['index'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Index is required']);
        exit;
    } 
    $index = $_GET['index'];

    $events = json_decode(file_get_contents($filePath), true);

    if (!isset($events[$index])) {
        http_response_code(404);
        echo json_encode(['error' => 'Event not found']);
        exit;
    }

    echo json_encode(['event' => $events[$index]]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>