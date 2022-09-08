import React, { useState, useEffect } from "react";
import { useAttribute } from '@threekit-tools/treble';
import styled from 'styled-components';
import Select from '../customComponents/select.jsx';
import Input from '../customComponents/input.jsx';
import HeightIcon from '../assets/images/icons/altura.svg';
import WidthIcon from '../assets/images/icons/anchura.svg';
import ThicknessIcon from '../assets/images/icons/espesor.svg';
import ColorIcon from '../assets/images/icons/color.svg';
import { resetAccessories } from '../utils/getPlusIcon.js';

const WardrobeContainerBlock = styled.div`
    padding: 0px 0;
    width: 100%;
    float: left;
    box-sizing: border-box;

    .hor-row{
      width: 100%;
      float: left;
      dispay: inline-block;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .label-text{
      padding: 25px 0 5px;
    }
    .value-text{
      font-size: 14px;
    }
    .outer-container{
      text-align: left;
      position: relative;
      background: #f6f6f6;
      border: 1px solid #b1b1b1;
      padding: 15px 20px;
      border-radius: 2px;
    }
    
    .nav-item-main{ 
      position: relative;
      line-height: 30px;
      margin: 15px 0;
    }
    img{
      border-radius: 50%;
      height: 50px;
      width: 50px;
      position: absolute;
      cursor: pointer;
      left: 0px;
      top: 0;

      &:hover{
      }

    }

    .color-container-main{
      position: relative;
      // background: #f6f6f6;
      border: 1px solid #b1b1b1;
      padding: 15px 20px 25px;
      border-top: 0;
      border-radius: 2px;

      .color-item-container{
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        margin-top: 25px;

        .nav-dot{
          transition: all ease-in 0.3s;

          &:hover{
            transform: scale(1.2);  
          }
        }
        img{ 
          height: 60px;
          width: 60px;
          position: relative;
          margin-bottom: 10px;
        }
        .nav-item-main {
          margin: 5px 0 0;
        }
        .selected-nav-dot{
          transform: scale(1.23);          
        }

      }
    }
    
    
`;
const Label = styled.div`
    padding: 10px 0 0 70px!important;
    line-height: 25px;
    font-size: 14px;
`;


