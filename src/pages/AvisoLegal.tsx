import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const AvisoLegal = () => {
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
          <h1>Aviso Legal</h1>

          <section>
            <h2>Información sobre la empresa</h2>
            
            <h3>Propiedad</h3>
            <p>
              Este sitio web es propiedad de la empresa <strong>X-NET S.L.</strong>, con CIF: <strong>B-80406770</strong> y domicilio social en: <strong>Calle Tomás Redondo, 3. 1ª planta Nave 5, 28033, Madrid (España)</strong>. Inscrita en el Registro Mercantil de Madrid, Tomo 4422, Libro 0, Folio 159, Hoja nº M-72515.
            </p>
          </section>

          <section>
            <h3>Propiedad intelectual</h3>
            <p>
              Todos los contenidos de este sitio web, incluyendo a título enunciativo pero no limitativo el diseño gráfico, las imágenes, los vídeos, las animaciones, los textos, el software, los productos y demás elementos contenidos en el dominio Garett.es, así como los signos distintivos (marcas, nombres comerciales, logotipos), son propiedad de <strong>Garett Sp. z o.o.</strong>, empresa constituida conforme a las leyes de Polonia, o bien han sido licenciados en favor de X-NET S.L. para su uso en el territorio español.
            </p>
            <p>
              Asimismo, determinados contenidos creados directamente por X-NET S.L., tales como textos descriptivos, fotografías, materiales promocionales o elementos gráficos originales, son propiedad exclusiva de X-NET S.L., quedando igualmente protegidos por la normativa nacional e internacional sobre propiedad intelectual e industrial.
            </p>
            <p>
              Se prohíbe expresamente la reproducción, distribución, comunicación pública, puesta a disposición, transformación o cualquier otro acto de explotación, total o parcial, de los contenidos de este sitio web sin la autorización previa, expresa y por escrito de Garett Sp. z o.o. o de X-NET S.L., según corresponda.
            </p>
            <p>
              El usuario únicamente podrá utilizar los contenidos del sitio web para su uso personal y privado, comprometiéndose a no utilizarlos con fines comerciales no autorizados ni a vulnerar los derechos de propiedad intelectual o industrial de Garett Sp. z o.o., de X-NET S.L., o de terceros.
            </p>
            <p>
              Ambas empresas se reservan el derecho de perseguir cualquier acto de infracción de sus derechos de propiedad intelectual, incluso en el contexto de un procedimiento penal.
            </p>
          </section>

          <section>
            <h3>Responsabilidad</h3>
            <p>
              Toda la información accesible a través de este sitio web se proporciona de buena fe y a título meramente informativo. X-NET S.L. no ofrece garantías de ninguna clase, expresas o implícitas, sobre la integridad, exactitud, actualización o disponibilidad de los contenidos, productos o servicios ofrecidos en este sitio web, ni garantiza que el acceso al mismo sea ininterrumpido o libre de errores.
            </p>
            <p>
              X-NET S.L. no será responsable de los daños o perjuicios, directos o indirectos, que puedan derivarse del acceso, uso o imposibilidad de acceso o uso de este sitio web, incluidos daños en sistemas informáticos o provocados por virus o ciberataques.
            </p>
            <p>
              El usuario asume toda responsabilidad derivada del uso que haga de la información publicada en este sitio web, incluyendo aquella relativa a productos, precios, disponibilidad o características, los cuales pueden estar sujetos a cambios sin previo aviso.
            </p>
            <p>
              Queda prohibido al usuario introducir en este sitio web contenidos ilícitos o contrarios a las leyes vigentes, al orden público o a derechos de terceros, asumiendo en todo caso la plena responsabilidad de los daños y perjuicios que pudiera causar.
            </p>
            <p>
              Los enlaces a sitios web de terceros que puedan aparecer en este sitio web tienen únicamente finalidad informativa. X-NET S.L. no se responsabiliza de los contenidos, productos, servicios o políticas de privacidad de dichos sitios web externos.
            </p>
          </section>

          <section>
            <h3>Acceso al sitio web</h3>
            <p>
              X-NET S.L. se reserva el derecho de modificar, terminar, suspender o interrumpir en cualquier momento, por cualquier razón y a su sola discreción, el acceso a todo o parte del sitio web, incluyendo en particular el contenido, las características o las horas de disponibilidad sin previo aviso.
            </p>
          </section>

          <section>
            <h3>Contacto</h3>
            <p>
              Te invitamos a que te pongas en contacto con nosotros en relación con cualquier cuestión o comentario sobre el sitio web mediante correo electrónico: <a href="mailto:info@garett.es">info@garett.es</a>
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AvisoLegal;
