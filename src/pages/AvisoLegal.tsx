import { Scale, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AvisoLegal = () => {
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
            <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Aviso Legal</h1>
            <p className="text-muted-foreground">Garett España</p>
          </div>

          <section className="space-y-4 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Información sobre la empresa</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Propiedad</h3>
                    <p className="text-muted-foreground">
                      Este sitio web es propiedad de la empresa <strong className="text-foreground">X-NET S.L.</strong>, con CIF: <strong className="text-foreground">B-80406770</strong> y domicilio social en: <strong className="text-foreground">Calle Tomás Redondo, 3. 1ª planta Nave 5, 28033, Madrid (España)</strong>. Inscrita en el Registro Mercantil de Madrid, Tomo 4422, Libro 0, Folio 159, Hoja nº M-72515.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Propiedad intelectual</h3>
            <div className="text-muted-foreground space-y-3">
              <p>
                Todos los contenidos de este sitio web, incluyendo a título enunciativo pero no limitativo el diseño gráfico, las imágenes, los vídeos, las animaciones, los textos, el software, los productos y demás elementos contenidos en el dominio Garett.es, así como los signos distintivos (marcas, nombres comerciales, logotipos), son propiedad de <strong className="text-foreground">Garett Sp. z o.o.</strong>, empresa constituida conforme a las leyes de Polonia, o bien han sido licenciados en favor de X-NET S.L. para su uso en el territorio español.
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
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Responsabilidad</h3>
            <div className="text-muted-foreground space-y-3">
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
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Acceso al sitio web</h3>
            <p className="text-muted-foreground">
              X-NET S.L. se reserva el derecho de modificar, terminar, suspender o interrumpir en cualquier momento, por cualquier razón y a su sola discreción, el acceso a todo o parte del sitio web, incluyendo en particular el contenido, las características o las horas de disponibilidad sin previo aviso.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Contacto</h3>
            <div className="text-muted-foreground space-y-3">
              <p>
                Te invitamos a que te pongas en contacto con nosotros en relación con cualquier cuestión o comentario sobre el sitio web mediante correo electrónico: <a href="mailto:info@garett.es" className="text-primary hover:underline">info@garett.es</a>
              </p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Scale className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">¿Tienes dudas legales?</h3>
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

export default AvisoLegal;