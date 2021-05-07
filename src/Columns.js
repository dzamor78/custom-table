import React, { useState } from "react";
import AddColumn from './AddColumn';

export function Columns(props) {
    const [data, setData] = useState(props.cols);
    const submit = (evt) => {
        evt.preventDefault();
         props.action(data);
    }

    const addColumn = (column) => {
        column.hidden = false;
        column.sticky = false;
        column.order = Math.max.apply(null, data.map(c => c.order)) + 10;
        setData(arr => [...data, column]);
    }

    const checked = (i, target) => {
        let newData = data;
        newData[i][target] = !newData[i][target];
        setData(arr => [...newData]);
    }

    const edited = (i,value) => {
        let newData = data;
        newData[i].order = parseInt(value);
        setData(arr => [...newData]);
    }

    const header = [<div key="-1" className='row table-header'>
        <div>Column</div><div>Hidden</div><div>Sticky</div><div>Order</div>
        </div>];

        const body = [];
        data.map((d,i) => 
            body.push(<div key={i} className='row' >
                <div>{d.name} [{d.type}]</div>
                <input type="checkbox" checked={d.hidden} onChange={(e) => checked(i,"hidden")}/>
                <input type="checkbox" checked={d.sticky} onChange={(e) => checked(i,"sticky")}/>
                <input type="number" value={d.order} onChange={(e) => edited(i,e.target.value)}/>
            </div>)
            );
    

    return (
        <form onSubmit={submit}>
            <div>
                {header}
            </div>

            {body}

           <AddColumn action={addColumn} ></AddColumn>
            
            <div className="row">
                <input type="submit" value="Apply" />
            </div>

        </form>
    );
}

export default Columns;