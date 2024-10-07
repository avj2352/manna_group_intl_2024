import { FC } from "react";
import { Pin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// ..custom
import { navList, INavItem } from "@/components/navigation/navigation.list";

type INavbarDropdownProps = {
  label: string,
  filter: string,
};

const NavbarDropdown: FC<INavbarDropdownProps> = ({ label, filter }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {label} <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative w-56 mt-2">
        {navList
          .filter((item: INavItem) => item.category === filter)
          .map((item: INavItem, idx: number) => (
            <DropdownMenuItem key={idx + 1}>
              <Link 
                className="flex"
                to={`${item.link}/${item.scrollId}`}>
                <Pin className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
