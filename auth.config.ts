import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    // signIn: "/",
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   const currentPathName = nextUrl.pathname;
    //   console.log("nextUrl.pathname", nextUrl.pathname);
    //   if (isOnDashboard) {
    //     if (isLoggedIn) {
    //       return true; // Allow access to the dashboard
    //     }
    //     return Response.redirect(new URL("/", nextUrl)); // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     if (currentPathName === "/") {
    //       return Response.redirect(new URL("/dashboard", nextUrl)); // Redirect logged-in users away from login page
    //     }
    //   }
    //   return true; // Allow access to non-restricted pages
    // },
  },
  providers: [], // Add authentication providers here
} satisfies NextAuthConfig;
