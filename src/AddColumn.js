import React, { useState } from "react";

export function AddColumn(props) {
    const [data, setData] = useState({ name: '', type: '' });

    const submit = (evt) => {
        evt.preventDefault();
        props.action(data);
        setData({ name: '', type: '' })
    }

    const changeName = (name) => setData({ name: name, type: data.type });
    const changeDesc = (type) => setData({ name: data.name, type: type });


    return (
        <div className="row" >
           
            <input
                type="text"
                value={data.name}
                placeholder="Column name"
                onChange={e => changeName(e.target.value)}
            />
            <input
                type="text"
                value={data.type}
                placeholder="Column type"
                onChange={e => changeDesc(e.target.value)}
            />
            

            <input type="submit" value="Add Column" onClick={submit}/>
        </div>
    );
}

export default AddColumn;