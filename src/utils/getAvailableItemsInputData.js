export const getItemValueFromArray = (array, item, key) => {
  const length = array.length;
  let value = '';
  for (let i = 0; i < length; i++) {
    if (item.assetId === array[i].assetId) {
      value = key ? array[i]?.metadata[key] : array[i].name;
      break;
    }
  }
  return value;
};

const getRounded = (number) => {
  let multiplier = Math.pow(10, 0 || 0);
  return Math.round(number * multiplier) / multiplier;
}

export const getAvailableItemsInputData = (attributeData) => {
  let returnData = {
    doorData: {
      door: null,
      model: null,
      finishing: null,
      thickness: null,
    },
    finishingOfAccesories: '',
    nuberOfModule: '',
    widthOfModuleGap: '',
    shoes: '',
    longCloth: '',
    shortCloth: '',
    foldedCloth: '',
    pants: '',
    accesories: '',
  };

  if (!attributeData) {
    return returnData;
  }

  for (const [key, attribute] of Object.entries(attributeData)) {
    if (attribute.name === 'Door Type') {
      returnData['doorData']['door'] = getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue,
         'label'
      );
    } else if (attribute.name === 'Handle Type') {
      returnData['doorData']['model'] = getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      );
    } else if (attribute.name === 'Handle Finishing') {
      returnData['doorData']['finishing'] = getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      );
    } else if (attribute.name === 'Door thickness (mm)') {
      returnData['doorData']['thickness'] = getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      );
    } else if (attribute.name === 'Finishing of accesory') {
      returnData['finishingOfAccesories'] = getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      );
    } else if (attribute.name === 'Number of Modules') {
      returnData['nuberOfModule'] = attribute.value;
    } else if (attribute.name === 'Long clothes hanging on hanger') {
      returnData['longCloth'] = parseInt( getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    } else if (attribute.name === 'Short clothes hanging on hanger') {
      returnData['shortCloth'] = parseInt(getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    } else if (attribute.name === 'Pants') {
      returnData['pants'] = parseInt(getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    } else if (attribute.name === 'Clothes folded') {
      returnData['foldedCloth'] = parseInt(getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    } else if (attribute.name === 'Shoes') {
      returnData['shoes'] = parseInt(getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    } else if (attribute.name === 'Accesories') {
      returnData['accesories'] = parseInt(getItemValueFromArray(
        attribute.values,
        attribute.value ? attribute.value : attribute.defaultValue
      ));
    }
  }

  return returnData;
};