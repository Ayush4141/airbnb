"use client";

import { useState } from "react";
import { SafeUser } from "../types";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId?: string;
  currentuser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentuser,
}) => {
  const hasFovorited = useState(false);
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -left-[20px]"
      />
    </div>
  );
};

export default HeartButton;
