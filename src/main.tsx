import { PaletteOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import HabitsProvider from './contexts/HabitsContext';
import UserProvider from './contexts/UserContext';

interface ColorOverrides {
    primary: true;
    secondary: true;
    bom: true;
    ruim: true;
    saude: true;
    educacao: true;
    lazer: true;
    outro: true;
}

declare module '@mui/material' {
    interface ButtonPropsColorOverrides extends ColorOverrides {
        transparent: true;
    }

    interface SvgIconPropsColorOverrides extends ColorOverrides {
        transparent: true;
    }

    interface CheckboxPropsColorOverrides extends ColorOverrides {
        transparent: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        primary: createColor('#183695'),
        secondary: createColor('#069010'),
        bom: createColor('#0ca31f'),
        ruim: createColor('#ff0000'),
        saude: createColor('#007d00'),
        educacao: createColor('#430054'),
        lazer: createColor('#081fca'),
        outro: createColor('#222'),
    } as PaletteOptions,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthProvider>
        <HabitsProvider>
            <UserProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </UserProvider>
        </HabitsProvider>
    </AuthProvider>,
);
