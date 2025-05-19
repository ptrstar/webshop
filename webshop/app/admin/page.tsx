import { db } from '@/util/supabase/drizzle'
import { users } from '@/util/supabase/schema';
import { User } from '@/app/components/user';

export default async function Page() {

  const userData = await db.select().from(users);

  return (
    <>
        <h1>Admin</h1>
        <ul>
        {userData?.map((user, idx) => (
            <User
            key={idx}
            firstName={user.firstName}
            lastName={user.lastName}
            />
        ))}
        </ul> 
    </>
   
  );
}