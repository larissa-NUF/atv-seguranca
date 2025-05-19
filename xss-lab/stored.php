<?php
if (isset($_POST['comentario'])) {

    file_put_contents("comentarios.txt", $_POST['comentario'] . PHP_EOL, FILE_APPEND);
}
$comentarios = file("comentarios.txt");
?>
<form method="POST">
    Comentário: <input name="comentario">
    <button>Enviar</button>
</form>
<div>
    <?php
    foreach ($comentarios as $c) {
        // Vulnerável
        //echo "<p>$c</p>"; 
        echo "<p>" . htmlspecialchars($c, ENT_QUOTES, 'UTF-8') . "</p>";

    }
    ?>
</div>