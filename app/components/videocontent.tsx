import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Videocontent() {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* <p style={{ textAlign: "center", margin: "0 0 12px" }}>In Produktion...</p> */}

            {/* video wrapper keeps a 16:9 aspect and makes the iframe fill the parent width */}
            <div style={{ width: "100%", maxWidth: "100%" }}>
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                    <iframe
                        src="https://www.youtube.com/embed/Y0rTvFbkJik?si=t79UPDrTi5Nf4Xhl"
                        title="Erklärvideo"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                </div>
            </div>
      </div>
    );
}