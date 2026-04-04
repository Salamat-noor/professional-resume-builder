import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface Props { active: string; onSelect: (t: string) => void; }

const tabs = [
  { id: 'profile', icon: 'ri-user-3-line', label: 'Profile' },
  { id: 'account', icon: 'ri-shield-keyhole-line', label: 'Account' },
  { id: 'billing', icon: 'ri-bank-card-line', label: 'Billing' },
  { id: 'notifications', icon: 'ri-notification-3-line', label: 'Notifications' },
  { id: 'privacy', icon: 'ri-lock-line', label: 'Privacy' },
  { id: 'integrations', icon: 'ri-puzzle-line', label: 'Integrations' },
];

export function SettingsSidebar({ active, onSelect }: Props) {
  return (
    <Sidebar collapsible="none" className="w-52 border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map(t => (
                <SidebarMenuItem key={t.id}>
                  <SidebarMenuButton
                    isActive={active === t.id}
                    onClick={() => onSelect(t.id)}
                  >
                    <i className={`${t.icon} text-base`} />
                    <span>{t.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
