import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Error404 from './pages/404';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { paths } from './paths';
import './styles/global.css';

function App() {
    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={paths.home} element={<Home />} />
                <Route path={paths.signUp} element={<SignUp />} />
                <Route path={paths.signIn} element={<SignIn />} />
                <Route path={paths.dashboard} element={auth ? <Dashboard /> : <Home />} />
                {/*404 sempre por último*/}
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
