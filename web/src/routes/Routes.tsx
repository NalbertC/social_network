import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "../contexts/auth";

import { AutoCadastro } from "../pages/AutoCadastro";

import { Home } from "../pages/Home";

import { Login } from "../pages/Login";

import { useAuth } from "../hooks/useAuth";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";
import { RecuperarSenha } from "../pages/RecuperarSenha";
import { ResetarSenha } from "../pages/ResetarSenha";


export function WebRoutes() {
  const Private = (props: any) => {
    const { authenticated, loading , user} = useAuth()

    if (loading) {
      return <div>Carregando ...</div>;
    }

    if (!user?.id) {
      return <Navigate to="/login" />;
    }

    return props.children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<AutoCadastro />} />
          <Route path="/recuperar_senha" element={<RecuperarSenha />} />
          <Route path="/resetar_senha/:token" element={<ResetarSenha />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
