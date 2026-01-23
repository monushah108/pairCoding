import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function AddFriend() {
  return (
    <div className="flex-1 py-3 px-10">
      <h1 className="text-2xl font-bold">Add Friends</h1>
      <p className="text-md text-gray-500 font-semibold">
        you can add friends with their pro palyer nickname
      </p>

      <InputGroup className="mt-5  px-2 h-15">
        <InputGroupInput placeholder="you can add friends by their nickname" />
        <Button variant="secondary" className="p-5 cursor-pointer">
          Send Friends Request
        </Button>
      </InputGroup>
    </div>
  );
}
