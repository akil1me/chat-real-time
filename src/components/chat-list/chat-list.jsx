import { ChatItem } from "../chat-item"
import { Loader } from "../loader"
import { ListChat } from "./chat-list.styled"

export const ChatList = ({ docs, loading }) => {

  if (loading) {
    return <Loader vh="vh-70" />
  }

  return (
    <>
      <ListChat
        itemLayout="horizontal"
        size="large"
        dataSource={docs}
        renderItem={(doc) => <ChatItem key={doc.id} {...doc} oldDoc={doc} />}>
      </ListChat>
    </>

  )
}