import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ريفر ديستريكت العاصمة الإدارية — النيل للتطوير العقاري | River District Nile Developments",
  description:
    "ريفر ديستريكت River District من النيل للتطوير العقاري Nile Developments — العنوان الوحيد على بحيرة العاصمة الإدارية الجديدة. ٤٠ فدان، إطلالة مباشرة على النهر الأخضر، شقق وفيلات جاردن وسكاي فيلا من ١٢٥ م². ٥٪ مقدم وتقسيط حتى ١٠ سنوات. ريفر ديستريكت النيل — أسعار تبدأ من ٧٧,٠٠٠ جنيه/م².",
  keywords:
    "ريفر ديستريكت,River District,النيل للتطوير العقاري,Nile Developments,ريفر ديستريكت العاصمة الإدارية,River District New Capital,النيل العاصمة الإدارية,شقق ريفر ديستريكت,فيلات ريفر ديستريكت,بحيرة العاصمة,النهر الأخضر,ريفر ديستريكت النيل,Nile River District",
  openGraph: {
    title: "ريفر ديستريكت — النيل للتطوير العقاري | River District by Nile Developments",
    description:
      "ريفر ديستريكت River District — ٤٠ فدان على بحيرة العاصمة والنهر الأخضر. شقق وجاردن فيلا وسكاي فيلا، ٥٪ مقدم، خصم حتى ٣٠٪ كاش. النيل للتطوير العقاري Nile Developments.",
    locale: "ar_EG",
    type: "website",
    images: ["https://nile-developments.com/mainsite/wp-content/uploads/2026/06/1500-x-694-158-KB.jpg"],
  },
};
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl"><head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
      {/* ══ Google Ads Tag — أضف كودك هنا ══ */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXX" /> */}
      {/* <script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-XXXXXXX');`}} /> */}
    </head><body>{children}</body></html>
  );
}
