import { Main, Header, Footer } from "./components";
import { TimerProvider } from "./context/TimerContext";

import styled from "styled-components";

const StyledLayoutContainer = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1.5fr 0.2fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
`;

function App() {
  return (
    <TimerProvider>
      <StyledLayoutContainer>
        <Header />
        <Main />
        <Footer />
      </StyledLayoutContainer>
    </TimerProvider>
  );
}

export default App;
