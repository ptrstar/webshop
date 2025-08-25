import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import OrderForm from "./order_form";
import { useState } from "react";

export default function Shop() {

    const [interested, setInterested] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalStep, setModalStep] = useState<"order" | "payment" | "thankyou">("order");
    const [orderId, setOrderId] = useState<string | null>(null);

    function handleOrderSuccess(id: string) {
        setOrderId(id);
        setModalStep("payment");
    }

    function handlePaymentSuccess() {
        setModalStep("thankyou");
    }

    function handleModalOpenChange(open: boolean) {
        onOpenChange();
        if (!open) {
            setModalStep("order");
            setOrderId(null);
        }
    }

    return (
        <>
            {((!isOpen) ? (
                <button
                style={{
                width: "100%",
                marginBottom: "24px",
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
                onClick={() => onOpen()}
                >
                Bestellen →
                </button>
                ):"")}

            <Modal size="3xl" isOpen={isOpen} onOpenChange={handleModalOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {modalStep === "order" && "Kaufprozess"}
                            {modalStep === "payment" && "Bezahlung"}
                            {modalStep === "thankyou" && "Vielen Dank"}
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "100%", marginBottom: "24px" }}>
                                {modalStep === "order" && (
                                    <OrderForm onSuccess={handleOrderSuccess} />
                                )}
                                {modalStep === "payment" && (
                                    <div>
                                        {/* Payment form or integration goes here */}
                                        <p>Zahlungsformular (Demo)</p>
                                        <Button color="primary" onClick={handlePaymentSuccess}>
                                            Zahlung abschließen
                                        </Button>
                                    </div>
                                )}
                                {modalStep === "thankyou" && (
                                    <div style={{ textAlign: "center", margin: "32px 0" }}>
                                        <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 12 }}>
                                            Vielen Dank für Ihre Bestellung!
                                        </div>
                                        {orderId && (
                                            <div>
                                                Ihre Bestellnummer: <span style={{ fontWeight: 600 }}>{orderId}</span>
                                            </div>
                                        )}
                                        <Button color="primary" style={{ marginTop: 24 }} onClick={onClose}>
                                            Schließen
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
            
    );
}
