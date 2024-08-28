import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

type AppDrawerProps = {
  onOpen: JSX.Element;
  children: React.ReactNode;
  title: string;
  description: string;
};

export const AppDrawer = ({
  children,
  description,
  onOpen,
  title,
}: AppDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>{onOpen}</DrawerTrigger>
      <DrawerContent>
        <div className="container flex flex-col items-center gap-2 pb-10">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
