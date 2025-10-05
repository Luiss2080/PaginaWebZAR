<?php
// Variables para la página actual
$current_page = 'product';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>products">Tienda</a>
                <span class="breadcrumb-item active"><?= $product['name'] ?></span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Shop Detail Start -->
<div class="container-fluid pb-5">
    <div class="row px-xl-5">
        <div class="col-lg-5 mb-30">
            <div id="product-carousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner bg-light">
                    <?php 
                    // Por ahora usar imágenes por defecto, luego implementar sistema de múltiples imágenes
                    $images = [
                        'product-' . (($product['id'] - 1) % 8 + 1) . '.jpg',
                        'product-' . (($product['id']) % 8 + 1) . '.jpg',
                        'product-' . (($product['id'] + 1) % 8 + 1) . '.jpg',
                        'product-' . (($product['id'] + 2) % 8 + 1) . '.jpg'
                    ];
                    ?>
                    
                    <?php foreach ($images as $index => $image): ?>
                    <div class="carousel-item <?= $index === 0 ? 'active' : '' ?>">
                        <img class="w-100 h-100" src="<?= BASE_URL ?>public/img/<?= $image ?>" alt="<?= $product['name'] ?>">
                    </div>
                    <?php endforeach; ?>
                </div>
                <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                    <i class="fa fa-2x fa-angle-left text-dark"></i>
                </a>
                <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                    <i class="fa fa-2x fa-angle-right text-dark"></i>
                </a>
            </div>
        </div>

        <div class="col-lg-7 h-auto mb-30">
            <div class="h-100 bg-light p-30">
                <h3><?= $product['name'] ?></h3>
                <div class="d-flex mb-3">
                    <div class="text-primary mr-2">
                        <?php 
                        $rating = $product['rating'] ?? 4;
                        for ($i = 1; $i <= 5; $i++): 
                            if ($i <= $rating): ?>
                                <small class="fas fa-star"></small>
                            <?php elseif ($i - 0.5 <= $rating): ?>
                                <small class="fas fa-star-half-alt"></small>
                            <?php else: ?>
                                <small class="far fa-star"></small>
                            <?php endif;
                        endfor; ?>
                    </div>
                    <small class="pt-1">(<?= $product['reviews'] ?? 99 ?> Reseñas)</small>
                </div>
                <h3 class="font-weight-semi-bold mb-4">$<?= number_format((float)$product['price'], 2) ?></h3>
                <p class="mb-4"><?= $product['description'] ?? $product['short_description'] ?? 'Descripción del producto no disponible.' ?></p>
                
                <!-- Stock Status -->
                <div class="d-flex mb-3">
                    <strong class="text-dark mr-3">Disponibilidad:</strong>
                    <?php if (($product['stock_quantity'] ?? 0) > 0): ?>
                        <span class="text-success">En stock (<?= $product['stock_quantity'] ?? 0 ?> disponibles)</span>
                    <?php else: ?>
                        <span class="text-danger">Sin stock</span>
                    <?php endif; ?>
                </div>
                
                <!-- SKU -->
                <?php if (!empty($product['sku'])): ?>
                <div class="d-flex mb-4">
                    <strong class="text-dark mr-3">SKU:</strong>
                    <span><?= $product['sku'] ?></span>
                </div>
                <?php endif; ?>
                
                <!-- Size Options -->
                <div class="d-flex mb-4">
                    <strong class="text-dark mr-3">Tallas:</strong>
                    <form>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-1" name="size" value="XS">
                            <label class="custom-control-label" for="size-1">XS</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-2" name="size" value="S">
                            <label class="custom-control-label" for="size-2">S</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-3" name="size" value="M">
                            <label class="custom-control-label" for="size-3">M</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-4" name="size" value="L">
                            <label class="custom-control-label" for="size-4">L</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-5" name="size" value="XL">
                            <label class="custom-control-label" for="size-5">XL</label>
                        </div>
                    </form>
                </div>
                
                <!-- Color Options -->
                <div class="d-flex mb-4">
                    <strong class="text-dark mr-3">Colores:</strong>
                    <form>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-1" name="color" value="Negro">
                            <label class="custom-control-label" for="color-1">Negro</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-2" name="color" value="Blanco">
                            <label class="custom-control-label" for="color-2">Blanco</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-3" name="color" value="Rojo">
                            <label class="custom-control-label" for="color-3">Rojo</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-4" name="color" value="Azul">
                            <label class="custom-control-label" for="color-4">Azul</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-5" name="color" value="Verde">
                            <label class="custom-control-label" for="color-5">Verde</label>
                        </div>
                    </form>
                </div>

                <!-- Add to Cart -->
                <form method="POST" action="<?= BASE_URL ?>cart/add" id="add-to-cart-form">
                    <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
                    <div class="d-flex align-items-center mb-4 pt-2">
                        <div class="input-group quantity mr-3" style="width: 130px;">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary btn-minus" onclick="changeQuantity(-1)">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" name="quantity" id="quantity" class="form-control bg-secondary border-0 text-center" value="1" min="1" max="<?= $product['stock_quantity'] ?? 1 ?>">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary btn-plus" onclick="changeQuantity(1)">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <?php if (($product['stock_quantity'] ?? 0) > 0): ?>
                            <button type="submit" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Agregar al Carrito</button>
                        <?php else: ?>
                            <button type="button" class="btn btn-secondary px-3" disabled><i class="fa fa-times mr-1"></i> Sin Stock</button>
                        <?php endif; ?>
                    </div>
                </form>
                
                <!-- Wishlist and Share -->
                <div class="d-flex pt-2">
                    <a href="<?= BASE_URL ?>user/add/<?= $product['id'] ?>" class="btn btn-outline-primary mr-2">
                        <i class="far fa-heart mr-1"></i> Lista de Deseos
                    </a>
                    <div class="ml-3">
                        <strong class="text-dark mr-2">Compartir:</strong>
                        <div class="d-inline-flex">
                            <a class="text-dark px-2" href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode(BASE_URL . 'products/' . $product['id']) ?>" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="text-dark px-2" href="https://twitter.com/intent/tweet?text=<?= urlencode($product['name']) ?>&url=<?= urlencode(BASE_URL . 'products/' . $product['id']) ?>" target="_blank">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="text-dark px-2" href="https://www.linkedin.com/sharing/share-offsite/?url=<?= urlencode(BASE_URL . 'products/' . $product['id']) ?>" target="_blank">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a class="text-dark px-2" href="https://pinterest.com/pin/create/button/?url=<?= urlencode(BASE_URL . 'products/' . $product['id']) ?>&description=<?= urlencode($product['name']) ?>" target="_blank">
                                <i class="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Shop Detail End -->

