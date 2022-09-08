import AVAILABLE_ITEMS_LIST from './availableItemList';
import NUMBER_OF_ITEMS_CASES from './itemNumberCases';
export const HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER = 2350;
export const HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK = 1400;
export const HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER = 2000;
export const HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK = 1050;
export const HEIGHT_REQUIRED_IN_PANTS = 780;
export const HEIGHT_REQUIRED_IN_SHOE_DRAWER = 260;
export const HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK = 780;
export const HEIGHT_REQUIRED_IN_FOLDED_CLOTHS = 260;
export const HEIGHT_REQUIRED_IN_ACCESORY = 130;

export const HEIGHT_IN_MODULE_LONG_CLOTH_HANG_SPACER = 1400;
export const HEIGHT_IN_MODULE_LONG_CLOTH_CASTOR_OR_SILK = 1400;
export const HEIGHT_IN_MODULE_SHORT_CLOTH_HANG_SPACER = 1050;
export const HEIGHT_IN_MODULE_SHORT_CLOTH_CASTOR_OR_SILK = 1050;
export const HEIGHT_IN_MODULE_PANTS = 780;
export const HEIGHT_IN_MODULE_PULL_OUT_LATERAL_SHOE_RACK = 780;
export const HEIGHT_IN_MODULE_SHOE_DRAWER = 260;
export const HEIGHT_IN_MODULE_FOLDED_CLOTHS = 260;
export const HEIGHT_IN_MODULE_ACCESORY = 130;

export const CONSTANT_MEASUREMENTS = {
    HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER,
    HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK,
    HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK ,
    HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER,
    HEIGHT_REQUIRED_IN_SHOE_DRAWER,
    HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK,
    HEIGHT_REQUIRED_IN_PANTS,
    HEIGHT_REQUIRED_IN_FOLDED_CLOTHS,
    HEIGHT_REQUIRED_IN_ACCESORY,
    HEIGHT_IN_MODULE_LONG_CLOTH_HANG_SPACER,
    HEIGHT_IN_MODULE_LONG_CLOTH_CASTOR_OR_SILK,
    HEIGHT_IN_MODULE_SHORT_CLOTH_HANG_SPACER,
    HEIGHT_IN_MODULE_SHORT_CLOTH_CASTOR_OR_SILK,
    HEIGHT_IN_MODULE_PANTS ,
    HEIGHT_IN_MODULE_PULL_OUT_LATERAL_SHOE_RACK ,
    HEIGHT_IN_MODULE_SHOE_DRAWER ,
    HEIGHT_IN_MODULE_FOLDED_CLOTHS ,
    HEIGHT_IN_MODULE_ACCESORY ,
}

const getLowerMultiple = (tmpFirstValue, tmpSecondValue) => {
    let firstValue  = tmpFirstValue > tmpSecondValue ? tmpFirstValue : tmpSecondValue ;
    let secondValue = tmpFirstValue < tmpSecondValue ? tmpFirstValue : tmpSecondValue  ;
    
    if(secondValue < 0) {
        secondValue = secondValue * -1;
        const multipleFactor = Math.floor(secondValue / firstValue);
        return (multipleFactor + 1) * firstValue * -1;
    }

    return Math.floor(firstValue / secondValue) * secondValue;
}

export const getHigherMultiple = (firstValue, secondValue) => {
    return Math.ceil(firstValue / secondValue) * secondValue;
}

export const getLongClothHangSpacerData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', quantity = 0 ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(key === 'quantity' && height < HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER){
        return 0;
    }

    const heightFactor = Math.floor(height / HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER);
    if(key === 'quantity'){
        return  Math.floor((heightFactor * nuberOfModule * quantity) / 3);
    }
    return heightFactor * nuberOfModule * HEIGHT_REQUIRED_IN_LONG_CLOTH_HANG_SPACER;
}

export const getLongClothCastorORSilkData = (tmpHeight = 0, nuberOfModule = 0, finishingOfAccesory = '',  key = 'quantity',  type = 'silk', quantity = 0 ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule ){
        return 0;
    }else if(height < HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK){
        return 0;
    }
    if(key === 'quantity' && type === 'silk' && finishingOfAccesory !== 'Black'){
        return 0;
    }else if(key === 'quantity' && type === 'castor' && finishingOfAccesory === 'Black'){
        return 0;
    }

    const heightFactor = Math.floor(Math.min(height, 2000) / HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK);

    if(key === 'quantity'){
        return  Math.floor((heightFactor * nuberOfModule * quantity) / 3);
    }

    return heightFactor * nuberOfModule * HEIGHT_REQUIRED_IN_LONG_CLOTH_CASTOR_OR_SILK;
}

