"use client";

import { addToFavorite } from "@/lib/actions/product";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const Favorite = ({
  user,
  productId,
  isFavorite,
}: {
  user: { name: string; email: string; id: string };
  productId: string;
  isFavorite: boolean;
}) => {
  const t = useTranslations("tost");
  const tF = useTranslations("favorite");

  return (
    <span
      className={`absolute w-12 h-12 z-30 text-gray-600 top-5 right-5 text-4xl block cursor-pointer
          active:bg-zinc-200 active:text-blue-500   focus:border  focus:border-pink-500 active:border active:border-pink-500
          rounded-full p-2 ${
            isFavorite
              ? "bg-pink-300 text-white border border-red-400 hover:text-pink-500/90  hover:bg-red-200 "
              : "bg-neutral-500/20 hover:text-blue-500 hover:bg-zinc-200 "
          }`}
      onClick={async () => {
        if (user.id && user.name && user.email) {
          const f = addToFavorite(productId, user.id);
          if ((await f).success === true) {
            toast.success(t("succes.product-favorite"));
          } else {
            toast.error((await f).ms!);
          }
        } else {
          toast.error(tF("log-in"));
        }
      }}
    >
      ♡
    </span>
  );
};

export default Favorite;
