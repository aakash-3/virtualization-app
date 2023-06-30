import logo from "./logo.svg";
import "./App.css";
import { loremIpsum } from "lorem-ipsum";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const rowCount = 5000;
const listHeight = 400;
const rowHeight = 50;
const rowWidth = 700;

const list = Array(rowCount)
  .fill()
  .map((val, idx) => {
    return {
      id: idx,
      name: "John Doe",
      image: "http://via.placeholder.com/40",
      text: loremIpsum({
        count: 2,
        units: "sentences",
        sentenceLowerBound: 2,
        sentenceUpperBound: 100,
      }),
    };
  });
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

function renderRow({ index, key, style, parent }) {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {({ registerChild }) => (
        <div style={style} className="row" ref={registerChild}>
          <div className="image">
            <img src={list[index].image} alt="" />
          </div>
          <div className="content">
            <div>{list[index].name}</div>
            <div>{list[index].text}</div>
          </div>
        </div>
      )}
    </CellMeasurer>
  );
}

function App() {
  return (
    <div className="App">
      <div className="header">virtualization</div>
      <div className="list">
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={list.length}
              overscanRowCount={3}
            />
          )}
        </AutoSizer>
      </div>
      ;
    </div>
  );
}

export default App;
