import React from "react";
import { ServiceDetail } from "../types";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface ServiceJsonLdProps {
  service: ServiceDetail;
}

export const ServiceJsonLd: React.FC<ServiceJsonLdProps> = ({ service }) => {
  const baseUrl = BRAND_CONFIG.baseUrl;

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${baseUrl}/services/${service.slug}`,
      },
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${BRAND_CONFIG.name} ${service.name}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Windows, macOS, Linux",
    url: `${baseUrl}/services/${service.slug}`,
    description: service.seoDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: service.highlights,
  };

  const howToSchema =
    service.howToUseSteps && service.howToUseSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to use ${service.name} with ${BRAND_CONFIG.name}`,
          description: service.seoDescription,
          step: service.howToUseSteps.map((step) => ({
            "@type": "HowToStep",
            position: step.stepNumber,
            name: step.title,
            text: step.description,
            url: `${baseUrl}/services/${service.slug}#step-${step.stepNumber}`,
          })),
        }
      : null;

  const faqPageSchema =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      )}
    </>
  );
};
