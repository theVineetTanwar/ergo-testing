import { CONSTANT_MEASUREMENTS } from './index.js';
import setNodeStack from './setNodeStack';

const saveDataToStack = (stack, itemElement, itemObject, index, type = 'upperStack') =>{
  if(type === 'upperStack'){
    stack.upperStack.push({...itemObject[itemElement]});
    stack.upperFilledSpace += itemObject[itemElement].heightInModule;
  }else{
    stack.lowerStack.push({...itemObject[itemElement]});
    stack.lowerFilledSpace += itemObject[itemElement].heightInModule;
  }
    stack.remainingSpace -= itemObject[itemElement].heightInModule;
}

const getAvailableStack = (key, finalStack, tmpHeightRequired ) => {
  let tmpStack = '';
  for(let i = 1; i < 5; i++){
    let tmpKey = (key + i) % 5;
    if(finalStack['Stack_' + tmpKey] && (finalStack['Stack_' + tmpKey].remainingSpace >= tmpHeightRequired)){
      tmpStack = 'Stack_' + tmpKey;
      break;
    }
  }
  return tmpStack;
}

const compareToStack3 = (finalStack, StackTmp = 'Stack_1', itemElement, itemObject, index, stackType = 'upperStack', tmpHeightRequired) => {
  const tmpStackType = stackType === 'upperStack' ? 'upperFilledSpace' : 'lowerFilledSpace';
  if(finalStack['Stack_3'] && (finalStack[StackTmp][tmpStackType] >= (finalStack.Stack_3[tmpStackType] + itemObject[itemElement].heightRequired)) || (finalStack['Stack_4'] && (finalStack[StackTmp][tmpStackType] >= (finalStack.Stack_4[tmpStackType] + itemObject[itemElement].heightRequired)))){
    let tmpStack = ((finalStack['Stack_4'] && (finalStack.Stack_3[tmpStackType] >= (finalStack.Stack_4[tmpStackType] + itemObject[itemElement].heightRequired))) || (finalStack.Stack_3.remainingSpace < itemObject[itemElement].heightRequired)) ? 'Stack_4' : 'Stack_3';

    // if there is no space available in stack 3
    if(tmpStack === 'Stack_3' &&  finalStack.Stack_3.remainingSpace < tmpHeightRequired){
      tmpStack = getAvailableStack(3,finalStack ,  tmpHeightRequired)
    }
    // if there is no space available in stack 4
    if(tmpStack === 'Stack_4' &&  finalStack.Stack_4.remainingSpace < tmpHeightRequired){
      tmpStack = getAvailableStack(4, finalStack ,  tmpHeightRequired)
    }
    if(stackType === 'upperStack'){
      updateRemainingSpace(finalStack[tmpStack], itemElement)
    }
    saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index, stackType)
  }else{
    // put item in StackTmp
    let tmpStack = StackTmp;
    // if there is no space available in stack 1
    if(tmpStack === 'Stack_1' &&  finalStack.Stack_1.remainingSpace < tmpHeightRequired){
      tmpStack = getAvailableStack(1, finalStack,  tmpHeightRequired)
    }

    if(stackType === 'upperStack'){
      updateRemainingSpace(finalStack[StackTmp], itemElement)
    }
    saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index, stackType)
  }
}

const updateRemainingSpace = (stack, itemElement ) => {
  if(stack.remainingSpace > 2000 && ((itemElement === 'longCloth' && window.globalObject.typeOfLongClothHinger !== "hang") || (itemElement === 'shortCloth' && window.globalObject.typeOfShortClothHinger !== "hang")) ){
    stack['remainingSpace'] = 2000;
  }
}

