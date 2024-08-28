import { onGetSubscriptionPlan } from '@/actions/settings';
import { Section } from '../section-label';
import { pricingCards } from '@/constants/landing-page';
import { Card, CardContent, CardDescription } from '../ui/card';
import { CheckCircle2, Plus } from 'lucide-react';
import Image from 'next/image';
import Modal from '../modal';

export const BillingSettings = async () => {
  const plan = await onGetSubscriptionPlan();
  console.log({ plan });
  const planFeatures = pricingCards.find(
    card => card.title.toUpperCase() === plan,
  )?.features;

  if (!planFeatures) return;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Configurações de cobrança"
          message="Adicione dados de pagamentos, faça upgrade e gerencie seu plano."
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center ">
        <Modal
          title="Escolha um plano"
          description="Conte-nos sobre você! O que você faz? Vamos personalizar a sua
experiência para que melhor se adapte a você."
          trigger={
            plan && plan === 'STANDARD' ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Fazer Upgrade
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <Image
                src="/images/creditcard.png"
                width={400}
                height={400}
                alt="image"
              />
            )
          }
        >
          ...
          {/* <SubscriptionForm plan={plan!} /> */}
        </Modal>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Plano Atual</h3>
        <p className="text-sm font-semibold">{plan?.toString()}</p>
        <div className="flex gap-2 flex-col mt-2">
          {planFeatures.map(feature => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
