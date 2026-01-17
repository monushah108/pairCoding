import { CameraIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Banner() {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171')] h-[250px] bg-cover bg-center relative group/img-1">
      <button className="p-2 z-10 text-white hidden group-hover/img-1:block">
        <label htmlFor="bgImg">
          <CameraIcon className="size-5" />
        </label>
        <input type="file" name="" id="bgImg" className="hidden" />
      </button>

      <div className="absolute top-50 left-8 border-8 border-white dark:border-black rounded-full overflow-hidden">
        <label htmlFor="profileImg">
          <Avatar className="group/img-2">
            <AvatarImage
              className="size-20 object-cover"
              src={`https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170`}
            />
            <AvatarFallback>M</AvatarFallback>
            <div className="absolute top-[60%] left-0 right-0 bottom-0 group-hover/img-2:flex items-center justify-center bg-accent/50 hidden transition-all duration-100 ease-in-out cursor-pointer">
              <CameraIcon className="size-5 text-gray-700 " />
            </div>
          </Avatar>
        </label>
        <input type="file" name="" id="profileImg" className="hidden" />
      </div>
    </div>
  );
}
