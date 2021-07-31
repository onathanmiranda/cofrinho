import { useSelector } from 'react-redux'

export default function Timeline(){
  
  const timeline = useSelector(({ timeline }) => timeline)

  return (
    <div>
      <button>{timeline.previous.month.name}</button>
      <button>{timeline.current.month.name}</button>
      <button>{timeline.next.month.name}</button>
    </div>
  )
}