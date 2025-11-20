import { Shield, Phone, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WarrantyPolicy() {
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
            <h1 className="text-3xl font-bold mb-2">Condiciones de Garantía Comercial del Fabricante</h1>
            <p className="text-muted-foreground">Garett Beauty</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">1.</span> Duración y Ámbito
            </h2>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li><strong className="text-foreground">Duración:</strong> 24 meses desde la fecha de compra indicada en el justificante.</li>
              <li><strong className="text-foreground">Ámbito:</strong> España. Garantía comercial del fabricante, adicional e independiente de la garantía legal del vendedor (3 años).</li>
            </ul>
          </section>

          <section className="space-y-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold mb-3">2. Política Higiénico-Sanitaria</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Por razones higiénico-sanitarias, los productos de cuidado personal y contacto corporal directo 
                  (depiladoras, dispositivos faciales, limpiadores ultrasónicos, masajeadores, cepillos, mascarillas LED, 
                  IPL, EMS, RF, etc.) <strong className="text-foreground">no podrán devolverse ni cambiarse una vez desprecintados o utilizados</strong>, 
                  conforme al artículo 103.e) del RDL 1/2007. Solo se admitirán devoluciones por defecto técnico o fallo de 
                  fabricación verificado.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">3.</span> Cobertura
            </h2>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Defectos de materiales y fabricación del dispositivo principal en condiciones normales de uso.</li>
              <li>Requiere prueba de compra válida.</li>
              <li>Solución del fabricante: reparación, sustitución por unidad equivalente o reembolso si la reparación no es viable.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">4.</span> Obligaciones del Usuario
            </h2>
            <ol className="space-y-2 text-muted-foreground ml-6 list-[lower-alpha]">
              <li>Leer y cumplir el manual y estas condiciones.</li>
              <li>Presentar reclamación conforme al punto 6 al detectar el defecto.</li>
              <li>Cesar el uso del producto ante cualquier defecto.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">5.</span> Exclusiones
            </h2>
            <p className="text-muted-foreground mb-3">La garantía NO cubre:</p>
            <ol className="space-y-3 text-muted-foreground ml-6">
              <li><strong className="text-foreground">1)</strong> Daños mecánicos o químicos: golpes, caídas, líquidos, corrosión, sobretensiones.</li>
              <li><strong className="text-foreground">2)</strong> Uso inadecuado o distinto del previsto.</li>
              <li><strong className="text-foreground">3)</strong> Materiales o cosméticos no recomendados.</li>
              <li><strong className="text-foreground">4)</strong> Modificaciones o reparaciones por terceros.</li>
              <li><strong className="text-foreground">5)</strong> Consumibles: cabezales, rodillos, adhesivos EMS, filtros, boquillas, accesorios, cables, adaptadores, baterías.</li>
              <li><strong className="text-foreground">6)</strong> Daños de transporte por embalaje inadecuado enviado por el usuario.</li>
              <li><strong className="text-foreground">7)</strong> Daños estéticos sin afectar a funcionalidad.</li>
              <li><strong className="text-foreground">8)</strong> Seriales manipulados o sin prueba de compra.</li>
              <li><strong className="text-foreground">9)</strong> Uso comercial si el producto es doméstico.</li>
            </ol>
          </section>

          <section className="space-y-4 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">6.</span> Procedimiento de Reclamación
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Aportar ticket o factura con fecha legible.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span>Contactar con el Servicio Técnico Autorizado X-Net:</span>
                  <div className="mt-2 space-y-1 bg-background rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href="tel:913812400" className="font-semibold hover:text-primary">913 81 24 00</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Facilitar descripción del defecto y fotos/vídeo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Enviar el producto limpio, completo y adecuadamente embalado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>La evaluación técnica determinará la cobertura.</span>
              </li>
            </ul>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md p-4">
                <p className="font-semibold text-foreground mb-1">Si está cubierto:</p>
                <p className="text-sm text-muted-foreground">Reparación o sustitución en un plazo máximo de 30 días.</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-md p-4">
                <p className="font-semibold text-foreground mb-1">Si no está cubierto:</p>
                <p className="text-sm text-muted-foreground">Presupuesto o devolución sin coste de reparación.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">7.</span> Alcance de la Reparación
            </h2>
            <p className="text-muted-foreground">
              La reparación o sustitución no amplía la duración total de la garantía, pero el periodo queda suspendido 
              mientras el producto permanece en el SAT. Las piezas sustituidas pueden ser nuevas o reacondicionadas equivalentes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">8.</span> Limitación de Responsabilidad
            </h2>
            <p className="text-muted-foreground">
              La garantía cubre únicamente el producto, no pérdidas indirectas, costes de inmovilización ni accesorios de terceros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">9.</span> Compatibilidad con la Garantía Legal
            </h2>
            <p className="text-muted-foreground">
              Esta garantía comercial es adicional y no limita los derechos del consumidor frente al vendedor, conforme a la 
              Directiva (UE) 2019/771.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">¿Tienes dudas sobre tu garantía?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nuestro equipo está aquí para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default">
                  <a href="tel:913812400">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar al SAT
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
}