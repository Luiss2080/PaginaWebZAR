<?php
// Variables para la página actual
$current_page = 'home';
?>

<!-- Carousel Start -->
<div class="container-fluid mb-3">
    <div class="row px-xl-5">
        <div class="col-lg-8">
            <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#header-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#header-carousel" data-slide-to="1"></li>
                    <li data-target="#header-carousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item position-relative active" style="height: 430px;">
                        <img class="position-absolute w-100 h-100" src="<?= BASE_URL ?>public/img/carousel-1.jpg" style="object-fit: cover;">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Moda Masculina</h1>
                                <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Descubre las últimas tendencias en moda masculina con los mejores precios</p>
                                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="<?= BASE_URL ?>products">Comprar Ahora</a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item position-relative" style="height: 430px;">
                        <img class="position-absolute w-100 h-100" src="<?= BASE_URL ?>public/img/carousel-2.jpg" style="object-fit: cover;">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Moda Femenina</h1>
                                <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Encuentra el estilo perfecto con nuestra colección de moda femenina</p>
                                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="<?= BASE_URL ?>products">Comprar Ahora</a>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item position-relative" style="height: 430px;">
                        <img class="position-absolute w-100 h-100" src="<?= BASE_URL ?>public/img/carousel-3.jpg" style="object-fit: cover;">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Moda Infantil</h1>
                                <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Ropa cómoda y divertida para los más pequeños de la casa</p>
                                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="<?= BASE_URL ?>products">Comprar Ahora</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="product-offer mb-30" style="height: 200px;">
                <img class="img-fluid" src="<?= BASE_URL ?>public/img/offer-1.jpg" alt="">
                <div class="offer-text">
                    <h6 class="text-white text-uppercase">Ahorra 20%</h6>
                    <h3 class="text-white mb-3">Oferta Especial</h3>
                    <a href="<?= BASE_URL ?>products" class="btn btn-primary">Comprar Ahora</a>
                </div>
            </div>
            <div class="product-offer mb-30" style="height: 200px;">
                <img class="img-fluid" src="<?= BASE_URL ?>public/img/offer-2.jpg" alt="">
                <div class="offer-text">
                    <h6 class="text-white text-uppercase">Ahorra 20%</h6>
                    <h3 class="text-white mb-3">Oferta Especial</h3>
                    <a href="<?= BASE_URL ?>products" class="btn btn-primary">Comprar Ahora</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Carousel End -->

<!-- Featured Start -->
<div class="container-fluid pt-5">
    <div class="row px-xl-5 pb-3">
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                <h5 class="font-weight-semi-bold m-0">Productos de Calidad</h5>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                <h5 class="font-weight-semi-bold m-0">Envío Gratis</h5>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                <h5 class="font-weight-semi-bold m-0">Devolución 14 Días</h5>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                <h5 class="font-weight-semi-bold m-0">Soporte 24/7</h5>
            </div>
        </div>
    </div>
</div>
<!-- Featured End -->

<!-- Categories Start -->
<div class="container-fluid pt-5">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Categorías</span></h2>
    <div class="row px-xl-5 pb-3">
        <?php foreach ($categories as $category): ?>
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a class="text-decoration-none" href="<?= BASE_URL ?>categories/<?= $category['id'] ?>">
                <div class="cat-item d-flex align-items-center mb-4">
                    <div class="overflow-hidden" style="width: 100px; height: 100px;">
                        <img class="img-fluid" src="<?= BASE_URL ?>public/img/<?= $category['image'] ?>" alt="<?= $category['name'] ?>">
                    </div>
                    <div class="flex-fill pl-3">
                        <h6><?= $category['name'] ?></h6>
                        <small class="text-body"><?= $category['products_count'] ?? 0 ?> Productos</small>
                    </div>
                </div>
            </a>
        </div>
        <?php endforeach; ?>
    </div>
</div>
<!-- Categories End -->

<!-- Products Start -->
<div class="container-fluid pt-5 pb-3">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Productos Destacados</span></h2>
    <div class="row px-xl-5">
        <?php foreach ($featured_products as $product): ?>
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="<?= BASE_URL ?>public/img/<?= $product['image'] ?? 'product-1.jpg' ?>" alt="<?= $product['name'] ?>">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>cart/add/<?= $product['id'] ?>"><i class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>user/add/<?= $product['id'] ?>"><i class="far fa-heart"></i></a>
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
</div>
<!-- Products End -->

<!-- Products Start -->
<div class="container-fluid pt-5 pb-3">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Productos Recientes</span></h2>
    <div class="row px-xl-5">
        <?php foreach ($recent_products as $product): ?>
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="<?= BASE_URL ?>public/img/<?= $product['image'] ?? 'product-1.jpg' ?>" alt="<?= $product['name'] ?>">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>cart/add/<?= $product['id'] ?>"><i class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>user/add/<?= $product['id'] ?>"><i class="far fa-heart"></i></a>
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
</div>
<!-- Products End -->

<!-- Vendor Start -->
<div class="container-fluid py-5">
    <div class="row px-xl-5">
        <div class="col">
            <div class="owl-carousel vendor-carousel">
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-1.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-2.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-3.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-4.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-5.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-6.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-7.jpg" alt="">
                </div>
                <div class="bg-light p-4">
                    <img src="<?= BASE_URL ?>public/img/vendor-8.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Vendor End -->
