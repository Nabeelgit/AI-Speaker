<?php
if(isset($_POST['message'])){
    require './api.php';
    $ch = curl_init();
    $url = 'https://api.openai.com/v1/chat/completions';
    $api_key = $key;
    $header  = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $api_key
    ];
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST['message']);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $result = curl_exec($ch);
    curl_close($ch);
    $response = json_decode($result);
    if(isset($response->choices)){
        echo $response->choices[0]->message->content;
    } else {
        echo 'err';
    }
}
?>