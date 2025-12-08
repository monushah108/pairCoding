import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Cropper from "react-easy-crop";

export default function Imgpreview({ picture, setPicture }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPicture(URL.createObjectURL(file));
    // 👉 Auto open dialog
    setIsOpen(true);
  };

  const getCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const img = document.createElement("img");

    img.src = picture;

    await new Promise((resolve) => (img.onload = resolve));

    const ctx = canvas.getContext("2d");
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    ctx.drawImage(
      img,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height
    );

    const result = canvas.toDataURL("image/jpeg");
    setFinalImage(result);
    setIsOpen(false);
  };

  return (
    <div className="w-fit m-auto text-center">
      <label className="cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="border-dashed border-2 p-2 w-40 h-40 flex justify-center items-center rounded-full overflow-hidden">
              {finalImage ? (
                <img src={finalImage} className="w-full h-full rounded-full" />
              ) : (
                <Camera className="size-15 text-[#cccc]" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>Add your profile pic</TooltipContent>
        </Tooltip>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          name="picture"
          onChange={handleFile}
        />
      </label>

      {/* Auto opening dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Edit Profile Picture</DialogTitle>

          <div className="relative w-full h-80 bg-black">
            {picture && (
              <Cropper
                image={picture}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, pixels) => setCroppedArea(pixels)}
              />
            )}
          </div>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full mt-4"
          />

          <button
            onClick={getCroppedImage}
            className="bg-primary text-white w-full mt-4 py-2 rounded-md"
          >
            Save
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
