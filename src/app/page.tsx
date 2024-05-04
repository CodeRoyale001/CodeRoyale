import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar'
import Resizeable from '@/components/resizable'

export default function Home() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <Resizeable/>
      <Footer />
    </>
  );
}
