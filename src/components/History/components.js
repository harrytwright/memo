import styled from 'styled-components'

const Index = styled.span``

const Move = styled.span``

const TableView = styled.div`
  white-space: normal;
  display: flex;
  flex-flow: row wrap;
  
  & > ${Index} {
    flex: 0 0 13%;
    display: flex;
    justify-content: center;
    border-right: 1px solid #404040;
    background: #302e2c;
    line-height: 2.07em;
    color: #6b6b6b;
  }

  & > ${Move} {
    flex: 0 0 43.5%;
    display: flex;
    font-size: 1.185em;
    line-height: 1.75em;
    padding: 0 0.3em 0 0.5em;
  }

  & > ${Move}.active {
    font-weight: bold;
    background: #293a49;
  }

  & > ${Index}+${Move} {
    border-right: #404040;
  }
`

export { TableView, Index, Move }
