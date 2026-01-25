import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/store/services/auth/authApi";

import {
  useAllFriendsQuery,
  useOnRequestMutation,
} from "@/store/services/auth/userApi";
import { X } from "lucide-react";

export default function Pending() {
  const { data, isError, isLoading } = useAllFriendsQuery();

  const [onRequest] = useOnRequestMutation();

  const handleonRequest = async (id, status) => {
    try {
      const data = await onRequest({ id, status });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 px-4 py-7">
      {data?.AllFriends.pendings?.map(
        ({ _id, name, picture, sender, Isreceiver, requestId }) => (
          <div
            key={_id}
            className="flex py-4 px-8 items-center justify-between border rounded-md "
          >
            <div className="flex items-center gap-2  ">
              <Avatar className="w-10 h-10">
                <AvatarImage src={picture} />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div>{name}</div>
            </div>
            <div className="flex items-center gap-3 [&>button]:cursor-pointer">
              {Isreceiver && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleonRequest(requestId, (status = "accept"))
                  }
                >
                  Accept Friend Request
                </Button>
              )}
              <Button
                onClick={() =>
                  handleonRequest(requestId, (status = "rejected"))
                }
                variant="outline"
                className="rounded-full w-8 h-8 "
              >
                <X />
              </Button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
