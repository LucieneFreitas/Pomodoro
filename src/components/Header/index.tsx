import { HeaderContainer } from './styles' // Importa estilos para o cabeçalho
import { Scroll, Timer, Sun, Moon } from 'phosphor-react' // Importa ícones

import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom' // Importa componente para criar links de navegação
import { useThemeContext } from '../../contexts/ThemeContext'

export function Header() {
  // Usa o contexto de tema para acessar funções e dados relacionados ao tema
  const { toggleTheme, isDarkTheme } = useThemeContext()

  return (
    <HeaderContainer>
      {/* Seção do cabeçalho */}
      <div>
        <img src={logoIgnite} alt="" /> {/* Exibe o logo */}
        {/* Botão para alternar entre tema claro e escuro */}
        <button onClick={() => toggleTheme()}>
          {isDarkTheme ? <Sun size={24} /> : <Moon size={24} />} {/* Mostra o ícone do sol se o tema for escuro, caso contrário, mostra o ícone da lua */}
        </button>
      </div>
      <nav>
         {/* Links de navegação para as páginas do site */}
        <NavLink to="/" title="Timer">
          <Timer size={24} /> {/* Ícone de cronômetro para a página inicial */}
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} /> {/* Ícone de rolagem para a página de histórico */}
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}