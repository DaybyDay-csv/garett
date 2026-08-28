import { Shield, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-12 px-4">
        <div className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Volver a inicio
          </Link>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-8">
          <div className="text-center border-b pb-6">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
            <p className="text-muted-foreground">Junio 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">1.</span> Introducción
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                La presente Política de Privacidad (la «Política») describe cómo X-Net S.L. (en adelante, "X-Net" o "nosotros") recoge, utiliza, almacena, comparte y protege la información personal derivada del acceso desde nuestros establecimientos físicos, canales telefónicos y entornos digitales, siendo estos últimos la presente página web www.garettespaña.es (en adelante "la Página Web") así como nuestra aplicación móvil (en adelante la "App") (en adelante, y de forma conjunta los "Canales") a determinadas áreas, servicios, y productos por parte de los usuarios (en adelante, los "Usuarios" e individualmente considerados el «Usuario») a través de dichos Canales, formalicen o no una relación contractual con nosotros.
              </p>
              <p className="text-foreground font-medium">En particular, la presente Política informa a los Usuarios sobre:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Qué datos de carácter personal recogemos.</li>
                <li>Con qué finalidad recogemos esta información.</li>
                <li>Cómo la utilizaremos.</li>
                <li>Durante cuánto tiempo dispondremos de ella.</li>
                <li>Quién tendrá acceso a la misma.</li>
                <li>Cuáles son sus derechos con relación a sus datos personales y cómo podrán ejercitarlos.</li>
              </ul>
              <p>
                Asimismo, durante tu navegación por el Sitio Web, instalaremos "cookies" en tu dispositivo u ordenador. Por favor, revisa nuestra <Link to="/politica-cookies" className="text-primary hover:underline">Política de Cookies</Link> para ampliar la información acerca de qué cookies utilizamos y cómo modificar los permisos sobre cookies en tus dispositivos.
              </p>
              <p>
                En relación con el uso y navegación de la Página Web y de la App, X-Net almacena los datos del dispositivo de conexión que el Usuario utiliza para acceder a los servicios ofrecidos a través de éstos. En este sentido cuando el Usuario accede a la Página Web o a la App, el sistema donde ambas están alojadas reconoce automáticamente la dirección "IP" de tu dispositivo, información sobre tu dispositivo, el tipo de dispositivo, tu conexión a Internet, tu tipo de navegador, la versión y el sistema operativo, el día y la hora a la que has entrado, a la que te has desconectado, y por qué áreas de nuestras Página Web y/o App te has movido (clickstream). Nuestro sistema ha de conocer estos datos e informaciones de tu dispositivo porque tiene que poder comunicarse con él para enviarte lo que le pidas a través de tu navegador y, en consecuencia, para que tu, como Usuario puedas verlo en tu pantalla.
              </p>
              <p>
                Ni nuestro sistema ni nosotros mismos podemos conocer tus datos personales, como por ejemplo nombre, dirección, teléfono, etc., si no ha sido el propio Usuario quien nos los ha proporcionado.
              </p>
              <p>
                Si tienes cualquier duda acerca de los tratamientos de datos descritos en la Política, puedes realizar una consulta a administracion@x-net.es.
              </p>
              <p>
                El Usuario declara bajo su responsabilidad y garantiza que los datos que facilita a X-Net son ciertos, correctos y que le pertenecen. En el caso que el Usuario proporcionase así como y datos personales de terceros, garantiza haberles informado previamente del correspondiente tratamiento, de acuerdo con el contenido de la presente Política, y, en caso de ser necesario, haber recabado su previo consentimiento expreso para el tratamiento en concreto. En este sentido, es obligación de los Usuarios mantener actualizados los datos de tal forma que correspondan con la realidad en cada momento. Cualquier manifestación falsa o inexacta que se produzca como consecuencia de los datos manifestados, así como los perjuicios que tal información pudiera causar, será responsabilidad directa y exclusiva de los Usuarios.
              </p>
              <p>
                Nuestro Sitio Web y las aplicaciones que eventualmente podamos utilizar, no están dirigidas a los niños y no recogemos, conscientemente, datos de menores.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">2.</span> ¿Quién es el responsable del tratamiento de tus datos personales?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                El responsable del tratamiento de tus datos personales es <strong className="text-foreground">X-NET S.L.</strong>, con CIF: <strong className="text-foreground">B-80406770</strong> y domicilio social en: <strong className="text-foreground">Calle Tomás Redondo, 3. 1ª planta Nave 5, 28033, Madrid (España)</strong>.
              </p>
              <p>
                Puede ponerse en contacto con nosotros mediante correo electrónico a: <a href="mailto:administracion@x-net.es" className="text-primary hover:underline">administracion@x-net.es</a>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">3.</span> ¿Qué datos personales recogemos?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>Recogemos diferentes tipos de información personal según la naturaleza de la interacción:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong className="text-foreground">Datos de identificación:</strong> nombre, apellidos, DNI/NIE, fecha de nacimiento.</li>
                <li><strong className="text-foreground">Datos de contacto:</strong> dirección postal, correo electrónico, número de teléfono.</li>
                <li><strong className="text-foreground">Datos de navegación:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas.</li>
                <li><strong className="text-foreground">Datos de compra:</strong> historial de pedidos, métodos de pago utilizados, direcciones de envío.</li>
                <li><strong className="text-foreground">Datos de preferencias:</strong> productos de interés, preferencias de comunicación.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">4.</span> ¿Con qué finalidad tratamos tus datos personales?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>Tratamos tus datos personales para las siguientes finalidades:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Gestionar y procesar tus pedidos de productos.</li>
                <li>Facilitar el envío y entrega de los dispositivos adquiridos.</li>
                <li>Gestionar devoluciones, reclamaciones y garantías.</li>
                <li>Enviar comunicaciones comerciales y promocionales (con tu consentimiento previo).</li>
                <li>Mejorar la experiencia de usuario en nuestro sitio web.</li>
                <li>Cumplir con obligaciones legales y fiscales.</li>
                <li>Prevenir fraudes y garantizar la seguridad del sitio web.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">5.</span> Base jurídica del tratamiento
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>El tratamiento de tus datos personales se fundamenta en:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong className="text-foreground">Ejecución de un contrato:</strong> para gestionar y procesar tus pedidos.</li>
                <li><strong className="text-foreground">Consentimiento del usuario:</strong> para el envío de comunicaciones comerciales.</li>
                <li><strong className="text-foreground">Interés legítimo:</strong> para mejorar nuestros servicios y prevenir fraudes.</li>
                <li><strong className="text-foreground">Obligación legal:</strong> para cumplir con normativas fiscales y comerciales.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">6.</span> ¿Durante cuánto tiempo conservamos tus datos?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                Conservaremos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos. En particular:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Datos de pedidos y facturación: durante el plazo legal de conservación de facturas (4 años desde la emisión).</li>
                <li>Datos de marketing: hasta que solicites la baja de nuestras comunicaciones.</li>
                <li>Datos de navegación: según lo establecido en nuestra Política de Cookies.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">7.</span> ¿Compartimos tus datos con terceros?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                Podemos compartir tus datos personales con terceros en los siguientes casos:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong className="text-foreground">Proveedores de servicios:</strong> empresas de mensajería para la entrega de pedidos, procesadores de pago, servicios de hosting.</li>
                <li><strong className="text-foreground">Obligaciones legales:</strong> cuando sea requerido por autoridades competentes.</li>
                <li><strong className="text-foreground">Transferencias internacionales:</strong> en algunos casos, tus datos pueden ser transferidos fuera del Espacio Económico Europeo, garantizando siempre un nivel adecuado de protección.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">8.</span> ¿Cuáles son tus derechos?
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>Tienes derecho a:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong className="text-foreground">Acceso:</strong> conocer qué datos personales tenemos sobre ti.</li>
                <li><strong className="text-foreground">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong className="text-foreground">Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
                <li><strong className="text-foreground">Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
                <li><strong className="text-foreground">Limitación:</strong> solicitar la limitación del tratamiento.</li>
                <li><strong className="text-foreground">Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</li>
                <li><strong className="text-foreground">Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
              </ul>
              <p>
                Para ejercer estos derechos, puedes enviar un correo electrónico a: <a href="mailto:administracion@x-net.es" className="text-primary hover:underline">administracion@x-net.es</a>
              </p>
              <p>
                Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>) si consideras que el tratamiento de tus datos vulnera la normativa vigente.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">9.</span> Seguridad de los datos
            </h2>
            <p className="text-muted-foreground">
              En X-NET S.L. aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos personales frente a accesos no autorizados, pérdida, destrucción o alteración. Sin embargo, ningún sistema de transmisión por Internet o de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar la seguridad absoluta.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">10.</span> Modificaciones de la Política de Privacidad
            </h2>
            <p className="text-muted-foreground">
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Las modificaciones serán notificadas a través del sitio web y entrarán en vigor desde su publicación. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">11.</span> Contacto
            </h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad o sobre cómo tratamos tus datos personales, puedes contactarnos en:
              </p>
              <div className="bg-muted/50 rounded-md p-4 space-y-2">
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:administracion@x-net.es" className="text-primary hover:underline">administracion@x-net.es</a></p>
                <p><strong className="text-foreground">Teléfono:</strong> +34 679 23 51 48</p>
                <p><strong className="text-foreground">Dirección postal:</strong> Calle Tomás Redondo, 3. 1ª planta Nave 5, 28033, Madrid (España)</p>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">¿Tienes dudas sobre privacidad?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nuestro equipo está aquí para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default">
                  <a href="tel:+34679235148">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar ahora
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:administracion@x-net.es">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;