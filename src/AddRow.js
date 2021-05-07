import React, { useState } from "react";

export function AddRow(props) {
    const [data, setData] = useState({});
    
    const submit = (evt) => {
        evt.preventDefault();
        props.action(data);
    }

    const change = (value, i) => {
        let newData = data;
        newData[i] = value;
        setData(newData);
    }

    const cols = [];
    props.names.map((t, i) =>
        cols.push(<input
            type="text"
            placeholder={props.names[i]}
            onChange={e => change(e.target.value, i)}
            key={i}
            id={i}
        />));

    return (
        <form className="row" onSubmit={submit}>
            {cols}
            <input type="submit" value="Add Row" />
        </form>
    );
}

export default AddRow;