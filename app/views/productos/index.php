<?php
// Variables para la página actual
$current_page = 'shop';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <span class="breadcrumb-item active">Tienda</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Shop Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <!-- Shop Sidebar Start -->
        <div class="col-lg-3 col-md-4">
            <!-- Price Start -->
            <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filtrar por precio</span></h5>
            <div class="bg-light p-4 mb-30">
                <form method="GET" action="<?= BASE_URL ?>products" id="filter-form">
                    <input type="hidden" name="category" value="<?= $filters['category_id'] ?? '' ?>">
                    
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="radio" class="custom-control-input" name="price_range" value="" id="price-all" 
                               <?= empty($filters['min_price']) && empty($filters['max_price']) ? 'checked' : '' ?>>
                        <label class="custom-control-label" for="price-all">Todos los precios</label>
                        <span class="badge border font-weight-normal"><?= $pagination['total_items'] ?? 0 ?></span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="radio" class="custom-control-input" name="price_range" value="0-500" id="price-1">
                        <label class="custom-control-label" for="price-1">$0 - $500</label>
                        <span class="badge border font-weight-normal">150</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="radio" class="custom-control-input" name="price_range" value="500-1000" id="price-2">
                        <label class="custom-control-label" for="price-2">$500 - $1000</label>
                        <span class="badge border font-weight-normal">295</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="radio" class="custom-control-input" name="price_range" value="1000-2000" id="price-3">
                        <label class="custom-control-label" for="price-3">$1000 - $2000</label>
                        <span class="badge border font-weight-normal">246</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="radio" class="custom-control-input" name="price_range" value="2000-3000" id="price-4">
                        <label class="custom-control-label" for="price-4">$2000 - $3000</label>
                        <span class="badge border font-weight-normal">145</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                        <input type="radio" class="custom-control-input" name="price_range" value="3000-up" id="price-5">
                        <label class="custom-control-label" for="price-5">$3000+</label>
                        <span class="badge border font-weight-normal">68</span>
                    </div>
                </form>
            </div>
            <!-- Price End -->
            
            <!-- Categories Start -->
            <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Categorías</span></h5>
            <div class="bg-light p-4 mb-30">
                <div class="nav nav-pills nav-fill" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <?php if (isset($categories) && !empty($categories)): ?>
                        <?php foreach ($categories as $category): ?>
                        <a class="nav-link d-flex align-items-center text-start mx-0 mb-1 <?= (isset($filters['category_id']) && $filters['category_id'] == $category->id) ? 'active' : '' ?>" 
                           href="<?= BASE_URL ?>products?category=<?= $category->id ?>">
                            <h6 class="text-dark"><?= $category->name ?></h6>
                            <span class="badge bg-primary ms-auto"><?= $category->products_count ?? 0 ?></span>
                        </a>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <!-- Categories End -->

            <!-- Size Start -->
            <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filtrar por talla</span></h5>
            <div class="bg-light p-4 mb-30">
                <form>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" class="custom-control-input" checked id="size-all">
                        <label class="custom-control-label" for="size-all">Todas las tallas</label>
                        <span class="badge border font-weight-normal">1000</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" class="custom-control-input" id="size-1">
                        <label class="custom-control-label" for="size-1">XS</label>
                        <span class="badge border font-weight-normal">150</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" class="custom-control-input" id="size-2">
                        <label class="custom-control-label" for="size-2">S</label>
                        <span class="badge border font-weight-normal">295</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" class="custom-control-input" id="size-3">
                        <label class="custom-control-label" for="size-3">M</label>
                        <span class="badge border font-weight-normal">246</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" class="custom-control-input" id="size-4">
                        <label class="custom-control-label" for="size-4">L</label>
                        <span class="badge border font-weight-normal">145</span>
                    </div>
                    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                        <input type="checkbox" class="custom-control-input" id="size-5">
                        <label class="custom-control-label" for="size-5">XL</label>
                        <span class="badge border font-weight-normal">168</span>
                    </div>
                </form>
            </div>
            <!-- Size End -->
        </div>
        <!-- Shop Sidebar End -->

        <!-- Shop Product Start -->
        <div class="col-lg-9 col-md-8">
            <div class="row pb-3">
                <div class="col-12 pb-1">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <button class="btn btn-sm btn-light" id="grid-view"><i class="fa fa-th-large"></i></button>
                            <button class="btn btn-sm btn-light ml-2" id="list-view"><i class="fa fa-bars"></i></button>
                        </div>
                        <div class="ml-2">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                                    Ordenar por
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?sort=created_at&dir=DESC">Más recientes</a>
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?sort=name&dir=ASC">Nombre A-Z</a>
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?sort=price&dir=ASC">Precio menor</a>
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?sort=price&dir=DESC">Precio mayor</a>
                                </div>
                            </div>
                            <div class="btn-group ml-2">
                                <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                                    Mostrar <?= $pagination['per_page'] ?? 12 ?>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?per_page=12">12</a>
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?per_page=24">24</a>
                                    <a class="dropdown-item" href="<?= BASE_URL ?>products?per_page=36">36</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <?php if (!empty($products)): ?>
                    <?php foreach ($products as $product): ?>
                    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="<?= BASE_URL ?>public/img/<?= $product['image'] ?? 'product-1.jpg' ?>" alt="<?= $product['name'] ?>">
                                <div class="product-action">
                                    <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>cart/add/<?= $product['id'] ?>" 
                                       onclick="addToCart(<?= $product['id'] ?>); return false;">
                                        <i class="fa fa-shopping-cart"></i>
                                    </a>
                                    <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>user/add/<?= $product['id'] ?>">
                                        <i class="far fa-heart"></i>
                                    </a>
                                    <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/compare/<?= $product['id'] ?>">
                                        <i class="fa fa-sync-alt"></i>
                                    </a>
                                    <a class="btn btn-outline-dark btn-square" href="<?= BASE_URL ?>products/<?= $product['id'] ?>">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate" href="<?= BASE_URL ?>products/<?= $product['id'] ?>">
                                    <?= $product['name'] ?>
                                </a>
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
                    
                    <!-- Paginación -->
                    <?php if (isset($pagination) && $pagination['total_pages'] > 1): ?>
                    <div class="col-12">
                        <nav aria-label="Paginación de productos">
                            <ul class="pagination justify-content-center">
                                <?php if ($pagination['current_page'] > 1): ?>
                                    <li class="page-item">
                                        <a class="page-link" href="<?= BASE_URL ?>products?page=<?= $pagination['current_page'] - 1 ?>">Anterior</a>
                                    </li>
                                <?php endif; ?>
                                
                                <?php for ($i = 1; $i <= $pagination['total_pages']; $i++): ?>
                                    <li class="page-item <?= $i == $pagination['current_page'] ? 'active' : '' ?>">
                                        <a class="page-link" href="<?= BASE_URL ?>products?page=<?= $i ?>"><?= $i ?></a>
                                    </li>
                                <?php endfor; ?>
                                
                                <?php if ($pagination['current_page'] < $pagination['total_pages']): ?>
                                    <li class="page-item">
                                        <a class="page-link" href="<?= BASE_URL ?>products?page=<?= $pagination['current_page'] + 1 ?>">Siguiente</a>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        </nav>
                    </div>
                    <?php endif; ?>
                    
                <?php else: ?>
                    <div class="col-12">
                        <div class="text-center py-5">
                            <i class="fa fa-search fa-5x text-muted mb-3"></i>
                            <h4>No se encontraron productos</h4>
                            <p class="text-muted">Intenta cambiar los filtros o buscar algo diferente</p>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <!-- Shop Product End -->
    </div>
</div>
<!-- Shop End -->

<script>
function addToCart(productId) {
    fetch('<?= BASE_URL ?>cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `product_id=${productId}&quantity=1`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto agregado al carrito');
            // Actualizar contador del carrito si existe
            const cartBadge = document.querySelector('.badge');
            if (cartBadge && data.cart_count) {
                cartBadge.textContent = data.cart_count;
            }
        } else {
            alert('Error al agregar producto: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar producto al carrito');
    });
}

// Filtros de precio
document.querySelectorAll('input[name="price_range"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.checked) {
            const form = document.getElementById('filter-form');
            const range = this.value.split('-');
            
            // Eliminar parámetros existentes
            const url = new URL(form.action);
            url.searchParams.delete('min_price');
            url.searchParams.delete('max_price');
            
            if (range.length === 2) {
                if (range[0]) url.searchParams.set('min_price', range[0]);
                if (range[1] !== 'up') url.searchParams.set('max_price', range[1]);
            }
            
            window.location.href = url.toString();
        }
    });
});
</script>
