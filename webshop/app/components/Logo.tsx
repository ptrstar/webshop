import Image from 'next/image';
import logo from '@/public/logo.jpeg';

export default function Logo() {
  return (
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      <Image src={logo} alt="Logo" width={200} />
    </div>
  );
}