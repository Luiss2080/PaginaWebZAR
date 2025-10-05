<?php
// Variables para la página actual
$current_page = 'wishlist';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <span class="breadcrumb-item active">Lista de Deseos</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Wishlist Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <h1 class="section-title position-relative text-uppercase mb-4">
                <span class="bg-secondary pr-3">Mi Lista de Deseos</span>
            </h1>
            
            <?php if (!empty($products)): ?>
            <div class="row">
                <?php foreach ($products as $product): ?>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="<?= BASE_URL ?>public/img/<?= $product['image'] ?? 'product-1.jpg' ?>" alt="<?= $product['name'] ?>">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>cart/add/<?= $product['id'] ?>"><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-danger btn-square" href="<?= BASE_URL ?>user/remove/<?= $product['id'] ?>"><i class="fa fa-times"></i></a>
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/compare/<?= $product['id'] ?>"><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/<?= $product['id'] ?>"><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="<?= BASE_URL ?>products/<?= $product['id'] ?>"><?= $product['name'] ?></a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>$<?= number_format((float)$product['price'], 2) ?></h5>
                                <?php if (isset($product['old_price']) && $product['old_price'] > $product['price']): ?>
                                <h6 class="text-muted ml-2"><del>$<?= number_format((float)$product['old_price'], 2) ?></del></h6>
                                <?php endif; ?>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                                <?php 
                                $rating = $product['rating'] ?? 4;
                                for ($i = 1; $i <= 5; $i++): 
                                    if ($i <= $rating): ?>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                    <?php elseif ($i - 0.5 <= $rating): ?>
                                        <small class="fa fa-star-half-alt text-primary mr-1"></small>
                                    <?php else: ?>
                                        <small class="far fa-star text-primary mr-1"></small>
                                    <?php endif;
                                endfor; ?>
                                <small>(<?= $product['reviews'] ?? 99 ?>)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php else: ?>
            <div class="text-center py-5">
                <i class="fa fa-heart fa-5x text-muted mb-3"></i>
                <h4>Tu lista de deseos está vacía</h4>
                <p class="text-muted">¡Agrega algunos productos increíbles a tu lista de deseos!</p>
                <a href="<?= BASE_URL ?>products" class="btn btn-primary">Ir a la Tienda</a>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>
<!-- Wishlist End -->