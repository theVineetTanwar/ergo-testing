import React from 'react';
import styled from 'styled-components';
import {
  getLongClothHangSpacerData,
  getLongClothCastorORSilkData,
  getShortClothHangSpacerData,
  getShortClothCastorORSilkData,
  getPantsData,
  getShoesData,
  getFordedClothsData,
  getAccesoryData,
} from '../utils';
import {
  HEIGHT_REQUIRED_IN_PANTS,
  HEIGHT_REQUIRED_IN_FOLDED_CLOTHS,
  HEIGHT_REQUIRED_IN_SHOE_DRAWER,
  HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK,
  HEIGHT_REQUIRED_IN_ACCESORY,
  getHigherMultiple,
} from '../utils/index.js';
import { getAvailableItemsInputData } from '../utils/getAvailableItemsInputData';
// import { useAttributes } from '@threekit-tools/treble';
import { useConfigurator } from '@threekit-tools/treble';


const TableContainer = styled.div`
  padding: 10px 0 5px;
  font-weight: 655;
  width: 100%;
  overflow: auto;
  font-size: 12px;

  table {
    width: 100%;
    min-width: 600px;
    font-size: 12px;
    margin-top: 0px;

    .first-table-row-item {
      td {
        border-top: 1px solid #777;
        padding-top: 20px;
      }
    }
    .table-heading {
      font-weight: bold;
    }

    tr {
      font-weight: 444;
    }
  }
`;

