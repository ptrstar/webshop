import { Progress } from "@heroui/progress";
import InterestForm from "@/app/components/interest_form";
import Image from "next/image";

export default function Preorder() {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "33vw",
        minWidth: "300px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Hero Image */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <Image
          src="/speedup-product.png"
          alt="Richi das Kartenspiel"
          width={500}
          height={350}
          style={{ width: "100%", borderRadius: 16, objectFit: "cover" }}
          priority
        />
      </div>

      {/* Title */}
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "24px" }}>
        Richi das Kartenspiel
      </h2>

      {/* Progress bar and text */}
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <Progress aria-label="Vorbestellungen" value={60} color="success" />
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "1rem" }}>
          60% der Vorbestellungsziele erreicht!
        </div>
      </div>

      {/* Interest Form */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <InterestForm />
      </div>

      {/* Lorem Ipsum Text */}
      <div style={{ textAlign: "center", fontSize: "1rem", color: "#666" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
      </div>
    </div>
  );
}