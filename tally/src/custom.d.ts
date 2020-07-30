type RootState = {
  removeSwitch:string,
  labelList:Label[],
  type:string,
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
  isShowInput: boolean,
  isShowNumberPad: boolean,
  isShowCompile: boolean
}

type Label = {
  type:string,tag:string,name:string
}

type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number
  createdAt?: string
}
type Tag = {
  id: string
  name: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated'  //联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}
type Labels = {
  icon: string,
  type: string
}

