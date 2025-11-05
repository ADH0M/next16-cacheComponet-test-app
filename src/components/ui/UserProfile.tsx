"use client";
import { Link, useRouter } from "@/i18n/navigation";
import { logout } from "@/lib/actions/user";
import { useTranslations } from "next-intl";

const UserProfile = ({ username, id }: { username: string; id: string }) => {
  const t = useTranslations("auth");
  const route =useRouter()
  return (
    <>
      <button
        onClick={()=>{
          logout();
          route.push('/');
        }}
        className="text-red-400 ring-1 hover:ring-red-500  ring-pink-500 p-2 hover:text-pink-500
        cursor-pointer  hover:bg-pink-50
        rounded-2xl bg-neutral-50 text-xs font-semibold"
      >
        {t("logout")}
      </button>
      <div
        className="mx-4 font-light text-sm border w-8 h-8 md:w-10 md:h-10 flex justify-center uppercase
      hover:bg-neutral-200 hover:text-blue-500 border-blue-500 hover:border-pink-500
      items-center rang-1 rang-blue-500 bg-neutral-100 text-blue-500 rounded-full"
      >
        <Link href={`/user/${id}`}>{username}</Link>
      </div>
    </>
  );
};

export const UserLoading = () => {
  return (
    <>
      <button
        onClick={logout}
        className="text-red-400 ring-1 w-16 h-8 ring-pink-500 p-2 
        cursor-pointer  animate-pulse rounded-xl bg-neutral-50 text-xs font-semibold "
      />
      <div
        className="mx-4 font-light text-sm border w-8 h-8 md:w-10 md:h-10 flex justify-center uppercase
      border-blue-500 items-center rang-1 rang-blue-500 bg-neutral-100 text-blue-500 rounded-full animate-pulse"
      />
    </>
  );
};

export default UserProfile;
