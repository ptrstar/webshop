import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { SiLetsencrypt } from "react-icons/si";

export default function Contact() {

    const [name, setName] = useState<string | undefined>(undefined);
    const [company, setCompany] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const [feedback, setFeedback] = useState<string | undefined>(undefined);
    const [sent, setSent] = useState<boolean>(false);

    const onSend = () => {
        if (!name || !email || !message || name == "" || email == "" || message == "") {
            setFeedback("Bitte füllen Sie alle Felder aus");
            return;
        }

        setSent(true);

        fetch("/api/forward-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, company: company, email: email, message: message }),
            })
            .then((res) => res.json())
            .then((data) => {
                setFeedback(data.message);
            });
    }

    return (
        // <a
        //     href="mailto:info@kartenspielrichi.ch"
        //     style={{
        //         display: "inline-flex",
        //         alignItems: "center",
        //         gap: 8,
        //         padding: "10px 18px",
        //         background: "linear-gradient(90deg, #ff9800 0%, #ff5722 100%)",
        //         color: "#fff",
        //         borderRadius: 8,
        //         fontWeight: 600,
        //         fontSize: "1.1rem",
        //         textDecoration: "none",
        //         boxShadow: "0 2px 8px rgba(255,87,34,0.10)",
        //         transition: "background 0.2s, box-shadow 0.2s",
        //     }}
        // >
        //     <EnvelopeIcon style={{ width: 22, height: 22 }} />
        //     Mail schreiben
        // </a>
        <div
        style={{
            margin: "0 auto",
            maxWidth: "33vw",
            minWidth: "80vw",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        >
            <div
                style={{
                width: "100%",
                maxWidth: "48rem",
                background: "rgba(0,0,0,0.04)",
                borderRadius: 12,
                padding: "24px 18px",
                marginBottom: 24,
                color: "#222",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
            >
                {/* <p style={{
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    marginBottom: 8,
                    letterSpacing: "0.01em",
                }}>
                    CHF 14.90 pro Spiel
                </p> */}
                <p style={{
                    fontSize: "1rem",
                    marginBottom: 8,
                    lineHeight: 1.5,
                }}>
                    Wir freuen uns sehr über deine Nachricht! Bei Feedback zum Spiel oder Anfragen zu grösseren Bestellungen, kannst du uns durch dieses Kontaktformular erreichen.
                </p>
            </div>
            <div
                style={{
                width: "100%",
                maxWidth: "48rem",
                background: "rgba(0,0,0,0.04)",
                borderRadius: 12,
                padding: "24px 18px",
                marginBottom: 24,
                color: "#222",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
            >
                {(feedback ? <div
                    style={{
                        background: "#4caf50",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        textAlign: "center",
                    }}
                >
                    {feedback}
                </div> : "")}
                <input
                    type="text"
                    placeholder="* Vorname, Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{
                        padding: "8px",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        width: "100%",
                    }}
                />
                <input
                    type="email"
                    placeholder="* E-Mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                        padding: "8px",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        width: "100%",
                    }}
                />
                <input
                    type="text"
                    placeholder="Spielladen/Firma"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    required
                    style={{
                        padding: "8px",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        width: "100%",
                    }}
                />
                <textarea
                    placeholder="* Nachricht"
                    value={message}
                    rows={7}
                    onChange={e => setMessage(e.target.value)}
                    required
                    style={{
                        padding: "8px",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        width: "100%",
                    }}
                />
                {(sent ? "" : <button
                    style={{
                        width: "100%",
                        maxWidth: "48rem",
                        padding: "16px",
                        background: "linear-gradient(90deg, #fdba51 0%, #f1a01e 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(255,87,34,0.15)",
                        transition: "background 0.3s, transform 0.2s",
                    }}
                    onClick={() => onSend()}
                    >
                    <BiMailSend size={25}></BiMailSend>
                </button>)}
                
                    
            </div>


            <div
                style={{
                width: "100%",
                maxWidth: "48rem",
                background: "rgba(0,0,0,0.04)",
                borderRadius: 12,
                padding: "24px 18px",
                marginBottom: 24,
                color: "#222",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
            >
                <a href="mailto:info@kartenspielrichi.ch">   
                    <p style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginBottom: 8,
                        letterSpacing: "0.01em",
                        cursor: "hand"
                    }}>
                            info@kartenspielrichi.ch
                    </p>
                </a>

            </div>
        </div>
    );
}