import { cacheTag } from 'next/cache';
import { cookies } from 'next/headers'

const GetUser =async () => {
    "use cache: private";
    const cooke = await cookies();
    const user =JSON.parse(cooke.get('user')?.value || "");
    cacheTag(  `user-id:${user?.id}`);
    

    
  return (
    <nav>
        <ul className='flex justify-around   from-orange-200  bg-linear-to-br p-5'>
            <li>{user?.name}</li>
            <li>{user?.email}</li>
        </ul>
    </nav>
  )
}

export default GetUser