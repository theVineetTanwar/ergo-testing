import React from "react";
import styled from 'styled-components';

const ButtonContainer = styled.button`
    padding: 10px 20px;
    width: auto;
    float: left;
    font-size: 16px;
    box-sizing: border-box;
    background: #e3e3e3;
    color: #7c7c7c;
    line-height: 20px;
    border-radius: 5px;
    -webkit-transition: all ease-in 0.3s;
    transition: all ease-in 0.3s;
    border: 1px  solid #b7b7b7;
    font-weight: 550;
    cursor: pointer;
    display: inline-block;
    float: none;

    :hover{
      background: #d3d3d3;
    }
    

`;
  
  const Button = (props) => {
      /**
       * label: string
       * onClick: ()
       * style: <style>
       */
    return (
      <ButtonContainer style={props.style}
        onClick = {props.onClick ? props.onClick : null}
       >
        { props.label }
          
      </ButtonContainer>
    );
  };
  
  export default Button;