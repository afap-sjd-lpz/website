# AFAP Bolivia — Sitio web institucional

## Descripción

Sitio web institucional de la Asociación de Familiares y Amigos de Pacientes con Discapacidad Mental y/o Psíquica de San Juan de Dios - La Paz (AFAP). Presenta información sobre la asociación, su comunidad y sus actividades, ofrece un canal de contacto y publica una biblioteca de recursos de orientación e información.

## Stack principal

- Next.js 16.3.0 con App Router.
- React 19.2.8 y TypeScript 5.9.3.
- Tailwind CSS 4.3.3.
- HeroUI 3.2.3.
- Sanity 5.31.2, `next-sanity` 13.3.3 y Sanity Client 7.26.2.
- pnpm 10.12.4.
- Vercel para despliegue e infraestructura.
- Resend 6.18.1 para el envío del formulario de contacto.
- Cloudflare Turnstile para protección anti-spam.

## Requisitos

- Node.js 22 (el desarrollo actual utiliza 22.14.0).
- pnpm 10.12.4, configurado mediante `packageManager`.
- Infisical CLI, con acceso autorizado al proyecto AFAP.

## Instalación y desarrollo local

```bash
pnpm install
infisical login
infisical run --env=dev -- pnpm dev
```

El sitio queda disponible en [http://localhost:3000](http://localhost:3000) y el Studio en [http://localhost:3000/studio](http://localhost:3000/studio).

`infisical login` solo es necesario al configurar o renovar la sesión local. El archivo `.infisical.yaml` vincula el repositorio con el proyecto correcto e Infisical inyecta las variables de `dev` únicamente en el proceso de desarrollo, sin escribirlas en archivos locales.

Para probar el sitio desde otros dispositivos de la red, `NEXT_ALLOWED_DEV_ORIGINS` admite uno o varios hostnames separados por comas. Esta variable es opcional y debe configurarse solamente en el entorno `dev` de Infisical; no corresponde a Preview ni Production.

## Variables de entorno

`.env.example` documenta el contrato de variables del proyecto, pero el flujo recomendado obtiene sus valores desde Infisical. `.env.local` queda disponible únicamente como alternativa excepcional y no debe versionarse ni mezclarse con Infisical sin comprobar qué origen tiene precedencia.

```dotenv
# Sitio público
SITE_URL=

# Desarrollo local opcional
NEXT_ALLOWED_DEV_ORIGINS=

# Resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURNSTILE_EXPECTED_HOSTNAME=

# Sanity
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_API_VERSION=
```

`SITE_URL` debe contener el origen canónico del sitio, sin rutas adicionales. En desarrollo se usa `http://localhost:3000` cuando la variable no está definida.

`NEXT_PUBLIC_SANITY_API_VERSION` es opcional: el proyecto utiliza una versión estable definida en `src/sanity/env.ts` cuando no se proporciona. Ninguna clave privada debe usar el prefijo `NEXT_PUBLIC_`.

Los valores se guardan sin comillas envolventes, salvo que las comillas formen parte real del valor. `TURNSTILE_EXPECTED_HOSTNAME` contiene únicamente el hostname esperado, por ejemplo `afap.salud.bo`, sin protocolo, ruta ni barra final.

## Estructura general

- `src/app/(site)`: rutas y layout del sitio público.
- `src/app/studio`: Sanity Studio embebido en `/studio`.
- `src/components/ui`: componentes base y wrappers de HeroUI.
- `src/components/layout`: Navbar, Footer y elementos del shell público.
- `src/components/sections`: secciones y componentes de las páginas.
- `src/sanity`: configuración de cliente, schemas, queries GROQ, TypeGen y utilidades de imágenes.

## Recursos

Sanity administra tres formatos de recurso: `article`, `material` y `video`. La biblioteca pública está disponible en `/recursos`, con filtros, orden y paginación. Los detalles se publican en:

- `/recursos/articulos/[slug]`
- `/recursos/materiales/[slug]`
- `/recursos/videos/[slug]`

Las vistas incluyen metadata dinámica, recursos relacionados y soporte para recursos destacados. Los artículos usan Portable Text e imagen principal; los materiales pueden ofrecer PDF o una fuente externa; y los videos se reproducen mediante YouTube en modo de privacidad mejorada.

## Sanity Studio

El contenido se administra desde `/studio` en el proyecto Sanity `5e7075ws`, dataset `production`. El cliente público consulta únicamente contenido publicado; las queries excluyen documentos en `drafts`.

Las temáticas y los recursos editoriales se mantienen en Sanity. La información institucional de otras páginas continúa definida en el código del sitio.

## TypeGen

```bash
pnpm sanity:schema
pnpm sanity:typegen
```

Estos comandos generan `src/sanity/schema.json` y `src/sanity/sanity.types.ts`. Ambos archivos son artefactos generados y no deben editarse manualmente. Después de modificar schemas o queries, ejecuta nuevamente TypeGen.

## Actividades

Las actividades públicas se muestran mediante un Google Calendar embebido, configurado en `src/config/community.config.ts`. Esta integración es independiente de Sanity.

## Contacto

El formulario valida los datos en cliente y servidor, exige la aceptación de la Política de Privacidad y envía los mensajes mediante Resend. Cloudflare Turnstile, un honeypot y el rate limiting de Vercel protegen el flujo frente a automatizaciones y abuso.

## Build y validaciones

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
git diff --check
```

Para ejecutar localmente el build generado:

```bash
pnpm start
```

## Despliegue

El sitio se despliega en Vercel y utiliza la siguiente correspondencia:

| Uso | Rama | Entorno de Vercel | Variables |
| --- | --- | --- | --- |
| Desarrollo local | Cualquiera | No aplica | Infisical `dev` mediante la CLI |
| Preview | Cualquier rama distinta de `main`, normalmente `develop` | Preview | Secretos sincronizados desde Infisical hacia Vercel Preview |
| Producción | `main` | Production | Secretos sincronizados desde Infisical hacia Vercel Production |

Los pushes a `develop` y a otras ramas distintas de `main` generan despliegues Preview. Los cambios incorporados a `main` generan el despliegue de Production. Vercel construye y ejecuta la aplicación con las variables del destino correspondiente; cuando se modifica una variable utilizada durante build o runtime, se debe confirmar su sincronización y generar un nuevo despliegue.

Vercel expone `VERCEL_ENV=preview` en Preview y `VERCEL_ENV=production` en Production. El proyecto utiliza esta distinción para impedir la indexación de los despliegues Preview, mientras Production permanece indexable.

Los secretos nunca deben incorporarse al repositorio. `.infisical.yaml` contiene únicamente la referencia al proyecto de Infisical y sí debe versionarse.