export const getShortClothHangSpacerData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', quantity = 0, longClothQuanityOfHingerOnHanger = 0 ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(height < HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER){
        return 0;
    }
    const heightFactor = Math.floor(height / HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER);

    if(key === 'quantity'){
        return  Math.floor((heightFactor * (nuberOfModule - longClothQuanityOfHingerOnHanger) * quantity) / 3);
    }

    return heightFactor * HEIGHT_REQUIRED_IN_SHORT_CLOTH_HANG_SPACER * ( nuberOfModule - longClothQuanityOfHingerOnHanger)
}

export const getShortClothCastorORSilkData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', type = 'silk', finishingOfAccesory = '', quantity = 0, longClothQuanityOfHingerOnHanger = 0 ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(height < HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK){
        return 0;
    }
    if(key === 'quantity' && type === 'silk' && finishingOfAccesory !== 'Black'){
        return 0;
    }else if(key === 'quantity' && type === 'castor' && finishingOfAccesory === 'Black'){
        return 0;
    }
    const heightFactor1 = Math.floor(Math.min(height, 2000) / HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK);
    const heightFactor2 = Math.floor((height - 1400) / HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK);

    const verticalSpace = ((heightFactor2 * HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK) * longClothQuanityOfHingerOnHanger) + (heightFactor1 * HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK) * ( nuberOfModule - longClothQuanityOfHingerOnHanger)

    if(key === 'quantity'){
        return  Math.floor((verticalSpace / HEIGHT_REQUIRED_IN_SHORT_CLOTH_CASTOR_OR_SILK) * quantity  / 3);
    }

    return verticalSpace;
}

export const getPantsData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', type = 'PULL-OUT TROUSER RACK',  quantity = 0, typeOfLongClothHinger, typeOfShortClothHinger, quantityOfShortCloths, quantityOfLongCloths, widthOfModuleGap, heightRequiredInModule = HEIGHT_REQUIRED_IN_PANTS ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(height < heightRequiredInModule){
        return 0;
    }
    
    if(key === 'quantity' && type === 'PULL-OUT TROUSER RACK' && widthOfModuleGap < 800){
        return 0;
    }else if(key === 'quantity' && type === 'TROUSERS RODS' && widthOfModuleGap >= 800){
        return 0;
    }

    let wardRobeHeight1 = height;
    if(typeOfLongClothHinger !== 'hang'){
        wardRobeHeight1 = Math.min(height, 2000);
    }

    let flooredHeight1 =  Math.floor((wardRobeHeight1 - 1400) / heightRequiredInModule) * heightRequiredInModule;
    let wardRobeHeight2 = height - 1050;
    let tmpVerticalSpace2 = 0;

    if(typeOfShortClothHinger !== 'hang'){
        wardRobeHeight2 = Math.min(height, 2000) - 1050;
        let tmpFlooredHeight2 =  getLowerMultiple(Math.floor((Math.min(height, 2000) - 1050)),  heightRequiredInModule);
        tmpVerticalSpace2 = tmpFlooredHeight2 * Math.min((nuberOfModule - quantityOfLongCloths), quantityOfShortCloths);
    }else {
        let tmpFlooredHeight2 =  Math.floor((Math.min((height - 1050), 1300)) / heightRequiredInModule) * heightRequiredInModule;
        tmpVerticalSpace2 = tmpFlooredHeight2 * quantityOfShortCloths;
    }

    let wardRobeHeight3 = 1300;
    if(nuberOfModule < ( quantityOfShortCloths + quantityOfLongCloths)){
        wardRobeHeight3 = height - 1400;
        // wardRobeHeight3 = 1300 - height + 1400 + 1050;
    }

    let flooredHeight3 =  getLowerMultiple(wardRobeHeight3,heightRequiredInModule );

    const verticalSpace = ((flooredHeight1 * quantityOfLongCloths) 
                           + tmpVerticalSpace2
                           + ( flooredHeight3  * (nuberOfModule - quantityOfLongCloths - quantityOfShortCloths ) )
                         )

    if(key === 'quantity'){
        return  Math.floor((verticalSpace / heightRequiredInModule) * quantity  / 3);
    }

    return verticalSpace;
}

