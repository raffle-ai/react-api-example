import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Search } from "./Search";

const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex">
        <Search />
      </div>
    </QueryClientProvider>
  );
}

export default App;
