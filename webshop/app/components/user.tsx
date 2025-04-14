export function User({ firstName, lastName }: { firstName: string; lastName: string; }) {
  return (
    <li>
      <p>Name: {firstName} {lastName}</p>
    </li>
  );
}