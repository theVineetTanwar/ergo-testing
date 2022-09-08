import { nodeStackLength } from './setNodeStack.js';

const getModelObj = (options, assetId) => {
    const tmpObj = options.find((item)=>{
        return item.assetId === assetId;
    })
    return tmpObj?.metadata?.height;
}
const getConfig = () => {
    const attrs = window.threekit.configurator.getDisplayAttributes();
    let optionSet = [];
    const preConfig = {};
    const transitionConfig = {};
    const itemPerModule = {};

    attrs.forEach((el)=>{
        if((el.name.includes('Node_') && !el.name.includes('_transition_y'))){
            if(optionSet.length === 0){
                optionSet = JSON.parse(JSON.stringify(el.values)) ;
            }
            if(el.value?.assetId){
                let key = el.name.substring(5, 6);
                itemPerModule[key] = itemPerModule[key] ? itemPerModule[key] + 1: 1
                preConfig[el.name] = el.value?.assetId
            }
            
        }else if((el.name.includes('Node_') && el.name.includes('_transition_y'))){
            transitionConfig[el.name] = el.value
        }
    })
    return {optionSet, preConfig, transitionConfig , itemPerModule }
}

export const getPlusIcon = (eleID) => {
    window.crntSelectedModelForAdd = eleID;
    const {optionSet, preConfig , transitionConfig, itemPerModule} = getConfig();
    const curModelHeightReq =  getModelObj(optionSet, eleID);
    const config = {};    

    let permanentUpperPivot = 1350;
    if(+window.globalObject.height < 2700){
        permanentUpperPivot = 1350 - (2700 - window.globalObject.height);
    }

    for(let i = 1; i <= window.globalObject.nuberOfModule; i++){
        const node1 = 'Node_'+ i +'_';
        const trans = '_transition_y';
        let preNode = node1+1;
        let upperPivot = permanentUpperPivot;
        let extraIndex = (itemPerModule[i] ? itemPerModule[i] : 0) + 1;

        for(let tmpIndex = 1; tmpIndex <= nodeStackLength; tmpIndex++){
            let tmpNode = node1+tmpIndex;
            if(tmpIndex === 1 && window.globalObject.height <= 2650){
                config[node1+tmpIndex] = { assetId: process.env.SHELF_MODEL_ID };
                config[node1+tmpIndex+trans] = upperPivot / 10;
                extraIndex += 1;
                continue;
            }
            if(!eleID){
                config[tmpNode] = { assetId: ''}
                config[tmpNode + trans] = 0;
                continue;
            }
            if(preConfig[tmpNode]){
                const tmpModelHgtReq = getModelObj(optionSet, preConfig[node1+tmpIndex]);
                let gap = upperPivot - (transitionConfig[tmpNode+trans] * 10) - tmpModelHgtReq / 2;

                if(tmpIndex === 1){
                    config[node1+tmpIndex] = {assetId: preConfig[preNode]};
                    config[node1+tmpIndex+trans] = transitionConfig[preNode+trans];
                }else{
                    config[node1+tmpIndex] = {assetId : preConfig[node1+tmpIndex]};
                    config[node1+tmpIndex+trans] = transitionConfig[node1+tmpIndex+trans];
                    preNode = node1 + tmpIndex;
                }
                if(gap >= curModelHeightReq){
                    config[node1+extraIndex] = { assetId: process.env.PLUS_MODEL_ID }
                    config[node1 + extraIndex + trans] = (upperPivot) / 10;
                    extraIndex += 1;
                }
                upperPivot -= (tmpModelHgtReq + gap);
            }else{
                // if there is no key value found there in the config
                // check if available space for the required model is present or not at the end of config models
                if((!config[node1+extraIndex]?.assetId && (upperPivot + 1350 > curModelHeightReq))){
                    // then add the plus icon at the center of the available space.
                    config[node1+extraIndex] = { assetId: process.env.PLUS_MODEL_ID }
                    config[node1 + extraIndex + trans] = (upperPivot) / 10;
                    // extraIndex += 1;
                }
                config[tmpNode] = config[tmpNode] ? config[tmpNode] : { assetId: ''}
                config[tmpNode + trans] = config[tmpNode + trans] ? config[tmpNode + trans] : 0;
                
            }
        }
    }
    console.log('config>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', config)
    return config;
}

export const resetAccessories = (resetPlusIcon) => {
    const config = {};
    const trans = '_transition_y';
    const {preConfig , transitionConfig} = getConfig();
    let isPlusIcon = true;
    for(let i = 1; i <= window.globalObject.nuberOfModule; i++){
        const node1 = 'Node_'+ i +'_';
        for(let tmpIndex = 1; tmpIndex <= nodeStackLength; tmpIndex++){
            let tmpNode = node1+tmpIndex;
            if((preConfig[tmpNode] !== process.env.PLUS_MODEL_ID) && resetPlusIcon){
                config[tmpNode+trans] = transitionConfig[tmpNode+trans] ? transitionConfig[tmpNode+trans] : 0;
                config[tmpNode] = {assetId: preConfig[tmpNode] ? preConfig[tmpNode] : 0};
            }else{
                config[tmpNode+trans] = 0;
                config[tmpNode] = {assetId: ''};
                isPlusIcon = false;
            }
        }
    }
    return (Object.keys(preConfig).length === 0 || isPlusIcon) ? null : config;
}

