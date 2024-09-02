import { useState } from "react";

export default function Home() {
  // 상태 변수 설정
  const [todos, setTodos] = useState([]); // 투두 리스트 항목들을 관리
  const [newTodo, setNewTodo] = useState(""); // 입력된 새 투두 항목을 관리
  const [editIndex, setEditIndex] = useState(null); // 수정 중인 항목의 인덱스 관리
  const [editText, setEditText] = useState(""); // 수정 중인 항목의 텍스트 관리
  const [draggingIndex, setDraggingIndex] = useState(null); // 드래그 중인 항목의 인덱스 관리

  // 새 투두 항목 추가
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]); // 새 항목을 투두 리스트에 추가
      setNewTodo(""); // 입력 필드를 비움
    }
  };

  // 투두 항목 삭제
  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); // 클릭한 항목만 제외
    setTodos(updatedTodos); // 갱신된 리스트로 상태를 업데이트
  };

  // 투두 항목 수정 모드로 전환
  const editTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  // 투두 항목 수정 완료
  const saveEditTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editText;
    setTodos(updatedTodos);
    setEditIndex(null); // 수정 모드 종료
    setEditText(""); // 수정 텍스트 초기화
  };

  // 드래그 시작
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // 드래그 오버
  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  // 드롭
  const handleDrop = (index) => {
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(draggingIndex, 1); // 드래그 중인 항목 제거
    updatedTodos.splice(index, 0, removed); // 새로운 위치에 항목 삽입
    setTodos(updatedTodos);
    setDraggingIndex(null); // 드래그 상태 초기화
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#0070f3",
            color: "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "black",
              opacity: draggingIndex === index ? 0.5 : 1,
              cursor: "move",
            }}
          >
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "200px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                />
                <button
                  onClick={() => saveEditTodo(index)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{todo}</span>
                <button
                  onClick={() => editTodo(index)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTodo(index)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
