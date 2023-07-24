import React from "react";
import styled from "styled-components";
import Pin from "./Pin";
const MainBoard = ({ pins, onOpen }) => {
  return (
    <Wrapper>
      <Container>
        {pins.map((pin) => {
          return (
            <Pin key={pin.id} url={pin.urls.small} pin={pin} onOpen={onOpen} />
          );
        })}
        {pins.length ? "" : <h1>No Result Found!</h1>}
      </Container>
    </Wrapper>
  );
};
export default MainBoard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 95%;
  height: 100%;
  columns: 5 160px;
  column-gap: 0;
`;
