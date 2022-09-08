import React, { useState } from "react";
import styled from 'styled-components';
import ReloadIcon from '../assets/images/icons/reload.svg';
import PDFIcon from '../assets/images/icons/pdf.svg';
import CSVIcon from '../assets/images/icons/csv.svg';
import RightIcon from '../assets/images/icons/right.svg';
import OpenDoorIcon from '../assets/images/icons/open-door.svg';
import InfoIcon from '../assets/images/icons/information.svg';
import LeftIcon from '../assets/images/icons/left.svg';
import { useAttribute } from '@threekit-tools/treble';
import { getStackOrder } from '../utils/getStackOrder';
import exportCSVFile from '../utils/convertJSONtoCSV';
import downloadPDFFile from '../utils/downloadPDF';
import { getAvailableItemsInputData } from '../utils/getAvailableItemsInputData';
import { getAvailableItem, getNumberOfItems } from '../utils/index.js';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Input from '../customComponents/input.jsx';
import { closeAllAnimation } from '../utils/getSelectedNode.js';
import { getPlusIcon } from '../utils/getPlusIcon.js';
import { useConfigurator } from '@threekit-tools/treble'

let currentTypeOfDataDownload = '';

const getRounded = (number, pow = 1) => {
  let multiplier = Math.pow(10, pow || 0);
  return Math.round(number * multiplier) / multiplier;
};
const validateEmail = (email) => {
  const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return filter.test(email);
};

const NavigatorContainerBlock = styled.div`
    padding: 0px 40px 0 0;
    width: 100%;
    float: left;
    box-sizing: border-box;
    max-width: 280px;

    .hor-row{
      width: 100%;
      float: left;
      dispay: inline-block;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .heading-main{
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: right;
      padding-right: 10px;
    }
    .nav-item-container{
      text-align: right;
      position: relative;
      display: grid;
      grid-template-columns: auto auto auto auto;
    }
    .nav-text{
      transition: all ease-in 0.3s;
      text-align: center;
      padding-right: 20px;
      font-weight: bold;
      color: black;
      cursor: pointer;
      position: relative;
      line-height: 30px;
      margin: 28px 0;
    }
    .selected-nav-text{
      color: #fbba00;
    }
    
`;

const IconNavigatorContainerBlock = styled.div`
    width: 107px;
    text-align: center;
    position: relative;

    img{
      float: right;
      width: 50px;
      cursor: pointer;
      transition: all ease-in 0.3s;

      &:hover{ 
        transform: scale(1.2);
      }
    }

    .info-icon-container{
      position: relative;

      .info-icon{
        width: 40px;
      }
    }

    .nav-icon-main{

      .icon-container{
        cursor: pointer;
        float: right;
        color: #fff;
        background: #000;
        border-radius: 50%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        height: 45px;
        width: 45px;
        transition: all ease-in 0.3s;

        .icon{ 
          font-size: 16px;
          margin: 15px 0 0 4px;
        }

        &:hover{
          background: #3d3d3d;
        }
      }
    }


`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  // p: 4,
  padding: '40px 30px'
};

