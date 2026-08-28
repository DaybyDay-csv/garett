import { Cookie, Mail, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PoliticaCookies = () => {
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
            <Cookie className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
            <p className="text-muted-foreground">Garett España</p>
          </div>

          <section className="space-y-4">
            <div className="text-muted-foreground space-y-3">
              <p>
                Las cookies son pequeños archivos de texto que se descargan en su dispositivo al acceder a nuestros sitios web y que pueden implicar la transferencia de datos a terceros. Utilizamos cookies de varias maneras, como por ejemplo:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
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
                Las cookies de Garett.es se clasifican en <strong className="text-foreground">Esenciales</strong> (necesarias para que el sitio web funcione correctamente, como proporcionar un inicio de sesión seguro o recordar sus preferencias de cookies, y siempre están activas), <strong className="text-foreground">Rendimiento</strong> (recopilan datos estadísticos de uso para optimizar y mejorar el sitio web), <strong className="text-foreground">Preferencia</strong> (admitir funcionalidades mejoradas del sitio y recordar sus preferencias para futuras visitas) y <strong className="text-foreground">Publicidad dirigida</strong> (incluidas las redes sociales) (realizar un seguimiento de su actividad dentro y fuera de los sitios web para ofrecerle anuncios personalizados).
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Tipos de cookies que utilizamos</h2>

            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Cookies estrictamente necesarias</h3>
                <p className="text-muted-foreground text-sm">
                  Estas cookies (también referidas en ocasiones como «esenciales») permiten que la página se cargue o proporcionan alguna funcionalidad esencial sin la cual la página no funcionaría (por ejemplo, almacenar sus datos en un carrito de la compra).
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Cookies funcionales</h3>
                <p className="text-muted-foreground text-sm">
                  Estas cookies permiten a los sitios web recordar sus preferencias cuando vuelve a visitarlos. Por ejemplo, no tener que seleccionar una preferencia de idioma cada vez que visite nuestros sitios web.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Cookies de terceros</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong className="text-foreground">Cookies publicitarias:</strong> Estas cookies se pueden utilizar para conocer los intereses que generalmente puede tener, basándose, por ejemplo, en los sitios web que visita y los productos que compra. Esos datos nos permiten enviarle anuncios de productos y servicios que se ajusten mejor a las cosas que más le gustan o necesita. También nos permite limitar el número de veces que ve el mismo anuncio.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong className="text-foreground">Cookies analíticas:</strong> Estas cookies nos indican cómo utiliza nuestros sitios web, como qué páginas se ha visitado y en qué enlaces se ha hecho clic. De esta manera podemos medir y mejorar el rendimiento de nuestros sitios web.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong className="text-foreground">Cookies de redes sociales:</strong> Estas cookies, establecidas por una serie de servicios de redes sociales que hemos añadido al sitio, le permite compartir nuestro contenido con sus amigos y en sus redes, y nos permite contactar con usted con anuncios relacionados con su visita a nuestros sitios en esas plataformas. Las cookies de algunos sitios de redes sociales, por ejemplo, Facebook, también se utilizan para la segmentación de anuncios.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Cómo puede controlar las cookies</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Puede configurar el navegador para que rechace todas las cookies o para que le indique cuándo se envía una cookie a su ordenador. Sin embargo, esto puede impedir que nuestros sitios o servicios funcionen correctamente. También puede configurar su navegador para que elimine las cookies cada vez que finalice la navegación.
                  </p>
                  <p>
                    Cuando opta por no recibir publicidad basada en los intereses, se envía una cookie de exclusión a su navegador que indica que ya no desea recibir anuncios basados en intereses. Su cookie de exclusión se eliminará si decide eliminar todas las cookies de su navegador. Esto significa que tendrá que excluirse de nuevo en cada navegador en el que haya eliminado las cookies si todavía no desea recibir anuncios basados en los intereses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Otras tecnologías que podemos utilizar</h2>
            <p className="text-muted-foreground">
              También utilizamos píxeles de seguimiento en nuestros correos electrónicos de marketing. Estos píxeles nos indican si ha abierto uno de nuestros correos y cuándo lo abrió. Utilizamos esta información para comprender mejor cómo interactúan los clientes con nuestros contenidos y para analizar la eficacia de nuestras campañas de marketing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Actualización de esta política</h2>
            <p className="text-muted-foreground">
              Esta Política de Cookies puede ser actualizada en función de cambios legislativos o de la práctica operativa de la empresa. Le recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Contacto</h2>
            <div className="text-muted-foreground space-y-3">
              <p>
                Si tiene alguna pregunta sobre nuestra Política de Cookies, puede ponerse en contacto con nosotros en:
              </p>
              <div className="bg-muted/50 rounded-md p-4 space-y-2">
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:info@garett.es" className="text-primary hover:underline">info@garett.es</a></p>
                <p><strong className="text-foreground">Teléfono:</strong> +34 679 23 51 48</p>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Cookie className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">¿Tienes dudas sobre cookies?</h3>
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
                  <a href="mailto:info@garett.es">
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

export default PoliticaCookies;