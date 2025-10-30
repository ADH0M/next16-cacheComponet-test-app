
interface IUser {
  id: number;
  username: string;
  email: string;
}

const Users = async () => {
    "use cache"
  const req = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: IUser[] = await req.json();

  return (
    <div className=" flex justify-center items-center min-h-screen w-full">
      <div>
        {users.map((user) => (
          <div key={user.id} className=" border mt-3 p-2">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
