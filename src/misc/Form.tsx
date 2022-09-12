import { useState } from "react";
import React from "react";

function Form() {
    const [field, setField] = useState('');

    const readValue = (event) => {
        event.preventDefault();
        console.log("The field value is: ", field);
    }

    return (
        <form onSubmit={readValue}>
            <input
                type="text"
                name="field"
                value={field}
                onChange={(event) => setField(event.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;