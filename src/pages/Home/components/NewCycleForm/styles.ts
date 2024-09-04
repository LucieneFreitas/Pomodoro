import styled from 'styled-components'

// Estiliza o contêiner do formulário
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['text-title']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
// Estiliza os campos de entrada (inputs) base
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.placeholder};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['text-title']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['ignite-mid']};
  }

  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`

// Estiliza o campo de entrada para a tarefa
export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator { // Remove o ícone de calendário que aparece em alguns navegadores
    display: none !important;
  }
`
// Estiliza o campo de entrada para a quantidade de minutos
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`