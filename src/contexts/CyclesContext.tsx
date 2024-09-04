import { differenceInSeconds } from 'date-fns' // Importa uma função para calcular a diferença de segundos entre duas datas
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  deleteCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions' // Importa funções que criam ações para o gerenciamento de ciclos
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer' // Importa o tipo Cycle e o reducer para gerenciar o estado dos ciclos

// Define o formato dos dados necessários para criar um novo ciclo
interface CreateCycleData {
  task: string
  minutesAmount: number
}

// Define o formato do contexto que vai ser usado em outros componentes
interface CyclesContextType {
  cycles: Cycle[] // Lista de todos os ciclos
  activeCycle: Cycle | undefined // Ciclo que está atualmente em andamento
  activeCycleId: string | null //ID do ciclo ativo
  amountSecondsPassed: number // Quantidade de segundos que passaram no ciclo ativo
  markCurrentCycleAsFinished: () => void // Função para marcar o ciclo ativo como concluído
  setSecondsPassed: (seconds: number) => void // Função para atualizar o número de segundos passados
  createNewCycle: (data: CreateCycleData) => void // Função para criar um novo ciclo
  interruptCurrentCycle: () => void // Função para interromper o ciclo ativo
  deleteCycle: (cycleId: string) => void // Função para deletar um ciclo
}

// Cria o contexto vazio que será usado para fornecer dados para outros componentes
export const CyclesContext = createContext({} as CyclesContextType)

// Define as propriedades aceitas pelo provedor de contexto
interface CyclesContextProviderProps {
  children: ReactNode
}

// Função que cria o provedor do contexto dos ciclos
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // Usa um reducer para gerenciar o estado dos ciclos
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [], // Inicialmente, não há ciclos
      activeCycleId: null, // Inicialmente, nenhum ciclo está ativo
    },
    () => {
      // Função para definir o estado inicial a partir do localStorage, se disponível
      const storageStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Calcula o número de segundos passados desde o início do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  // Função para atualizar o número de segundos passados
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Função para criar um novo ciclo
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // Gera um ID único baseado no tempo atual

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0) // Reseta o número de segundos passados
  }

   // Funções para alterar o estado dos ciclos
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function deleteCycle(cycleId: string) {
    dispatch(deleteCycleAction(cycleId))
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        deleteCycle,
      }}
    >
      {children} {/* Renderiza os componentes filhos */}
    </CyclesContext.Provider>
  )
}