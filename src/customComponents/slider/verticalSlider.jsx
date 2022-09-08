import * as React from 'react';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const SliderInputContainer = styled.div`
    width: 100%;
    float: left;
    // padding: 0 27px;
    position: relative;

    .increase-icon, .decrease-icon{
        position: absolute;
        right: 2px;
        font-size: 24px;
        top: -30px;
        color: #151515;
        cursor:pointer;
    }
    .decrease-icon{
        left: 3px;
        top: auto;
        bottom: -30px
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
  

export default function VerticalSlider(props) {
      /**
       * label: string
       * onClick: ()
       * value: number(default 0)
       * defaultValue: number(default 0)
       * orientation: string
       * minStep: number(default 0)
       * steps: number(default 1)
       * maxStep: number(default 3)
       * style: <style>
       */

      
  const [currentStep, setcurrentStep] = React.useState( props.value ? props.value : props.defaultValue ? props.defaultValue : 0);
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
    <div className='hor-row' style = {props.style}>
      <SliderInputContainer>
        <Stack sx={{ height: 300 }} spacing={1} direction="row-reverse">
          <RemoveCircleOutlineIcon className="decrease-icon"
              onClick = {() => updateStep(-(props.steps || 1)) } />
          <AddCircleOutlineIcon className="increase-icon"
              onClick = {() => updateStep(props.steps || 1) } />
          <Slider
            aria-label="Small steps"
            value={props.value ? props.value : currentStep}
            step={props.steps || 1}
            marks
            orientation = { props.orientation }
            min={minStep}
            onChange = {handleSliderChange}
            max={maxStep}
            valueLabelDisplay="auto"
          />
        </Stack>
      </SliderInputContainer>
      
    </div>
  );
}
