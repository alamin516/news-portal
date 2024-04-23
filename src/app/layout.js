import NextTopLoader from "nextjs-toploader";
import '@/assets/css/style.css'
import '@/assets/css/dropdownmenu.css'
import '@/assets/css/sidebar.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ScrollButton from "@/components/master/ScrollToTop";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NextTopLoader color="#e60000" height={2} speed={200} showSpinner={false}/>
        <ScrollButton/>
      </body>
    </html>
  );
}
