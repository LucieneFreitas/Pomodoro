import { produce } from 'immer'  // Importa uma ferramenta que ajuda a fazer mudanças no estado de forma mais fácil
import { ActionTypes } from './actions' // Importa os tipos de ações que podem acontecer

// Define o formato (ou modelo) de um ciclo
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// Define o formato do estado que guarda todos os ciclos
interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

// Função que decide como o estado dos ciclos deve mudar dependendo da ação que aconteceu
export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) { // Verifica o tipo de ação
    case ActionTypes.ADD_NEW_CYCLE: // Quando um novo ciclo é adicionado
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle) // Adiciona o novo ciclo à lista
        draft.activeCycleId = action.payload.newCycle.id // Define esse novo ciclo como o ciclo ativo
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: { // Quando o ciclo atual é interrompido
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId // Encontra o ciclo ativo
      })

      if (currentCycleIndex < 0) { // Se não encontrar o ciclo ativo, retorna o estado sem mudanças
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date() // Marca o ciclo como interrompido
        draft.activeCycleId = null //Não há mais ciclo ativo
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: { // Quando o ciclo atual é finalizado
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) { // Se não encontrar o ciclo ativo, retorna o estado sem mudanças
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.DELETE_CYCLE: { // Quando um ciclo é excluído
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === action.payload.cycleId
      })

      if (currentCycleIndex < 0) { // Se não encontrar o ciclo, retorna o estado sem mudanças
        return state
      }

      return produce(state, (draft) => {
        draft.cycles.splice(currentCycleIndex, 1) // Remove o ciclo da lista
      })
    }
    default: // Se a ação não for reconhecida, retorna o estado sem mudanças
      return state
  }
}