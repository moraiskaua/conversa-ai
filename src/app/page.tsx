import { NavBar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingCards } from '@/constants/landing-page';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="">
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            Um assistente de vendas com o poder da tecnologia da IA
          </span>
          <h1 className="text-orange text-8xl font-bold tracking-tighter drop-shadow">
            Conversa AI
          </h1>
          <p className="text-center max-w-[500px]">
            Seu assistente de vendas com IA! Implemente o Conversa AI em
            qualquer site com apenas um trecho de código!
          </p>
          <Button className="bg-orange hover:bg-yellow-600 font-bold text-white px-4">
            Comece gratuitamente
          </Button>
          <Image
            src="/images/iphoneconversa.png"
            width={400}
            height={100}
            alt="iphone"
            className="max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">Escolha o que combina com você</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Nossos preços são adaptados para atender às suas necessidades.Você
          pode começar gratuitamente.
        </p>
      </section>
      <div className="flex  justify-center gap-4 flex-wrap my-6">
        {pricingCards.map(card => (
          <Card
            key={card.title}
            className={cn(
              'w-[300px] flex flex-col justify-between',
              card.title === 'Ultimate' && 'border-2 border-primary',
            )}
          >
            <CardHeader>
              <CardTitle className="text-orange">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find(c => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ mês</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map(feature => (
                  <div key={feature} className="flex gap-2">
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
              >
                Começar
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
