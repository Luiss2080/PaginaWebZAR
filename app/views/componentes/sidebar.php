    <!-- Navbar Start -->
    <div class="container-fluid bg-dark mb-30">
        <div class="row px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; padding: 0 30px;">
                    <h6 class="text-dark m-0"><i class="fa fa-bars mr-2"></i>Categorías</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style="width: calc(100% - 30px); z-index: 999;">
                    <div class="navbar-nav w-100">
                        <div class="nav-item dropdown dropright">
                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Vestidos <i class="fa fa-angle-right float-right mt-1"></i></a>
                            <div class="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                <a href="<?= BASE_URL ?>categories/1" class="dropdown-item">Vestidos Hombre</a>
                                <a href="<?= BASE_URL ?>categories/2" class="dropdown-item">Vestidos Mujer</a>
                                <a href="<?= BASE_URL ?>categories/3" class="dropdown-item">Vestidos Niños</a>
                            </div>
                        </div>
                        <a href="<?= BASE_URL ?>categories/shirts" class="nav-item nav-link">Camisas</a>
                        <a href="<?= BASE_URL ?>categories/jeans" class="nav-item nav-link">Jeans</a>
                        <a href="<?= BASE_URL ?>categories/swimwear" class="nav-item nav-link">Trajes de Baño</a>
                        <a href="<?= BASE_URL ?>categories/sleepwear" class="nav-item nav-link">Pijamas</a>
                        <a href="<?= BASE_URL ?>categories/sportswear" class="nav-item nav-link">Ropa Deportiva</a>
                        <a href="<?= BASE_URL ?>categories/jumpsuits" class="nav-item nav-link">Monos</a>
                        <a href="<?= BASE_URL ?>categories/blazers" class="nav-item nav-link">Blazers</a>
                        <a href="<?= BASE_URL ?>categories/jackets" class="nav-item nav-link">Chaquetas</a>
                        <a href="<?= BASE_URL ?>categories/shoes" class="nav-item nav-link">Zapatos</a>
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="<?= BASE_URL ?>" class="text-decoration-none d-block d-lg-none">
                        <span class="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <a href="<?= BASE_URL ?>" class="nav-item nav-link <?= $current_page == 'home' ? 'active' : '' ?>">Inicio</a>
                            <a href="<?= BASE_URL ?>products" class="nav-item nav-link <?= $current_page == 'shop' ? 'active' : '' ?>">Tienda</a>
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Páginas <i class="fa fa-angle-down mt-1"></i></a>
                                <div class="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <a href="<?= BASE_URL ?>cart" class="dropdown-item">Carrito de Compras</a>
                                    <a href="<?= BASE_URL ?>checkout" class="dropdown-item">Checkout</a>
                                    <a href="<?= BASE_URL ?>user/profile" class="dropdown-item">Mi Perfil</a>
                                    <a href="<?= BASE_URL ?>user/orders" class="dropdown-item">Mis Pedidos</a>
                                </div>
                            </div>
                            <a href="<?= BASE_URL ?>pages/contact" class="nav-item nav-link">Contacto</a>
                        </div>
                        <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="<?= BASE_URL ?>user/wishlist" class="btn px-0">
                                <i class="fas fa-heart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
                            </a>
                            <a href="<?= BASE_URL ?>cart" class="btn px-0 ml-3">
                                <i class="fas fa-shopping-cart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <!-- Navbar End -->