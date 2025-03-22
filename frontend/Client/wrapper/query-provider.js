import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default QueryProvider = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
