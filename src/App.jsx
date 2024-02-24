import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, getTodos, postTodo } from "./store/reducer";
import styled from "styled-components";

const ChildrenCont = styled.input`
  width: 239px;
  height: 38px;
  font-size: 23px;
`;
const Button = styled.button`
  margin-top: 18px;
  width: 7em;
  height: 33px;
  font-size: 25px;
`;
const DISPLAY = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;
const P = styled.p`
  font-size: 28px;
  color: aliceblue;
`;
const BUTTON = styled.button`
  width: 75px;
  height: 38px;
  font-size: 24px;
`;
function App() {
  const { data: todos, error, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  const handleAddTodo = () => {
    const newTodo = {
      id: Math.random(),
      title: inputValue,
    };
    if (inputValue === "") {
      alert("пишите с текстом ");
    } else {
      dispatch(postTodo(newTodo));
      setInputValue("");
    }
  };
  const deleteHandle = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="App">
      <div className="clacc">
        {!loading ? (
          <>
            <div>
              <div>
                <ChildrenCont
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div>
                <Button onClick={handleAddTodo}>add todo</Button>
              </div>
            </div>

            <hr />
            {todos.map((el) => {
              return (
                <DISPLAY key={el.id}>
                  <div>
                    <P>{el.title}</P>
                  </div>

                  <div>
                    <BUTTON onClick={() => deleteHandle(el._id)}>delete</BUTTON>
                  </div>
                </DISPLAY>
              );
            })}
          </>
        ) : (
          <span className="Loader"></span>
        )}
      </div>
      <div class="card">
        <h2>CARD</h2>
      </div>
    </div>
  );
}

export default App;
