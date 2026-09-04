import {getAbsoluteUrl} from "@/config/site.config";
import {
  getEmailByPurpose,
  type ContactSettingsData,
} from "@/sanity/lib/institutional";

const organizationId = getAbsoluteUrl("/#organization");
const websiteId = getAbsoluteUrl("/#website");

interface StructuredDataProps {
  contactSettings: ContactSettingsData;
}

export function StructuredData({contactSettings}: StructuredDataProps) {
  const contactEmail = getEmailByPurpose(contactSettings, "contact");
  const sameAs = contactSettings?.socialLinks?.map(({url}) => url) ?? [];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "AFAP",
    legalName:
      "Asociación de Familiares y Amigos de Pacientes con Discapacidad Mental y/o Psíquica de San Juan de Dios - La Paz",
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl("/images/logo-afap.svg"),
    description:
      "AFAP une a familias, amigos y personas comprometidas con la salud mental, la inclusión y la defensa de derechos en Bolivia.",
    ...(contactEmail ? {email: contactEmail.email} : {}),
    ...(contactSettings?.location
      ? {address: contactSettings.location}
      : {}),
    ...(sameAs.length > 0 ? {sameAs} : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "AFAP Bolivia",
    url: getAbsoluteUrl("/"),
    publisher: {
      "@id": organizationId,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
