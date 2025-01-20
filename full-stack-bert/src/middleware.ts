import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/multimedia(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/1", request.url));
  }

  if (request.nextUrl.pathname === "/profile") {
    console.log("Protecting /profile route");
    await auth.protect();
    return;
  }

  if (!isPublicRoute(request)) {
    console.log("Protecting route", request.nextUrl.pathname);
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/profile", // Protejăm ruta /profile
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (pathname === "/") {
//     return NextResponse.redirect(new URL("/1", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Aplică middleware-ul la toate rutele, cu excepția:
//      * - Rutele statice (e.g., /_next/static)
//      * - Favicon (e.g., /favicon.ico)
//      * - Rutele publice (e.g., /login, /register)
//      */
//     "/((?!_next/static|favicon.ico|login|register).*)",
//   ],
// };
