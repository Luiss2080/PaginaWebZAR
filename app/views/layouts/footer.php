    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <h5 class="text-secondary text-uppercase mb-4">Contáctanos</h5>
                <p class="mb-4">Tu tienda online de confianza para encontrar los mejores productos de moda y accesorios.</p>
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Calle Principal, Ciudad de México, México</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@multishop.com</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+52 555 123 4567</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Enlaces Rápidos</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>"><i class="fa fa-angle-right mr-2"></i>Inicio</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>products"><i class="fa fa-angle-right mr-2"></i>Tienda</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>cart"><i class="fa fa-angle-right mr-2"></i>Carrito</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>checkout"><i class="fa fa-angle-right mr-2"></i>Checkout</a>
                            <a class="text-secondary" href="<?= BASE_URL ?>pages/contact"><i class="fa fa-angle-right mr-2"></i>Contacto</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Mi Cuenta</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>user/profile"><i class="fa fa-angle-right mr-2"></i>Mi Perfil</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>user/orders"><i class="fa fa-angle-right mr-2"></i>Mis Pedidos</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>user/wishlist"><i class="fa fa-angle-right mr-2"></i>Lista de Deseos</a>
                            <a class="text-secondary mb-2" href="<?= BASE_URL ?>user/addresses"><i class="fa fa-angle-right mr-2"></i>Mis Direcciones</a>
                            <a class="text-secondary" href="<?= BASE_URL ?>pages/help"><i class="fa fa-angle-right mr-2"></i>Ayuda</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                        <p>Suscríbete para recibir las últimas ofertas y novedades</p>
                        <form action="<?= BASE_URL ?>newsletter/subscribe" method="POST">
                            <div class="input-group">
                                <input type="email" name="email" class="form-control" placeholder="Tu dirección de email" required>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary">Suscribirse</button>
                                </div>
                            </div>
                        </form>
                        <h6 class="text-secondary text-uppercase mt-4 mb-3">Síguenos</h6>
                        <div class="d-flex">
                            <a class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-primary btn-square" href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top mx-xl-5 py-4" style="border-color: rgba(256, 256, 256, .1) !important;">
            <div class="col-md-6 px-xl-0">
                <p class="mb-md-0 text-center text-md-left text-secondary">
                    &copy; <?= date('Y') ?> <a class="text-primary" href="<?= BASE_URL ?>">MultiShop</a>. Todos los derechos reservados.
                </p>
            </div>
            <div class="col-md-6 px-xl-0 text-center text-md-right">
                <img class="img-fluid" src="<?= BASE_URL ?>public/img/payments.png" alt="Métodos de pago">
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>

    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
    <script src="<?= BASE_URL ?>public/lib/easing/easing.min.js"></script>
    <script src="<?= BASE_URL ?>public/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Contact Javascript File -->
    <script src="<?= BASE_URL ?>public/mail/jqBootstrapValidation.min.js"></script>
    <script src="<?= BASE_URL ?>public/mail/contact.js"></script>

    <!-- Template Javascript -->
    <script src="<?= BASE_URL ?>public/js/main.js"></script>
</body>
</html>
    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
    <script src="<?= BASE_URL ?>public/lib/easing/easing.min.js"></script>
    <script src="<?= BASE_URL ?>public/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Template Javascript -->
    <script src="<?= BASE_URL ?>public/js/main.js"></script>

</body>
</html>