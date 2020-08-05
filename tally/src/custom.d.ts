type RootState = {
  removeSwitch: string,
  labelList: Label[],
  type: string,
  recordList: RecordItem[],
  isShowInput: boolean,
  isShowNumberPad: boolean,
  isShowCompile: boolean
}

type Label = {
  type: string, tag: string, name: string
}

type RecordItem = {
  type: string,
  tag: string,
  name: string,
  notes: string
  amount: number
  createdAt?: string
}
type Tag = {
  id: string
  name: string
}
