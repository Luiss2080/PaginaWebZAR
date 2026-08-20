<?php
// Variables para la página actual
$current_page = 'checkout';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>products">Tienda</a>
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>cart">Carrito</a>
                <span class="breadcrumb-item active">Checkout</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Checkout Start -->
<div class="container-fluid">
    <form method="POST" action="<?= BASE_URL ?>checkout/process" id="checkout-form">
        <div class="row px-xl-5">
            <div class="col-lg-8">
                <h5 class="section-title position-relative text-uppercase mb-3">
                    <span class="bg-secondary pr-3">Dirección de Facturación</span>
                </h5>
                <div class="bg-light p-30 mb-5">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Nombre *</label>
                            <input name="first_name" class="form-control" type="text" placeholder="Juan" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Apellido *</label>
                            <input name="last_name" class="form-control" type="text" placeholder="Pérez" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>E-mail *</label>
                            <input name="email" class="form-control" type="email" placeholder="ejemplo@email.com" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Teléfono *</label>
                            <input name="mobile" class="form-control" type="text" placeholder="+52 123 456 789" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Dirección Línea 1 *</label>
                            <input name="address1" class="form-control" type="text" placeholder="Calle 123" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Dirección Línea 2</label>
                            <input name="address2" class="form-control" type="text" placeholder="Col. Centro">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>País *</label>
                            <select name="country" class="custom-select" required>
                                <option value="México" selected>México</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                                <option value="Canadá">Canadá</option>
                                <option value="España">España</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Ciudad *</label>
                            <input name="city" class="form-control" type="text" placeholder="Ciudad de México" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Estado *</label>
                            <input name="state" class="form-control" type="text" placeholder="CDMX" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Código Postal *</label>
                            <input name="zip" class="form-control" type="text" placeholder="12345" required>
                        </div>
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="newaccount">
                                <label class="custom-control-label" for="newaccount">Crear una cuenta</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="shipto">
                                <label class="custom-control-label" for="shipto" data-toggle="collapse" data-target="#shipping-address">
                                    Enviar a dirección diferente
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shipping Address (Collapsed by default) -->
                <div class="collapse mb-5" id="shipping-address">
                    <h5 class="section-title position-relative text-uppercase mb-3">
                        <span class="bg-secondary pr-3">Dirección de Envío</span>
                    </h5>
                    <div class="bg-light p-30">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Nombre</label>
                                <input name="shipping_first_name" class="form-control" type="text" placeholder="Juan">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Apellido</label>
                                <input name="shipping_last_name" class="form-control" type="text" placeholder="Pérez">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>E-mail</label>
                                <input name="shipping_email" class="form-control" type="email" placeholder="ejemplo@email.com">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Teléfono</label>
                                <input name="shipping_mobile" class="form-control" type="text" placeholder="+52 123 456 789">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Dirección Línea 1</label>
                                <input name="shipping_address1" class="form-control" type="text" placeholder="Calle 123">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Dirección Línea 2</label>
                                <input name="shipping_address2" class="form-control" type="text" placeholder="Col. Centro">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>País</label>
                                <select name="shipping_country" class="custom-select">
                                    <option value="México" selected>México</option>
                                    <option value="Estados Unidos">Estados Unidos</option>
                                    <option value="Canadá">Canadá</option>
                                </select>
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Ciudad</label>
                                <input name="shipping_city" class="form-control" type="text" placeholder="Ciudad de México">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Estado</label>
                                <input name="shipping_state" class="form-control" type="text" placeholder="CDMX">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Código Postal</label>
                                <input name="shipping_zip" class="form-control" type="text" placeholder="12345">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="col-lg-4">
                <h5 class="section-title position-relative text-uppercase mb-3">
                    <span class="bg-secondary pr-3">Total del Pedido</span>
                </h5>
                <div class="bg-light p-30 mb-5">
                    <div class="border-bottom">
                        <h6 class="mb-3">Productos</h6>
                        <?php foreach ($cart_items as $item): ?>
                        <div class="d-flex justify-content-between">
                            <p><?= $item['name'] ?> x <?= $item['quantity'] ?></p>
                            <p>$<?= number_format((float)($item['price'] * $item['quantity']), 2) ?></p>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="border-bottom pt-3 pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>$<?= number_format((float)($subtotal ?? 0), 2) ?></h6>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <h6 class="font-weight-medium">Envío</h6>
                            <h6 class="font-weight-medium">
                                <?php if (($shipping ?? 0) == 0): ?>
                                    <span class="text-success">Gratis</span>
                                <?php else: ?>
                                    $<?= number_format((float)$shipping, 2) ?>
                                <?php endif; ?>
                            </h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">IVA (16%)</h6>
                            <h6 class="font-weight-medium">$<?= number_format((float)($tax ?? 0), 2) ?></h6>
                        </div>
                    </div>
                    
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5><strong>Total</strong></h5>
                            <h5><strong>$<?= number_format((float)($total ?? 0), 2) ?></strong></h5>
                        </div>
                    </div>
                </div>

                <!-- Payment Methods -->
                <div class="mb-5">
                    <h5 class="section-title position-relative text-uppercase mb-3">
                        <span class="bg-secondary pr-3">Método de Pago</span>
                    </h5>
                    <div class="bg-light p-30">
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="paypal" value="paypal" checked>
                                <label class="custom-control-label" for="paypal">PayPal</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="directcheck" value="direct_check">
                                <label class="custom-control-label" for="directcheck">Transferencia Bancaria</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="creditcard" value="credit_card">
                                <label class="custom-control-label" for="creditcard">Tarjeta de Crédito</label>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="cash" value="cash_on_delivery">
                                <label class="custom-control-label" for="cash">Pago Contra Entrega</label>
                            </div>
                        </div>
                        
                        <!-- Terms and Conditions -->
                        <div class="form-group mb-4">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="terms" required>
                                <label class="custom-control-label" for="terms">
                                    He leído y acepto los <a href="#" class="text-primary">términos y condiciones</a>
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-block btn-primary font-weight-bold py-3" id="place-order-btn">
                            Realizar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<!-- Checkout End -->

<script>
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    const termsCheckbox = document.getElementById('terms');
    
    if (!termsCheckbox.checked) {
        e.preventDefault();
        alert('Debes aceptar los términos y condiciones para continuar');
        return false;
    }
    
    // Mostrar loading en el botón
    const submitBtn = document.getElementById('place-order-btn');
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
});

// Validación de formulario en tiempo real
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
});

// Validación de email
document.querySelector('input[name="email"]').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});
</script>

<style>
.is-invalid {
    border-color: #dc3545 !important;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>