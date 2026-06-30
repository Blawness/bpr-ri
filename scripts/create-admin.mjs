// Seed / upsert the first admin user for the admin-kit CMS.
//
//   pnpm create-admin <email> <name> <password> [role]
//   EMAIL=... NAME=... PASSWORD=... ROLE=admin pnpm create-admin
//
// Role defaults to "admin" (full access under presets.adminEditor in rbac.ts).
// Re-running with the same email updates the password/name/role (idempotent).
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import postgres from "postgres";
import { hash } from "bcryptjs";

// Next.js reads .env.local; pick it up too (does not override already-set vars).
loadEnv({ path: ".env.local" });

const [, , argEmail, argName, argPassword, argRole] = process.argv;
const email = (argEmail ?? process.env.EMAIL ?? "").trim().toLowerCase();
const name = argName ?? process.env.NAME ?? "Admin";
const password = argPassword ?? process.env.PASSWORD ?? "";
const role = argRole ?? process.env.ROLE ?? "admin";

if (!process.env.DATABASE_URL) {
  console.error("✗ DATABASE_URL is not set (.env or .env.local).");
  process.exit(1);
}
if (!email || !password) {
  console.error("✗ Usage: pnpm create-admin <email> <name> <password> [role]");
  process.exit(1);
}
if (password.length < 8) {
  console.error("✗ Password must be at least 8 characters.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

try {
  const passwordHash = await hash(password, 12);
  const [row] = await sql`
    insert into users (email, name, password_hash, role)
    values (${email}, ${name}, ${passwordHash}, ${role})
    on conflict (email) do update
      set name = excluded.name,
          password_hash = excluded.password_hash,
          role = excluded.role
    returning id, email, role
  `;
  console.log(`✓ Admin ready → id=${row.id} email=${row.email} role=${row.role}`);
  console.log("  Login at /admin/login");
} catch (err) {
  console.error("✗ Failed to create admin:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
