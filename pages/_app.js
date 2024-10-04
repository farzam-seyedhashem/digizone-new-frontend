import "@/styles/globals.css";
import {ThemeProvider} from "@/theme-provider";
import 'swiper/css'
import 'swiper/css/navigation';
export default function App({Component, pageProps}) {
    return <ThemeProvider><Component {...pageProps} /></ThemeProvider>;
}
