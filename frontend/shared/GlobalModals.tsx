"use client";

import React from "react";
import dynamic from "next/dynamic";

const QRCodeModal = dynamic(
  () => import("@/frontend/modules/qr-code/QRCodeModal").then((mod) => mod.QRCodeModal),
  { ssr: false }
);

const AnalyticsModal = dynamic(
  () => import("@/frontend/modules/analytics/AnalyticsModal").then((mod) => mod.AnalyticsModal),
  { ssr: false }
);

export function GlobalModals() {
  return (
    <>
      <QRCodeModal />
      <AnalyticsModal />
    </>
  );
}