<!-- Product Details Tab Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col">
            <div class="bg-light p-30">
                <div class="nav nav-tabs mb-4">
                    <a class="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Descripción</a>
                    <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Información</a>
                    <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reseñas (<?= $product['reviews'] ?? 0 ?>)</a>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Descripción del Producto</h4>
                        <p><?= $product['description'] ?? 'Descripción detallada del producto no disponible.' ?></p>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-2">
                        <h4 class="mb-3">Información Adicional</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item px-0">
                                        <strong>SKU:</strong> <?= $product['sku'] ?? 'N/A' ?>
                                    </li>
                                    <li class="list-group-item px-0">
                                        <strong>Peso:</strong> <?= $product['weight'] ?? 'N/A' ?> kg
                                    </li>
                                    <li class="list-group-item px-0">
                                        <strong>Dimensiones:</strong> <?= $product['dimensions'] ?? 'N/A' ?>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h4 class="mb-4">1 reseña para "<?= $product['name'] ?>"</h4>
                                <div class="media mb-4">
                                    <img src="<?= BASE_URL ?>public/img/user.jpg" alt="Image" class="img-fluid mr-3 mt-1" style="width: 45px;">
                                    <div class="media-body">
                                        <h6>Juan Pérez<small> - <i>01 Ene 2025</i></small></h6>
                                        <div class="text-primary mb-2">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <i class="far fa-star"></i>
                                        </div>
                                        <p>Excelente producto, muy buena calidad y llegó en tiempo récord. Lo recomiendo ampliamente.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h4 class="mb-4">Deja una reseña</h4>
                                <small>Tu dirección de email no será publicada. Los campos requeridos están marcados *</small>
                                <div class="d-flex my-3">
                                    <p class="mb-0 mr-2">Tu Calificación * :</p>
                                    <div class="text-primary">
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                                <form method="POST" action="<?= BASE_URL ?>products/<?= $product['id'] ?>/review">
                                    <div class="form-group">
                                        <label for="message">Tu Reseña *</label>
                                        <textarea name="review" id="message" cols="30" rows="5" class="form-control" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Tu Nombre *</label>
                                        <input type="text" name="name" class="form-control" id="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Tu Email *</label>
                                        <input type="email" name="email" class="form-control" id="email" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="hidden" name="rating" value="5">
                                    </div>
                                    <div class="form-group mb-0">
                                        <input type="submit" value="Enviar Reseña" class="btn btn-primary px-3">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Product Details Tab End -->

