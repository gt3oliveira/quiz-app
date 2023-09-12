'use client'
import { useState, useEffect } from 'react'
import { questions } from '@/api/db'
import { gabarito } from '@/api/dbGabarito'
import { Button, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, RadioGroup, RadioProps, VisuallyHidden, cn, useDisclosure, useRadio } from "@nextui-org/react";
import Router from 'next/router';

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between flex-row-reverse",
        "w-full cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

type QuestionsProps = {
  id: number;
  pergunta: string;
  altA: string;
  altB: string;
  altC: string;
}

type ChangeQuestion = {
  id: number;
  resposta: string;
}

interface ResultadoGab{
  changeQuestions: ChangeQuestion[];
  gabarito?: string;
  cor?: string;
}

interface QuizProps {
  questionsProps: QuestionsProps[];
  changeQuestions: ChangeQuestion[]
}

export default function Quiz({ questionsProps, changeQuestions }: QuizProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [qProps, setQProps] = useState<QuestionsProps[]>(questionsProps || [])
  const [resposta, setResposta] = useState<ChangeQuestion[]>(changeQuestions || [])
  const [gabResposta, setGabResposta] = useState<ChangeQuestion[]>(changeQuestions || [])
  const [qResultado, setQResultado] = useState<ChangeQuestion[]>(changeQuestions || [])
  const [percent, setPercent] = useState(0)
  const [second, setSecond] = useState(Number)
  const [question, setQuestion] = useState(1)
  const [optionsChange, setOptionsChange] = useState('')

  useEffect(() => {
    let qprops: QuestionsProps[] = []
    questions.filter((item) => {
      if (item.id === question) {
        qprops.push({
          id: item.id,
          pergunta: item.pergunta,
          altA: item.altA,
          altB: item.altB,
          altC: item.altC
        })
      }

      let listaGab: ChangeQuestion[] = []
      gabarito.map((g) => {
        listaGab.push({
          id: g.id,
          resposta: g.resposta
        })
      })

      setGabResposta(listaGab)
      setQProps(qprops)
      setQuestion(question + 1)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSecond(30)
    const interval = setInterval(() => {
      setSecond((v) => (v !== 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [question]);

  function handleQuentions() {
    let mhResposta = {
      id: (question - 1),
      resposta: optionsChange
    }

    setResposta([...resposta, mhResposta])

    if ((question - 1) !== 10) {
      let qprops: QuestionsProps[] = []
      questions.filter((item) => {
        if (item.id === question) {
          qprops.push({
            id: item.id,
            pergunta: item.pergunta,
            altA: item.altA,
            altB: item.altB,
            altC: item.altC
          })
        }
      })
      setPercent(percent + 10)
      setQuestion(question + 1)
      setQProps(qprops)
    } else {
      setPercent(100)
      setQuestion(10)
      handleVerifyQuestions()
    }
  }

  function handleVerifyQuestions() {
    let resultadoCorreto: ChangeQuestion[] = [] 
    gabResposta.map((g) => {
      resultadoCorreto.push({
        id: g.id,
        resposta: g.resposta
      })
    })

    setQResultado(resultadoCorreto)
    onOpen()
  }

  function handleFinish() {
    Router.push('/')
  }

  return (
    <div>
      <main className=' flex flex-col justify-center items-center h-[100vh] bg-[var(--background-quiz)]'>
        <section className='bg-[var(--bg-quiz)] h-[80vh] w-[60vw]'>
          <div className='flex flex-row justify-around gap-[400px] items-center h-[80px] border-b-1 border-b-[var(--gray-100)]'>
            <span className='text-white text-xl'>Questão | {question - 1}</span>

            <div>
              <span className='text-white'>Total teste: {percent}% completado</span>
              <Progress
                aria-label="Downloading..."
                size="sm"
                value={percent}
                color="primary"
                className="max-w-md mt-1"
              />
            </div>
          </div>

          <div className='flex flex-col justify-center px-20'>
            <div className='flex flex-row h-[80px] justify-between items-center'>
              {(question - 1) === 10 ? (
                <span className='text-[var(--gray-100)] font-bold'>
                  Última pergunta
                </span>
              ) : (
                <span className='text-[var(--gray-100)] font-bold'>
                  {-question + 11} perguntas restantes
                </span>
              )}

              <div className='flex flex-row justify-center items-center'>
                <span className='text-[var(--gray-100)] mr-4 font-bold'>Tempo restante</span>
                <CircularProgress
                  value={second}
                  minValue={0}
                  maxValue={30}
                  color="primary"
                  showValueLabel={true}
                  formatOptions={{ style: "unit", unit: 'second' }}
                  classNames={{
                    svg: "w-16 h-16 drop-shadow-md",
                    track: "stroke-white/10",
                    value: "text-sm font-semibold text-white"
                  }}
                />
              </div>
            </div>

            <section>
              {qProps.map((item) => (
                <div key={item.id}>
                  <span className='text-white'>{item.pergunta}</span>
                  <RadioGroup className='mt-4'>
                    <CustomRadio value={item.altA} onChange={(e) => setOptionsChange(e.target.value)}>
                      <span className='text-white'>{item.altA}</span>
                    </CustomRadio>
                    <CustomRadio value={item.altB} onChange={(e) => setOptionsChange(e.target.value)}>
                      <span className='text-white'>{item.altB}</span>
                    </CustomRadio>
                    <CustomRadio value={item.altC} onChange={(e) => setOptionsChange(e.target.value)}>
                      <span className='text-white'>{item.altC}</span>
                    </CustomRadio>
                  </RadioGroup>
                </div>
              ))}
            </section>

            <div className='flex justify-end mt-4'>
              {(question - 1) === 10 ? (
                <Button onPress={() => (handleQuentions(), handleVerifyQuestions())} className='bg-[var(--button-quiz)] text-white rounded-none px-8 py-6'>
                  <span>Finalizar</span>
                </Button>
              ) : (
                <Button onPress={() => handleQuentions()} className='bg-[var(--button-quiz)] text-white rounded-none px-8 py-6'>
                  <span>Próxima pergunta</span>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Modal scrollBehavior='inside' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Resultado</ModalHeader>
              <ModalBody>
                {qResultado.map((item) => (
                  <div key={item.id}>
                    <span>
                      Questão {item.id}
                    </span>
                    <p>
                      {item.resposta}
                    </p>
                    <hr />
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={() => (onClose(), handleFinish())}>
                  Fim do questionário
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}
