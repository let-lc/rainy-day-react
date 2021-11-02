import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/range.scss";

function RainyDay({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default RainyDay;
