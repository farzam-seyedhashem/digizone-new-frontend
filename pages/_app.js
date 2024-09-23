import "@/styles/globals.css";
import {ThemeProvider} from "@/theme-provider";

export default function App({Component, pageProps}) {
    return <ThemeProvider><Component {...pageProps} /></ThemeProvider>;
}
