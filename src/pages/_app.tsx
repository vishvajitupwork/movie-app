import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default MyApp;