export const getShoesData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', type = '', quantity = 0, verticalSpaceAvailableForPants, quanityOfPants, quanityOfShoeRack = 0 ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(type === 'SHOE DRAWER' &&  height < HEIGHT_REQUIRED_IN_SHOE_DRAWER){
        return 0;
    }
    if(type === 'PULL-OUT LATERAL SHOE RACK' &&  height < HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK){
        return 0;
    }

    const heightRequired = type === 'PULL-OUT LATERAL SHOE RACK' ? HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK : HEIGHT_REQUIRED_IN_SHOE_DRAWER;
    const tmpVerticalHeight = verticalSpaceAvailableForPants - (quanityOfPants * getHigherMultiple(HEIGHT_REQUIRED_IN_PANTS, heightRequired))
    const verticalSpace = tmpVerticalHeight > -1 ? tmpVerticalHeight : 0;
    if(key === 'quantity' && quanityOfShoeRack > 0){
        return  0;
    }
    if(key === 'quantity'){
        return  Math.floor((Math.floor(verticalSpace / heightRequired) * quantity) / 3);
    }
    return verticalSpace;
}

export const getFordedClothsData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', quantity = 0, verticalSpaceAvailableForShoes, quanityOfShoes, heightOfShoeModule ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if(height < HEIGHT_REQUIRED_IN_FOLDED_CLOTHS){
        return 0;
    }
    const tmpVerticalHeight = verticalSpaceAvailableForShoes - (quanityOfShoes * heightOfShoeModule)
    const verticalSpace = tmpVerticalHeight > -1 ? tmpVerticalHeight : 0;

    if(key === 'quantity'){
        return  Math.floor((Math.floor(verticalSpace / HEIGHT_REQUIRED_IN_FOLDED_CLOTHS) * quantity) / 3);
    }
    return verticalSpace;
}

export const getAccesoryData = (tmpHeight = 0, nuberOfModule = 0, key = 'quantity', quantity = 0, verticalSpaceAvailableForFoldedCloths, quantityOfClothsFolded ) => {
    const height = parseInt(tmpHeight);
    if(!height || !nuberOfModule){
        return 0;
    }
    if( height < HEIGHT_REQUIRED_IN_ACCESORY){
        return 0;
    }
    const tmpVerticalHeight = verticalSpaceAvailableForFoldedCloths - (quantityOfClothsFolded * HEIGHT_REQUIRED_IN_FOLDED_CLOTHS)
    const verticalSpace = tmpVerticalHeight > -1 ? tmpVerticalHeight : 0;

    if(key === 'quantity'){
        return  Math.floor((Math.floor(verticalSpace / HEIGHT_REQUIRED_IN_ACCESORY) * quantity) / 3);
    }
    return verticalSpace;
}

// get available items

