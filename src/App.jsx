import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    let { isLoggedIn, token, login, logout, checkTokenValidity } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            checkTokenValidity();
        }
    }, [isLoggedIn]);

    function renderContent() {
        if (!isLoggedIn) {
            return (<Login onLogin={login} />);
        } else {
            return (<Home token={token} onLogout={logout} />);
        }
    }

    return (
        <div className="container">
            {renderContent()}
        </div>
    );
}

export default App;