import Image from "next/image";
import InterestForm from "@/app/components/interest_form";

export default function Preorder() {
    return <>
        Interesse Anmelden
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Image
          src="/speedup-product.png"
          alt="Speedup Product"
          width={500}
          height={350}
          style={{
            display: "block",
            maxWidth: "500px",
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
          }}
        />
      </div>

      <InterestForm />
    </>
}