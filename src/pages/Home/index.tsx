import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

//Automatizando processo 
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// controlled / uncontrolled
export function Home() {
  // Pegando dados e funções do contexto, como o ciclo ativo, função para criar um novo ciclo, e função para interromper o ciclo atual
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

   // Criando um formulário com configurações de validação e valores iniciais  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // Aqui estamos definindo como o formulário deve ser validado
    defaultValues: {
      // Definindo valores iniciais para os campos do formulário
      task: '', // Tarefa começa vazia
      minutesAmount: 0, // Minutos começam em zero
    },
  })

  // Pegando funções e valores do formulário criado acima
  const { handleSubmit, watch, reset } = newCycleForm

  // Função para lidar com a criação de um novo ciclo, que é chamada ao enviar o formulário
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data) // Cria um novo ciclo com os dados preenchidos
    reset() // Limpa o formulário após a criação do ciclo
  }

  // Aqui estamos monitorando o campo "task" em tempo real
  const task = watch('task')
  const isButtonSubmitDisabled = !task // Desabilita o botão de começar se o campo "task" estiver vazio

  return (
    <HomeContainer>
      {/* Formulário que envia os dados para criar um novo ciclo */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
           {/* Componente do formulário para preencher os dados do ciclo */}
          <NewCycleForm />
        </FormProvider>
        {/* Componente de contagem regressiva */}
        <Countdown />

        {/* Se há um ciclo ativo, mostra botão para interromper; se não, mostra botão para começar */}
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isButtonSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}