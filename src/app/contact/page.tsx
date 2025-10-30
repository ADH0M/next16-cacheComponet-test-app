import { cookies } from "next/headers";
import { Suspense } from "react";

const GetCookes = async () => {
  const cooke = await cookies();
  const user = cooke.get("user")?.value || "adham";
  return <div>{user}</div>;
};

const page = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <GetCookes />
    </Suspense>
  );
};

export default page;
