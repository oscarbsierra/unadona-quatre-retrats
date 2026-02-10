<?php
// TODO: Configure these values on your hosting
$to = "oscar@audivio.pro"; // destination email
$subject = "Nova reserva - Una dona, quatre retrats";

$nom = $_POST['nom'] ?? '';
$email = $_POST['email'] ?? '';
$telefon = $_POST['telefon'] ?? '';
$experiencia = $_POST['experiencia'] ?? '';
$franja = $_POST['franja'] ?? '';
$data = $_POST['data'] ?? '';
$persones = $_POST['persones'] ?? '';
$missatge = $_POST['missatge'] ?? '';

$body = "Nova sol·licitud de reserva\n\n" .
        "Nom: $nom\n" .
        "Email: $email\n" .
        "Telèfon: $telefon\n" .
        "Experiència: $experiencia\n" .
        "Franja: $franja\n" .
        "Data: $data\n" .
        "Persones: $persones\n\n" .
        "Missatge:\n$missatge\n";

$headers = "From: $email\r\n" .
           "Reply-To: $email\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    header("Location: gracies.html");
    exit;
}

http_response_code(500);

echo "No s'ha pogut enviar el correu. Torna-ho a provar més tard.";
?>
