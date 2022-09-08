const CaseList = ['longClothCastor', 'longClothSilk', 'shortClothCastor', 'shortClothSilk'];
const ShoeExtraShelfRequiredComponent = ['pullOutShoesRack', 'shoeDrawer'];
export const nodeStackLength = 12;

const setNodeStack = (stack) => {
    const config = {};
    Object.keys(stack).forEach((element, tmpIndex) => {
        let lowerPivot = -1350;
        let upperPivot = 1350;
        let extraShelfCount = 0;
        let shoesExtraShelf = false;
        let foldedClothsExtraShelf = false;
        const node1 = 'Node_'+(tmpIndex + 1)+'_';
        const trans = '_transition_y';
        const listLength = stack[element].lowerStack.length + stack[element].upperStack.length;

        if( CaseList.includes(stack[element].upperStack[0]?.type)){
            // consider total height of wardrobe as 2000 mm and so update the 
            upperPivot = 650;
            config[node1 + (listLength + 1)] = {assetId : threekitItemIds['shelf']}
            config[node1 + (listLength + 1) + trans] = 65;
        }

        stack[element].lowerStack.forEach((tmpStack, index)=>{
            if(!shoesExtraShelf && ShoeExtraShelfRequiredComponent.includes(tmpStack.type)){
                const elementCount = stack[element].lowerStack.filter(x => x.type == tmpStack.type).length;
                config[node1 + (index + 1 + extraShelfCount)] = {assetId : threekitItemIds['shelf']}
                config[node1 + (index + 1 + extraShelfCount) + trans] = parseInt(((elementCount * parseInt(tmpStack['heightInModule']) + lowerPivot) / 10).toFixed(2)) ;
                shoesExtraShelf = true;
                extraShelfCount += 1;
            }else if(!foldedClothsExtraShelf && (tmpStack.type === 'clothsFolded' )){
                const elementCount = stack[element].lowerStack.filter(x => x.type == tmpStack.type).length;
                config[node1 + (index + 1 + extraShelfCount)] = {assetId : threekitItemIds['shelf']}
                config[node1 + (index + 1 + extraShelfCount) + trans] = parseInt(((elementCount * parseInt(tmpStack['heightInModule']) + lowerPivot) / 10).toFixed(2)) ;
                foldedClothsExtraShelf = true;
                extraShelfCount += 1;
            }
            config[node1 + (index + 1 + extraShelfCount)] = {assetId :threekitItemIds[tmpStack['type']]};
            config[node1 + (index + 1 + extraShelfCount) + trans] = parseInt(((lowerPivot + parseInt(parseInt(tmpStack['heightInModule'] / 2).toFixed(2))) / 10).toFixed(2));
            lowerPivot = lowerPivot + parseInt(tmpStack['heightInModule']);
        })

        stack[element].upperStack.forEach((tmpStack, index)=>{
            config[node1 + (stack[element].lowerStack.length + extraShelfCount +  index + 1)] = {assetId :threekitItemIds[tmpStack['type']]};
            config[node1 + (stack[element].lowerStack.length + extraShelfCount + index + 1) + trans] = parseInt(((upperPivot - parseInt(parseInt(tmpStack['heightInModule'] / 2).toFixed(2))) / 10).toFixed(2));
            upperPivot = upperPivot - parseInt(tmpStack['heightInModule']);
        })

        for(let i = (listLength + extraShelfCount) + 1 ; i <= nodeStackLength ; i++ ){
            config[node1 + (i)] =  {assetId :''};
            config[node1 + (i) + trans] = '';
        }
    })

    console.log('updated config>>>>>>>>>>>>>>>>>>>>>>>>>>>', config)
    return config;
}

export const clearNodeStack = () => {
    const config = {};
    for(let tmpIndex = 0; tmpIndex < window.globalObject.nuberOfModule; tmpIndex++){
        const node1 = 'Node_'+(tmpIndex + 1)+'_';
        const trans = '_transition_y';
        for(let i = 1 ; i <= nodeStackLength ; i++ ){
            config[node1 + (i)] =  {assetId :''};
            config[node1 + (i) + trans] = '';
        }
    }
    return config;
}

export default setNodeStack;

const threekitItemIds = {
    'longClothHanger':'b2593543-5952-4922-9748-bcb7bd97aa4e',
    'longClothCastor':'35a82b97-4d5f-4894-8ab2-57e99912f2fa',
    'longClothSilk':'5f115d0a-f3c1-4eaa-86a7-68770b45d4bc',
    'shortClothHanger':'b32a7687-cf0a-4f6e-9251-bc3f1f2e5818',
    'shortClothCastor':'f5721a2d-b6c9-4522-8a34-847ffb674cde',
    'shortClothSilk':'13ab0324-7735-49b4-84e1-d22545868904',
    'pullOutTrouserPants':'3fee3562-4d25-47ad-80e9-468d23dd4ab0',
    'trouserRodPants':'d390c6f1-d09a-4347-a7b7-eff6a856f41b',
    'pullOutShoesRack':'7b3be0c6-d354-4c5f-8e8e-21b3ee5ab9d3',
    'shoeDrawer':'77129ddf-1fef-48db-bc61-154763eff4af',
    'clothsFolded':'7bc956b1-38c0-4b0e-a99f-252c90c9733d',
    'acessory':'74a1b827-cd69-44ce-b62e-428640bb287f',
    'shelf':'d08b6f9c-aec1-420f-8d0e-d7a8eb29cef6',
}