export function getAvailableItem (moduleHeight,  moduleWidth, moduleGap, InputLongClothHinger, InputShortHinger, InputPants, InputShoe, InputFoldedCloths, InputAccesory, InputFinishingAccesory, doorData = {}, nuberOfModule ) {

    if(!moduleHeight || parseInt(moduleHeight) > 2700 || parseInt(moduleHeight) < 1800){
        return []
    }else if(!moduleWidth || parseInt(moduleWidth) > 3800 || parseInt(moduleWidth) < 1400){
        return []
    }else if(!InputFinishingAccesory){
        return []
    }

    const { door , model, finishing, thickness } = doorData;
    if(!door || !model || !finishing || !thickness ){
      return [];
    }

    let doorHeight = 0;
    let doorWidth = 0;
    let doorWeight = 0;

    // for door moduleHeight
    if(door === 'Sliding system with supported doors'){
      doorHeight = parseInt(moduleHeight) - 42;
    }else if(door === 'Swing doors'){
      doorHeight = parseInt(moduleHeight) - 4;
    }else{
      doorHeight = parseInt(moduleHeight) + 87;
    }

    // for door width
    if(door === 'Swing doors'){
      doorWidth = (parseInt(moduleWidth) / (nuberOfModule * 2) ) - 4;
    }else{
      doorWidth = (parseInt(moduleWidth) + 10) / (nuberOfModule * (parseInt(moduleWidth) >= 3100 ? 2 : 1)  );
    }
    doorWeight = doorWidth * doorHeight * parseInt(thickness) * 0.7 / 1000000;

    let availableItemsList = [];
    const length = AVAILABLE_ITEMS_LIST.length;

    for(let i= 0; i< length; i++){
        let height = AVAILABLE_ITEMS_LIST[i]['Wardrobe height'];
        let heightmin = parseInt(height.split("-")[0]);
        let heightmax = parseInt(height.split("-")[1]);
        if(!(parseInt(moduleHeight) >= heightmin && parseInt(moduleHeight) <= heightmax ) ){
            continue;
        }

        let width = AVAILABLE_ITEMS_LIST[i]['Wardrobe width'];
        let widthmin = parseInt(width.split("-")[0]);
        let widthmax = parseInt(width.split("-")[1]);

        if(!(parseInt(moduleWidth) >= widthmin && parseInt(moduleWidth) <= widthmax ) ){
            continue;
        }

        let gap = AVAILABLE_ITEMS_LIST[i]['Width of module gap'];
        let gapmin = parseInt(gap.split("-")[0]);
        let gapmax = parseInt(gap.split("-")[1]);

        if(!(parseInt(moduleGap) >= gapmin && parseInt(moduleGap) <= gapmax) ){
            continue;
        }

        let longClothHangingArray = AVAILABLE_ITEMS_LIST[i]['Long clothes hanging on hanger'].split(",").map((el) =>  parseInt(el.trim()));
        let shortClothHangingArray = AVAILABLE_ITEMS_LIST[i]['Short clothes hanging on hanger'].split(",").map((el) =>  parseInt(el.trim())); 
        let pantsArray = AVAILABLE_ITEMS_LIST[i].Pants.split(",").map((el) =>  parseInt(el.trim()));
        let shoesArray = AVAILABLE_ITEMS_LIST[i].Shoes.split(",").map((el) =>  parseInt(el.trim()));
        let foldedClothsArray = AVAILABLE_ITEMS_LIST[i]['Clothes folded'].split(",").map((el) =>  parseInt(el.trim()));
        let accesoryArray = AVAILABLE_ITEMS_LIST[i].Accesories.split(",").map((el) =>  parseInt(el.trim()));
        let finishingAccesoryArray = AVAILABLE_ITEMS_LIST[i]['Accesories finishing'].split(",").map((el) =>  el.trim());
        let typeOfDoorOpeningArray = AVAILABLE_ITEMS_LIST[i]['Type of door opening'].split(",").map((el) =>  el.trim());
        let doorThicknessArray = '';
        let handleModelArray = AVAILABLE_ITEMS_LIST[i]['Handle model'].split(",").map((el) =>  el.trim());
        let handleFinishingArray = AVAILABLE_ITEMS_LIST[i]['Handle finishing'].split(",").map((el) =>  el.trim());

        if(typeof AVAILABLE_ITEMS_LIST[i]['Door thickness'] === 'string'){
            doorThicknessArray = AVAILABLE_ITEMS_LIST[i]['Door thickness'].split(",").map((el) =>  el.trim());
        }else{
            doorThicknessArray = [AVAILABLE_ITEMS_LIST[i]['Door thickness'].toString()];
        }
        
        if(!(longClothHangingArray.includes(InputLongClothHinger)) ){
            continue;
        }
        
        if(!(shortClothHangingArray.includes(InputShortHinger)) ){
            continue;
        }

        if(!pantsArray.includes(InputPants) ){
            continue;
        }

        if(!(shoesArray.includes(InputShoe)) ){
            continue;
        }

        if(!(foldedClothsArray.includes(InputFoldedCloths)) ){
            continue;
        }

        if(!(accesoryArray.includes(InputAccesory)) ){
            continue;
        }

        if(!(finishingAccesoryArray.includes(InputFinishingAccesory)) ){
            continue;
        }

        if(!(typeOfDoorOpeningArray.includes(doorData.door)) ){
            continue;
        }

        if(!(doorThicknessArray.includes(doorData.thickness.toString())) ){
            continue;
        }
        if(!(handleModelArray.includes(doorData.model)) ){
            continue;
        }
        if(!(handleFinishingArray.includes(doorData.finishing)) ){
            continue;
        }

        // calculation of door weight
        let storedDoorWeight = AVAILABLE_ITEMS_LIST[i]['Door weight'];
        let doorWeightMin = parseInt(storedDoorWeight.split("-")[0]);
        let doorWeightMax = parseInt(storedDoorWeight.split("-")[1]);

        if(!(doorWeight >= doorWeightMin && doorWeight <= doorWeightMax) ){
            continue;
        }

        availableItemsList.push(AVAILABLE_ITEMS_LIST[i]);
    }
    return availableItemsList;
}

