import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "styled-components"; // Importa o ThemeProvider para aplicar temas de estilo
import { darkTheme } from "../styles/themes/dark"; // Importa o tema escuro
import { lightTheme } from "../styles/themes/light"; // Importa o tema claro

// Define o formato dos dados do contexto de tema
interface ThemeContextData {
  toggleTheme: () => void; // Função para alternar entre os temas
  isDarkTheme: boolean; // Verdadeiro se o tema atual for escuro
}

// Define as propriedades aceitas pelo provedor de contexto de tema
interface ThemeContextProviderProps {
  children: ReactNode;
}

// Cria o contexto para o tema (começa vazio)
export const ThemeContext = createContext({} as ThemeContextData);

// Função que cria o provedor do contexto de tema
export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  // Define o tema inicial baseado no que está salvo no navegador
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storageTheme = JSON.parse(
      localStorage.getItem("@ignite-timer:theme-1.0.0")!
    );

    // Se o tema salvo for "dark", usa "dark", caso contrário, usa "light"
    if (storageTheme && storageTheme === "dark") {
      return "dark";
    } else {
      return "light";
    }
  });

   // Verifica se o tema atual é escuro
  const isDarkTheme = theme === "dark";

   // Função para mudar o tema entre claro e escuro
  function toggleTheme() {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
  }

  // Sempre que o tema mudar, salva o novo tema no navegador
  useEffect(() => {
    localStorage.setItem("@ignite-timer:theme-1.0.0", JSON.stringify(theme));
  }, [theme]);

  return (
    // Fornece o contexto de tema para os componentes filhos
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// Função para usar o contexto de tema em outros componentes
export function useThemeContext() {
  const context = useContext(ThemeContext);

  return context;
}
