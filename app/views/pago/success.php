<?php
// Variables para la página actual
$current_page = 'checkout_success';
?>

<!-- Breadcrumb Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>">Inicio</a>
                <a class="breadcrumb-item text-dark" href="<?= BASE_URL ?>products">Tienda</a>
                <span class="breadcrumb-item active">Orden Completada</span>
            </nav>
        </div>
    </div>
</div>
<!-- Breadcrumb End -->

<!-- Order Success Start -->
<div class="container-fluid">
    <div class="row px-xl-5">
        <div class="col-12">
            <div class="bg-light p-5 text-center">
                <div class="mb-4">
                    <i class="fa fa-check-circle text-success" style="font-size: 4rem;"></i>
                </div>
                <h2 class="text-success mb-4">¡Orden Completada Exitosamente!</h2>
                <p class="lead mb-4">
                    Gracias por tu compra. Tu orden ha sido procesada correctamente.
                </p>
                
                <div class="border p-4 mb-4 bg-white">
                    <h5 class="mb-3">Detalles de la Orden</h5>
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <p><strong>Número de Orden:</strong> <?= $order_id ?></p>
                            <p><strong>Fecha:</strong> <?= date('d/m/Y H:i') ?></p>
                            <p><strong>Estado:</strong> <span class="badge badge-success">Confirmado</span></p>
                        </div>
                        <div class="col-md-6 text-left">
                            <p><strong>Método de Pago:</strong> PayPal</p>
                            <p><strong>Envío:</strong> Estándar (3-5 días hábiles)</p>
                            <p><strong>Tracking:</strong> Se enviará por email</p>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-info mb-4">
                    <h6 class="alert-heading">¿Qué sigue?</h6>
                    <p class="mb-2">• Recibirás un email de confirmación en los próximos minutos</p>
                    <p class="mb-2">• Te notificaremos cuando tu pedido sea enviado</p>
                    <p class="mb-0">• Puedes rastrear tu pedido desde tu cuenta</p>
                </div>
                
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <a href="<?= BASE_URL ?>" class="btn btn-outline-primary btn-block">
                                    <i class="fa fa-home mr-2"></i>Volver al Inicio
                                </a>
                            </div>
                            <div class="col-md-4 mb-3">
                                <a href="<?= BASE_URL ?>products" class="btn btn-primary btn-block">
                                    <i class="fa fa-shopping-bag mr-2"></i>Seguir Comprando
                                </a>
                            </div>
                            <div class="col-md-4 mb-3">
                                <a href="<?= BASE_URL ?>user/orders" class="btn btn-outline-secondary btn-block">
                                    <i class="fa fa-list mr-2"></i>Mis Pedidos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Customer Support Section -->
    <div class="row px-xl-5 mt-5">
        <div class="col-12">
            <div class="bg-light p-4">
                <div class="row">
                    <div class="col-md-4 text-center">
                        <i class="fa fa-shipping-fast text-primary mb-3" style="font-size: 2rem;"></i>
                        <h6>Envío Rápido</h6>
                        <p>Entrega en 3-5 días hábiles</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <i class="fa fa-shield-alt text-primary mb-3" style="font-size: 2rem;"></i>
                        <h6>Compra Segura</h6>
                        <p>Transacciones 100% seguras</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <i class="fa fa-headset text-primary mb-3" style="font-size: 2rem;"></i>
                        <h6>Soporte 24/7</h6>
                        <p>Estamos aquí para ayudarte</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Contact Information -->
    <div class="row px-xl-5 mt-4">
        <div class="col-12">
            <div class="text-center p-4">
                <h6 class="mb-3">¿Necesitas ayuda con tu pedido?</h6>
                <p class="mb-2">
                    <i class="fa fa-envelope text-primary mr-2"></i>
                    Email: <a href="mailto:soporte@multishop.com">soporte@multishop.com</a>
                </p>
                <p class="mb-2">
                    <i class="fa fa-phone text-primary mr-2"></i>
                    Teléfono: <a href="tel:+525512345678">+52 55 1234 5678</a>
                </p>
                <p class="mb-0">
                    <i class="fa fa-clock text-primary mr-2"></i>
                    Horario de atención: Lunes a Viernes 9:00 AM - 6:00 PM
                </p>
            </div>
        </div>
    </div>
</div>
<!-- Order Success End -->

<script>
// Animación de entrada para el icono de éxito
document.addEventListener('DOMContentLoaded', function() {
    const successIcon = document.querySelector('.fa-check-circle');
    successIcon.style.transform = 'scale(0)';
    successIcon.style.opacity = '0';
    
    setTimeout(() => {
        successIcon.style.transition = 'all 0.5s ease-out';
        successIcon.style.transform = 'scale(1)';
        successIcon.style.opacity = '1';
    }, 300);
});

// Confetti effect (opcional)
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Agregar CSS para la animación de confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Ejecutar confetti después de 1 segundo
setTimeout(createConfetti, 1000);
</script>