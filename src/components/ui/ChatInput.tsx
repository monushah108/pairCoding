import { Button } from "@/components/ui/button";
import { File, FileDown, Paperclip, SmilePlus, X } from "lucide-react";

import PermissionModel from "../dashborad/module/premissionModel.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import { InputGroup, InputGroupAddon, InputGroupTextarea } from "./input-group";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";

export default function ChatInput({
  msg,
  setMsg,
  handleSubmit,
  selectedText,
  setSelectedText,
  file,
  setFile,
  previewUrl,
  setPreviewUrl,
}) {
  const [selectedPos, setSelectedPos] = useState(0);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmoji = ({ emoji }) => {
    const EmojiText = msg.split("");
    EmojiText.splice(selectedPos, 0, emoji);
    setMsg(EmojiText.join(""));
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (file.size >= 5 * 1024 * 1024) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  function PreviewFile(f) {
    const [fileType, _] = f.split("/");

    switch (fileType) {
      case "image":
        return <img src={previewUrl} className="w-25 h-25" />;
        break;

      case "video":
        return <video src={previewUrl} controls className="w-35 h-35"></video>;
        break;

      default:
        return <File />;
    }
  }

  return (
    <div>
      {selectedText && (
        <div className="h-[60px] border-l-4   bg-white flex items-stretch border-purple-500  ">
          <div className="p-1 bg-gray-100 flex-1 relative px-3 text-sm text-left font-semibold">
            <p className="text-teal-500">@{selectedText.name}</p>
            <p className="text-gray-500 mt-1">
              {selectedText.message.substr(0, 40)} ...
            </p>
            <button
              className="absolute right-2 top-3 cursor-pointer"
              onClick={() => setSelectedText(null)}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {previewUrl && (
        <div className=" p-4 bg-white relative">
          <div className="flex items-center max-w-max gap-2 bg-gray-100 border rounded p-2">
            {PreviewFile(file?.type)}
            <p className="text-xs font-semibold">{file?.name}</p>
          </div>
          <button
            onClick={() => {
              setPreviewUrl(null);
              setFile(null);
            }}
            className="absolute right-2 top-2 text-gray-500 cursor-pointer  "
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className=" flex items-center gap-2  p-2.5   bg-white ">
        <form
          onSubmit={handleSubmit}
          className=" w-full flex items-center rounded  overflow-hidden"
        >
          <InputGroup className="h-10">
            <InputGroupAddon>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Paperclip />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <label htmlFor="file" className="flex items-center gap-1">
                      <FileDown /> upload File
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>

            <InputGroupTextarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyUp={(e) => setSelectedPos(e.target.selectionStart)}
              onKeyDown={onKeyDown}
              placeholder="send messages.."
              className={`w-full p-2 outline-none text-sm placeholder:text-gray-500 placeholder:italic  min-h-10 max-h-[140px]`}
            />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <SmilePlus />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-0">
                  <EmojiPicker
                    width={400}
                    height={350}
                    onEmojiClick={handleEmoji}
                    className="w-full"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
        </form>
        <PermissionModel />
      </div>
    </div>
  );
}
