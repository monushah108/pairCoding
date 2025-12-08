import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePanel() {
  return (
    <div className="border-border border-l md:flex flex-col gap-16 hidden">
      <div className="bg-gray-200 basis-30 relative">
        <div className="absolute top-20 left-8 border-8 border-white dark:border-black rounded-full">
          <Avatar className="size-20">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=m`}
            />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex px-4">
        <div className="space-y-2">
          <h2 className="text-sm text-gray-500 dark:text-gray-200">
            Monu Shah
          </h2>
          <p className="text-xs w-[250px] text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            voluptatibus.
          </p>
        </div>
      </div>
    </div>
  );
}
