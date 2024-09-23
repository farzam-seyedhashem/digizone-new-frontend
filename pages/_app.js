import "@/styles/globals.css";
import {ThemeProvider} from "@/pages/theme-provider";

export default function App({Component, pageProps}) {
    return <ThemeProvider><Component {...pageProps} /></ThemeProvider>;
}
