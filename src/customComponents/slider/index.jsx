import React from "react";
import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const SliderContainer = styled.div`
    width: 100%;
    float: left;

    .MuiSlider-colorPrimary{
        color: #151515!important;
        height: 6px;
    }
    .MuiSlider-thumbSizeMedium{
        width: 15px!important;
        height: 15px!important;
    }
    .css-eg0mwd-MuiSlider-thumb:hover, .css-eg0mwd-MuiSlider-thumb.Mui-focusVisible {
        box-shadow: 0px 0px 0px 8px rgb(82 82 82 / 16%);
    }

    

`;
const SliderInputContainer = styled.div`
    width: 100%;
    float: left;
    padding: 0 27px;
    position: relative;

    .increase-icon, .decrease-icon{
        position: absolute;
        right: 0;
        font-size: 24px;
        top: 5px;
        color: #151515;
        cursor:pointer;
    }
    .decrease-icon{
        left: 0;
    }
    .MuiSlider-thumbColorPrimary{
        z-index: 6!important;        
    }
    .MuiSlider-track{
        z-index: 3!important;
    }
    .MuiSlider-mark{
        background: #959595;
    }
    
    @media screen and (max-width: 1200px) {
        .increase-icon, .decrease-icon{
            top: 10px;
        }
    }

`;
  
const Label = styled.div`
    padding: 10px 0 0px;
    line-height: 25px;
    font-size: 14px;
`;

  const SliderComponent = (props) => {
      /**
       * label: string
       * onClick: ()
       * minStep: number(default 0)
       * maxStep: number(default 3)
       * style: <style>
       */

      
  const [currentStep, setcurrentStep] = React.useState( props.value ? props.value : 0);
  const minStep = props.minStep ? props.minStep : 0;
  const maxStep = props.maxStep ? props.maxStep : 3;

  const updateStep = (newStep = 1) => {
      if((newStep > 0 && currentStep < maxStep) || (newStep < 0 && currentStep > minStep)){
        setcurrentStep(currentStep + newStep);
        
        if(props.onChange){
            props.onChange(currentStep + newStep);
        }
      }
  }

  const handleSliderChange = (event, newStep) => {
    if(!props.value){
        setcurrentStep(newStep);
    }
    if(props.onChange){
        props.onChange(newStep);
    }
  }

    return (
      <SliderContainer style={props.style}>
        <Label>
            { props.label }
        </Label>
        <SliderInputContainer >
            <RemoveCircleOutlineIcon className="decrease-icon"
                onClick = {() => updateStep(-1) } />
            <AddCircleOutlineIcon className="increase-icon"
                onClick = {() => updateStep(1) } />
            <Slider
                aria-label="Small steps"
                value={props.value ? props.value : currentStep}
                step={1}
                marks
                min={minStep}
                onChange = {handleSliderChange}
                max={maxStep}
                valueLabelDisplay="auto"
            />
        </SliderInputContainer>
      </SliderContainer>
    );
  };
  
  export default SliderComponent;