const getRounded = (number) => {
  let multiplier = Math.pow(10, 0 || 0);
  return Math.round(number * multiplier) / multiplier;
}
    var timeoutHandle;
  
  const WardrobeContainer = (props) => {
    const [sideThickNessOptions, setSideThickNessOptions] = useState([]);
    const [widthOfModuleGap, seWidthOfModuleGap] = useState('');
    const [thicknessOfSides, setThicknessOfSides] = useAttribute('Thickness of Sides');
    const [height, setHight] = useAttribute('Height');
    const [width, setWidth] = useAttribute('Width');
    const [nuberOfModule, setNumberOfModule] = useAttribute('Number of Modules');
    // const [threekitWidthOfModuleGap, setThreekitWidthOfModuleGap] = useAttribute('Width of Module Gap');
    const [wardrobeFinishingList, setWardrobeFinishingList] = useAttribute('Wardrobe Finishing');



  useEffect(() => {
    if((nuberOfModule?.value || nuberOfModule?.value === 0) && thicknessOfSides?.value){
      if(nuberOfModule?.value === 0) {
        seWidthOfModuleGap(0);
        return false;
      }
      const numWidth =  parseInt(width.value);
      const index = sideThickNessOptions.findIndex((side) => side.assetId === thicknessOfSides.value.assetId )
      if(index > -1){
        const numThickness =  parseInt(sideThickNessOptions[index].label);
        let tmpWidthOfModuleGap = getRounded((numWidth - (numThickness * (nuberOfModule.value + 1)))/nuberOfModule?.value);
        seWidthOfModuleGap(tmpWidthOfModuleGap > 0 ? tmpWidthOfModuleGap : 0)
      }

    }
  }, [width, sideThickNessOptions])
  

    useEffect(() => {
      if(thicknessOfSides?.values && !sideThickNessOptions.length){
        const optionsList = [];
        thicknessOfSides.values.forEach((tmpSide)=>{
          const side = { ...tmpSide }
          side['value'] = side.assetId;
          side['label'] = side.label + ' mm';
          optionsList.splice(0, 0, side);
        })
        setSideThickNessOptions(optionsList);
      }
    }, [thicknessOfSides])
    
    const handleModuleDimentionChange = (type, data) => {
      clearTimeout(timeoutHandle);
      timeoutHandle = null;
      timeoutHandle = setTimeout( () => {
        if(type === 'height'){
          window.globalObject['height'] = data;
          setHight(data);
        }else if(type === 'width'){   
          window.globalObject['width'] = data;
          setWidth(data)
        }else if( type === 'thickness'){
          setThicknessOfSides(data);
        }
      }, 1000);
    }


    const saveData = (data, type) => {
      const tmpWardrobeData = props.wardrobeData;
      if(type === 'thickness'){
        setThicknessOfSides(data);
        const index = sideThickNessOptions.findIndex((side) => side.assetId === data )
        window.globalObject['thickness'] = sideThickNessOptions[index].name;
        tmpWardrobeData[type] = sideThickNessOptions[index].name;
        setThicknessOfSides(data);
      }else{
        const config = resetAccessories(false);
        if(config){
          props.setCustomPlayerLoading(true)
          window.threekit.configurator.setConfiguration(config).then((data)=>{
            props.setCustomPlayerLoading(false);
          })
        }
        handleModuleDimentionChange(type, data)
        tmpWardrobeData[type] = data;
      }
        props.setWardrobeData({...tmpWardrobeData});
    }

    const getWardrobeFinishingList = () => {
      return wardrobeFinishingList?.values ? wardrobeFinishingList?.values.map((finish, index)=>( 
          <div className="hor-row nav-item-main" key = { 'tool' + index}>
            <div className={"nav-dot"  + (wardrobeFinishingList?.value?.assetId === finish.assetId ? ' selected-nav-dot' : '')}
                onClick ={()=> setWardrobeFinishingList(finish.assetId) }>
                <img src={finish.metadata?._thumbnail}/>
            </div>
        </div>
      )): null; 
    }


    return (
      <WardrobeContainerBlock>
        <div className="hor-row outer-container">
          <div className="hor-row nav-item-main">
            <img src={  HeightIcon } />
            <Input
              label = 'Alto'
              type = 'number'
              value = { props.wardrobeData.height }
              min = { 1800 }
              max = { 2700 }
              error = { (props.wardrobeData.height > 2700 || props.wardrobeData.height < 1800) ? 'Rango entre 1800-2700' : '' }
              style = {{  width: 'calc(100% - 65px)', marginLeft: '65px'}}
              onChange = { (data) => saveData(data, 'height') }
            />
          </div>

          <div className="hor-row nav-item-main">
            <img src={  WidthIcon } />
            <Input
              label = 'Ancho'
              type = 'number'
              min = { 1400 }
              max = { 3800 }
              error = { (props.wardrobeData.width > 3800 || props.wardrobeData.width < 1400) ? 'Rango entre 1400-3800' : '' }
              style = {{  width: 'calc(100% - 65px)', marginLeft: '65px'}}
              value = { props.wardrobeData.width }
              onChange = { (data) => saveData(data, 'width') }
            />
          </div>

          <div className="hor-row nav-item-main">
            <img src={  ThicknessIcon } 
              style = {{ width: '50px', height: '50px'}} />
            <Select
              label = 'Espesor'
              options = { sideThickNessOptions}
              value = { thicknessOfSides?.value?.assetId }
              style = {{  width: 'calc(100% - 65px)', marginLeft: '65px'}}
              onChange = { (data) => saveData(data, 'thickness') }
            />
          </div>
        </div>
        <div className="hor-row color-container-main">
          <img src={  ColorIcon } 
              style = {{ top: '15px', left: '23px' }} 
              />
           <Label className="hor-row">
             Color
           </Label>
           <div className="hor-row color-item-container">
            { getWardrobeFinishingList() }
           </div>

        </div>
          
      </WardrobeContainerBlock>
    );
  };
  
  export default WardrobeContainer;