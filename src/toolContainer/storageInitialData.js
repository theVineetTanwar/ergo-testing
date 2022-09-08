import Cloth1 from '../assets/images/icons/long.svg';
import Pants from '../assets/images/icons/pant.svg';
import ShortCloth from '../assets/images/icons/short.svg';
import Accessory from '../assets/images/icons/accessory.svg';
import FoldedCloth from '../assets/images/icons/folded.svg';
import Shoes from '../assets/images/icons/shoes.svg';
import LongCloth1 from '../assets/images/gif/longHanger.gif';
// import LongCloth2 from '../assets/images/gif/longSilk.gif';
import ShortCloth1 from '../assets/images/gif/shortCastor.gif';
import pant1 from '../assets/images/gif/pant.gif';
import pant2 from '../assets/images/gif/pant2.gif';
import shoe1 from '../assets/images/gif/shoe.gif';
import shoe2 from '../assets/images/gif/shoe2.gif';
import AccessoryDrawer1 from '../assets/images/gif/accessory.gif';
import FoldedClothsImage from '../assets/images/gif/foldedCloths.gif';

const StorageElements = [
  {
    img: Cloth1,
    type: 'Long clothes hanging on hanger',
    label: 'Abrigos y vestidos',
    quantity: 0,
    imageStyle: {  width: '55px' },
    hoverImages : [LongCloth1],
    subItem: [
      {
        name: 'HANG + Spacers',
        maxHeight: '2350',
        heightInModule: '1400',
      },
      {
        name: 'CASTOR (illuminated)',
        maxHeight: '1400',
        heightInModule: '1400',
      },
      {
        name: 'SILK',
        maxHeight: '1400',
        heightInModule: '1400',
      },
    ]
  },
  {
    img: ShortCloth,
    label: 'Camisas y camisetas',
    quantity: 0,
    type: 'Short clothes hanging on hanger',
    hoverImages : [ ShortCloth1],
    subItem: [
      {
        name: 'HANG + Spacers',
        maxHeight: '2000',
        heightInModule: '1050',
      },
      {
        name: 'CASTOR (illuminated)',
        maxHeight: '1050',
        heightInModule: '1050',
      },
      {
        name: 'SILK',
        maxHeight: '1050',
        heightInModule: '1050',
      },
    ]
  },
  {
    img: Pants,
    type: 'Pants',
    label: 'Pantalones y faldas',
    quantity: 0,
    hoverImages : [pant1, pant2],
    subItem: [
      {
        name: 'PULL-OUT TROUSER RACK',
        maxHeight: '780',
        heightInModule: '780',
      },
      {
        name: 'TROUSERS RODS',
        maxHeight: '780',
        heightInModule: '780',
      },
    ]
  },
  {
    img: Shoes,
    type: 'Shoes',
    label: 'Zapatos',
    quantity: 0,
    hoverImages : [shoe1, shoe2],
    subItem: [
      {
        name: 'PULL-OUT LATERAL SHOE RACK',
        maxHeight: '780',
        heightInModule: '780',
      },
      {
        name: 'SHOE DRAWER',
        maxHeight: '260',
        heightInModule: '260',
      },
    ]
  },
  {
    img: FoldedCloth,
    label: 'Ropa plegada',
    type: 'Clothes folded',
    quantity: 0,
    hoverImages : [FoldedClothsImage],
    subItem: [
      {
        name: 'VERTEX DRAWER',
        maxHeight: '260',
        heightInModule: '260',
      }
    ]
  },
  {
    img: Accessory,
    label: 'Accesorios',
    quantity: 0,
    hoverImages : [AccessoryDrawer1],
    type: 'Accesories',
    subItem: [
      {
        name: 'ORGANIZER DRAWER',
        maxHeight: '130',
        heightInModule: '130',
      },
    ]
  }
]

export default StorageElements;