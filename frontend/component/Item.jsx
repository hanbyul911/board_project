const Item = ({board}) => {
  return (
    <>
      <tr>
        <td>{board.id}</td>
        <td>{board.boardTitle}</td>
        <td>{board.boardWriter}</td>
        <td>{board.createdAt}</td>
        <td>{board.boardHits}</td>
      </tr>
    </>
  )
}

export default Item;