export default function dataTable(props) {
  // const [attributes, setConfiguration] = useAttributes([]);
  const [attributes, setConfiguration] = useConfigurator();

  let longClothQuanityOfHingerOnHanger = 0;
  let longClothQuanityOfHingerOnHangerORSilk = 0;
  let longClothQuanityOfSilk = 0;
  let longClothQuanityOfCastor = 0;
  let shortClothQuanityOfHingerOnHanger = 0;
  let shortClothQuanityOfSilk = 0;
  let shortClothQuanityOfCastor = 0;
  let quanityOfPants = 0;
  let quanityOfShoes = 0;
  let quanityOfShoeDrawerShoes = 0;
  let quantityOfClothsFolded = 0;
  let quantityOfAccesory = 0;
  let typeOfLongClothHinger = 'hang';
  let typeOfShortClothHinger = 'hang';
  let typeOfShoes = 'pull-out';
  let typeOfPants = 'pull-out';
  let heightOfShoeModule = HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK;

  const {
    finishingOfAccesories,
    nuberOfModule,
    shoes,
    longCloth,
    shortCloth,
    foldedCloth,
    pants,
    accesories,
  } = getAvailableItemsInputData(attributes);

  const doorData = props.doorData;
  const wardrobeData = props.wardrobeData;
  const tmpwidth = parseInt(wardrobeData['width']);
  const thickness = wardrobeData['thickness'];

  const getRounded = (number, pow = 1) => {
    let multiplier = Math.pow(10, pow || 0);
    return Math.round(number * multiplier) / multiplier;
  };
  let widthOfModuleGap = 0;
  if(nuberOfModule === 0) {
    widthOfModuleGap = 0;
  }
  const numThickness =  parseInt(thickness);
  if(numThickness){
    let tmpWidthOfModuleGap = getRounded((tmpwidth - (numThickness * (nuberOfModule + 1)))/nuberOfModule);
    widthOfModuleGap = tmpWidthOfModuleGap > 0 ? tmpWidthOfModuleGap : 0;
  }


  const returnData =  (
    <TableContainer>
      <table style={{ width: '100%' }}>
        {/* <tr className="table-heading">
          <td>Product Type</td>
          <td>Description</td>
          <td>Quantity of accessories</td>
          <td>Height In Module</td>
          <td>Height required in module</td>
          <td>Grade of accessories (%)</td>
          <td>Vertical space available</td>
        </tr> */}
        {props.currentStorageElement.map((data, index) =>
          data.subItem.map((subitem, subIndex) => {
            let tmpQuantityOfAccesory = '0';
            let tmpVerticalSpace = '0 mm';

            if (
              subitem.name === 'HANG + Spacers' &&
              data.type === 'Long clothes hanging on hanger'
            ) {
              tmpQuantityOfAccesory = getLongClothHangSpacerData(
                wardrobeData.height,
                nuberOfModule,
                'quantity',
                longCloth
              );
              longClothQuanityOfHingerOnHanger = tmpQuantityOfAccesory;
              tmpVerticalSpace =
                getLongClothHangSpacerData(
                  wardrobeData.height,
                  nuberOfModule,
                  'accesory'
                ) + ' mm';
            } else if (
              subitem.name === 'CASTOR (illuminated)' &&
              data.type === 'Long clothes hanging on hanger'
            ) {
              tmpVerticalSpace =
                getLongClothCastorORSilkData(
                  wardrobeData.height,
                  nuberOfModule,
                  finishingOfAccesories,
                  'verticalSpace',
                  'castor'
                ) + ' mm';
              tmpQuantityOfAccesory = getLongClothCastorORSilkData(
                wardrobeData.height,
                nuberOfModule,
                finishingOfAccesories,
                'quantity',
                'castor',
                longCloth
              );

              longClothQuanityOfCastor = tmpQuantityOfAccesory;
            } else if (
              subitem.name === 'SILK' &&
              data.type === 'Long clothes hanging on hanger'
            ) {
              tmpVerticalSpace =
                getLongClothCastorORSilkData(
                  wardrobeData.height,
                  nuberOfModule,
                  finishingOfAccesories,
                  'verticalSpace',
                  'silk'
                ) + ' mm';
              tmpQuantityOfAccesory = getLongClothCastorORSilkData(
                wardrobeData.height,
                nuberOfModule,
                finishingOfAccesories,
                'quantity',
                'silk',
                longCloth
              );

              longClothQuanityOfSilk = tmpQuantityOfAccesory;
            }

            // Short clothes hinger on hanger
            else if (data.type === 'Short clothes hanging on hanger') {
              longClothQuanityOfHingerOnHangerORSilk =
                longClothQuanityOfHingerOnHanger;
              if (longClothQuanityOfHingerOnHanger < longClothQuanityOfSilk) {
                longClothQuanityOfHingerOnHanger = longClothQuanityOfSilk;
                typeOfLongClothHinger = 'silk';
                longClothQuanityOfHingerOnHangerORSilk = longClothQuanityOfSilk;
              } else if (
                longClothQuanityOfHingerOnHanger < longClothQuanityOfCastor
              ) {
                longClothQuanityOfHingerOnHanger = longClothQuanityOfCastor;
                typeOfLongClothHinger = 'castor';
              }

              if (subitem.name === 'HANG + Spacers') {
                tmpVerticalSpace =
                  getShortClothHangSpacerData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    shortCloth,
                    longClothQuanityOfHingerOnHanger
                  ) + ' mm';
                tmpQuantityOfAccesory = getShortClothHangSpacerData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  shortCloth,
                  longClothQuanityOfHingerOnHanger
                );

                shortClothQuanityOfHingerOnHanger = tmpQuantityOfAccesory;
              } else if (subitem.name === 'CASTOR (illuminated)') {
                tmpVerticalSpace =
                  getShortClothCastorORSilkData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'castor',
                    finishingOfAccesories,
                    shortCloth,
                    longClothQuanityOfHingerOnHanger
                  ) + ' mm';
                tmpQuantityOfAccesory = getShortClothCastorORSilkData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'castor',
                  finishingOfAccesories,
                  shortCloth,
                  longClothQuanityOfHingerOnHanger
                );
                shortClothQuanityOfCastor = tmpQuantityOfAccesory;
              } else if (subitem.name === 'SILK') {
                tmpVerticalSpace =
                  getShortClothCastorORSilkData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'silk',
                    finishingOfAccesories,
                    shortCloth,
                    longClothQuanityOfHingerOnHanger
                  ) + ' mm';
                tmpQuantityOfAccesory = getShortClothCastorORSilkData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'silk',
                  finishingOfAccesories,
                  shortCloth,
                  longClothQuanityOfHingerOnHanger
                );
                shortClothQuanityOfSilk = tmpQuantityOfAccesory;
              }
            } else if (data.type === 'Pants') {
              if (shortClothQuanityOfHingerOnHanger < shortClothQuanityOfSilk) {
                shortClothQuanityOfHingerOnHanger = shortClothQuanityOfSilk;
                typeOfShortClothHinger = 'silk';
              } else if (
                shortClothQuanityOfHingerOnHanger < shortClothQuanityOfCastor
              ) {
                shortClothQuanityOfHingerOnHanger = shortClothQuanityOfCastor;
                typeOfShortClothHinger = 'castor';
              }

              if (subitem.name === 'PULL-OUT TROUSER RACK') {
                tmpVerticalSpace =
                  getPantsData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'PULL-OUT TROUSER RACK',
                    pants,
                    typeOfLongClothHinger,
                    typeOfShortClothHinger,
                    shortClothQuanityOfHingerOnHanger,
                    longClothQuanityOfHingerOnHangerORSilk,
                    widthOfModuleGap
                  ) + ' mm';

                tmpQuantityOfAccesory = getPantsData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'PULL-OUT TROUSER RACK',
                  pants,
                  typeOfLongClothHinger,
                  typeOfShortClothHinger,
                  shortClothQuanityOfHingerOnHanger,
                  longClothQuanityOfHingerOnHangerORSilk,
                  widthOfModuleGap
                );

                if (widthOfModuleGap >= 800) {
                  quanityOfPants = tmpQuantityOfAccesory;
                }
              } else if (subitem.name === 'TROUSERS RODS') {
                tmpVerticalSpace =
                  getPantsData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'TROUSERS RODS',
                    pants,
                    typeOfLongClothHinger,
                    typeOfShortClothHinger,
                    shortClothQuanityOfHingerOnHanger,
                    longClothQuanityOfHingerOnHangerORSilk,
                    widthOfModuleGap
                  ) + ' mm';
                tmpQuantityOfAccesory = getPantsData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'TROUSERS RODS',
                  pants,
                  typeOfLongClothHinger,
                  typeOfShortClothHinger,
                  shortClothQuanityOfHingerOnHanger,
                  longClothQuanityOfHingerOnHangerORSilk,
                  widthOfModuleGap
                );

                if (widthOfModuleGap < 800) {
                  quanityOfPants = tmpQuantityOfAccesory;
                  typeOfPants = 'trousers-rods';
                }
              }
            } else if (data.type === 'Shoes') {
              if (subitem.name === 'PULL-OUT LATERAL SHOE RACK') {
                let verticalSpaceAvailableForPants = getPantsData(
                  wardrobeData.height,
                  nuberOfModule,
                  'accesory',
                  'PULL-OUT LATERAL SHOE RACK',
                  pants,
                  typeOfLongClothHinger,
                  typeOfShortClothHinger,
                  shortClothQuanityOfHingerOnHanger,
                  longClothQuanityOfHingerOnHangerORSilk,
                  widthOfModuleGap,
                  HEIGHT_REQUIRED_IN_PULL_OUT_LATERAL_SHOE_RACK
                );

                tmpVerticalSpace =
                  getShoesData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'PULL-OUT LATERAL SHOE RACK',
                    shoes,
                    verticalSpaceAvailableForPants,
                    quanityOfPants
                  ) + ' mm';
                tmpQuantityOfAccesory = getShoesData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'PULL-OUT LATERAL SHOE RACK',
                  shoes,
                  verticalSpaceAvailableForPants,
                  quanityOfPants
                );
                quanityOfShoes = tmpQuantityOfAccesory;
              } else if (subitem.name === 'SHOE DRAWER') {
                let verticalSpaceAvailableForPants = getPantsData(
                  wardrobeData.height,
                  nuberOfModule,
                  'accesory',
                  'SHOE DRAWER',
                  pants,
                  typeOfLongClothHinger,
                  typeOfShortClothHinger,
                  shortClothQuanityOfHingerOnHanger,
                  longClothQuanityOfHingerOnHangerORSilk,
                  widthOfModuleGap,
                  HEIGHT_REQUIRED_IN_SHOE_DRAWER
                );

                tmpVerticalSpace =
                  getShoesData(
                    wardrobeData.height,
                    nuberOfModule,
                    'accesory',
                    'SHOE DRAWER',
                    shoes,
                    verticalSpaceAvailableForPants,
                    quanityOfPants
                  ) + ' mm';
                tmpQuantityOfAccesory = getShoesData(
                  wardrobeData.height,
                  nuberOfModule,
                  'quantity',
                  'SHOE DRAWER',
                  shoes,
                  verticalSpaceAvailableForPants,
                  quanityOfPants,
                  quanityOfShoes
                );
                quanityOfShoeDrawerShoes = tmpQuantityOfAccesory;
              }
            } else if (data.type === 'Clothes folded') {
              if (quanityOfShoeDrawerShoes > quanityOfShoes) {
                quanityOfShoes = quanityOfShoeDrawerShoes;
                heightOfShoeModule = HEIGHT_REQUIRED_IN_SHOE_DRAWER;
                typeOfShoes = 'shoe-drawer';
              }

              let verticalSpaceAvailableForPants = getPantsData(
                wardrobeData.height,
                nuberOfModule,
                'accesory',
                '',
                pants,
                typeOfLongClothHinger,
                typeOfShortClothHinger,
                shortClothQuanityOfHingerOnHanger,
                longClothQuanityOfHingerOnHangerORSilk,
                widthOfModuleGap,
                HEIGHT_REQUIRED_IN_FOLDED_CLOTHS
              );

              let verticalSpaceAvailableForShoes =
                verticalSpaceAvailableForPants -
                quanityOfPants * getHigherMultiple(HEIGHT_REQUIRED_IN_PANTS, HEIGHT_REQUIRED_IN_FOLDED_CLOTHS);

              tmpVerticalSpace =
                getFordedClothsData(
                  wardrobeData.height,
                  nuberOfModule,
                  'accesory',
                  foldedCloth,
                  verticalSpaceAvailableForShoes,
                  quanityOfShoes,
                  heightOfShoeModule
                ) + ' mm';
              tmpQuantityOfAccesory = getFordedClothsData(
                wardrobeData.height,
                nuberOfModule,
                'quantity',
                foldedCloth,
                verticalSpaceAvailableForShoes,
                quanityOfShoes,
                heightOfShoeModule
              );
              quantityOfClothsFolded = tmpQuantityOfAccesory;
            } else if (data.type === 'Accesories') {
              if (quanityOfShoeDrawerShoes > quanityOfShoes) {
                quanityOfShoes = quanityOfShoeDrawerShoes;
                heightOfShoeModule = HEIGHT_REQUIRED_IN_SHOE_DRAWER;
              }
              let verticalSpaceAvailableForPants = getPantsData(
                wardrobeData.height,
                nuberOfModule,
                'accesory',
                '',
                pants,
                typeOfLongClothHinger,
                typeOfShortClothHinger,
                shortClothQuanityOfHingerOnHanger,
                longClothQuanityOfHingerOnHangerORSilk,
                widthOfModuleGap,
                HEIGHT_REQUIRED_IN_ACCESORY
              );

              let verticalSpaceAvailableForFoldedCloths =
                verticalSpaceAvailableForPants -
                quanityOfPants * getHigherMultiple(HEIGHT_REQUIRED_IN_PANTS, HEIGHT_REQUIRED_IN_ACCESORY) -
                quanityOfShoes * getHigherMultiple(heightOfShoeModule, HEIGHT_REQUIRED_IN_ACCESORY);

              tmpVerticalSpace =
                getAccesoryData(
                  wardrobeData.height,
                  nuberOfModule,
                  'accesory',
                  accesories,
                  verticalSpaceAvailableForFoldedCloths,
                  quantityOfClothsFolded,
                  heightOfShoeModule
                ) + ' mm';
              tmpQuantityOfAccesory = getAccesoryData(
                wardrobeData.height,
                nuberOfModule,
                'quantity',
                accesories,
                verticalSpaceAvailableForFoldedCloths,
                quantityOfClothsFolded,
                heightOfShoeModule
              );
              quantityOfAccesory = tmpQuantityOfAccesory;
            }

            return (
              // <tr
              //   key={'index' + index + subIndex}
              //   className={subIndex === 0 ? 'first-table-row-item' : ''}
              // >
              //   <td>{subIndex === 0 ? data.type : null}</td>
              //   <td style={{ borderBottom: '1px solid #777777' }}>
              //     {subitem.name}
              //   </td>
              //   <td>{tmpQuantityOfAccesory}</td>
              //   <td>{subitem.heightInModule + ' mm'}</td>
              //   <td>{subitem.maxHeight + ' mm'}</td>
              //   <td>{getRounded(data.quantity * 33.33)}</td>
              //   <td> {tmpVerticalSpace} </td>
              // </tr>
              <></>
            );
          })
        )
        }
      </table>
    </TableContainer>
  );

  const tmpGlobalObject = {
    ...window.globalObject,
    longClothQuanityOfHingerOnHanger : longClothQuanityOfHingerOnHanger,
    shortClothQuanityOfHingerOnHanger: shortClothQuanityOfHingerOnHanger,
    quanityOfPants: quanityOfPants,
    quanityOfShoes: quanityOfShoes,
    quantityOfClothsFolded: quantityOfClothsFolded,
    quantityOfAccesory: quantityOfAccesory,
    nuberOfModule: nuberOfModule,
    finishingOfAccesories: finishingOfAccesories,
    typeOfLongClothHinger: typeOfLongClothHinger,
    typeOfShortClothHinger: typeOfShortClothHinger,
    typeOfShoes: typeOfShoes,
    typeOfPants: typeOfPants,
  }


  window.globalObject = tmpGlobalObject;

  return returnData;
}
