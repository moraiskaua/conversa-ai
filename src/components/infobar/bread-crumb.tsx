'use client';

import { useSideBar } from '@/contexts/use-sidebar';
import { Loader } from '../loader';
import { Switch } from '../ui/switch';

export const BreadCrumb = () => {
  const {
    chatRoom,
    expand,
    loading,
    page,
    realTime,
    onActiveRealTime,
    onExpand,
  } = useSideBar();

  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">
          {page === 'dashboard' && 'Painel de Controle'}
          {page === 'conversation' && 'Conversas'}
          {page === 'integration' && 'Integrações'}
          {page === 'settings' && 'Configurações'}
          {page === 'appointment' && 'Agendamentos'}
          {page === 'email-marketing' && 'E-mail Marketing'}
        </h2>
        {page === 'conversation' && chatRoom && (
          <Loader loading={loading} className="p-0 inline">
            <Switch
              defaultChecked={realTime}
              onClick={e => onActiveRealTime(e)}
              className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>
      <p>
        {page === 'dashboard' &&
          'Uma visão detalhada das suas métricas, uso, clientes e mais'}
        {page === 'conversation' &&
          'Configurações do chatbot, insira perguntas de vendas e treine seu bot para fazer o que você deseja.'}
        {page === 'integration' && 'Conecte aplicativos de terceiros.'}
        {page === 'settings' && 'Gerencie as configurações da sua conta.'}
        {page === 'appointment' &&
          'Visualize e edite todos os seus compromissos.'}
        {page === 'email-marketing' &&
          'Envie e-mails automáticos para seus clientes.'}
      </p>
    </div>
  );
};
