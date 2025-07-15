// utils/navUtils.ts
import { NAV_LINKS } from "../constants/nav-links";

const subscriptionModulesMap: Record<string, string[]> = {
  basic: ['Duplicate Detector', 'Accounting'],
  standard: ['Duplicate Detector', 'Accounting', 'HR Manager'],
  pro: ['Loan Manager', 'Duplicate Detector', 'Accounting', 'HR Manager'],
};

export const getSidebarLinks = (
  role: string,
  subscriptionType: 'basic' | 'standard' | 'pro'
) => {
  const roleKey = getRoleKey(role);
  const allowedModules = subscriptionModulesMap[subscriptionType] || [];

  return NAV_LINKS.filter(mod =>
    mod.name === 'Dashboard' ||
    mod.name === 'Settings' ||
    allowedModules.includes(mod.name)
  ).map(mod => ({
    name: mod.name,
    links: mod[roleKey as keyof typeof mod] || [],
  }));
};

const getRoleKey = (role: string) => {
  switch (role) {
    case 'super-admin': return 'superAdminRoutes';
    case 'branch-manager': return 'branchManagerRoutes';
    case 'approver': return 'authorizerRoutes';
    case 'marketer': return 'marketerRoutes';
    default: return 'generalScreens';
  }
};
