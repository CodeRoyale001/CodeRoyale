import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <>
      <div className=" navbar-container flex flex-row gap-10 justify-between p-5  bg-foreground text-background">
        <div className="logo w-1/4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-evenly gap-7">
          <div className="search-nav">
            <Input />
          </div>
          <ul className="flex gap-5 ">
            <li>Contest</li>
            <li>Leaderboard</li>
            <li>Practice</li>
          </ul>
          <Button>Login</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
