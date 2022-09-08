import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import VerticalSlider from '../customComponents/slider/verticalSlider.jsx';
import Tooltip from '@mui/material/Tooltip';
import { useAttribute } from '@threekit-tools/treble';
import ColorIcon from '../assets/images/icons/color.svg';
import { getPlusIcon, setCurrentEleAxis, deleteAccessoryElement } from '../utils/getPlusIcon.js';
import ButtonContainer from '../customComponents/button.jsx';

const StorageContainerBlock = styled.div`
    width: 100%;
    float: left;
    box-sizing: border-box;
    position: relative;
    

    .tool-container-main{
        display: grid;
        margin: 10px 0;
        grid-template-columns: 60px auto;

        .tools-img-item{
          text-align: center;

          img{
            width: 40px;
            display: inline-block;
            float: none;
          }
        }
    }
    .outer-container{
      box-sizing: border-box;
      padding: 15px;
      background: #f6f6f6;
      border: 1px solid #b1b1b1;
      text-align: left;
      position: relative;
    }
    .accessory-selection-container{

      .accessory-item{
        border: 1px solid #acacac;
        padding: 2px 10px;
        cursor: pointer;
        font-size: 10px;
        transition: all ease-in 0.3s;
        display: inline-block;
        border-radius: 2px;
        margin: 0 10px 10px 0;

        &:hover{
          background: #ffffff;
        }
      }
      .selected-accessory-item{
          background: #d4d4d4;
      }
    }
    .gif-container-outer{
      position: absolute;
      top: 103px;
      width: calc(100% - 105px);
      left: 90px;
      background: red;
      z-index: 6;

      .gif-container, .gif-container2{
        float: right;
        z-index: 8;
        width: 100%;
        background: #fff;
        border: 1px solid #909090;
        text-align: center;
  
        img{
          height: 240px;
          width: 100%;
        }
      }
    }
    .gif-container2{
      top: 250px;
      border-top: 0px!important;
    }
    
    .nav-item-container-static{
      width: 100%;
      right: 352px;
      height: 540px;
      position: absolute;
      top: 0;
      border-radius: 50%;
      border-right: 3px solid #747474;
    }
    
    .nav-item-main{ 
      position: relative;
      margin: 3px 0;

    }
    .nav-dot{
      border-radius: 50%;
      background: #fff;
      height: 60px;
      width: 60px;
      position: absolute;
      cursor: pointer;
      left: 0;
      top: 14px;
      -webkit-transition: all ease-in 0.3s;
      transition: all ease-in 0.3s;
      overflow: hidden;

      img{
          width: 65px;
      }

    }
    .selected-nav-dot{
        border: 2px solid #5c5959;
        height: 55px;
        width: 55px;
        left: -60px;
    }
    .nav-text{
      text-align: left;
      padding-left: 20px;
      position: relative;
    }

    .color-container-main{
      position: relative;
      border: 1px solid #b1b1b1;
      min-height: 81px;
      padding: 15px 20px 5px;
      border-bottom: 0;
      border-radius: 2px;

      .img-icon{
        top: 15px;
        left: 20px;
        position: absolute;
        width: 50px;
      }

      .color-item-container{
        display: grid;
        grid-template-columns: auto auto auto;
        margin-top: -5px;
        width: calc(100% - 120px);
        float: left;

        img{ 
          height: 60px;
          width: 60px;
          cursor: pointer;
          border-radius: 50%;
          position: relative;
          transition: all ease-in 0.3s;
        }
        .finishing-item{
          width: auto;
        }
        .selected-finishing-item img, img: hover{
          transform: scale(1.1);
        }
        .nav-item-main {
          margin: 5px 0 0;

          &:hover{
            gif-container-outer
          }
        }

      }

      
    }
`;
const Label = styled.div`
    padding: 10px 0 0 70px!important;
    line-height: 25px;
    font-size: 14px;
    display: inline-block;
    float: left;
    width: 120px;
`;

  
  const StoragContainer = (props) => {
    const [finishingOfAccesory, setFinishingOfAccesory] = useAttribute('Finishing of accesory');
    const [accesoryList, setAccesoryList] = useAttribute('accessories');
    const [inputOptions, setInputOptions] = useState([]);
    const [customAccessoryOptions, setCustomAccessoryOptions] = useState([]);
    const [finishingOfAccesoryOptions, setFinishingOfAccesoryOptions] = useState([]);

    useEffect(() => {
      const optionsList = [];
      accesoryList?.values?.forEach((tmpSide)=>{
        if(tmpSide.assetId !== process.env.PLUS_MODEL_ID){
          const side = { ...tmpSide }
          side['value'] = side.assetId;
          side['label'] = side.label;
          optionsList.splice(0, 0, side);
        }
      })
      setCustomAccessoryOptions(optionsList);
  }, [accesoryList])


    const handleFinishingChange = (data) => {      
      const index = finishingOfAccesoryOptions.findIndex((finishing) => finishing.assetId === data )
      setFinishingOfAccesory(data);
      props.setFinishingOfAccesories(finishingOfAccesoryOptions[index].label);
    }

    const addNewAccessory = (data) => {
      setAccesoryList(data);
      const config = getPlusIcon(data);
      props.setCustomPlayerLoading(true)
      window.threekit.configurator.setConfiguration(config).then((data)=>{
        props.setCustomPlayerLoading(false);
      })
    }

    useEffect(() => {
      if(finishingOfAccesory?.value && !finishingOfAccesoryOptions?.length){
        const optionsList = [];
        finishingOfAccesory.values.forEach((tmpDoor)=>{
          const door = { ...tmpDoor }
          door['value'] = door.assetId;
          door['label'] = door.label;
          optionsList.push(door);
        })
        setFinishingOfAccesoryOptions(optionsList);
      }
    }, [ finishingOfAccesory]);

    const getAcessoryFinishingList = () => {
      return finishingOfAccesory?.values ? finishingOfAccesory?.values.map((finish, index)=>(
        <div key = { 'accessory ' + index}>
        <Tooltip title={finish.metadata?.value} arrow key = { 'accessory ' + index}>
          <div className={"hor-row finishing-item" + (finishingOfAccesory?.value?.assetId === finish.assetId ? ' selected-finishing-item' : '') }
            onClick ={()=> handleFinishingChange(finish.assetId) } >
            <img src={finish.metadata?._thumbnail}/>
          </div>
        </Tooltip>
        </div>
      )): null; 
    }

    const handleSlidesChange = (data) =>{
      props.setCurNodeAxisConfig({...props.curNodeAxisConfig, value: (data)})
    }
    
    const setModelAxis = () => {
      const config = setCurrentEleAxis(props.curNodeAxisConfig);
      props.setCustomPlayerLoading(true)
      window.threekit.configurator.setConfiguration(config).then((data)=>{
        props.setCustomPlayerLoading(false);
      })
    }
    
    const deleteModel = () => {
      const config = deleteAccessoryElement(props.curNodeAxisConfig);
      props.setCustomPlayerLoading(true)
      window.threekit.configurator.setConfiguration(config).then((data)=>{
        props.setCustomPlayerLoading(false);
        props.setCurNodeAxisConfig(null);
      })
    }

    return (
      <StorageContainerBlock>
        <div className="hor-row color-container-main">
            <img src={  ColorIcon }  className = 'img-icon'
              />
           <Label className="">
             Color
           </Label>
           <div className="hor-row color-item-container">
            { getAcessoryFinishingList() }
           </div>
        </div>

          <div className="hor-row outer-container">
            <div className="hor-row accessory-selection-container">
              {accesoryList?.values.map((item, i)=>{
                return (item.assetId !== process.env.PLUS_MODEL_ID ? (
                <div className={"accessory-item" + (item.assetId === accesoryList.value?.assetId ? ' selected-accessory-item': '')} 
                  key = {'accessory'+i}
                  onClick = {()=>addNewAccessory(item.assetId)}
                  >
                  { item.name }
                </div>
              ): null)})}
              
            </div>


          </div>
          {props.curNodeAxisConfig &&<>
            {props.curNodeAxisConfig?.totolDif ? (<> 
              <div className="hor-row">
                <ButtonContainer className="button-container"
                  onClick = { setModelAxis }
                  style = {{margin: '100px 0 0 100px'}}
                  label = 'Update'
                  />
              </div>
              <div className="hor-row nav-text">
                <VerticalSlider 
                  maxStep = { props.curNodeAxisConfig.min }
                  minStep = { props.curNodeAxisConfig.max }
                  steps = { 1 }
                  orientation="vertical"
                  defaultValue = { props.curNodeAxisConfig.value }
                  style = {{ width: 'auto', float: 'left',  position: 'absolute', top: '25px' }}
                  onChange = { handleSlidesChange }
                />
              </div>
            </>) : null}

            <div className="hor-row">
              <ButtonContainer className="button-container"
                onClick = { deleteModel }
                style = {{margin: '100px 0 0 100px'}}
                label = 'Delete Accessory'
                />
            </div>
          </>}
      </StorageContainerBlock>
    );
  };
  
  export default StoragContainer;