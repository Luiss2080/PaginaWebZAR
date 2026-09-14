import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../componentes/ui/Breadcrumbs';
import NoEncontrado from './NoEncontrado';

const contenidos = {
  envios: {
    titulo: 'Envíos y entregas',
    parrafos: [
      'Preparamos tu pedido en un plazo de 24 a 48 horas y lo entregamos en 2 a 5 días laborables.',
      'El envío es gratuito en compras superiores a 30 €. Por debajo de ese importe se aplica una tarifa fija de 3,95 €.',
      'Recibirás un correo con el número de seguimiento en cuanto el pedido salga de nuestro almacén.',
    ],
  },
  devoluciones: {
    titulo: 'Devoluciones',
    parrafos: [
      'Dispones de 30 días desde la recepción para devolver cualquier artículo en perfecto estado y con sus etiquetas.',
      'La primera devolución de cada pedido es gratuita. Puedes solicitar la recogida desde tu cuenta.',
      'El reembolso se realiza en el mismo método de pago en un plazo máximo de 14 días.',
    ],
  },
  tallas: {
    titulo: 'Guía de tallas',
    parrafos: [
      'Mujer: XS (34), S (36), M (38), L (40), XL (42).',
      'Hombre: S, M, L, XL y XXL en tallaje estándar europeo.',
      'Niños: tallas por edad orientativa de 2 a 11 años.',
      'Si dudas entre dos tallas, te recomendamos elegir la mayor para un ajuste holgado.',
    ],
  },
  contacto: {
    titulo: 'Contacto',
    parrafos: [
      'Nuestro equipo de atención está disponible de lunes a viernes, de 9:00 a 18:00.',
      'Puedes escribirnos a soporte@zara-demo.com o llamarnos al 900 000 000.',
      'También atendemos consultas sobre pedidos, devoluciones y disponibilidad de tallas.',
    ],
  },
  terminos: {
    titulo: 'Términos de servicio',
    parrafos: [
      'Este sitio es una demostración técnica con fines educativos. No se procesan pagos reales ni se envían pedidos.',
      'Los precios y la disponibilidad mostrados son orientativos y pueden cambiar sin previo aviso.',
      'El uso del sitio implica la aceptación de estas condiciones.',
    ],
  },
  privacidad: {
    titulo: 'Política de privacidad',
    parrafos: [
      'Utilizamos tus datos únicamente para gestionar la experiencia de compra de esta demostración.',
      'El carrito, los favoritos y la sesión se guardan en el almacenamiento local de tu navegador.',
      'No compartimos información con terceros ni realizamos perfilado publicitario.',
    ],
  },
};

export default function Estatica() {
  const { slug } = useParams();
  const contenido = contenidos[slug];

  useEffect(() => {
    if (contenido) document.title = `${contenido.titulo} — ZARA`;
  }, [contenido]);

  if (!contenido) return <NoEncontrado />;

  return (
    <div className="contenedor">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: contenido.titulo }]} />
      <article className="max-w-3xl pb-24">
        <h1 className="font-titulo text-3xl sm:text-4xl">{contenido.titulo}</h1>
        <div className="mt-8 space-y-5">
          {contenido.parrafos.map((parrafo) => (
            <p key={parrafo} className="text-sm leading-relaxed text-gris-medio">
              {parrafo}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
