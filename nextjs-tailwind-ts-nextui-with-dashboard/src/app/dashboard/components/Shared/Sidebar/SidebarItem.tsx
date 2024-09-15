import ActiveLink from "@/components/Ui/ActiveLink";

type TItemProps = {
  text: string;
  href: string;
};

const SidebarItem = ({ item }: { item: TItemProps }) => {
  return (
    <div className="px-4 py-2 md:text-[17px] border-b-2 hover:border-b-2 hover:border-secondary rounded-lg my-1 cursor-pointer duration-300">
      <ActiveLink href={item.href}>{item.text}</ActiveLink>
    </div>
  );
};

export default SidebarItem;
