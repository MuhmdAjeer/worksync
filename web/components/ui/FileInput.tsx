import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

interface Iprops {
  placeHolder?: string;
}

const AvatarInput = ({ placeHolder = "Select Image" }: Iprops) => {
  const [avatar, setAvatar] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setAvatar(reader.result.toString());
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center">
      <label className="relative overflow-hidden rounded-full">
        <input
          type="file"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          accept="image/*"
          onChange={handleChange}
        />
        {avatar ? (
          <Image
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">{placeHolder}</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default AvatarInput;
