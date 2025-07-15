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
    id: mod.id,
    name: mod.name,
    path: mod.path || '',
    links: mod[roleKey as keyof typeof mod] || [],
  }));
};

const getRoleKey = (role: string) => {
  switch (role) {
    case 'super-admin': return 'superAdminScreens';
    case 'branch-manager': return 'branchManagerScreens';
    case 'approver': return 'authorizerScreens';
    case 'marketer': return 'marketerScreens';
    default: return 'generalScreens';
  }
};

export const getAccessibleModules = (
  role: string,
  subscriptionType: 'basic' | 'standard' | 'pro'
) => {
  const roleKey = getRoleKey(role);
  const allowed = subscriptionModulesMap[subscriptionType] || [];

  return NAV_LINKS.filter(mod =>
    allowed.includes(mod.name)
  ).map(mod => {
    const screens = mod[roleKey as keyof typeof mod];
    let firstScreen: { path?: string; icon?: string } | undefined;

    if (Array.isArray(screens) && screens.length > 0) {
      firstScreen = screens[0];
    }

    return {
      name: mod.name,
      path: firstScreen?.path || '/', // default path
      icon: firstScreen?.icon || 'bi bi-grid',
    };
  });
};
