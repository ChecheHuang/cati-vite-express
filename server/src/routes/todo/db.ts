interface TodoList {
  id: string
  todo: string
  completed?: boolean
}

const initTodoList: TodoList[] = [
  { id: '1', todo: 'First', completed: false },
  { id: '2', todo: 'Second', completed: false },
  { id: '3', todo: 'Third', completed: false },
]

let todoList: TodoList[] = [...initTodoList]
export const db = {
  todos: {
    findMany: async () => todoList,
    findById: async (id: string) => todoList.find((todo) => todo.id === id),
    create: async ({ todo, completed = false }: { todo: string; completed?: boolean }) => {
      const todoObj = { id: String(todoList.length + 1), todo, completed }
      todoList.push(todoObj)
      return todoObj
    },
    update: async (id: string) => {
      const todoIndex = todoList.findIndex((todo) => todo.id === id)
      todoList[todoIndex].completed = !todoList[todoIndex].completed
      return todoList[todoIndex]
    },
    delete: async (id: string) => {
      todoList = todoList.filter((todo) => todo.id !== id)
      return true
    },
  },
}
