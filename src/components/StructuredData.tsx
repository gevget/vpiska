import React from "react";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Digital Вписка — закрытый B2B-портал для партнёров",
    description:
      "Закрытая интерактивная страница партнёрских возможностей для главного digital & tech afterparty года.",
    startDate: "2026-10-29T19:00:00+03:00",
    endDate: "2026-10-30T04:00:00+03:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Клуб 16 Тонн",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Пресненский Вал, 6, стр. 1",
        addressLocality: "Москва",
        addressRegion: "Москва",
        postalCode: "123022",
        addressCountry: "RU",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Digital Club",
      url: "https://digitalclub.ru",
    },
    offers: {
      "@type": "Offer",
      url: "https://gevget.github.io/vpiska/",
      price: "50000",
      priceCurrency: "RUB",
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export default StructuredData;
