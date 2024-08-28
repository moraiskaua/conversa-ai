import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] flex flex-col items-start p-6">
        <Image
          src="/images/logo.png"
          alt="Logo"
          sizes="100vw"
          style={{ width: "20%", height: "auto" }}
          width={0}
          height={0}
        />
        {children}
      </div>

      <div className="hidden lg:flex flex-1 w-ful max-h-full overflow-hidden relative flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Olá, eu sou sua assistente de vendas virtual, Conversa AI!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Sou capaz de capturar informações de leads sem um formulário... <br />
          algo nunca feito antes 😉
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;
