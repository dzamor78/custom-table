import React from 'react';

const Header = (props) => {

  const head = [];
  props.names.map((col,i) =>
  head.push(<div key={i}>
    {col}
    <button onClick={() => props.action(props.headerOrder[i])}>^</button> 
    </div>)) 
return (
<div className='row table-header'>
         {head}
        </div>

)}

export default Header;