<?php

$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$userQuestion = $_POST['userQuestion'];

// Load Composer's autoloader
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'aswebart@gmail.com';                     // SMTP username
    $mail->Password   = 'khyPohPX';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;    
    $mail->CharSet = "utf-8";                                // TCP port to connect to

    //Recipients
    $mail->setFrom('aswebart@gmail.com', 'Андрей');
    $mail->addAddress('fakt37@gmail.com', 'Андрей');     // Add a recipient
  

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    if (!empty($userEmail))
        $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";
    elseif (empty($userQuestion)) 
        $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}.";
    else 
        $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его вопрос: ${userQuestion}";
    
    

    $mail->send();
    echo "Заявка успешно отправлена";
} catch (Exception $e) {
    echo "Письмо не отправленно, есть ошибка. Код ошибкт: {$mail->ErrorInfo}";
}