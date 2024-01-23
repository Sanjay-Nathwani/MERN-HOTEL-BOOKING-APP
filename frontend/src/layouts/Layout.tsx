import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
    children : React.ReactNode;
}

const Layout = ({children}:Props) => {
    return (
      <div className="flex flex-col min-h-screen min-w-min">
        <Header />
        <Hero />
        <div className="container mx-auto px-8 md:px-10">
          <SearchBar />
        </div>
        <div className="container mx-auto py-10 flex-1 px-8 md:px-10">
          {children}
        </div>
        <Footer />
      </div>
    );
}

export default Layout;