import { Suspense } from "react";
import Users from "./Users";

const page = async () => {
  return (
    <div>
      about
      <Suspense fallback={<div>loading</div>}>
        <Users />
      </Suspense>
    </div>
  );
};

export default page;
