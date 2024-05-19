import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar isLoggedIn={false} />
        <div style={{ flex: 1 }}>
          {/* Your page content goes here */}
        </div>
        <Footer />
      </div>
    </>
  );
}
