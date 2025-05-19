import { db } from '@/util/supabase/drizzle'
import { interest } from '@/util/supabase/schema';
import { User } from '@/app/components/user';

export default async function Page() {

  const userData = await db.select().from(interest);

  return (
    <>
        <h1>Admin</h1>
        <ul>
        {userData?.map((user, idx) => (
            <User
            key={idx}
            email={user.email}
            amount={user.amount}
            date={user.createdAt}
            />
        ))}
        </ul>  
    </>
   
  );
}