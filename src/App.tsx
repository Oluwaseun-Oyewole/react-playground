import classNames from "classnames";
import { Navigate, Route, Routes } from "react-router-dom";
import { PersistentLogin } from "./components/molescules/persistent-login";
import { FetchContextProvider } from "./context/fetch-context";
import { LoginContextProvider } from "./context/login-context";
import { Layout } from "./layout";
import { ChangePassword } from "./pages/change-password";
import { Login } from "./pages/login";
import { PasswordReset } from "./pages/password-reset";
import { Signup } from "./pages/signup";
import { PrivateRoute } from "./routes/protected-routes";
import { Dashboard } from "./views/Dashboard";
import { Comments } from "./views/comments/Comment";
import { PostDetail } from "./views/posts/PostDetail";
import { PostIndex } from "./views/posts/PostIndex";
import { Posts } from "./views/posts/Posts";
import { Users } from "./views/users";
import { UserDetails } from "./views/users/UserDetails";

function App() {
  return (
    <div
      className={classNames(
        "px-7 lg:px-0 md:max-w-[1100px] mx-auto overflow-hidden"
      )}
    >
      <LoginContextProvider>
        <FetchContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route index path="signup" element={<Signup />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="password-reset" element={<PasswordReset />} />

              {/* Protected Routes... */}
              {/* Testing Persist Login Compoent */}

              <Route element={<PersistentLogin />}>
                <Route element={<PrivateRoute />}>
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route path="users" element={<Users />}>
                      <Route index path=":id" element={<UserDetails />} />
                    </Route>
                    <Route path="posts" element={<Posts />}>
                      <Route path=":id" element={<PostDetail />}>
                        <Route index element={<PostIndex />} />
                        <Route path="comments/:id" element={<Comments />} />
                        {/* <Route path="comments" element={<Comments />}>
                        <Route index element={<Comments />} />
                      </Route> */}
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </FetchContextProvider>
      </LoginContextProvider>
    </div>
  );
}

export default App;
