import Image from "next/image";
import Link from "next/link";

export interface BrandProps {
  imagePriority?: boolean;
  showText?: boolean;
}

/**
 * Identidad visual de AFAP.
 * Muestra el logo institucional y, opcionalmente, el nombre de la asociación.
 */
export function Brand({
  imagePriority = false,
  showText = true,
}: BrandProps) {
  return (
    <Link
      href="/"
      aria-label="Ir a la página de inicio"
      className="inline-flex items-center gap-3"
    >
      <Image
        src="/images/logo-afap.svg"
        alt=""
        width={500}
        height={500}
        priority={imagePriority}
        className="h-14 w-auto shrink-0 object-contain"
      />

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-foreground">
            AFAP
          </span>

          <span className="max-w-48 text-xs text-muted sm:max-w-none sm:text-sm">
            Unidos por la salud mental
          </span>
        </div>
      )}
    </Link>
  );
}
