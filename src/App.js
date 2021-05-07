import React, { useState } from 'react';
import Row from './Row';
import AddRow from './AddRow';
import Columns from './Columns';
import Header from './Header';
import { param, data } from './data.js'
import './App.css';

let currentPage = 0;

const App = () => {

  const [table, updateTable] = useState([...param, ...data]);

  const addRow = (newRow) => {
    let newState = table;
    let row = {};
    table[0].names.map((r, i) => row[r] = newRow[i]);
    newState.push(row);
    updateTable(arr => [...newState]);
  }

  const updateTableProperties = (newProperties) => {
    let newState = table;
    newProperties.forEach((p, i) => {
      if (i >= table[0].names.length) {
        newState.forEach((record, i) => {
          if (i > 0) {
            record[p.name] = p.type == 'date' ? '????-??-??' : '-';
          }
        })
      }
    });

    newState[0].names = newProperties.map(p => p.name);
    newState[0].types = newProperties.map(p => p.type);
    newState[0].order = newProperties.map(p => p.order);
    newState[0].sticky = newProperties.map(p => p.sticky);
    newState[0].hidden = newProperties.map(p => p.hidden);

    updateTable(arr => [...newState]);
  }

  const sort = (id) => {
    table[0].sorted = id;
    updateTable(arr => [...table]);
  };

  const setPage = (page) => {
    currentPage = page;
    updateTable(arr => [...table]);
  };

  const rows = [];

  const tableData = table.filter((d, i) => i > 0);
  let tableSorted = tableData;
  if (table[0].sorted > -1) {
    let sortedColumn = table[0].names[table[0].sorted];
    if (table[0].types[table[0].sorted] == 'date') {
      tableSorted = tableData.sort(function (a, b) {
        let d1 = new Date(a[sortedColumn]);
        let d2 = new Date(b[sortedColumn]);
        return d1.getTime() - d2.getTime();
      });
    } else {
      tableSorted = tableData.sort((a, b) => a[sortedColumn] < b[sortedColumn] ? -1 : 1);
    }
  }

  const dataFiltered = tableSorted.filter((t, i) => i > (currentPage * 10) - 1 && i <= (currentPage * 10) + 9);

  const flattenData = [];
  dataFiltered.map(data => flattenData.push(Object.values(data)));

  const length = table[0].sticky.length;
  const prop = {};

  prop.headers = table[0].names.map(n => n);
  prop.sticky = table[0].sticky.map(n => n);
  prop.order = table[0].order.map(n => n);
  prop.hOrder = table[0].names.map((n, i) => i);
  prop.hidden = table[0].hidden;

  for (let q = 0; q < length - 1; q++) {
    for (let w = q + 1; w < length; w++) {
      if ((prop.sticky[w] && !prop.sticky[q])
        || ((!prop.sticky[w] && !prop.sticky[q]) && parseInt(prop.order[q]) > parseInt(prop.order[w]))) {

        Object.keys(prop).forEach(key => {
          let buffer = prop[key][q];
          prop[key][q] = prop[key][w];
          prop[key][w] = buffer;
        });

        flattenData.forEach(record => {
          let buf = record[w];
          record[w] = record[q];
          record[q] = buf;
        });
      }
    }
  }

  let pos = 0;
  prop.hidden.forEach((isHidden) => {
    if (isHidden) {
      prop.headers.splice(pos, 1);
      prop.hOrder.splice(pos, 1);
      flattenData.forEach(record => record.splice(pos, 1));
    } else {
      pos++;
    }
  });

  flattenData.map((record, i) => {
    rows.push(<Row
      cells={record}
      key={i}
      id={i}
    />)
  });

  const pageNav = [];
  for (let i = 0; i < (table.length - 1) / 10; i++) {
    pageNav.push(<button onClick={() => setPage(i)} key={i}>
      {i + 1}
    </button>);
  }

  const columnsData = [];
  table[0].names.map((n, i) =>
    columnsData.push({
      name: n,
      type: table[0].types[i],
      order: table[0].order[i],
      hidden: table[0].hidden[i],
      sticky: table[0].sticky[i]

    })
  );


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Darek Custom Table</h1>
      </header>
      <div className="container">
        <Header action={sort} names={prop.headers} headerOrder={prop.hOrder}></Header>
        {rows}
        <AddRow action={addRow} names={table[0].names} types={table[0].types} ></AddRow>
        <div>
          {pageNav}

        </div>
        <div>
          <Columns action={updateTableProperties} cols={columnsData}></Columns>

        </div>
      </div>
    </div>
  );
  // }
}

export default App;
