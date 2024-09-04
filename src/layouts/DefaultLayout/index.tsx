import { Outlet } from 'react-router-dom' // Importa um componente que mostra o conteúdo de uma página
import { Header } from '../../components/Header' // Importa o cabeçalho da página
import { LayoutContainer } from './styles' // Importa o estilo para a estrutura da página

// Função que define como o layout da página deve ser
export function DefaultLayout() {
  return (
    <LayoutContainer> {/* Contêiner que aplica o estilo ao layout */}
      <Header /> {/* Mostra o cabeçalho no topo da página */}
      <Outlet /> {/* Mostra o conteúdo da página aqui */}
    </LayoutContainer>
  )
}