import { onGetSubscriptionPlan } from '@/actions/settings';
import { Section } from '../section-label';

export const BillingSettings = async () => {
  const plan = await onGetSubscriptionPlan();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Configurações de pagamento"
          message="Adicone suas formas de pagamento, ou modifique seu plano atual."
        />
      </div>
    </div>
  );
};
