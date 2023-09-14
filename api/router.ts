
interface DataQuestions{
  id: number;
  resposta: string;
}

let dataQuestions: DataQuestions[] = []

export function getData() {  
  return dataQuestions
}

export function postData(data: DataQuestions) {
  dataQuestions.push({
    id: data.id,
    resposta: data.resposta
  })
}

