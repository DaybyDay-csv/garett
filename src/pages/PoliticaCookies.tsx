import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PoliticaCookies = () => {
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
          <h1>Política de Cookies</h1>

          <section>
            <p>
              Las cookies son pequeños archivos de texto que se descargan en su dispositivo al acceder a nuestros sitios web y que pueden implicar la transferencia de datos a terceros. Utilizamos cookies de varias maneras, como por ejemplo:
            </p>
            <ul>
              <li>para permitirle navegar por el sitio web y usar sus funciones</li>
              <li>para ofrecerle publicidad relevante y medir la efectividad de la misma</li>
              <li>para garantizar que no se muestren más anuncios de los debidos (lo que se denomina «limitación de frecuencia»)</li>
              <li>para obtener más información sobre la forma en que interactúa con el contenido que ofrecemos en nuestros sitios</li>
              <li>para ayudarnos a mejorar su experiencia al visitar nuestros sitios web</li>
              <li>para recordar sus preferencias, como un idioma o una región, para que no tenga que personalizar el sitio web en cada visita</li>
              <li>para identificar los errores y resolverlos</li>
              <li>para analizar el rendimiento de nuestros sitios web</li>
            </ul>
            <p>
              Las cookies de Garett.es se clasifican en <strong>Esenciales</strong> (necesarias para que el sitio web funcione correctamente, como proporcionar un inicio de sesión seguro o recordar sus preferencias de cookies, y siempre están activas), <strong>Rendimiento</strong> (recopilan datos estadísticos de uso para optimizar y mejorar el sitio web), <strong>Preferencia</strong> (admitir funcionalidades mejoradas del sitio y recordar sus preferencias para futuras visitas) y <strong>Publicidad dirigida</strong> (incluidas las redes sociales) (realizar un seguimiento de su actividad dentro y fuera de los sitios web para ofrecerle anuncios personalizados).
            </p>
          </section>

          <section>
            <h2>Tipos de cookies que utilizamos</h2>

            <h3>Cookies estrictamente necesarias</h3>
            <p>
              Estas cookies (también referidas en ocasiones como «esenciales») permiten que la página se cargue o proporcionan alguna funcionalidad esencial sin la cual la página no funcionaría (por ejemplo, almacenar sus datos en un carrito de la compra).
            </p>

            <h3>Cookies funcionales</h3>
            <p>
              Estas cookies permiten a los sitios web recordar sus preferencias cuando vuelve a visitarlos. Por ejemplo, no tener que seleccionar una preferencia de idioma cada vez que visite nuestros sitios web.
            </p>

            <h3>Cookies de terceros</h3>
            <ul>
              <li>
                <strong>Cookies publicitarias:</strong> Estas cookies se pueden utilizar para conocer los intereses que generalmente puede tener, basándose, por ejemplo, en los sitios web que visita y los productos que compra. Esos datos nos permiten enviarle anuncios de productos y servicios que se ajusten mejor a las cosas que más le gustan o necesita. También nos permite limitar el número de veces que ve el mismo anuncio.
              </li>
              <li>
                <strong>Cookies analíticas:</strong> Estas cookies nos indican cómo utiliza nuestros sitios web, como qué páginas se ha visitado y en qué enlaces se ha hecho clic. De esta manera podemos medir y mejorar el rendimiento de nuestros sitios web.
              </li>
              <li>
                <strong>Cookies de redes sociales:</strong> Estas cookies, establecidas por una serie de servicios de redes sociales que hemos añadido al sitio, le permite compartir nuestro contenido con sus amigos y en sus redes, y nos permite contactar con usted con anuncios relacionados con su visita a nuestros sitios en esas plataformas. Las cookies de algunos sitios de redes sociales, por ejemplo, Facebook, también se utilizan para la segmentación de anuncios.
              </li>
            </ul>
          </section>

          <section>
            <h2>Cómo puede controlar las cookies</h2>
            <p>
              Puede configurar el navegador para que rechace todas las cookies o para que le indique cuándo se envía una cookie a su ordenador. Sin embargo, esto puede impedir que nuestros sitios o servicios funcionen correctamente. También puede configurar su navegador para que elimine las cookies cada vez que finalice la navegación.
            </p>
            <p>
              Cuando opta por no recibir publicidad basada en los intereses, se envía una cookie de exclusión a su navegador que indica que ya no desea recibir anuncios basados en intereses. Su cookie de exclusión se eliminará si decide eliminar todas las cookies de su navegador. Esto significa que tendrá que excluirse de nuevo en cada navegador en el que haya eliminado las cookies si todavía no desea recibir anuncios basados en los intereses.
            </p>
          </section>

          <section>
            <h2>Otras tecnologías que podemos utilizar</h2>
            <p>
              También utilizamos píxeles de seguimiento en nuestros correos electrónicos de marketing. Estos píxeles nos indican si ha abierto uno de nuestros correos y cuándo lo abrió. Utilizamos esta información para comprender mejor cómo interactúan los clientes con nuestros contenidos y para analizar la eficacia de nuestras campañas de marketing.
            </p>
          </section>

          <section>
            <h2>Actualización de esta política</h2>
            <p>
              Esta Política de Cookies puede ser actualizada en función de cambios legislativos o de la práctica operativa de la empresa. Le recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

          <section>
            <h2>Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre nuestra Política de Cookies, puede ponerse en contacto con nosotros en:
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

export default PoliticaCookies;
