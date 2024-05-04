import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <Footer />
    </>
  );
}
