import { useContext } from 'react' // Importa a função para usar dados de contexto
import { formatDistanceToNow } from 'date-fns' // Importa função para formatar datas
import ptBR from 'date-fns/locale/pt-BR'
import { CyclesContext } from '../../contexts/CyclesContext' // Importa o contexto dos ciclos
import { HistoryContainer, HistoryList, Status } from './styles' // Importa estilos personalizados
import { Trash } from 'phosphor-react' // Importa o ícone de lixeira

// Função que mostra o histórico dos ciclos
export function History() {
  const { cycles, deleteCycle } = useContext(CyclesContext) // Pega a lista de ciclos e a função para excluir um ciclo do contexto

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              {/* Cabeçalho da tabela com os nomes das colunas */}
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              // Para cada ciclo, cria uma linha na tabela
              return (
                <tr key={cycle.id} onClick={() => {}}>
                   {/* Mostra a tarefa do ciclo */}
                  <td>{cycle.task}</td>
                  {/* Mostra a duração do ciclo em minutos */}
                  <td>{cycle.minutesAmount} minutos</td>
                  {/* Mostra quanto tempo passou desde o início do ciclo */}
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true, // Adiciona "há" antes do tempo (ex: "há 5 minutos")
                      locale: ptBR, // Formata a data em português
                    })}
                  </td>
                  <td>
                     {/* Mostra o status do ciclo, se foi concluído */}
                    {cycle.finishedDate && (
                      <Status statusColor="ignite-mid">Concluído</Status>
                    )}

                     {/* Mostra o status do ciclo, se foi interrompido */}
                    {cycle.interruptedDate && (
                      <Status statusColor="ec-light">Interrompido</Status>
                    )}

                    {/* Mostra que o ciclo está em andamento se não foi concluído nem interrompido */}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="warning-light">Em andamento</Status>
                    )}
                  </td>

                  {/* Botão para excluir o ciclo */}
                  <td onClick={() => deleteCycle(cycle.id)}>
                    <button>
                      <Trash size={22} /> {/* Ícone de lixeira */}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}