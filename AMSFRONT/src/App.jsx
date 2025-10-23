import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
