// Next.js 16 renamed the `middleware` file convention to `proxy`. This guards
// the admin area: the NextAuth `authorized` callback (in admin-kit's authConfig)
// redirects unauthenticated visitors to /admin/login and bounces already-logged-in
// users away from the login page. Proxy runs on the Node.js runtime by default in
// v16, so admin-kit's full `auth` (Credentials + db) can be reused directly.
export { auth as proxy } from "@blawness/admin-kit/auth";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
