import styled, { keyframes } from 'styled-components' // Importa ferramentas para criar estilos e animações

// Cria uma animação para o botão, onde ele sobe e desce
const buttonAnimation = keyframes`
  0% {
    transform: translateY(0); // Começa na posição original
  }
  50% {
    transform: translateY(-6px); // Sobe um pouco
  }
  100% {
    transform: translateY(0); // Volta para a posição original
  }
`

// Estilo principal para o contêiner da seção de histórico
export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['text-title']};
  }
`

// Estilo para a lista de histórico
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; //somente a borda dos tr e td
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['shape-header']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['color-header-table']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
        text-align: center;
      }
    }

    td {
      background-color: ${(props) => props.theme['shape-content']};
      color: ${(props) => props.theme['color-content-table']};
      border-top: 4px solid ${(props) => props.theme['shape-primary']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
        text-align: center;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          padding: 0.25rem;
          color: ${(props) => props.theme['text-button']};
          background: ${(props) => props.theme['ec-light']};
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.2s ease;

          &:hover {
            animation: ${buttonAnimation} 0.5s linear normal;
            background: ${(props) => props.theme['ec-dark']};
          }

          svg {
            display: block;
          }
        }
      }
    }
  }
`

// Define as cores possíveis para o status dos ciclos
const STATUS_COLOR = {
  'warning-light': 'warning-light',
  'ignite-mid': 'ignite-mid',
  'ec-light': 'ec-light',
} as const // Garante que só essas cores podem ser usadas

// Define as propriedades do componente Status
interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR // A cor do status deve ser uma das definidas acima
}

// Estilo para o status de cada ciclo (Concluído, Interrompido, Em andamento)
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  }
`