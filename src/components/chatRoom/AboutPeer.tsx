import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPeer() {
  return (
    <div className="border-border border-l md:flex flex-col gap-16 hidden">
      <div className="bg-gray-200 basis-30 relative">
        <div className="absolute top-20 left-8 border-8 border-white dark:border-black rounded-full">
          <Avatar className="size-20">
            {/* <AvatarImage src={details?.picture} /> */}
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex px-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-200">
            {/* {details?.name} */}
          </h2>
          <p className="text-sm font-medium w-[250px] text-gray-600 dark:text-gray-300">
            {/* {details?.bio} */}
          </p>
          <div>
            {/* {details?.skills.map((i, e) => (
              <p key={e}>{i}</p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
