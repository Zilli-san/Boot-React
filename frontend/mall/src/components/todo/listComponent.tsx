import { useEffect, useState } from "react"
import { getList } from "../../api/todoApi"
import useCustomMove from "../../hooks/useCustomMove"
import useCustomLogin from "../../hooks/useCustomLogin"
import PageComponent from "../common/pageComponent"
import FetchingModal from "../common/fetchingModal"

const initState: PageResponseDTO<Todo> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {

    const { exceptionHandle } = useCustomLogin()

    const { page, size, refresh, moveToList, moveToRead } = useCustomMove()

    const [serverData, setServerData] = useState<PageResponseDTO<Todo>>(initState)

    const [fetching, setFetching] = useState(false)

    useEffect(() => {

        setFetching(true)

        getList({ page, size }).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        }).catch(err => {
            setFetching(false)
            exceptionHandle(err)
        })

    }, [page, size, refresh])

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">

            {fetching && <FetchingModal />}

            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(todo =>
                    <div
                        key={todo.tno}
                        className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        onClick={() => moveToRead(todo.tno)}
                    >
                        <div className="flex">
                            <div className="font-extrabold text-2xl p-2 w-1/12">
                                {todo.tno}
                            </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                                {todo.title}
                            </div>
                            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                                {todo.dueDate}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    )
}

export default ListComponent