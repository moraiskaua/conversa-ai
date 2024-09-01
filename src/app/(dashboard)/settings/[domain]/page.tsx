import { onGetCurrentDomainInfo } from '@/actions/settings';
import { InfoBar } from '@/components/infobar';
import { redirect } from 'next/navigation';

interface DomainSettingsPageProp {
  params: {
    domain: string;
  };
}

const DomainSettings = async ({ params }: DomainSettingsPageProp) => {
  const domain = await onGetCurrentDomainInfo(params.domain);

  if (!domain) redirect('/dashboard');

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        {params.domain}
      </div>
    </>
  );
};

export default DomainSettings;