<!-- Products Start -->
<div class="container-fluid py-5">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">También te puede gustar</span></h2>
    <div class="row px-xl-5">
        <div class="col">
            <div class="owl-carousel related-carousel">
                <?php if (!empty($related_products)): ?>
                    <?php foreach ($related_products as $related): ?>
                    <div class="product-item bg-light">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="<?= BASE_URL ?>public/img/<?= $related['image'] ?? 'product-1.jpg' ?>" alt="<?= $related['name'] ?>">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>cart/add/<?= $related['id'] ?>">
                                    <i class="fa fa-shopping-cart"></i>
                                </a>
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>user/add/<?= $related['id'] ?>">
                                    <i class="far fa-heart"></i>
                                </a>
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/compare/<?= $related['id'] ?>">
                                    <i class="fa fa-sync-alt"></i>
                                </a>
                                <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/<?= $related['id'] ?>">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="<?= BASE_URL ?>products/<?= $related['id'] ?>"><?= $related['name'] ?></a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>$<?= number_format((float)$related['price'], 2) ?></h5>
                                <?php if (isset($related['old_price']) && $related['old_price'] > $related['price']): ?>
                                <h6 class="text-muted ml-2"><del>$<?= number_format((float)$related['old_price'], 2) ?></del></h6>
                                <?php endif; ?>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                                <?php 
                                $rating = $related['rating'] ?? 4;
                                for ($i = 1; $i <= 5; $i++): 
                                    if ($i <= $rating): ?>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                    <?php elseif ($i - 0.5 <= $rating): ?>
                                        <small class="fa fa-star-half-alt text-primary mr-1"></small>
                                    <?php else: ?>
                                        <small class="far fa-star text-primary mr-1"></small>
                                    <?php endif;
                                endfor; ?>
                                <small>(<?= $related['reviews'] ?? 99 ?>)</small>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
<!-- Products End -->

<script>
// JavaScript para cantidad
function changeQuantity(change) {
    const input = document.getElementById('quantity');
    let newValue = parseInt(input.value) + change;
    
    if (newValue < 1) newValue = 1;
    if (newValue > parseInt(input.getAttribute('max'))) newValue = parseInt(input.getAttribute('max'));
    
    input.value = newValue;
}

// Manejo del formulario de carrito
document.getElementById('add-to-cart-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Aquí se puede agregar una petición AJAX para agregar al carrito
    // Por ahora solo mostrar un mensaje
    alert('Producto agregado al carrito!');
});
</script>