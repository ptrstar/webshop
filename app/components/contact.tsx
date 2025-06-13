import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Contact() {
    return (
        <a
            href="mailto:info@kartenspielrichi.ch"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: "linear-gradient(90deg, #ff9800 0%, #ff5722 100%)",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "1.1rem",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(255,87,34,0.10)",
                transition: "background 0.2s, box-shadow 0.2s",
            }}
        >
            <EnvelopeIcon style={{ width: 22, height: 22 }} />
            Mail schreiben
        </a>
    );
}