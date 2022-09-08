import React, { useEffect, useState, useRef } from 'react';
import { useThreekitInitStatus } from '@threekit-tools/treble';
import { setModelForPlusIcon, getCurrentEleAxis, resetAccessories } from './getPlusIcon.js';

const openAnimationID = '1595d8a9-ab51-44fa-8009-bfbf9776d6b3'; 
const closeAnimationID = '1c1e0ad8-3169-4b3c-b2a6-92c4ba937140';
const startAnimationID = '0e259fe7-eb11-4e30-9ca2-ac1ab1bdd7e2';

export const findHitItem = (hitNodes) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();
  return (
    hierarchy.find((el) => el.type === 'Item') || undefined
  );
};

export const SelectNodeItem = (props) => {
  const loaded = useThreekitInitStatus();
  const [selectedItemName, setSelectedItemName] = useState();
  const optionSet = useRef();

  const clickHandler = async (event) => {
    if(window.currentComponent === 'door') {
      return false
    };
    if (!optionSet.current) {
      optionSet.current = new Set([]);
      const attrs = window.threekit.configurator.getDisplayAttributes();
      attrs
        .find((el) => (el.name.includes('Node_') && !el.name.includes('_transition_y')))
        .values.forEach((el) =>  optionSet.current.add(el.name));
    }

    threekit.player.selectionSet.setStyle({
      outlineColor: '#EE9944',
      outlineThinkness: 5,
      color: '#EE9944',
      opacity: 1,
    });

    //  We find the 'Item' that has been clicked by
    const clickedItem = findHitItem(event.hitNodes);

    //    If no item is clicked we return out
    if (!optionSet.current.has(clickedItem?.name)) {
      threekit.player.selectionSet.clear();
      props.setCurNodeAxisConfig(null);
      return false;
    }

    const parentid = threekit.player.scene.get({ id: clickedItem.nodeId })?.parent;
    const parentName = threekit.player.scene.get({ id: parentid }); //get the attribute name of the selected node
    if(clickedItem.name === "PlusIcon"){
      const config = setModelForPlusIcon(parentName.name);;
      props.setCustomPlayerLoading(true)
      window.threekit.configurator.setConfiguration(config).then((data)=>{
        props.setCustomPlayerLoading(false);
      })
      return false;
    }


    if(parentName?.name){
      const objConfig = await threekit.player.getConfigurator(parentName.name)
      const currentConfig = objConfig.getConfiguration();
      threekit.player.selectionSet.clear();
      threekit.player.selectionSet.add(clickedItem.nodeId);
      const config = resetAccessories(true);
      if(config){
        props.setCustomPlayerLoading(true)
        window.threekit.configurator.setConfiguration(config).then((data)=>{
          props.setCustomPlayerLoading(false);
          const tmpAxisData = getCurrentEleAxis(parentName.name);
          props.setCurNodeAxisConfig(tmpAxisData);
        })
      }else{
        const tmpAxisData = getCurrentEleAxis(parentName.name);
        props.setCurNodeAxisConfig(tmpAxisData);
      }
      return false;
      // if(currentConfig['Animation']?.assetId){
      //   objConfig.setConfiguration({'Animation' : {assetId: currentConfig['Animation'].assetId === openAnimationID ? closeAnimationID  : openAnimationID}})
      // }
    }
  }

  useEffect(() => {
    const tool = (player) => ({
      key: 'select-ordinal-item',
      label: 'select-ordinal-item',
      active: true,
      enabled: true,
      handlers: {
        click: clickHandler,
      },
    });

    (() => {
      if (!loaded) return;
      window.threekit.controller.addTool(tool);
    })();
  }, [loaded]);

  if (!selectedItemName) return null;
  return <></>;
};

const getAnimationStatus = async(name) =>{
  return new Promise(async(resolve, reject) =>{
    threekit.player.getConfigurator(name).then((objConfig)=>{
      const currentConfig = objConfig.getConfiguration();
      if(currentConfig?.Animation?.assetId === openAnimationID){
        resolve({[name]: currentConfig['Animation'].assetId});
        return {[name]: currentConfig['Animation'].assetId}
      }else{
        reject(null)
        return null;
      }
    }).catch((err)=>{
      console.log('threekit err>>>>>>>>>>>>>');
      reject(null)
    })
    
  }).catch((err)=>{
    console.log('err>>>>>>>>>>>>>>>>>>>>>>11', err);
    return null;
  })
  
}
const closeAnimationStatus = async(name) =>{
  return new Promise(async(resolve, reject) =>{
    threekit.player.getConfigurator(name).then((objConfig)=>{
      const currentConfig = objConfig.getConfiguration();
      objConfig.setConfiguration({'Animation' : {assetId:  startAnimationID}});
      resolve('done')
    })
  }).catch((err)=>{
    console.log('err>>>>>>>>>>>>>>>>>>>>> 343>', err)
  })

}

export const closeAllAnimation = async() => {
  return new Promise(async(resolve, reject) =>{
    const attrs = window.threekit.configurator.getDisplayAttributes();
    const newAttr = attrs.filter((el) => (el.name.includes('Node_') && !el.name.includes('_transition_y'))).filter((el) => el.value?.assetId)
    const funArray = [];
    
    newAttr.forEach((el)=>{
      funArray.push(() => getAnimationStatus(el.name));
    })

    try{
      Promise.all(funArray.map(f=> f())).then((values) => {
        const openedNodes = [];
        values.forEach((node)=>{
          if(node){
            openedNodes.push(node);
          }
        })
          Promise.allSettled(openedNodes.map((name)=>closeAnimationStatus(Object.keys(name)[0]))).then((close)=>{
            resolve(true);
          })
      })
      .catch((err)=>{
        console.log('erro in catch>>>>>>>>>>>>>>>>>>', err);
        reject(false);
      });
    }

    catch(err){
      console.log('tryy error', err);
      reject(false);
    }
  }).catch((err)=>{
    console.log('err in closeAllAnimation >>>>>>>>>>>>>>>>>>>>>>', err);
    return null;
  })
}