export const setModelForPlusIcon = (parentName) => {
    const eleID = window.crntSelectedModelForAdd;
    const config = {};
    let newTransitionConfig = {};
    const trans = '_transition_y';
    let subItemKey = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
    }    
    const {optionSet, preConfig , transitionConfig} = getConfig();

    Object.keys(preConfig).forEach((item)=>{
        let moduleKey = +item.substring(5, 6);
        if((preConfig[item] !== process.env.PLUS_MODEL_ID)){
            newTransitionConfig[Math.round(transitionConfig[item + trans] + 135 + (moduleKey * 270))] = {
                node: item, 
                nodeID: item === parentName ? eleID : preConfig[item], 
                trans: transitionConfig[item + trans]
            }
            
        }else if(item === parentName){
            let heightReq = getModelObj(optionSet, eleID);
            newTransitionConfig[Math.round(transitionConfig[item + trans] + 135)] = {
                node: item, 
                nodeID:  eleID , 
                trans: transitionConfig[item + trans] - ((heightReq / 20))
            }
        }
    }) 

    const keysSorted = Object.keys(newTransitionConfig).sort(function(a,b){return (+b) - +(a)})

    keysSorted.forEach((item)=>{
        let moduleKey = +newTransitionConfig[item].node.substring(5, 6);
        let node = 'Node_'+ moduleKey + '_' + subItemKey[moduleKey];
        config[node] = {assetId: newTransitionConfig[item].nodeID};
        config[node+trans] = newTransitionConfig[item].trans;
        subItemKey[moduleKey] += 1;
    })


    for(let i = 1; i <= window.globalObject.nuberOfModule; i++){
        const node1 = 'Node_'+ i +'_';

        for(let tmpIndex = 1; tmpIndex <= nodeStackLength; tmpIndex++){
            let tmpNode = node1+tmpIndex;
            config[tmpNode+trans] = config[tmpNode+trans] ? config[tmpNode+trans] : 0;
            config[tmpNode] = config[tmpNode] ? config[tmpNode] : 0;
        }
    }
    console.log('config>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', config)
    window.crntSelectedModelForAdd = null;
    return config;
}

export const getCurrentEleAxis = (parentName) => {
    const trans = '_transition_y';
    const {optionSet, preConfig , transitionConfig} = getConfig();
    let moduleKey = +parentName.substring(5, 6);
    let itemKey = +parentName.substring(7, 9);
    if( (itemKey)){
        itemKey = +parentName.substring(7, 8);
    }

    let preNodeName = 'Node_' + moduleKey + '_' + (itemKey - 1);
    let postNodeName = 'Node_' + moduleKey + '_' + (itemKey + 1);
    let preItemPos = 135;
    let nextItemPos = -135;
    let postNodeHeightReq = getModelObj(optionSet, preConfig[postNodeName]) || 0;
    let preNodeHeightReq = getModelObj(optionSet, preConfig[preNodeName]) || 0;
    let currentNodeHeightReq = getModelObj(optionSet, preConfig[parentName]);
    if(itemKey > 1){
        // set the previous item's position
        let preNodeTran = transitionConfig[preNodeName+trans];
        preItemPos = preNodeTran - (preNodeHeightReq/20);
    }
    if(preConfig[postNodeName]){
        let nextNodeTran = transitionConfig[postNodeName+trans];
        nextItemPos = nextNodeTran + (postNodeHeightReq/20);
    }
    let totolDif = Math.abs(preItemPos - nextItemPos) - (currentNodeHeightReq / 10);
    
    let returnData = {
        totolDif,
        min: preItemPos - (currentNodeHeightReq / 20),
        max: nextItemPos + (currentNodeHeightReq / 20), 
        value: transitionConfig[parentName+trans],
        nodeID: parentName
    }
    return returnData;
}

export const setCurrentEleAxis = (node) => {
    const config = {};
    const { preConfig } = getConfig();

    for(let i = 1; i <= window.globalObject.nuberOfModule; i++){
        const node1 = 'Node_'+ i +'_';
        const trans = '_transition_y';

        for(let tmpIndex = 1; tmpIndex <= nodeStackLength; tmpIndex++){
            let tmpNode = node1+tmpIndex;
            config[node1+tmpIndex] = {assetId: preConfig[tmpNode]};
            if(tmpNode === node.nodeID){
                config[node1+tmpIndex+trans] = node.value
            }else{
                config[node1+tmpIndex] = {assetId: preConfig[tmpNode] ? preConfig[tmpNode]: ''};
            }
        }
    }
    console.log('config>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', config)
    window.crntSelectedModelForAdd = null;
    return config;
}

export const deleteAccessoryElement = (node) => {
    const config = {};
    const trans = '_transition_y';
    const { preConfig , transitionConfig} = getConfig();

    for(let i = 1; i <= window.globalObject.nuberOfModule; i++){
        const node1 = 'Node_'+ i +'_';
        let nodeSubIndex = 1;

        for(let tmpIndex = 1; tmpIndex <= nodeStackLength; tmpIndex++){
            let tmpNode = node1+nodeSubIndex;
            if(node1+tmpIndex !== node.nodeID){
                config[tmpNode+trans] = transitionConfig[node1+tmpIndex+trans] ? transitionConfig[node1+tmpIndex+trans] : 0;
                config[tmpNode] = {assetId: preConfig[node1+tmpIndex] ? preConfig[node1+tmpIndex] : ''};
                nodeSubIndex += 1;
            }
        }
        if(nodeSubIndex < nodeStackLength){
            config[node1+nodeStackLength+trans] = 0;
            config[node1+nodeStackLength] = {assetId: ''};
        }
    }
    console.log('config>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', config)
    window.crntSelectedModelForAdd = null;
    return config;
}
