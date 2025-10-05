<?php
// Variables para la página actual
$current_page = 'cart';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>products">Tienda</a>
                <span class="breadcrumb-item active">Carrito de Compras</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Cart Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-lg-8 table-responsive mb-5">
            <?php if (!empty($cart_items)): ?>
            <table class="table table-light table-borderless table-hover text-center mb-0">
                <thead class="thead-dark">
                    <tr>
                        <th>Productos</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <?php foreach ($cart_items as $item): ?>
                    <tr data-product-id="<?= $item['id'] ?>">
                        <td class="align-middle">
                            <img src="<?= BASE_URL ?>public/img/<?= $item['image'] ?>" alt="<?= $item['name'] ?>" style="width: 50px;"> 
                            <?= $item['name'] ?>
                        </td>
                        <td class="align-middle">$<?= number_format((float)$item['price'], 2) ?></td>
                        <td class="align-middle">
                            <div class="input-group quantity mx-auto" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-primary btn-minus" type="button" onclick="updateQuantity(<?= $item['id'] ?>, -1)">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center quantity-input" 
                                       value="<?= $item['quantity'] ?>" 
                                       data-product-id="<?= $item['id'] ?>"
                                       onchange="updateQuantityDirect(<?= $item['id'] ?>, this.value)">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-primary btn-plus" type="button" onclick="updateQuantity(<?= $item['id'] ?>, 1)">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td class="align-middle item-total">$<?= number_format((float)($item['price'] * $item['quantity']), 2) ?></td>
                        <td class="align-middle">
                            <button class="btn btn-sm btn-danger" onclick="removeFromCart(<?= $item['id'] ?>)">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php else: ?>
            <div class="text-center py-5">
                <i class="fa fa-shopping-cart fa-5x text-muted mb-3"></i>
                <h4>Tu carrito está vacío</h4>
                <p class="text-muted">¡Agrega algunos productos increíbles a tu carrito!</p>
                <a href="<?= BASE_URL ?>products" class="btn btn-primary">Continuar Comprando</a>
            </div>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($cart_items)): ?>
        <div class="col-lg-4">
            <!-- Cupón de descuento -->
            <form class="mb-30" action="<?= BASE_URL ?>cart/applyCoupon" method="POST">
                <div class="input-group">
                    <input type="text" name="coupon_code" class="form-control border-0 p-4" placeholder="Código de Cupón">
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-primary">Aplicar Cupón</button>
                    </div>
                </div>
            </form>
            
            <!-- Resumen del carrito -->
            <h5 class="section-title position-relative text-uppercase mb-3">
                <span class="bg-secondary pr-3">Resumen del Carrito</span>
            </h5>
            <div class="bg-light p-30 mb-5" id="cart-summary">
                <div class="border-bottom pb-2">
                    <div class="d-flex justify-content-between mb-3">
                        <h6>Subtotal</h6>
                        <h6 id="subtotal">$<?= number_format((float)($cart_summary['subtotal'] ?? 0), 2) ?></h6>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h6 class="font-weight-medium">Envío</h6>
                        <h6 class="font-weight-medium" id="shipping">
                            <?php if (($cart_summary['shipping'] ?? 0) == 0): ?>
                                ¡Gratis!
                            <?php else: ?>
                                $<?= number_format((float)$cart_summary['shipping'], 2) ?>
                            <?php endif; ?>
                        </h6>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h6 class="font-weight-medium">IVA (16%)</h6>
                        <h6 class="font-weight-medium" id="tax">$<?= number_format((float)($cart_summary['tax'] ?? 0), 2) ?></h6>
                    </div>
                </div>
                <div class="pt-2">
                    <div class="d-flex justify-content-between mt-2">
                        <h5>Total</h5>
                        <h5 id="total">$<?= number_format((float)($cart_summary['total'] ?? 0), 2) ?></h5>
                    </div>
                    <a href="<?= BASE_URL ?>checkout" class="btn btn-block btn-primary font-weight-bold my-3 py-3">
                        Proceder al Checkout
                    </a>
                    <a href="<?= BASE_URL ?>products" class="btn btn-block btn-outline-primary">
                        Continuar Comprando
                    </a>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>
<!-- Cart End -->

<script>
// Funciones JavaScript para manejo del carrito
function updateQuantity(productId, change) {
    const input = document.querySelector(`input[data-product-id="${productId}"]`);
    let newQuantity = parseInt(input.value) + change;
    
    if (newQuantity < 1) {
        if (confirm('¿Deseas eliminar este producto del carrito?')) {
            removeFromCart(productId);
        }
        return;
    }
    
    input.value = newQuantity;
    updateCart(productId, newQuantity);
}

function updateQuantityDirect(productId, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) {
        if (confirm('¿Deseas eliminar este producto del carrito?')) {
            removeFromCart(productId);
        } else {
            document.querySelector(`input[data-product-id="${productId}"]`).value = 1;
        }
        return;
    }
    
    updateCart(productId, quantity);
}

function updateCart(productId, quantity) {
    fetch('<?= BASE_URL ?>cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `product_id=${productId}&quantity=${quantity}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateCartDisplay(data.cart_summary);
            // Actualizar el total del item
            const row = document.querySelector(`tr[data-product-id="${productId}"]`);
            const price = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', ''));
            row.querySelector('.item-total').textContent = '$' + (price * quantity).toFixed(2);
        }
    })
    .catch(error => console.error('Error:', error));
}

function removeFromCart(productId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }
    
    fetch('<?= BASE_URL ?>cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload(); // Recargar para mostrar el carrito actualizado
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateCartDisplay(summary) {
    document.getElementById('subtotal').textContent = '$' + summary.subtotal.toFixed(2);
    document.getElementById('shipping').textContent = summary.shipping == 0 ? '¡Gratis!' : '$' + summary.shipping.toFixed(2);
    document.getElementById('tax').textContent = '$' + summary.tax.toFixed(2);
    document.getElementById('total').textContent = '$' + summary.total.toFixed(2);
}
</script>