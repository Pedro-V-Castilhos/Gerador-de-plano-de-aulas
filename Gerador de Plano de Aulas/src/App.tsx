import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { Button, Container, Navbar } from "react-bootstrap";
import { supabase } from "./supabase-client";
import type { Session } from "@supabase/supabase-js";
import { BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";

function App() {
  // UseState da sessão atual
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Atualiza a sessão para corresponder com a atual
  const fetchSession = async () => {
    const curentSession = await supabase.auth.getSession();
    setSession(curentSession.data.session)
    setLoading(false);
  }

// Carrega a sessão ao renderizar a página
  useEffect(() => {
    fetchSession();

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  // Função de logout
  const logout = async () => {
    await supabase.auth.signOut();
  }

  // Render da página
  return (
    <BrowserRouter>
    <Navbar>
        <Container>
          <Navbar.Brand><img src="/supabase-logo-icon.svg"/></Navbar.Brand>
          <Navbar.Collapse className="justify-content-start">
            {session
              ? (<>
                  <Link to="/viewProducts" className="navbarLink">Catálogo</Link> 
                  <Link to="/order" className="navbarLink">Meu carrinho</Link>
                </>)
              : <></>
            }
          </Navbar.Collapse>
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
            <Route path="/" element={session ? <Navigate to="/viewPlans" /> : <Navigate to="/authenticate" />}/>
            <Route path="/plans" element={session ? <></> : <Navigate to="/authenticate" />}/>
            <Route path="/authenticate" element={session ? <Navigate to="/viewPlans" /> : <Auth/>}/>
            <Route path="/new" element={session ? <></> : <Navigate to="/authenticate" />}/>            
          </Routes>
      )}
    </div>

    </BrowserRouter>
  )
}

export default App
