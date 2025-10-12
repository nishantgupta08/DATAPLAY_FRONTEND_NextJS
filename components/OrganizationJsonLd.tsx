
'use client';
import React from 'react';

type Props = {
  orgName: string;
  url: string;
  logoUrl: string;
  sameAs?: string[];
};

export default function OrganizationJsonLd({ orgName, url, logoUrl, sameAs = [] }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: orgName,
    url,
    logo: logoUrl,
    sameAs,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name: orgName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
