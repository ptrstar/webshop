

export async function POST(req: Request) {
    const {
        name, company, email, message
    } = await req.json();

    if (!name || !company || !email || !message || name == "" || company == "" || email == "" || message == "") {
        return new Response(JSON.stringify({status: 400, message: "Ungültige Daten erhalten"}));
    }

    const emailPayload = {
        recipientEmail: "info@kartenspielrichi.ch",
        subject: `KONTAKTANFRAGE VON WEBSITE`,
        body: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h3>Kontakt anfrage durch ${name}</h3>
                <p>Mail: ${email}</p>
                <p>Unternehmen/Firma: ${company}</p>
                <br>
                <p>${message}</p>
            </body>
            </html>
        `,
    };
    try {
        const targetUrl = `${process.env.NEXTAUTH_URL}/api/send-mail-via-infoaccount`;
        await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload), 
        });
        return new Response(JSON.stringify({status: 200, message: "Anfrage wurde versendet."}));
    } catch {
        return new Response(JSON.stringify({status: 500, message: "Ein Fehler ist aufgetreten. Bitte wenden Sie sich an die aufgeführte E-Mail."}));
    }
}