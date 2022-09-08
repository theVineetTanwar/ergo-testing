import React, { useState, useEffect} from "react";
import styled from 'styled-components';
import Select from '../customComponents/select.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useAttribute } from '@threekit-tools/treble';
import ColorIcon from '../assets/images/icons/color.svg';
import DoorIcon from '../assets/images/icons/doorType.svg';
import HandleIcon from '../assets/images/icons/handle.svg';
import ThicknessIcon from '../assets/images/icons/espesor.svg';
import { getItemValueFromArray } from '../utils/getAvailableItemsInputData.js';

const DoorContainerBlock = styled.div`
    padding: 0px;
    width: 100%;
    float: left;
    box-sizing: border-box;
    

    .tool-container-main{
        display: grid;
        margin: 10px 0;
        grid-template-columns: 60px auto;
    }
    
    .outer-container-alter, .outer-container{
      text-align: left;
      position: relative;
      background: #f6f6f6;
      border: 1px solid #b1b1b1;
      padding: 15px 20px;
      border-radius: 2px;
      
      .nav-item-main{ 
        position: relative;
        line-height: 45px;
        margin: 5px 0 10px;
        padding-left: 60px;
        font-size: 14px;
        img{
          border-radius: 50%;
          height: 50px;
          width: 50px;
          position: absolute;
          cursor: pointer;
          left: 0px;
          top: -2px;
        }
      }

      .option-container-main{
        border: 1px solid #b3b3b3;
        padding: 10px;
        border-radius: 2px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: auto auto auto;
        margin: 10px 0;
      }
      .option-main{
        display : inline-block;
        img{
          width: 100%;
          cursor: pointer;
          transition: all ease-in 0.3s;

          &:hover{
            transform: scale(1.1);
          }
        }
      }
    }

    .option-container-main-handle-model{
      .option-main{
        img{
          position: relative;
          height: 47px;
        }
        .selected-finishing-option{
          border: 1px solid #000000!important;
        }
      }
    }

    .outer-container-alter{
      background: none;
      border-top: 0;
      padding: 40px 20px;

      .option-container-main {
        padding: 10px 5px;
        grid-gap: 3px;
        grid-template-columns: auto auto auto auto auto;
        margin: 10px 0;
        border: 0px;
        .option-main img{
          border: 1px solid #b3b3b3;
        }
    }

      .color-container-main{
        display: grid;
        grid-template-columns: 90px auto;
        grid-gap: 10px;
      }
      .color-option-container{
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 10px;

        img{
          border-radius: 50%;
          cursor: pointer;
          -webkit-transition: all ease-in 0.3s;
          transition: all ease-in 0.3s;
          position: relative;
          width: 55px;
          border: 1px solid #a9a9a9;      
          height: 55px;
        }
        .selected-finishing-option, img:hover{
            transform: scale(1.5);
        }
      }
    }

    .doors-option-container{
      padding-top: 8px;
      
      .doors-option{
        transition: all ease-in 0.2s;
        display: inline-block;
        float: left;
        margin: 0px 10px 10px 0;
        
        
        img{
          height: 46px;
          cursor: pointer;
          display: block;
        }
      }

      .selected-door-option{
        box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, 0.2), 0px 2px 2px 0px rgb(0, 0, 0, 0.14), 0px 1px 5px 0px rgb(0, 0, 0, 0.12);
        margin: -10px 10px 20px 0;
      }
    }
`;

  const DoorContainer = (props) => {
    const [doorsType, setDoorsType] = useAttribute('Door Type');
    const [handleType, setHandleType] = useAttribute('Handle Type');
    const [handleFinishing, setHandleFinishing] = useAttribute('Handle Finishing');
    const [doorThickness, setDoorThickness] = useAttribute('Door thickness (mm)');
    const [sideThickNessOptions, setSideThickNessOptions] = useState([]);

    
    useEffect(() => {
        const optionsList = [];
        doorThickness?.values?.forEach((tmpSide)=>{
          const side = { ...tmpSide }
          side['value'] = side.assetId;
          side['label'] = side.label + ' mm';
          optionsList.splice(0, 0, side);
        })
        setSideThickNessOptions(optionsList);
    }, [doorThickness, doorsType ])

    useEffect(() => {
      if(doorsType?.value){
        const label = getItemValueFromArray(doorsType?.values, doorsType?.value);
        if(label !== 'Sliding with hanging doors'){
          setHandleFinishing(handleFinishing.values[0].assetId)
        }
      }
  }, [doorsType]);
  
  useEffect(() => {
    if(doorsType?.value){
      const label = getItemValueFromArray(doorsType?.values, doorsType?.value);
      if(label === 'Swing doors'){
        setHandleFinishing(handleFinishing.values[0].assetId)
      }
    }
  }, [handleType]);

    const handleDoorChange = (data, key, label) => {
      const tmpDoorData = props.doorData;
      if(key === 'door'){
        tmpDoorData[key] = label;
        setDoorsType(data);
      }else if(key === 'model'){
        tmpDoorData[key] = label;
        if(props.doorData?.door === 'Swing doors'){
          setHandleType(data);
        }
      }else if(key === 'finishing'){
        tmpDoorData[key] = label;
        setHandleFinishing(data);

      }else if(key === 'thickness'){
        tmpDoorData[key] = label;
        setDoorThickness(data);
      }else{
        tmpDoorData[key] = data;
      }
      window.globalObject['doorData'] = tmpDoorData;
      props.setDoorData(tmpDoorData);
    }

    const getHandleFinishingList = () => {
      return handleFinishing?.values ? handleFinishing?.values.map((finish, index)=>(
        <Tooltip title={finish.label} arrow key = { 'handle ' + index}>
          <img src = { finish.metadata?._thumbnail } alt="color" 
            className={ (handleFinishing?.value?.assetId === finish.assetId ? ' selected-finishing-option' : '') }
            onClick ={()=> handleDoorChange(finish.assetId, 'finishing', finish.label) }/>
        </Tooltip>
      )): null; 
    }
    
  const getDoorsOptionList = () => {
    return doorsType?.values.map((door, index)=>{
      return (<Tooltip title={door.metadata?.value} arrow
        key = { 'door' + index}><div className="option-main" 
        onClick={ () => handleDoorChange(door.assetId, 'door', door.label) } >
        <img src = { doorsType?.value?.assetId === door.assetId ?  door.metadata?._thumbnail_selected : door.metadata?._thumbnail } alt = 'door'/>
      </div></Tooltip>)
    })
  }
  const getHandleModelOptionList = () => {
    return handleType?.values.length ? (<div className="hor-row option-container-main option-container-main-handle-model">
      {handleType?.values.map((handle, index)=>{
      return (<Tooltip title={handle.label} arrow
        key = { 'handle' + index}><div className="option-main" 
        onClick={ () => handleDoorChange(handle.assetId, 'model', handle.label) } >
          <img src = { handle.metadata?._thumbnail } alt = 'handle'
          className={ (handleType?.value?.assetId === handle.assetId ? ' selected-finishing-option' : '') }/>
      </div></Tooltip>)
    })}
    </div>) : ''
  }

    return (
      <DoorContainerBlock>
          <div className="hor-row outer-container">
            <div className="nav-item-main">
              <img src={DoorIcon} />
              Tipo de puerta
            </div>
           <div className="hor-row option-container-main">
              { getDoorsOptionList() }
            </div>
          </div>
          <div className="hor-row outer-container-alter">
            <div className="nav-item-main">
              <img src={ThicknessIcon} />
                <Select
                  label = 'Espesor'
                  options = { sideThickNessOptions}
                  value = { doorThickness?.value?.assetId }
                  onChange = { (data, lable) => handleDoorChange(data, 'thickness', lable)}
                  style = {{marginTop: '-5px'}}
                />
            </div>
          </div>

          <div className="hor-row outer-container-alter"
            style={{padding: '20px 20px'}}>
            <div className="hor-row nav-item-main">
              <img src={ HandleIcon } />
              <div className="hor-row color-container-main">
                <div className="hor-row ">
                  Tiradores
                </div>
              </div>
            </div>
              { getHandleModelOptionList() }
          </div>
          <div className="hor-row outer-container-alter"
            style={{padding: '30px 20px 25px', minHeight: '125px'}}>
            <div className="hor-row nav-item-main">
              <img src={ ColorIcon } />
              <div className="hor-row color-container-main">
                <div className="hor-row ">
                  Color
                </div>
                <div className="hor-row color-option-container">
                  { getHandleFinishingList() }
                </div>
              </div>
            </div>
          </div>
      </DoorContainerBlock>
    );
  };
  
  export default DoorContainer;