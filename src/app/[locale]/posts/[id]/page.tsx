import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Client from "./Client";

const User =  async({ params }:{params:Promise<{id:string}>}) => {
  const {id} = await params;
  const getUser = await prisma.post.findUnique({where:{id}});
//   if(!getUser){
//     return notFound();
//   }
  return <div>page{id}</div>;
};

const page = async ({ params }: PageProps<"/posts/[id]">) => {

  return (
    <div>
      <Suspense>
        <User params={params} />
      </Suspense>

      <Client/>
    </div>
  );
};

export default page;
