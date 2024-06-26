"use client";

import { useState } from "react";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorites";

interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  //   const [hasFovorited, setHasFavorited] = useState(false);

  //   const toggleFavorite = () => {};
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={29}
        className="fill-white absolute -top-[2px] -left-[20px]"
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited
            ? `fill-rose-500  absolute -top-[0.60px] -left-[17px]`
            : "fill-neutral-500/70  absolute -top-[0.70px] -left-[17px]"
        }
      />
    </div>
  );
};

export default HeartButton;
