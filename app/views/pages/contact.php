<?php
// Variables para la página actual
$current_page = 'contact';

// Obtener datos del formulario si hay errores
$contact_data = $_SESSION['contact_data'] ?? [];
unset($_SESSION['contact_data']);
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <span class="breadcrumb-item active">Contacto</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Contact Start -->
<div class="container-fluid">
    <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span class="bg-secondary pr-3">Contáctanos</span>
    </h2>
    <div class="row px-xl-5">
        <div class="col-lg-7 mb-5">
            <div class="contact-form bg-light p-30">
                <!-- Mensajes de éxito/error -->
                <?php if (isset($_SESSION['success_message'])): ?>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fa fa-check-circle mr-2"></i>
                        <?= $_SESSION['success_message'] ?>
                        <button type="button" class="close" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </div>
                    <?php unset($_SESSION['success_message']); ?>
                <?php endif; ?>

                <?php if (isset($_SESSION['error_message'])): ?>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fa fa-exclamation-triangle mr-2"></i>
                        <?= $_SESSION['error_message'] ?>
                        <button type="button" class="close" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </div>
                    <?php unset($_SESSION['error_message']); ?>
                <?php endif; ?>

                <?php if (isset($_SESSION['error_messages'])): ?>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fa fa-exclamation-triangle mr-2"></i>
                        <strong>Por favor corrige los siguientes errores:</strong>
                        <ul class="mb-0 mt-2">
                            <?php foreach ($_SESSION['error_messages'] as $error): ?>
                                <li><?= $error ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <button type="button" class="close" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </div>
                    <?php unset($_SESSION['error_messages']); ?>
                <?php endif; ?>

                <form method="POST" action="<?= BASE_URL ?>pages/send-contact" id="contactForm">
                    <div class="control-group mb-3">
                        <input type="text" class="form-control" name="name" id="name" 
                               placeholder="Tu Nombre" required 
                               value="<?= htmlspecialchars($contact_data['name'] ?? '') ?>">
                        <p class="help-block text-danger"></p>
                    </div>
                    
                    <div class="control-group mb-3">
                        <input type="email" class="form-control" name="email" id="email" 
                               placeholder="Tu Email" required 
                               value="<?= htmlspecialchars($contact_data['email'] ?? '') ?>">
                        <p class="help-block text-danger"></p>
                    </div>
                    
                    <div class="control-group mb-3">
                        <input type="text" class="form-control" name="subject" id="subject" 
                               placeholder="Asunto" required 
                               value="<?= htmlspecialchars($contact_data['subject'] ?? '') ?>">
                        <p class="help-block text-danger"></p>
                    </div>
                    
                    <div class="control-group mb-3">
                        <textarea class="form-control" rows="8" name="message" id="message" 
                                  placeholder="Mensaje" required><?= htmlspecialchars($contact_data['message'] ?? '') ?></textarea>
                        <p class="help-block text-danger"></p>
                    </div>
                    
                    <div>
                        <button class="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">
                            <i class="fa fa-paper-plane mr-2"></i>Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="col-lg-5 mb-5">
            <!-- Mapa -->
            <div class="bg-light p-30 mb-30">
                <iframe style="width: 100%; height: 250px;"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5077525131535!2d-99.16344548529397!3d19.432647486889673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92f670d5c8b%3A0xb8e1398894b52c23!2sZócalo%2C%20Centro%2C%20Cuauhtémoc%2C%2006000%20Ciudad%20de%20México%2C%20CDMX!5e0!3m2!1ses!2smx!4v1640000000000!5m2!1ses!2smx"
                    frameborder="0" style="border:0;" allowfullscreen="" 
                    aria-hidden="false" tabindex="0"></iframe>
            </div>
            
            <!-- Información de contacto -->
            <div class="bg-light p-30 mb-3">
                <div class="mb-3">
                    <h6 class="text-primary mb-2">
                        <i class="fa fa-map-marker-alt text-primary mr-3"></i>Dirección
                    </h6>
                    <p class="mb-0 ml-4">Av. Juárez 123, Centro Histórico, Ciudad de México, CDMX 06000</p>
                </div>
                
                <div class="mb-3">
                    <h6 class="text-primary mb-2">
                        <i class="fa fa-envelope text-primary mr-3"></i>Email
                    </h6>
                    <p class="mb-0 ml-4">
                        <a href="mailto:info@multishop.com.mx" class="text-dark">info@multishop.com.mx</a>
                    </p>
                </div>
                
                <div class="mb-3">
                    <h6 class="text-primary mb-2">
                        <i class="fa fa-phone-alt text-primary mr-3"></i>Teléfono
                    </h6>
                    <p class="mb-0 ml-4">
                        <a href="tel:+525512345678" class="text-dark">+52 55 1234 5678</a>
                    </p>
                </div>
                
                <div class="mb-3">
                    <h6 class="text-primary mb-2">
                        <i class="fa fa-whatsapp text-primary mr-3"></i>WhatsApp
                    </h6>
                    <p class="mb-0 ml-4">
                        <a href="https://wa.me/525512345678" target="_blank" class="text-dark">+52 55 1234 5678</a>
                    </p>
                </div>
                
                <div>
                    <h6 class="text-primary mb-2">
                        <i class="fa fa-clock text-primary mr-3"></i>Horarios
                    </h6>
                    <p class="mb-1 ml-4">Lunes - Viernes: 9:00 AM - 8:00 PM</p>
                    <p class="mb-1 ml-4">Sábados: 10:00 AM - 6:00 PM</p>
                    <p class="mb-0 ml-4">Domingos: 11:00 AM - 5:00 PM</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="row px-xl-5 mt-5">
        <div class="col-12">
            <h3 class="section-title position-relative text-uppercase mb-4">
                <span class="bg-secondary pr-3">Preguntas Frecuentes</span>
            </h3>
            <div class="bg-light p-30">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-4">
                            <h6 class="text-primary">¿Cuál es el tiempo de entrega?</h6>
                            <p>Los pedidos se entregan en 3-5 días hábiles dentro de la Ciudad de México y área metropolitana. Para el interior de la república, el tiempo puede extenderse de 5-8 días hábiles.</p>
                        </div>
                        
                        <div class="mb-4">
                            <h6 class="text-primary">¿Puedo cambiar o devolver un producto?</h6>
                            <p>Sí, aceptamos cambios y devoluciones dentro de los primeros 30 días posteriores a la compra, siempre que el producto esté en perfectas condiciones.</p>
                        </div>
                        
                        <div class="mb-4">
                            <h6 class="text-primary">¿Qué métodos de pago aceptan?</h6>
                            <p>Aceptamos tarjetas de crédito y débito, PayPal, transferencias bancarias y pago contra entrega en área metropolitana.</p>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="mb-4">
                            <h6 class="text-primary">¿Tienen tienda física?</h6>
                            <p>Sí, puedes visitarnos en nuestra tienda ubicada en el Centro Histórico de la Ciudad de México. También manejamos entregas y envíos a domicilio.</p>
                        </div>
                        
                        <div class="mb-4">
                            <h6 class="text-primary">¿Manejan tallas especiales?</h6>
                            <p>Contamos con una amplia variedad de tallas, desde XS hasta XXL. Para tallas especiales, puedes contactarnos directamente.</p>
                        </div>
                        
                        <div class="mb-4">
                            <h6 class="text-primary">¿Ofrecen descuentos por volumen?</h6>
                            <p>Sí, manejamos descuentos especiales para compras al mayoreo. Contáctanos para más información sobre precios empresariales.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Contact End -->

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Validaciones del lado del cliente
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let errors = [];
    
    if (!name) {
        errors.push('El nombre es requerido');
    }
    
    if (!email) {
        errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('El email no es válido');
    }
    
    if (!subject) {
        errors.push('El asunto es requerido');
    }
    
    if (!message) {
        errors.push('El mensaje es requerido');
    }
    
    if (errors.length > 0) {
        e.preventDefault();
        alert('Por favor corrige los siguientes errores:\n\n' + errors.join('\n'));
        return false;
    }
    
    // Mostrar loading en el botón
    const submitBtn = document.getElementById('sendMessageButton');
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i>Enviando...';
    submitBtn.disabled = true;
});

// Validación en tiempo real
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
    
    field.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;
    
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        errorMessage = 'Email no válido';
    }
    
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        errorElement.textContent = '';
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        errorElement.textContent = errorMessage;
    }
}
</script>

<style>
.is-invalid {
    border-color: #dc3545 !important;
}

.is-valid {
    border-color: #28a745 !important;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.control-group .help-block {
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>