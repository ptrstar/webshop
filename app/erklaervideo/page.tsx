import React from "react";

const ErklaervideoPage = () => {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
            <h1>Erklärvideo</h1>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                {/* Replace the src with your actual video URL */}
                <iframe
                    src="https://player.vimeo.com/video/676247342?autoplay=1"
                    title="Erklärvideo"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>
            <p>Hier wird das Erklärvideo angezeigt.</p>
        </div>
    );
};

export default ErklaervideoPage;