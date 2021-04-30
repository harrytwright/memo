import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 2 1 auto;
  overflow: auto;
  position: relative;
  
  display: none;
  @media (min-width: 800px), (orientation: landscape) {
    display: block;
  }
  
  background: #262421;
  color: #bababa;
`

export default Wrapper
