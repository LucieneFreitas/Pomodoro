import styled from "styled-components";

// Estilo para o container do cronômetro
export const CountDownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme["text-title"]};

  display: flex;
  gap: 1.2rem;

  // Estilo para cada número do cronômetro
  span {
    background: ${(props) => props.theme["shape-secondary"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

// Estilo para o separador ":" entre os números
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme["ignite-mid"]};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
