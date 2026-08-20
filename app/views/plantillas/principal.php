<?php 
// Archivo de layout principal que incluye header, contenido y footer
?>
<?php include_once APP_PATH . 'views/componentes/header.php'; ?>

<!-- Contenido principal -->
<main>
    <?= $content ?>
</main>

<?php include_once APP_PATH . 'views/componentes/footer.php'; ?>