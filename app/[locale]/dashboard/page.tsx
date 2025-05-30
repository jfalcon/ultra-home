import { getSessionInfo } from '@/utility';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function Dashboard() {
  // this server-side so no need for useMemo here
  const session = await getSessionInfo();

  return (
    <main>
      <Header />
      <p>Hello, {session.user.name}</p>
      <Footer />
    </main>
  );
}