const ButtonContainer = styled.button`
    background: #2f2f2f;
    color: #fff;
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;
    transition: all ease-in 0.3s;

    &:hover{
      background: #000000;
    }
`;
const doorStatusOption = {
  'open': '1595d8a9-ab51-44fa-8009-bfbf9776d6b3',
  'close': '1c1e0ad8-3169-4b3c-b2a6-92c4ba937140'
}

    const navItemList = [
      {
        key: 'Medidas',
        value: 'wardrobe'
      },
      {
        key: 'Almacenaje',
        value: 'storage'
      },
      {
        key: 'Puertas',
        value: 'door'
      }
    ]
  
  const NavigatorMain = (props) => {
    const [displayDoor, setDisplayDoor] = useAttribute('Display Door');

    const handleContinueClick = async(value) => {
      if(props.currentComponent === 'wardrobe'){
        if((props.wardrobeData.height > 2700 || props.wardrobeData.height < 1800)){
          window.alert('Por favor ingrese altura de 1800 a 2700');
          return false;
        }
        if((props.wardrobeData.width > 3900 || props.wardrobeData.width < 1400) ){
          window.alert('Por favor ingrese ancho de 1400 a 3800');
          return false;
        }
        const config = getPlusIcon(false);
        props.setCustomPlayerLoading(true)
        window.threekit.configurator.setConfiguration(config).then((data)=>{
          props.setCustomPlayerLoading(false);
        })
      }
      if(value === 'door'){
        await closeAllAnimation();
      }
      if(value === 'door' && displayDoor.value.assetId === process.env.DISPLAY_DOOR_FALSE_ASSET_ID){
        setDisplayDoor( process.env.DISPLAY_DOOR_TRUE_ASSET_ID)
      }else if(value !== 'door' &&  props.currentComponent === 'door'){
        setDisplayDoor(process.env.DISPLAY_DOOR_FALSE_ASSET_ID)
      }
      props.setCurrentComponent(value)
    }

    const getNavItemList = () => {
      return navItemList.map((item, index)=>(
          <div className={"hor-row nav-text" + ( props.currentComponent === item.value ? ' selected-nav-text': '')} 
            key = {'nav'+ index}
            onClick = { () => handleContinueClick(item.value)}>
            { item.key }
          </div>
      ))
    }
  
    return (
      <NavigatorContainerBlock>
        <div className="hor-row nav-item-container">
          { getNavItemList() }
        </div>
      </NavigatorContainerBlock>
    );
  };

  export const IconNavigator = (props) => {
    const [displayDoor, setDisplayDoor] = useAttribute('Display Door');
    const [doorsStatus, setDoorStatus] = useAttribute('DoorStatus');
    // const [attributes, setConfiguration] = useAttributes([]);
    const [attributes, setConfiguration] = useConfigurator();
    const [openModal, setOpenModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    

    const handleNavigation = async(value) => {
      const currentIndex = navItemList.findIndex((item)=> item.value === props.currentComponent);
      if(props.currentComponent === 'wardrobe'){
        if((props.wardrobeData.height > 2700 || props.wardrobeData.height < 1800)){
          window.alert('Por favor ingrese altura de 1800 a 2700');
          return false;
        }
        if((props.wardrobeData.width > 3900 || props.wardrobeData.width < 1400) ){
          window.alert('Por favor ingrese ancho de 1400 a 3800');
          return false;
        }
        const config = getPlusIcon(false);
        props.setCustomPlayerLoading(true)
        window.threekit.configurator.setConfiguration(config).then((data)=>{
          props.setCustomPlayerLoading(false);
        })
      }

      if(navItemList[currentIndex + value]?.value === 'door'){
        await closeAllAnimation();
      }

      if(navItemList[currentIndex + value]?.value === 'door' && displayDoor.value.assetId === process.env.DISPLAY_DOOR_FALSE_ASSET_ID){
        setDisplayDoor( process.env.DISPLAY_DOOR_TRUE_ASSET_ID)
      }else if(props.currentComponent === 'door' && displayDoor.value.assetId === process.env.DISPLAY_DOOR_TRUE_ASSET_ID){
        setDisplayDoor(process.env.DISPLAY_DOOR_FALSE_ASSET_ID)
      }
      props.setCurrentComponent(navItemList[currentIndex + value]?.value)
    }
    
    const fitAccessory = () => {
      const config = getStackOrder();
      props.setCustomPlayerLoading(true)
      window.threekit.configurator.setConfiguration(config).then((data)=>{
        props.setCustomPlayerLoading(false);
      })
    }

    const updatedModalData = (type = 'csv') => {
      currentTypeOfDataDownload = type;
      setOpenModal(true);
    }

    const downlaodData = () => {
      if(!userName || userName.trim() == ''){
        window.alert('Por favor, introduce tu nombre.')
        return false;
      }
      if(!userEmail || userEmail.trim() == '' || !validateEmail(userEmail)){
        window.alert('Por favor, introduce tu email.')
        return false;
      }

      const wardrobeData = props.wardrobeData;
      const {typeOfShortClothHinger, typeOfLongClothHinger,typeOfShoes,
        typeOfPants 
      } = window.globalObject;
      const { finishingOfAccesories, nuberOfModule, doorData } = getAvailableItemsInputData(attributes);

      let tmpLongClothCount = 0;
      let tmpShortClothCount = 0;
      let tmpPantCount = 0;
      let tmpShoesCount = 0;
      let tmpClothFoldedCount = 0;
      let tmpAccessoryCount = 0;

      props.storageElements.forEach((item)=>{
        if(item.type === 'Long clothes hanging on hanger' ){
          tmpLongClothCount = item.quantity;
        }else if(item.type === 'Short clothes hanging on hanger' ){
          tmpShortClothCount = item.quantity;
        }else if(item.type === 'Pants' ){
          tmpPantCount = item.quantity;
        }else if(item.type === 'Shoes' ){
          tmpShoesCount = item.quantity;
        }else if(item.type === 'Clothes folded' ){
          tmpClothFoldedCount = item.quantity;
        }else if(item.type === 'Accesories' ){
          tmpAccessoryCount = item.quantity;
        }
      })

      const {longClothQuanityOfHingerOnHanger, shortClothQuanityOfHingerOnHanger,quanityOfPants, quanityOfShoes, quantityOfClothsFolded, quantityOfAccesory } = window.globalObject;

      const tmpWidthOfModuleGap = getRounded(((wardrobeData.width - (wardrobeData.thickness * ( nuberOfModule + 1))) / nuberOfModule), 0);
      let avilableItemsList = getAvailableItem(
        wardrobeData.height,
        wardrobeData.width,
        tmpWidthOfModuleGap,
        tmpLongClothCount,
        tmpShortClothCount,
        tmpPantCount,
        tmpShoesCount ? tmpShoesCount : 0,
        tmpClothFoldedCount,
        tmpAccessoryCount,
        finishingOfAccesories,
        doorData,
        nuberOfModule
      );
      const currentNumberOfItemsList = getNumberOfItems(
        avilableItemsList,
        typeOfLongClothHinger,
        longClothQuanityOfHingerOnHanger,
        typeOfShortClothHinger,
        shortClothQuanityOfHingerOnHanger,
        typeOfShoes,
        quanityOfShoes,
        typeOfPants,
        quanityOfPants,
        quantityOfAccesory,
        quantityOfClothsFolded,
        nuberOfModule,
        wardrobeData.width,
        wardrobeData.height
      );
      
      props.setCustomPlayerLoading(true)

      if(currentTypeOfDataDownload === 'csv'){
        exportCSVFile(currentNumberOfItemsList, userName , userEmail).then(()=>{
          props.setCustomPlayerLoading(false)
        });;
      }else if(currentTypeOfDataDownload === 'pdf'){
        downloadPDFFile(currentNumberOfItemsList, userName , userEmail).then(()=>{
          props.setCustomPlayerLoading(false)
        });
      }

      setOpenModal(false);
      setUserEmail('');
      setUserName('');
    };

    return (
      <IconNavigatorContainerBlock className="hor-row">
        {props.currentComponent === 'storage' && <> <Tooltip title= 'Actualizar accesorios' arrow>
            <img src={ ReloadIcon } 
              onClick = { fitAccessory } />
          </Tooltip>
            {/* <img src={ closeAllAnimation } 
              onClick = { fitAccessory } /> */}
          {/* <div className="info-icon-container">
            <img src ={ InfoIcon } className='info-icon'
              onClick={ closeAllAnimation }
            />
          </div> */}
        </>}
        {(props.currentComponent === 'door' && doorsStatus?.value?.assetId !== doorStatusOption['open']) ?  <Tooltip title= 'Abrir puertas​' arrow>
            <img className="" src={ OpenDoorIcon } 
              onClick = { () => setDoorStatus(doorStatusOption['open']) }
               />
        </Tooltip> : null}
        { props.currentComponent === 'door' && doorsStatus?.value?.assetId === doorStatusOption['open'] ? <Tooltip title= 'cerrar puertas​' arrow>
            <img className="" src={ OpenDoorIcon } 
              onClick = { () => setDoorStatus(doorStatusOption['close']) }
              />
        </Tooltip> : null}

        <div className = 'hor-row nav-icon-main'>
          { navItemList.findIndex((item)=> item.value === props.currentComponent) !== 2 && <Tooltip title='Siguiente' arrow>
            <img src={ LeftIcon }  className="icon" alt='navigation'
            onClick = {() => handleNavigation(1)}/>
          </Tooltip>}
          {navItemList.findIndex((item)=> item.value === props.currentComponent) !== 0 && <Tooltip title='Atrás' arrow>
              <img src={ RightIcon }  className="icon" alt='navigation'
                  onClick = {() => handleNavigation(-1)}/>

                {/* <div className="info-icon-container">
                  <img src ={ InfoIcon } className='info-icon'/>
                </div> */}
            </Tooltip>}
        </div>
        {props.currentComponent === 'door' && <div className = 'hor-row nav-icon-main export-button-container'>
          <Tooltip title='Descargar PDF' arrow>
            <img src={ PDFIcon }  className="icon" alt='navigation'
                onClick={() => updatedModalData('pdf')} />
          </Tooltip>
          <Tooltip title= 'Descargar CSV' arrow>
            <img src={ CSVIcon }  className="icon" alt='navigation'
                onClick={() => updatedModalData('csv')}/>
          </Tooltip>
        </div>}


        {/* <Button onClick={()=> setOpenModal(true)}>Open modal</Button> */}
        <Modal
          open={openModal}
          onClose={()=> setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <div className="hor-row">
              <Input
                label = 'Nombre'
                min = { 1800 }
                value = { userName }
                onChange = {(data) => setUserName(data)}
                max = { 2700 }
              />
            </div>
            <div className="hor-row" style={{margin: '10px 0 30px'}}>
              
              <Input
                label = 'Email'
                value = { userEmail }
                min = { 1800 }
                onChange = {(data) => setUserEmail(data)}
                max = { 2700 }
              />
            </div>

            <div className="hor-row">
              <ButtonContainer className="button-container"
                onClick = { downlaodData }
                >
                Enviar
              </ButtonContainer>
            </div>
            
          </Box>
        </Modal>
      </IconNavigatorContainerBlock>
    )
  }
  
  export default NavigatorMain;