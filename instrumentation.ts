/**
 * Registers the RBAC runtime in the Node.js runtime on cold start. This is the
 * reliable place to do it — server actions invoked before any admin page render
 * still need `getActiveRbac()` to resolve, and the admin-layout side-effect
 * import alone does not cover them.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./rbac");
  }
}
