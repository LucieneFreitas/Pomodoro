import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// Define um novo tipo `ThemeType` que corresponde ao tipo do objeto `defaultTheme`.
// Isso permite que o TypeScript entenda quais propriedades e valores estão disponíveis no tema.
type ThemeType = typeof defaultTheme

// Extende o módulo 'styled-components' com uma nova interface `DefaultTheme`.
// Isso permite que qualquer componente estilizado com `styled-components` acesse o tema tipado, 
// garantindo que as propriedades do tema sejam verificadas pelo TypeScript.
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
// A interface `DefaultTheme` agora herda todas as propriedades e tipos definidos em `ThemeType`.
}


