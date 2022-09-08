import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styled from 'styled-components';

const SelectBoxContainer = styled.div`
    padding: 0px 0;
    width: 100%;
    float: left;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 80px auto;

    .MuiOutlinedInput-root{
        width: 100%!important;
        border-radius: 0;
        border: 1px solid #6e6d6d;
        background: #fff;

        .MuiOutlinedInput-notchedOutline{
            border: 0!important;
        }
    }
    .Mui-focused{
        .MuiOutlinedInput-notchedOutline{
            border-color: #bdbdbd!important;
        }
    }
    .MuiSelect-iconOutlined{
      color: #000;
    }

    #demo-simple-select-autowidth{
        padding: 10px 15px 9px;
    }
    
`;

const SelectLabel = styled.div`
    padding: 10px 0 10px;
    line-height: 25px;
    font-size: 14px;
`;


export default function SelectComponent(props) {
  /**
   * label: string
   * onChange: ()
   * value: 'string'
   * defaultValue: 'string'
   * style: <style>
   */
  const [currentOption, setCurrentOption] = React.useState(props.value ? props.value : '');

  const handleChange = (value,label ) => {
    setCurrentOption(value);
    if(props.onChange){
      props.onChange(value);
    }
  };

  return (
    <SelectBoxContainer style = { props.style }>
        <SelectLabel>
            { props.label }
        </SelectLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value = { props.value ? props.value : currentOption }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {
              props.options?.map((option, index)=>(
                  <MenuItem value={option.value} key = {'select'+ index} 
                    onClick = { () => handleChange(option.value, option.label)} >
                      { option.label}
                  </MenuItem>
              ))
            }
        </Select>
    </SelectBoxContainer>
  );
}