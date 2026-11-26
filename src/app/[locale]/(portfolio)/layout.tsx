import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { EngagementBox } from "@/components/layout/EngagementBox";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <EngagementBox />
    </>
  );
}
