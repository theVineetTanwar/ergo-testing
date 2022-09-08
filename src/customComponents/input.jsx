import React, { useState } from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
    padding: 0 0;
    width: 100%;
    float: left;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 80px auto;

    input{
        border: 1px solid #bdbdbd;
        line-height: 40px;
        color: #000000;
        border-radius: 5px;
        width: 100%;
        padding: 0 15px;
        outline: 0px;
        font-size: 16px;
        border: 1px solid #6e6d6d;
        border-radius: 0;
    }

    .error-text{
      font-size: 14px;
      color: #fa1212;
    }
`;
const InputLabel = styled.div`
    padding: 10px 0 10px;
    line-height: 25px;
    font-size: 14px;
`;
  
  const Input = (props) => {
      /**
       * label: string
       * onChange: ()
       * min: number
       * max: number
       * value: 'string'
       * error: 'string'
       * defaultValue: 'string'
       * type: 'text'(default) || number
       * style: <style>
       */

    
    const [value, setValue] = useState(props.defaultValue ? props.defaultValue : '')

    const handleInputChange = (e) => {
      setValue(e.target.value);
      if(props.onChange) {
        props.onChange(e.target.value);
      }
    }
    return (
      <InputContainer style={props.style}>
        <InputLabel>
            {props.label}
        </InputLabel>

        <div className="hor-row">
          <input
            onChange = { handleInputChange }
            value = { props.value ? props.value : value }
            // value = { value }
            min = { props.min }
            max = { props.max }
            type = { props.type ? props.type: 'text' }
            />
          {props.error && <div className="hor-row error-text">
             { props.error }
          </div>}
        </div>

        
      </InputContainer>
    );
  };
  
  export default Input;