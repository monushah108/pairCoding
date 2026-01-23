import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Cropper from "react-easy-crop";

export default function Imgpreview({ setPicture, rawFile, setRawFile }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  // File for backend
  const [previewUrl, setPreviewUrl] = useState(null); // URL for UI
  const [isOpen, setIsOpen] = useState(false);

  // 📁 File select
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setRawFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsOpen(true);
  };

  // ✂️ Crop & convert to File
  const getCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const img = document.createElement("img");

    img.src = previewUrl;
    await new Promise((resolve) => (img.onload = resolve));

    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height,
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], "profile.jpg", {
          type: "image/jpeg",
        });

        setPicture(croppedFile); // ✅ send to parent (backend)
        setPreviewUrl(URL.createObjectURL(blob)); // preview
        setIsOpen(false);
      },
      "image/jpeg",
      0.9,
    );
  };

  return (
    <div className="w-fit m-auto text-center">
      <label className="cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="border-dashed border-2 p-2 w-40 h-40 flex justify-center items-center rounded-full overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="size-14 text-[#cccc]" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>Add your profile pic</TooltipContent>
        </Tooltip>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFile}
        />
      </label>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Edit Profile Picture</DialogTitle>

          <div className="relative w-full h-80 bg-black">
            {previewUrl && (
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(area, pixels) => setCroppedArea(pixels)}
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
