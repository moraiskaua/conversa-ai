import CalIcon from '../../public/icons/cal-icon';
import ChatIcon from '../../public/icons/chat-icon';
import DashboardIcon from '../../public/icons/dashboard-icon';
import EmailIcon from '../../public/icons/email-icon';
import HelpDeskIcon from '../../public/icons/help-desk-icon';
import IntegrationsIcon from '../../public/icons/integrations-icon';
import SettingsIcon from '../../public/icons/settings-icon';
import StarIcon from '../../public/icons/star-icon';
import TimerIcon from '../../public/icons/timer-icon';

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Painel de Controle',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    label: 'Conversas',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    label: 'Integrações',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    label: 'Configurações',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    label: 'Agendamentos',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    label: 'E-mail Marketing',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'unread',
    icon: <EmailIcon />,
  },
  {
    label: 'all',
    icon: <EmailIcon />,
  },
  {
    label: 'expired',
    icon: <TimerIcon />,
  },
  {
    label: 'starred',
    icon: <StarIcon />,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'help desk',
  },
  {
    label: 'questions',
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
];

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain'];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'helpdesk',
    icon: <HelpDeskIcon />,
  },
];
