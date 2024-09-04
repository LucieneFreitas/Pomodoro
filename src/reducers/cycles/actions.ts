import { Cycle } from './reducer' // Importa o tipo de dado 'Cycle' de outro arquivo

// Define as ações possíveis que podemos fazer no sistema
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE', // Ação para adicionar um novo ciclo
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE', // Ação para interromper o ciclo atual
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED', // Ação para marcar o ciclo atual como finalizado
  DELETE_CYCLE = 'DELETE_CYCLE', // Ação para excluir um ciclo
}

// Função que cria a ação de adicionar um novo ciclo
export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

// Função que cria a ação de marcar o ciclo atual como finalizado
export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,// Tipo da ação que será disparada
  }
}

// Função que cria a ação de interromper o ciclo atual
export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

// Função que cria a ação de excluir um ciclo
export function deleteCycleAction(cycleId: string) {
  return {
    type: ActionTypes.DELETE_CYCLE,
    payload: {
      cycleId, // O ID do ciclo que queremos excluir
    },
  }
}