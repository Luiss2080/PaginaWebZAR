<?php
/**
 * Controlador de Páginas (Contact, About, etc.)
 */

require_once 'BaseController.php';

class PagesController extends BaseController {
    
    /**
     * Página de contacto
     */
    public function contact() {
        $data = [
            'title' => 'Contacto - MultiShop',
            'current_page' => 'contact'
        ];
        
        $this->render('pages/contact', $data);
    }
    
    /**
     * Procesar formulario de contacto
     */
    public function sendContact() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ' . BASE_URL . 'pages/contact');
            exit();
        }
        
        // Validar datos
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $subject = trim($_POST['subject'] ?? '');
        $message = trim($_POST['message'] ?? '');
        
        $errors = [];
        
        if (empty($name)) {
            $errors[] = 'El nombre es requerido';
        }
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Email válido es requerido';
        }
        
        if (empty($subject)) {
            $errors[] = 'El asunto es requerido';
        }
        
        if (empty($message)) {
            $errors[] = 'El mensaje es requerido';
        }
        
        if (!empty($errors)) {
            $_SESSION['error_messages'] = $errors;
            $_SESSION['contact_data'] = $_POST; // Preservar datos
            header('Location: ' . BASE_URL . 'pages/contact');
            exit();
        }
        
        // Procesar envío de email (aquí integrarías con tu sistema de email)
        $success = $this->sendContactEmail([
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message
        ]);
        
        if ($success) {
            $_SESSION['success_message'] = 'Mensaje enviado exitosamente. Te contactaremos pronto.';
        } else {
            $_SESSION['error_message'] = 'Error al enviar el mensaje. Intenta nuevamente.';
        }
        
        // Limpiar datos del formulario si fue exitoso
        if ($success) {
            unset($_SESSION['contact_data']);
        }
        
        header('Location: ' . BASE_URL . 'pages/contact');
        exit();
    }
    
    /**
     * Página "Sobre Nosotros"
     */
    public function about() {
        $data = [
            'title' => 'Sobre Nosotros - MultiShop',
            'current_page' => 'about'
        ];
        
        $this->render('pages/about', $data);
    }
    
    /**
     * Página de Términos y Condiciones
     */
    public function terms() {
        $data = [
            'title' => 'Términos y Condiciones - MultiShop',
            'current_page' => 'terms'
        ];
        
        $this->render('pages/terms', $data);
    }
    
    /**
     * Página de Política de Privacidad
     */
    public function privacy() {
        $data = [
            'title' => 'Política de Privacidad - MultiShop',
            'current_page' => 'privacy'
        ];
        
        $this->render('pages/privacy', $data);
    }
    
    /**
     * Enviar email de contacto (simulado)
     */
    private function sendContactEmail($data) {
        // Aquí integrarías con tu sistema de email (PHPMailer, SendGrid, etc.)
        // Por ahora solo simularemos el envío
        
        // Ejemplo de lo que harías:
        /*
        $to = 'info@multishop.com';
        $subject = 'Nuevo mensaje de contacto: ' . $data['subject'];
        $body = "
            Nuevo mensaje de contacto recibido:
            
            Nombre: {$data['name']}
            Email: {$data['email']}
            Asunto: {$data['subject']}
            
            Mensaje:
            {$data['message']}
        ";
        
        return mail($to, $subject, $body, "From: {$data['email']}");
        */
        
        // Simulamos éxito por ahora
        return true;
    }
}