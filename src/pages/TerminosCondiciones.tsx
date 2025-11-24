import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <article className="prose prose-slate max-w-4xl mx-auto">
          <h1>Términos y Condiciones de Uso</h1>

          <section>
            <h2>1. Información general</h2>
            <p>
              Este sitio web es operado por X-NET S.L., empresa legalmente constituida en España, y distribuidora oficial de la marca de dispositivos de belleza Garett, incluyendo aparatos tecnológicos para el cuidado facial y corporal de uso doméstico. Al acceder y utilizar este sitio web, usted acepta cumplir con los siguientes términos y condiciones de uso. Si no está de acuerdo con ellos, le recomendamos no utilizar este sitio.
            </p>
          </section>

          <section>
            <h2>2. Objeto del sitio web</h2>
            <p>
              Este sitio tiene como finalidad ofrecer al público información sobre los dispositivos de belleza de la marca Garett, así como facilitar su compra a través de la plataforma Shopify. Los dispositivos están disponibles para usuarios residentes en España (incluyendo Islas Canarias, Ceuta y Melilla), Portugal y, eventualmente, Latinoamérica, sujeto a disponibilidad y condiciones de envío.
            </p>
          </section>

          <section>
            <h2>3. Registro de usuarios</h2>
            <p>
              El registro de usuario no es obligatorio para navegar en el sitio. Sin embargo, los usuarios tienen la opción de crear una cuenta personal para facilitar el proceso de compra, hacer seguimiento de pedidos o gestionar devoluciones. El usuario se compromete a proporcionar información veraz y actualizada al registrarse.
            </p>
          </section>

          <section>
            <h2>4. Proceso de compra y métodos de pago</h2>
            <p>
              El proceso de compra de dispositivos de belleza de la marca Garett se realiza directamente a través de este sitio web, el cual está integrado con la plataforma segura Shopify.
            </p>
            <p>
              Los usuarios podrán seleccionar los dispositivos de su interés navegando por el catálogo disponible. Para realizar un pedido, el usuario deberá:
            </p>
            <ul>
              <li>Añadir los dispositivos deseados a la cesta de la compra.</li>
              <li>Acceder al resumen del pedido y hacer clic en "Finalizar compra".</li>
              <li>Completar los datos necesarios para la entrega (nombre, dirección, correo electrónico, etc.).</li>
              <li>Seleccionar el método de pago entre las opciones disponibles.</li>
            </ul>
            <p>Actualmente, los métodos de pago aceptados son:</p>
            <ul>
              <li><strong>Tarjeta bancaria (crédito o débito):</strong> se aceptan tarjetas Visa, Mastercard y American Express. El procesamiento se realiza mediante una pasarela de pago segura integrada en Shopify.</li>
              <li><strong>PayPal:</strong> opción que permite realizar el pago a través de la cuenta personal del usuario en esta plataforma.</li>
              <li><strong>Shop Pay (Shopify):</strong> sistema de pago rápido ofrecido por Shopify para usuarios registrados que permite realizar la compra de forma más ágil, con datos previamente guardados.</li>
            </ul>
            <p>
              Una vez completado el proceso de compra y aceptadas estas condiciones, el usuario recibirá un correo electrónico de confirmación, que incluirá el resumen de los dispositivos adquiridos, el precio final con impuestos aplicables y, en su caso, los gastos de envío.
            </p>
            <p>
              X-NET S.L. emitirá una factura electrónica correspondiente al pedido realizado. El usuario podrá solicitar una copia en formato papel, sin coste adicional, escribiendo a la dirección de contacto indicada en el sitio web.
            </p>
            <p>
              El pedido será entregado en la dirección indicada por el usuario, dentro de los plazos especificados según la zona geográfica. Para más información, consulte la cláusula relativa a envíos y entrega.
            </p>
          </section>

          <section>
            <h2>5. Precios, envíos y entrega</h2>
            <p>
              Los precios de los dispositivos de belleza están indicados en euros (€) e incluyen el IVA correspondiente, salvo que se indique expresamente lo contrario. Los gastos de envío no están incluidos en el precio y se calcularán en el momento de la compra, según la dirección de entrega y el tipo de envío seleccionado.
            </p>
            <p>Los envíos se realizan a:</p>
            <ul>
              <li><strong>España peninsular y Baleares:</strong> entrega estándar entre 2 y 4 días laborables.</li>
              <li><strong>Islas Canarias, Ceuta y Melilla:</strong> entrega entre 5 y 10 días laborables; pueden aplicarse tasas aduaneras e impuestos locales no incluidos en el precio del pedido.</li>
              <li><strong>Portugal:</strong> entrega estándar entre 3 y 5 días laborables.</li>
              <li><strong>Latinoamérica:</strong> la entrega está sujeta a disponibilidad logística; los plazos pueden variar según país y servicio de mensajería local. El cliente asumirá los gastos de aduana y aranceles aplicables en destino.</li>
            </ul>
            <p>
              X-NET S.L. no será responsable por retrasos imputables a servicios de mensajería externa o causas de fuerza mayor.
            </p>
          </section>

          <section>
            <h2>6. Devoluciones y reclamaciones</h2>
            <p>
              Conforme a la normativa vigente sobre protección de los consumidores y usuarios, el usuario dispone de un plazo de 14 días naturales desde la recepción del dispositivo para ejercer su derecho de desistimiento, siempre que el producto no haya sido usado y se encuentre en su embalaje original, en perfecto estado.
            </p>
            <p>
              Para tramitar una devolución, el usuario deberá ponerse en contacto con el servicio de atención al cliente a través del correo electrónico indicado en el sitio web. X-NET S.L. facilitará instrucciones sobre cómo devolver el producto.
            </p>
            <p>
              Los gastos de devolución correrán a cargo del usuario, salvo que la devolución se deba a un defecto de fabricación, error en el envío o incumplimiento de las condiciones acordadas.
            </p>
            <p>
              Una vez recibido el dispositivo devuelto y verificado su estado, se procederá al reembolso del importe pagado por el cliente en un plazo máximo de 14 días naturales, utilizando el mismo método de pago empleado en la compra, salvo que el usuario solicite expresamente otro medio.
            </p>
          </section>

          <section>
            <h2>7. Garantía de los dispositivos</h2>
            <p>
              Todos los dispositivos de belleza de la marca Garett cuentan con una garantía del fabricante de 24 meses contra defectos de fabricación, siempre que el dispositivo haya sido utilizado conforme a las instrucciones del manual de uso.
            </p>
            <p>
              La garantía no cubre daños derivados del uso indebido, negligencia, caídas, golpes, exposición a líquidos no recomendados, manipulación no autorizada o desgaste normal del producto.
            </p>
            <p>
              Para hacer efectiva la garantía, el usuario deberá conservar el comprobante de compra y ponerse en contacto con el servicio de atención al cliente de X-NET S.L.
            </p>
          </section>

          <section>
            <h2>8. Propiedad intelectual</h2>
            <p>
              Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseños, vídeos, software) son propiedad de Garett Sp. z o.o. o de X-NET S.L., y están protegidos por las leyes de propiedad intelectual e industrial vigentes.
            </p>
            <p>
              Queda prohibida su reproducción, distribución, modificación, comunicación pública o cualquier otra forma de explotación sin autorización previa y expresa por escrito.
            </p>
          </section>

          <section>
            <h2>9. Protección de datos personales</h2>
            <p>
              Los datos personales proporcionados por los usuarios serán tratados conforme a lo establecido en la Política de Privacidad de X-NET S.L., disponible en este sitio web, y de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la normativa española aplicable.
            </p>
          </section>

          <section>
            <h2>10. Modificaciones de los términos y condiciones</h2>
            <p>
              X-NET S.L. se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán comunicadas a través del sitio web y entrarán en vigor desde su publicación. Se recomienda a los usuarios revisar periódicamente estos términos.
            </p>
          </section>

          <section>
            <h2>11. Legislación aplicable y jurisdicción</h2>
            <p>
              Estos términos y condiciones se rigen por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten expresamente a los juzgados y tribunales de Madrid (España), renunciando a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2>12. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos términos y condiciones, puede contactarnos en:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:info@garett.es">info@garett.es</a><br />
              <strong>Teléfono:</strong> +34 913822400
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TerminosCondiciones;
