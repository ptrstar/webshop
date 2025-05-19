export function User({ email, amount, date }: { email: string; amount: number; date: Date}) {
  return (
    <li>
      <p>Email: {email}</p>
      <p>Menge: {amount}</p>
      <p>Datum: {date.toLocaleDateString()}</p>
    </li>
  );
}