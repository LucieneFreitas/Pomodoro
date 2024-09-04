import styled from 'styled-components'

// Criando um contêiner principal para a página "Home"
export const HomeContainer = styled.main`
  flex: 1; // Faz o contêiner ocupar todo o espaço disponível

  display: flex;
  flex-direction: column; // Colocando os elementos em uma coluna, um embaixo do outro
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

// Criando um botão base com estilo que outros botões vão usar
export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${(props) => props.theme['text-button']};
  cursor: pointer;

  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

// Criando um botão para começar a contagem, baseado no botão base
export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['ignite-mid']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['ignite-dark']};
  }
`

// Criando um botão para parar a contagem, que usa o estilo do botão de começar
export const StopCountdownButton = styled(StartCountdownButton)`
  background: ${(props) => props.theme['ec-light']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['ec-dark']};
  }
  `