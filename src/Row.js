import React from 'react';

const Row = (props) => {
    const cellList = [];

    props.cells.map((cell,i) =>
    cellList.push(<div key={i}>
      {cell}
      </div>))
return (
<div className='row'>
    {cellList}
 </div>

)}

export default Row;