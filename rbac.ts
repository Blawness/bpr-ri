import { defineRbac, presets } from "@blawness/admin-kit/rbac";

/**
 * Single source of truth for roles + permissions (admin-kit 0.8+).
 *
 * `presets.adminEditor` reproduces the legacy two-role model:
 *   - admin  → "*" (full access)
 *   - editor → read/create/update articles, read/upload media, profile.edit
 *
 * Calling defineRbac also registers the runtime so the package's built-in
 * screens (users/articles/media/categories) can resolve permissions.
 */
export const rbac = defineRbac({
  roles: { ...presets.adminEditor },
  fallbackRole: "editor",
  protectedPermission: "users.delete",
});
