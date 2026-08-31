import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { contactConfig } from "@/config/contact.config";

export const metadata: Metadata = {
  title: "Política de Privacidad | AFAP",
  description:
    "Política de Privacidad del sitio web de AFAP San Juan de Dios - La Paz.",
};

interface PolicySectionProps {
  children: ReactNode;
  title: string;
}

function PolicySection({ children, title }: PolicySectionProps) {
  return (
    <section className="border-t border-border pt-8 first:border-0 first:pt-0">
      <h2 className="text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 grid gap-4 leading-7 text-foreground">
        {children}
      </div>
    </section>
  );
}

const listClassName = "grid list-disc gap-2 pl-6";

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Container className="max-w-5xl">
        <header className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -right-8 size-28 rounded-full bg-secondary/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-20 bottom-5 size-3 rounded-full bg-accent"
          />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.16em] text-primary uppercase">
              Privacidad y protección de datos
            </p>
            <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-sm font-semibold text-muted sm:text-base">
              Última actualización: 31 de agosto de 2026
            </p>
          </div>
        </header>

        <article className="mt-8 rounded-3xl border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-4 border-b border-border pb-10 text-lg leading-8 text-foreground">
            <p>
              En AFAP respetamos la privacidad de las personas que
              visitan nuestro sitio web y se comunican con nosotros.
              Esta Política de Privacidad explica qué información
              podemos recopilar a través del sitio, para qué la
              utilizamos, cómo procuramos protegerla y qué opciones
              tienen las personas respecto de sus datos.
            </p>
            <p>
              Al utilizar nuestro formulario de contacto, te
              recomendamos leer esta política antes de proporcionar
              información personal.
            </p>
          </div>

          <div className="mt-10 grid gap-10">
            <PolicySection title="1. ¿Quién es responsable de la información?">
              <p>
                El responsable de la información recibida a través de
                este sitio web es la Asociación de Familiares y Amigos
                de Pacientes con Discapacidad Mental y/o Psíquica de San
                Juan de Dios - La Paz (AFAP), asociación de derecho
                privado sin fines de lucro con domicilio legal en la
                ciudad de La Paz, Bolivia.
              </p>
              <p>
                Las consultas relacionadas con privacidad podrán
                realizarse mediante el correo electrónico de contacto de
                AFAP indicado en este sitio web.
              </p>
            </PolicySection>

            <PolicySection title="2. ¿Qué información recopilamos?">
              <p>
                Cuando una persona utiliza el formulario de contacto,
                podemos solicitar:
              </p>
              <ul className={listClassName}>
                <li>nombre completo;</li>
                <li>correo electrónico;</li>
                <li>celular o WhatsApp, de manera opcional;</li>
                <li>asunto de la consulta;</li>
                <li>contenido del mensaje;</li>
                <li>
                  confirmación de haber leído y aceptado esta Política
                  de Privacidad.
                </li>
              </ul>
              <p>
                El sitio también puede procesar determinados datos y
                señales técnicas necesarios para su funcionamiento,
                seguridad, prevención de spam y detección de tráfico
                automatizado. Cloudflare Turnstile procesa señales
                técnicas para distinguir el tráfico humano del
                automatizado; esta verificación no requiere que
                Cloudflare reciba el contenido del mensaje enviado a
                AFAP.
              </p>
              <p>
                No solicitamos mediante este formulario contraseñas,
                información bancaria ni documentación de identidad.
              </p>
            </PolicySection>

            <PolicySection title="3. Información médica y otros datos sensibles">
              <p>
                Debido a la naturaleza de las actividades de AFAP,
                entendemos que algunas consultas pueden estar
                relacionadas con situaciones personales o familiares de
                salud mental.
              </p>
              <p>
                Sin embargo, el formulario general de contacto no está
                diseñado para recopilar historias clínicas, diagnósticos
                detallados, tratamientos, resultados médicos, documentos
                de identidad u otra información sensible que no resulte
                necesaria para realizar la consulta.
              </p>
              <p>
                Por tu privacidad, evita incluir información médica
                sensible innecesaria.
              </p>
              <p>
                También te pedimos que no proporciones datos personales
                o de salud de otra persona sin contar con su autorización
                o una razón legítima para hacerlo.
              </p>
              <p>
                Si una persona proporciona voluntariamente información
                sensible que no fue solicitada por AFAP, procuraremos
                limitar su utilización a lo estrictamente necesario para
                comprender y atender la comunicación recibida.
              </p>
            </PolicySection>

            <PolicySection title="4. ¿Para qué utilizamos la información?">
              <p>
                La información proporcionada mediante el formulario
                podrá utilizarse para:
              </p>
              <ul className={listClassName}>
                <li>recibir, organizar y responder consultas;</li>
                <li>
                  proporcionar información sobre AFAP y sus actividades;
                </li>
                <li>
                  atender solicitudes relacionadas con orientación y
                  apoyo general;
                </li>
                <li>
                  facilitar información sobre recursos disponibles;
                </li>
                <li>
                  responder consultas sobre participación o colaboración
                  con la asociación;
                </li>
                <li>
                  mantener la comunicación necesaria para atender una
                  solicitud;
                </li>
                <li>
                  proteger el formulario y el sitio frente a spam,
                  automatizaciones abusivas o problemas de seguridad.
                </li>
              </ul>
              <p>
                Los datos proporcionados mediante el formulario no serán
                utilizados para fines comerciales ajenos a las
                actividades de AFAP.
              </p>
            </PolicySection>

            <PolicySection title="5. Consentimiento">
              <p>
                Antes de enviar el formulario se solicita aceptar
                expresamente esta Política de Privacidad.
              </p>
              <p>
                El consentimiento permitirá a AFAP utilizar los datos
                proporcionados para recibir y atender la consulta.
              </p>
              <p>
                La aceptación de esta política no autoriza a AFAP a
                utilizar la información para finalidades diferentes de
                las aquí descritas.
              </p>
              <p>
                La persona podrá posteriormente solicitar que dejemos de
                utilizar o eliminemos la información proporcionada,
                cuando corresponda y siempre que no exista una razón
                legítima u obligación aplicable que requiera conservarla.
              </p>
            </PolicySection>

            <PolicySection title="6. ¿Quién puede acceder a la información?">
              <p>
                La información recibida mediante el formulario será
                accesible únicamente por personas autorizadas por la
                Directiva de AFAP que necesiten acceder a ella para
                atender las consultas recibidas o realizar las
                actividades correspondientes.
              </p>
              <p>
                AFAP no venderá, alquilará ni comercializará los datos
                personales obtenidos mediante el formulario.
              </p>
              <p>
                Determinados proveedores tecnológicos intervienen cuando
                resulta necesario para el alojamiento, entrega de
                contenido, seguridad, protección frente a abuso o envío
                de comunicaciones del sitio web.
              </p>
              <p>
                En el formulario, Vercel proporciona la infraestructura
                y el control de frecuencia de solicitudes, Cloudflare
                Turnstile realiza la verificación anti-spam y Resend
                procesa el correo generado por la consulta. Sanity,
                Google Calendar y YouTube sirven o muestran contenido del
                sitio, pero no reciben automáticamente los mensajes del
                formulario.
              </p>
            </PolicySection>

            <PolicySection title="7. Conservación de la información">
              <p>
                Los datos proporcionados mediante el formulario serán
                conservados únicamente durante el tiempo razonablemente
                necesario para gestionar y dar seguimiento a la consulta.
              </p>
              <p>
                Como criterio general, procuraremos que los mensajes y
                sus datos asociados no se conserven durante más de 12
                meses, salvo que exista una necesidad justificada, una
                solicitud en curso o una obligación aplicable que
                requiera conservar determinada información durante un
                periodo diferente.
              </p>
              <p>
                Cuando la información deje de ser necesaria, procuraremos
                eliminarla de los medios bajo control de AFAP en los que
                ya no exista una razón para conservarla.
              </p>
            </PolicySection>

            <PolicySection title="8. Seguridad">
              <p>
                AFAP procurará adoptar medidas técnicas y organizativas
                razonables para proteger la información frente al acceso,
                modificación, divulgación, pérdida o utilización no
                autorizados.
              </p>
              <p>
                El acceso a las comunicaciones recibidas deberá limitarse
                a las personas autorizadas para atenderlas.
              </p>
              <p>
                Sin embargo, ningún sistema conectado a Internet puede
                garantizar seguridad absoluta. Por esta razón, también
                recomendamos no transmitir mediante el formulario
                información sensible que no sea necesaria.
              </p>
            </PolicySection>

            <PolicySection title="9. Servicios tecnológicos de terceros">
              <p>
                Para operar el sitio web utilizamos los siguientes
                servicios tecnológicos externos:
              </p>
              <ul className="grid gap-5">
                <li>
                  <strong>Vercel:</strong> alojamiento, entrega del sitio
                  e infraestructura técnica, incluida la protección por
                  límite de solicitudes.
                </li>
                <li>
                  <strong>Cloudflare Turnstile:</strong> protección del
                  formulario frente a bots, spam y abuso mediante el
                  procesamiento de señales técnicas necesarias para esa
                  función.
                </li>
                <li>
                  <strong>Resend:</strong> procesamiento y envío de los
                  correos generados por el formulario de contacto.
                </li>
                <li>
                  <strong>Sanity:</strong> gestión y entrega del contenido
                  editorial público y de los recursos del sitio.
                </li>
                <li>
                  <strong>Google Calendar:</strong> presentación de las
                  actividades públicas mediante un calendario embebido.
                </li>
                <li>
                  <strong>YouTube:</strong> reproducción de videos
                  embebidos mediante el dominio youtube-nocookie.com, en
                  modo de privacidad mejorada.
                </li>
              </ul>
              <p>
                Al cargar o interactuar con contenido o servicios
                embebidos, el proveedor correspondiente puede procesar
                información técnica conforme a sus propias políticas y
                en la medida necesaria para prestar el servicio. El uso
                del modo de privacidad mejorada de YouTube no implica que
                no exista ningún tratamiento de datos.
              </p>
            </PolicySection>

            <PolicySection title="10. Solicitudes sobre tus datos">
              <p>
                Una persona que haya proporcionado información mediante
                el sitio podrá ponerse en contacto con AFAP para
                solicitar, cuando corresponda:
              </p>
              <ul className={listClassName}>
                <li>
                  conocer qué información proporcionada por ella conserva
                  AFAP;
                </li>
                <li>
                  corregir información incorrecta o desactualizada;
                </li>
                <li>
                  solicitar la eliminación de información que ya no
                  resulte necesaria;
                </li>
                <li>
                  retirar su consentimiento para usos posteriores basados
                  en dicho consentimiento.
                </li>
              </ul>
              <p>
                Las solicitudes podrán realizarse al correo de privacidad
                indicado por AFAP.
              </p>
              <p>
                AFAP podrá solicitar información razonable para comprobar
                que la solicitud corresponde a la persona cuyos datos se
                pretende consultar, modificar o eliminar.
              </p>
            </PolicySection>

            <PolicySection title="11. Información de menores y datos de terceros">
              <p>
                Este formulario general no está destinado a solicitar
                información personal sensible de menores de edad.
              </p>
              <p>
                Si una consulta involucra a un menor o a otra persona,
                recomendamos proporcionar únicamente la información
                estrictamente necesaria y evitar incluir información
                médica o personal sensible que permita identificarla
                cuando no sea imprescindible.
              </p>
              <p>
                Quien proporcione datos de otra persona debe procurar
                contar con autorización o fundamento suficiente para
                hacerlo.
              </p>
            </PolicySection>

            <PolicySection title="12. El formulario no es un servicio de emergencias">
              <p>
                El formulario de contacto de AFAP tiene una finalidad
                informativa y de comunicación con la asociación.
              </p>
              <p>
                No constituye un servicio de emergencias, atención
                médica, diagnóstico, tratamiento ni sustituye la atención
                proporcionada por profesionales de salud.
              </p>
              <p>
                Los mensajes enviados mediante el sitio pueden no ser
                revisados inmediatamente.
              </p>
              <p>
                Ante una situación que requiera atención inmediata, la
                persona deberá recurrir a los servicios de emergencia o
                atención profesional correspondientes.
              </p>
            </PolicySection>

            <PolicySection title="13. Enlaces a otros sitios">
              <p>
                El sitio de AFAP puede contener enlaces a páginas o
                servicios externos.
              </p>
              <p>
                AFAP no controla las prácticas de privacidad de sitios
                externos. Cuando una persona abandona nuestro sitio
                mediante un enlace, recomendamos revisar las políticas
                del servicio correspondiente.
              </p>
            </PolicySection>

            <PolicySection title="14. Cambios en esta Política de Privacidad">
              <p>
                AFAP podrá actualizar esta política cuando cambie el
                funcionamiento del sitio, se incorporen nuevos servicios
                tecnológicos o resulte necesario adaptar la información
                proporcionada a los usuarios.
              </p>
              <p>
                La versión publicada mostrará su fecha de última
                actualización.
              </p>
              <p>
                Cuando los cambios sean relevantes para el tratamiento de
                información proporcionada mediante el formulario,
                procuraremos reflejarlos de manera clara en esta página.
              </p>
            </PolicySection>

            <PolicySection title="15. Contacto">
              <p>
                Para consultas relacionadas con esta Política de
                Privacidad o solicitudes relacionadas con información
                proporcionada mediante el sitio web, puedes comunicarte
                con AFAP mediante el correo electrónico de privacidad
                indicado en esta página.
              </p>
              <p>
                <a
                  href={`mailto:${contactConfig.privacyEmail}`}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {contactConfig.privacyEmail}
                </a>
              </p>
              <p>
                AFAP — Asociación de Familiares y Amigos de Pacientes con
                Discapacidad Mental y/o Psíquica de San Juan de Dios - La
                Paz
                <br />
                La Paz, Bolivia.
              </p>
            </PolicySection>
          </div>
        </article>
      </Container>
    </Section>
  );
}
