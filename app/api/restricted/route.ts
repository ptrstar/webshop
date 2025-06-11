import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";

// export async function GET(req: Request) {
export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    return new Response(
      JSON.stringify({
        content:
          "This is protected content. You can access this content because you are signed in.",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        error:
          "You must be signed in to view the protected content on this page.",
      }),
      { status: 401 }
    );
  }
}