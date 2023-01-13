import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { client } from "./helpers/client";
import Routes from "./routes";
import InfinitePagination from "./routes/infinite-pagination";
import CacheWritePagination from "./routes/infinite-pagination-cache-read-write";
import RegularPagination from "./routes/pagination";

const router = createBrowserRouter([
  { path: "/", element: <Routes /> },
  { path: "/pagination", element: <RegularPagination /> },
  { path: "/infinite-pagination", element: <InfinitePagination /> },
  { path: "/cache-write-pagination", element: <CacheWritePagination /> },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
