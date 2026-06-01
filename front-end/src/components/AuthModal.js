import Login from "./Login";
import Signup from "./Signup";

function AuthModal({ show, mode, setMode, onAuthSuccess }) {
  if (!show) return null;

  return (
    <>
      {mode === "login" ? (
        <Login onAuthSuccess={onAuthSuccess} setMode={setMode} />
      ) : (
        <Signup onAuthSuccess={onAuthSuccess} setMode={setMode} />
      )}
    </>
  );
}

export default AuthModal;