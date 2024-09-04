import { differenceInSeconds } from 'date-fns' // Importa uma função para calcular a diferença em segundos entre datas
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext' // Importa o contexto dos ciclos de tempo
import { CountDownContainer, Separator } from './styles'

export function Countdown() {
  // Pega as informações do contexto dos ciclos
  const {
    activeCycle, // O ciclo atual que está em andamento
    activeCycleId, // O identificador do ciclo atual
    amountSecondsPassed, // Quanto tempo já passou
    setSecondsPassed, // Função para atualizar o tempo passado
    markCurrentCycleAsFinished, // Função para marcar o ciclo como concluído
  } = useContext(CyclesContext)

  // Calcula o total de segundos que o ciclo deve durar
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  /* ===== LÓGICA DO CICLO ATIVO ===== */
  useEffect(() => {
    let interval: number // Variável para armazenar o intervalo do timer

    if (activeCycle) { // Se houver um ciclo ativo
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(), // Hora atual
          new Date(activeCycle.startDate), // Hora que o ciclo começou
        )

        if (secondsDifference >= totalSeconds) { // Se o tempo do ciclo acabou
          markCurrentCycleAsFinished() // Marca o ciclo como concluído

          // Completando ciclo
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    // Limpa o intervalo quando o componente é removido da tela
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ])

  /* ===== LÓGICA DO COUNTDOWN ===== */
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // Calcula os segundos restantes

  const minutesAmount = Math.floor(currentSeconds / 60) // Calcula quantos minutos restam
  const secondsAmount = currentSeconds % 60 // Calcula os segundos restantes

  const minutes = String(minutesAmount).padStart(2, '0') // Garante que sempre tenha dois dígitos para os minutos
  const seconds = String(secondsAmount).padStart(2, '0') // Garante que sempre tenha dois dígitos para os segundos

  // Atualiza o título da página com o tempo restante
  useEffect(() => {
    document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle]) // Atualiza o título sempre que os minutos, segundos ou ciclo ativo mudar

  // Exibe o tempo restante na tela
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}