import {
  ThreekitProvider,
  Player,
  useThreekitInitStatus, useAttribute,
  PortalToElement,
  usePlayerLoadingStatus,
  FlatForm,
} from '@threekit-tools/treble';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import {  useThreekitInitStatus, useAttribute } from 'threekit/hooks';
// import { Player } from 'threekit/components';
import ToolContainer from './toolContainer/index.jsx';
import StorageElements from './toolContainer/storageInitialData';
import DataTable from './toolContainer/dataTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
// import { usePlayerLoadingStatus } from 'threekit/hooks';
import { SelectNodeItem } from './utils/getSelectedNode';
import LogoIcon from './assets/images/icons/logo2.svg';
import { IconNavigator } from './toolContainer/navigatorMain.jsx';
import { clearNodeStack } from './utils/setNodeStack.js';

import config from '../threekit.config.js'


window.globalObject = {
  "longClothQuanityOfHingerOnHanger": 0,
  "shortClothQuanityOfHingerOnHanger": 0,
  "quanityOfPants": 0,
  "quanityOfShoes": 0,
  "quantityOfClothsFolded": 0,
  "quantityOfAccesory": 0,
  "nuberOfModule": 2,
  "finishingOfAccesories": "Moka",
  "height": "2700",
  "width": "2000",
  "doorData": {
      "door": "Swing doors",
      "model": "Oregon",
      "finishing": "Black",
      "thickness": "18"
  },
  "typeOfLongClothHinger": "hang",
  "typeOfShortClothHinger": "hang",
  "typeOfShoes": "pull-out",
  "typeOfPants": "pull-out",
  'crntSelectedModelForAdd': null
}
window.currentComponent = 'wardrobe';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const intitalWardrobeData = {
  'height' : 2700,
  'width' : 2000,
  'thickness' : '16'
}
const intitalDoorData = {
  'door' : 'Swing doors',
  'model' : 'Oregon',
  'finishing' : 'Satin Nickel',
  'thickness' : '18'
}

const TopLeftWidgetsWrapper = styled.div`
    position: absolute;
    top: 50px;
    left: 10%;
    font-weight: bold;
    display: flex;
    flex-direction: row;
`;

const BottomLeftWidgetsWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10%;
  display: flex;
  flex-direction: row;
  img{
    width: 250px;
  }
  & > div {
    margin-right: 8px;
  }
  & > div:last-child {
    margin-right: 0px;
  }
`;

const BottomRightWidgetsWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5%;
  display: flex;
  flex-direction: row;
  & > div {
    margin-right: 8px;
  }
  & > div:last-child {
    margin-right: 0px;
  }
`;

const App = () => {
  const { width } = useWindowDimensions();
  const [currentStorageElement, setCurrentStorageElement] = useState(StorageElements);
  const [curNodeAxisConfig, setCurNodeAxisConfig] = useState(null);
  const [finishingOfAccesories, setFinishingOfAccesories] = useState('');
  const [wardrobeData, setWardrobeData] = useState(intitalWardrobeData);
  const [doorData, setDoorData] = useState(intitalDoorData);
  const [customPlayerLoading, setCustomPlayerLoading] = useState(false);
  const isPlayerLoading = usePlayerLoadingStatus();
  const [currentComponent, setCurrentComponentHook] = useState('wardrobe');
  const loaded = useThreekitInitStatus();
  const [nuberOfModule, setNumberOfModule] = useAttribute('Number of Modules');

  useEffect(() => {
    if((nuberOfModule?.value || nuberOfModule?.value === 0)){
      const config  = clearNodeStack();
      window.threekit.configurator.setConfiguration(config);
    }
  }, [nuberOfModule?.value])

  const setCurrentComponent = (data) => {
    setCurrentComponentHook(data);
    window.currentComponent = data;
  }

  const storageElementChange = (data) => {
    setCurrentStorageElement([...data])
  }
  const doorElementChange = (data) => {
    setDoorData({...data})
  }
  
  const LoaderComponent = () => {
    return (!loaded|| isPlayerLoading || customPlayerLoading) ? (
      <div className='loader-outer-container'>
          <div className='hor-row loader-innner-container'>
            <CircularProgress
              size = { 60} />
          </div>
        </div>
    ): null;
  }



  return (
    <ThreekitProvider>
        <div className="tk-treble-player">
          <Player 
          
              minHeight = '600px'
              height={width > 1200 ?  '90vh' : '62vh'} 
              >
                {window?.threekit?.player?.tools?.removeTool('pan')}
            <TopLeftWidgetsWrapper>
                Diseña tu armario
            </TopLeftWidgetsWrapper>
            <BottomLeftWidgetsWrapper>
              <img src={LogoIcon} alt = 'logo'/>
            </BottomLeftWidgetsWrapper>

            <BottomRightWidgetsWrapper>
              <IconNavigator 
                currentComponent = { currentComponent }
                wardrobeData = { wardrobeData }
                setCustomPlayerLoading = { setCustomPlayerLoading }
                doorData = { doorData }
                storageElements = { currentStorageElement }
                setCurrentComponent = { setCurrentComponent }/>
            </BottomRightWidgetsWrapper>
          </Player>

          
          <ToolContainer
            currentComponent = { currentComponent }
            setCurrentComponent = { setCurrentComponent }
            finishingOfAccesories = { finishingOfAccesories }
            setFinishingOfAccesories = { setFinishingOfAccesories }
            storageElements = { currentStorageElement }
            setCurrentStorageElement = { storageElementChange }
            wardrobeData = { wardrobeData }
            doorData = { doorData }
            curNodeAxisConfig = { curNodeAxisConfig }
            setCurNodeAxisConfig = { setCurNodeAxisConfig }
            setDoorData = { doorElementChange }
            setCustomPlayerLoading = { setCustomPlayerLoading }
            setWardrobeData = { setWardrobeData }/>

        </div>
    
        <DataTable
          currentStorageElement = { currentStorageElement}
          wardrobeData = { wardrobeData }
          doorData = { doorData }
          setCustomPlayerLoading = { setCustomPlayerLoading }
          finishingOfAccesories = { finishingOfAccesories }
        />
        <LoaderComponent/>
        <SelectNodeItem
          setCustomPlayerLoading = { setCustomPlayerLoading }
          setCurNodeAxisConfig = { setCurNodeAxisConfig }
        />
    </ThreekitProvider>
  );
};

export default App;
