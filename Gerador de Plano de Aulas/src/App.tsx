import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { Button, Container, Navbar } from "react-bootstrap";
import type { Session } from "@supabase/supabase-js";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { fetchSession, logout, setSessionListener } from "./handlers/sessionHandler";
import ViewPlans from "./components/ViewPlans";
import NewPlan from "./components/NewPlan";

function App() {
  // UseState da sessão atual
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Atualiza a sessão para corresponder com a atual
  const getSession = async () => {
    setSession(await fetchSession());
    setLoading(false);
  }

// Carrega a sessão ao renderizar a página
  useEffect(() => {
    getSession();

    const subscription = setSessionListener(setSession);

    return () => {
      subscription.subscription.unsubscribe();
    }
  }, [])

  // Render da página
  return (
    <BrowserRouter>
    <Navbar>
        <Container>
          <Navbar.Brand><img src="/supabase-logo-icon.svg"/></Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {session
              ? <Navbar.Text>
                  <Button id="logoutButton" onClick={() => {logout()}}>Encerrar Sessão</Button>
                </Navbar.Text>
              : <></>
            }
          </Navbar.Collapse>
        </Container>
    </Navbar>

    <div className="app">
      {!loading && (
          <Routes>
            <Route path="/" element={session ? <Navigate to="/plans" /> : <Navigate to="/authenticate" />}/>
            <Route path="/plans" element={session ? <ViewPlans/> : <Navigate to="/authenticate" />}/>
            <Route path="/authenticate" element={session ? <Navigate to="/plans" /> : <Auth/>}/>
            <Route path="/new" element={session ? <NewPlan/> : <Navigate to="/authenticate" />}/>            
          </Routes>
      )}
    </div>

    </BrowserRouter>
  )
}

export default App
