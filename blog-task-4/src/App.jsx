import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import ArticlesDetails from "./pages/ArticlesDetails";

//layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="articles/:slug" element={<ArticlesDetails />} />
      <Route path="newpost" element={<NewPost />} />
      <Route path="settings" element={<Settings />} />
      <Route path="signin" element={<SignIn />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