// get number of items
export const getNumberOfItems = (items, typeOfLongClothHinger, longClothQuanityOfHingerOnHanger, typeOfShortClothHinger, shortClothQuanityOfHingerOnHanger, typeOfShoes, quanityOfShoes, typeOfPants , quanityOfPants, quantityOfAccesory, quantityOfClothsFolded, nuberOfModule, wardrobeWidth, wardrobeHeight ) => {
    if(items.length === 0){
        return [];
    }

    items.forEach((currentItem, i) => {
        let index = NUMBER_OF_ITEMS_CASES.findIndex((caseIem) => {
            return caseIem.item.includes(currentItem.Item)
        })
        if(index < 0){
            window.alert('Oops! Ha ocurrido un error. Por favor, inténtalo nuevamente')
            return []
        }

        let itemQuantity = 0;
        switch (NUMBER_OF_ITEMS_CASES[index].case) {
            case 'case1':
                itemQuantity = (typeOfLongClothHinger === 'hang' ? longClothQuanityOfHingerOnHanger : 0 ) + (typeOfShortClothHinger === 'hang' ? shortClothQuanityOfHingerOnHanger : 0 )
                break;
            case 'case2':
                itemQuantity = (typeOfLongClothHinger !== 'hang' ? longClothQuanityOfHingerOnHanger : 0 ) + (typeOfShortClothHinger !== 'hang' ? shortClothQuanityOfHingerOnHanger : 0 )
                break;
            case 'case3':
                itemQuantity = typeOfShoes === 'shoe-drawer' ? (quanityOfShoes / 2) : 0 ;
                break;
            case 'case4':
                itemQuantity = (typeOfPants === 'trousers-rods' ? quanityOfPants : 0) + quanityOfShoes + quantityOfAccesory ;
                break;
            case 'case5':
                itemQuantity = (typeOfPants === 'trousers-rods' ? quanityOfPants : 0) + (typeOfShoes === 'shoe-drawer' ? (quanityOfShoes ) : 0) + quantityOfAccesory ;
                break;
            case 'case6':
                itemQuantity = (typeOfPants === 'trousers-rods' ? quanityOfPants : 0)
                break;
            case 'case7':
                itemQuantity = (typeOfPants !== 'trousers-rods' ? quanityOfPants * 2 : 0)
              break;
            case 'case8':
                itemQuantity = (typeOfPants !== 'trousers-rods' ? quanityOfPants : 0)
                break;
            case 'case9':
                itemQuantity = typeOfShoes === 'shoe-drawer' ? quanityOfShoes : 0 ;
                break;
            case 'case10':
                itemQuantity = typeOfShoes !== 'shoe-drawer' ? quanityOfShoes : 0 ;
                break;
            case 'case11':
                itemQuantity = quantityOfClothsFolded;
                break;
            case 'case12':
                itemQuantity = quantityOfClothsFolded * 2;
                break;
            case 'case13':
                itemQuantity = quantityOfAccesory;
                break;
            case 'case14':
                itemQuantity = 0.5;
                break;
            case 'case15':
                itemQuantity = (nuberOfModule - 1) / 2;
                break;
            case 'case16':
                itemQuantity = nuberOfModule * 2;
                break;
            case 'case17':
                itemQuantity = wardrobeWidth < 3100 ? nuberOfModule : nuberOfModule / 2;
                break;
            case 'case18':
                itemQuantity = 1;
                break;
            case 'case19':
                itemQuantity = Math.floor(wardrobeWidth / 500 );
                break;
            case 'case20':
                itemQuantity = 1;
                break;
            case 'case21':
                let tmpFirstValue = wardrobeHeight * (wardrobeWidth < 3100 ? nuberOfModule * 2 : nuberOfModule )
                itemQuantity = getHigherMultiple(tmpFirstValue , 10000) / 10000
                break;
            case 'case22':
                itemQuantity = (2100 <= wardrobeWidth && wardrobeWidth > 3100) ? 4: 2;
                break;
            case 'case23':
                itemQuantity = (2100 <= wardrobeWidth && wardrobeWidth > 3100) ? 2: 1;
                itemQuantity
                break;
            default:
                window.alert('Oops! Ha ocurrido un error. Por favor, inténtalo nuevamente')
          }

          items[i]['quantity'] = itemQuantity;
    })

    return items;
}