export const getStackOrder = () => {
  let height = parseInt(window.globalObject.height) ;
  let width = parseInt(window.globalObject.width);
  let numberOfModule = window.globalObject.nuberOfModule;
  let longClothQuanityOfHingerOnHanger =
    window.globalObject.longClothQuanityOfHingerOnHanger;
  let quanityOfPants = window.globalObject.quanityOfPants;
  let quanityOfShoes = window.globalObject.quanityOfShoes;
  let quantityOfAccesory = window.globalObject.quantityOfAccesory;
  let quantityOfClothsFolded = window.globalObject.quantityOfClothsFolded;
  let shortClothQuanityOfHingerOnHanger =
    window.globalObject.shortClothQuanityOfHingerOnHanger;

  let typeOfLongClothHinger = window.globalObject.typeOfLongClothHinger;
  let typeOfShoes = window.globalObject.typeOfShoes;
  let typeOfShortClothHinge = window.globalObject.typeOfShortClothHinger;
  let finalStack = {};


  for (let index = 1; index <= numberOfModule; index++) {
    finalStack['Stack_' + index] = { items: [], remainingSpace: height, upperStack:[], lowerStack: [], upperFilledSpace: 0, lowerFilledSpace: 0 };
  }

  let itemObject = {
    longCloth: {
      quantity: longClothQuanityOfHingerOnHanger,
      heightInModule: typeOfLongClothHinger.includes('hang')
        ? CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_LONG_CLOTH_HANG_SPACER
        : CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_LONG_CLOTH_CASTOR_OR_SILK,
      heightRequired: typeOfLongClothHinger.includes('hang')
        ? CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER
        : CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK,
      type : typeOfLongClothHinger === 'hang' ? 'longClothHanger' : typeOfLongClothHinger === 'castor' ? 'longClothCastor' : 'longClothSilk',
    },
    shortCloth: {
      quantity: shortClothQuanityOfHingerOnHanger,
      heightInModule: typeOfShortClothHinge.includes('hang')
        ? CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_SHORT_CLOTH_HANG_SPACER
        : CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_SHORT_CLOTH_CASTOR_OR_SILK,
      heightRequired: typeOfShortClothHinge.includes('hang')
        ? CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER
        : CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK,
      type : typeOfShortClothHinge === 'hang' ? 'shortClothHanger' : typeOfShortClothHinge === 'castor' ? 'shortClothCastor' : 'shortClothSilk',
    },
    pants: {
      quantity: quanityOfPants,
      heightInModule: CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_PANTS,
      heightRequired: CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_PANTS,
      type : window.globalObject.typeOfPants === 'pull-out' ? 'pullOutTrouserPants' : 'trouserRodPants',
    },
    shoes: {
      quantity: quanityOfShoes,
      heightInModule: typeOfShoes.includes('pull')
        ? CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_PULL_OUT_LATERAL_SHOE_RACK
        : CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_SHOE_DRAWER,
      heightRequired: typeOfShoes.includes('pull')
        ? CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK
        : CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_SHOE_DRAWER,
      type : typeOfShoes === 'pull-out' ? 'pullOutShoesRack' : 'shoeDrawer',
    },
    clothesFolded: {
      quantity: quantityOfClothsFolded,
      heightInModule: CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_FOLDED_CLOTHS,
      heightRequired: CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_FOLDED_CLOTHS,
      type: 'clothsFolded'
    },
    accesory: {
      quantity: quantityOfAccesory,
      heightInModule: CONSTANT_MEASUREMENTS.HEIGHT_IN_MODULE_ACCESORY,
      heightRequired: CONSTANT_MEASUREMENTS.HEIGHT_REQUIRED_IN_ACCESORY,
      type: 'acessory'
    },
  };
  
  Object.keys(itemObject).forEach((itemElement) => {
    let index = 1;
    const tmpHeightRequired = itemObject[itemElement].heightRequired;
    while(itemObject[itemElement]['quantity']){

      if(itemElement === 'longCloth' || itemElement === 'shortCloth'){
        if( (finalStack.Stack_1.remainingSpace >= tmpHeightRequired) && (finalStack.Stack_1.upperFilledSpace < (finalStack.Stack_2.upperFilledSpace + tmpHeightRequired) )){
          // ignore stack 2
          // compare to stack3 and stack 1
          compareToStack3(finalStack, 'Stack_1', itemElement, itemObject, index, 'upperStack', tmpHeightRequired)
        }else{
          if(finalStack['Stack_3'] && ((finalStack.Stack_2.upperFilledSpace >= (finalStack.Stack_3.upperFilledSpace + tmpHeightRequired)) || (finalStack.Stack_2.remainingSpace < tmpHeightRequired))){
            let tmpStack =  (finalStack.Stack_4 && ((finalStack.Stack_3.upperFilledSpace >= (finalStack.Stack_4.upperFilledSpace + tmpHeightRequired)) || (finalStack.Stack_3.remainingSpace < tmpHeightRequired))) ? 'Stack_4' : 'Stack_3';
            updateRemainingSpace(finalStack[tmpStack], itemElement);
            
            // if there is no space available in stack 2
            if(tmpStack === 'Stack_3' &&  finalStack.Stack_3.remainingSpace < tmpHeightRequired){
              tmpStack = getAvailableStack(3, finalStack ,  tmpHeightRequired)
            }
            // if there is no space available in stack 4
            if(tmpStack === 'Stack_4' &&  finalStack.Stack_4.remainingSpace < tmpHeightRequired){
              tmpStack = getAvailableStack(4, finalStack ,  tmpHeightRequired)
            }

            saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index);
          }else{
            let tmpStack = (finalStack['Stack_4'] && (finalStack.Stack_2.upperFilledSpace >= (finalStack.Stack_4.upperFilledSpace + tmpHeightRequired))) ? 'Stack_4' : 'Stack_2';
            updateRemainingSpace(finalStack[tmpStack], itemElement);

            // if there is no space available in stack 2
            if(tmpStack === 'Stack_2' &&  finalStack.Stack_2.remainingSpace < tmpHeightRequired){
              tmpStack = getAvailableStack(2,finalStack ,  tmpHeightRequired)
            }
            // if there is no space available in stack 4
            if(tmpStack === 'Stack_4' &&  finalStack.Stack_4.remainingSpace < tmpHeightRequired){
              tmpStack = getAvailableStack(4, finalStack ,  tmpHeightRequired)
            }
            saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index);
          }
        }
        index += 1;
        itemObject[itemElement]['quantity'] = itemObject[itemElement]['quantity'] - 1;
        continue;
      }

      if( (finalStack.Stack_1.remainingSpace >= tmpHeightRequired) && (finalStack.Stack_1.lowerFilledSpace < (finalStack.Stack_2.lowerFilledSpace + tmpHeightRequired) )){
        // ignore stack 2
        // compare to stack3 and stack 1
        compareToStack3(finalStack, 'Stack_1', itemElement, itemObject, index, 'lowerStack', tmpHeightRequired)
      }else{
        if(finalStack['Stack_3'] && ((finalStack.Stack_2.lowerFilledSpace >= (finalStack.Stack_3.lowerFilledSpace + tmpHeightRequired)) || (finalStack.Stack_2.remainingSpace < tmpHeightRequired))){
          let tmpStack = (finalStack['Stack_4'] && ((finalStack.Stack_3.lowerFilledSpace >= (finalStack.Stack_4.lowerFilledSpace + tmpHeightRequired)) || (finalStack.Stack_3.remainingSpace < tmpHeightRequired))) ? 'Stack_4' : 'Stack_3';

          // if there is no space available in stack 2
          if(tmpStack === 'Stack_3' &&  finalStack.Stack_3.remainingSpace < tmpHeightRequired){
            tmpStack = getAvailableStack(3, finalStack ,  tmpHeightRequired)
          }
          // if there is no space available in stack 4
          if(tmpStack === 'Stack_4' &&  finalStack.Stack_4.remainingSpace < tmpHeightRequired){
            tmpStack = getAvailableStack(4, finalStack ,  tmpHeightRequired)
          }

          saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index, 'lowerStack');
        }else{
          let tmpStack = (finalStack['Stack_4'] && (finalStack.Stack_2.lowerFilledSpace >= (finalStack.Stack_4.lowerFilledSpace + tmpHeightRequired))) ? 'Stack_4' : 'Stack_2';

          // if there is no space available in stack 2
          if(tmpStack === 'Stack_2' &&  finalStack.Stack_2.remainingSpace < tmpHeightRequired){
            tmpStack = getAvailableStack(2,finalStack ,  tmpHeightRequired)
          }
          // if there is no space available in stack 4
          if(tmpStack === 'Stack_4' &&  finalStack.Stack_4.remainingSpace < tmpHeightRequired){
            tmpStack = getAvailableStack(4, finalStack ,  tmpHeightRequired)
          }
          saveDataToStack(finalStack[tmpStack], itemElement, itemObject,  index, 'lowerStack');
        }
      }
      itemObject[itemElement]['quantity'] = itemObject[itemElement]['quantity'] - 1;
      index += 1;
    }
  });
  console.log('finalStack>>>>>>>>>>>>>>>>>>>>>>>>>>>', finalStack);  
  return setNodeStack(finalStack)
};