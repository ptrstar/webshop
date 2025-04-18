import { db } from '@/util/supabase/drizzle'
import { cookies } from 'next/headers';
import { users } from '@/util/supabase/schema';
import { eq } from 'drizzle-orm';
import { User } from './components/user';

export default async function Page() {

  // Fetch users from Supabase using Drizzle ORM schema
  const userData = await db.select().from(users);

  // console.log(userData);
  console.log("test")
  return (
    <ul>
      {userData?.map((user, idx) => (
        <User
          key={idx}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
    </ul>
  );
}