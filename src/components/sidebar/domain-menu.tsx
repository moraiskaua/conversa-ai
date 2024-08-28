import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Loader } from '../loader';
import FormGenerator from '../forms/form-generator';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useDomain } from '@/hooks/use-domain';
import { AppDrawer } from '../drawer';
import { UploadButton } from '../upload-button';

type DomainMenuProps = {
  min?: boolean;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

export const DomainMenu = ({ domains, min }: DomainMenuProps) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();

  return (
    <div className={cn('flex flex-col gap-3', min ? 'mt-6' : 'mt-3')}>
      <div
        className={cn(
          'flex w-full items-center',
          min ? 'justify-center' : 'justify-between',
        )}
      >
        {!min && <p className="text-xs text-gray-500">DOMÍNIOS</p>}
        <AppDrawer
          title="Adicionar domínio"
          description="Adicione seu domínio para integrar o chatbot"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full border-2">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="meu-dominio.com"
                type="text"
              />
              <UploadButton
                register={register}
                label="Enviar ícone"
                errors={errors}
              />
              <Button type="submit" className="w-full">
                Adicionar
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div className="flex flex-col gap-1 text-ironside font-medium">
        {domains &&
          domains.map(domain => (
            <Link
              href={`/settings/${domain.name.split('.')[0]}`}
              key={domain.id}
              className={cn(
                'flex gap-3 hover:bg-white items-center justify-center rounded-full transition duration-100 ease-in-out cursor-pointer ',
                !min ? 'p-2' : 'py-2',
                domain.name.split('.')[0] == isDomain && 'bg-white',
              )}
            >
              <Image
                src={`https://ucarecdn.com/${domain.icon}/`}
                alt="logo"
                width={20}
                height={20}
              />
              {!min && <p className="text-sm">{domain.name}</p>}
            </Link>
          ))}
      </div>
    </div>
  );
};
