import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import trpc, { wsClient } from '@/lib/trpc'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

function TrpcTemplatePage() {
  const [createInput, setCreateInput] = useState('')
  const getTodoList = async () => {
    const todoList = await trpc.todoRouter.getTodoList.query()
    return todoList
  }
  const { data: todoList, refetch } = useQuery({
    queryKey: ['todoList'],
    queryFn: getTodoList,
  })
  const getTodo = (id: string) => async () => {
    const todo = await trpc.todoRouter.getTodo.query({ id })
    console.log(todo)
  }
  const createTodo = (todo: string) => async () => {
    const createTodo = await trpc.todoRouter.createTodo.mutate({ todo })
    refetch()
    setCreateInput('')
  }
  const updateTodo = (id: string) => async () => {
    const updateTodo = await trpc.todoRouter.updateTodo.mutate({ id })
    refetch()
  }
  const deleteTodo = (id: string) => async () => {
    const deleteTodo = await trpc.todoRouter.deleteTodo.mutate({ id })
    refetch()
  }

  useEffect(() => {
    const connection = trpc.todoRouter.onUpdate.subscribe(undefined, {
      onData: (id) => {
        alert(`update ${id}`)
      },
    })
    return () => {
      // wsClient.close()
    }
  }, [])

  return (
    <div className="flex w-screen  flex-col gap-4 p-4  ">
      <div className="flex justify-center gap-2">
        <Input
          className="w-48"
          value={createInput}
          onChange={(e) => setCreateInput(e.target.value)}
          placeholder="createInput"
        />
        <Button onClick={createTodo(createInput)}>createTodo</Button>
      </div>
      <div className="mx-auto w-[300px]">
        <Button
          className="w-full"
          onClick={todoList && getTodo(todoList[todoList.length - 1].id)}
        >
          getLastTodo
        </Button>
        {todoList?.map((todo) => (
          <div
            className="mt-2 flex items-center justify-between gap-4 "
            key={todo.id}
          >
            <Checkbox
              id={todo.id}
              checked={todo.completed}
              onCheckedChange={updateTodo(todo.id)}
            />
            <label className="w-1/2 truncate text-center" htmlFor={todo.id}>
              {todo.todo}
            </label>
            <Button size="sm" variant="outline" onClick={deleteTodo(todo.id)}>
              <X />
            </Button>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  )
}

export default TrpcTemplatePage
