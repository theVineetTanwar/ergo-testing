import { blobToBase64 } from './downloadPDF';
// const BASE_PDF_URL = 'http://localhost:3001/';
const BASE_PDF_URL = 'https://emuca.herokuapp.com/';

const convertToCSV = (objArray) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if(index === 'Item' || index === 'quantity'){
                if (line != '') line += ';'
                line += array[i][index];
            }
        }

        str += line + '\r\n';
    }

    return str;
}

export function removeDuplicate(arr, prop) {
    var new_arr = [];
    var lookup = {};
    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
        new_arr.push(lookup[i]);
    }
    return new_arr;
}

export const getFormateddData = (tmpDataArray) => {
    const formatedData = [];
    const dataArray = removeDuplicate(tmpDataArray, 'Item');
    dataArray.forEach((item) => {
        if(item.quantity !== 0){
            formatedData.push({
                'Product type': item['Product type'],
                'Item': item['Item'],
                'Description': item['Description'].replace(/,/g, ''),
                'quantity' : Math.ceil(item['quantity'] || 0),
            });
        }
    })
    return formatedData.sort((a, b) => {
        return (parseFloat(a['Product type'].substring(0,3)) > parseFloat(b['Product type'].substring(0,3)) ? 1 : -1)
    });
}

const exportCSVFile = async( dataArray = [] , userName,  userEmail, fileTitle = 'emuca') => {
    if(dataArray.length < 1){
        window.alert('No se han encontrado datos. Por favor, selecciona todas las opciones e inténtalo nuevamente.');
        return false;
    }

    
    const postData = {
        "recieverEmail": userEmail.trim(),
        "first_name": userName.trim()
    }


    const items = getFormateddData(dataArray);
    var jsonObject = JSON.stringify(items);
    var csv = convertToCSV(jsonObject);
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            // var url = URL.createObjectURL(blob);
            // link.setAttribute("href", url);
            // link.setAttribute("download", exportedFilenmae);
            // link.style.visibility = 'hidden';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);

            blobToBase64(blob).then(res => {
                const attachment = [
                    {
                      "Name": "emuca.csv",
                      "Content": res.replace("data:text/csv;charset=utf-8;;base64,", ""),
                      "ContentType": "application/pdf"
                    }
                  ]
                  
                  postData['Attachments'] = attachment;
      
                  fetch(BASE_PDF_URL + 'sendEmailWithTemplate', {
                  //   fetch('https://postmark-server.herokuapp.com/sendEmailWithTemplate', {
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/json' }),
                        body: JSON.stringify(postData),
                    })
                    .then(res => res.json())
                    .then(function(data) {
                        window.alert('Email envíado correctamente!')
                    }).catch((err)=>{
                        console.log('err>>>>>>>>>>>>>>>>>', err)
                        window.alert('Ha ocurrido un error generando el PDF. Por favor, inténtalo nuevamente')
                    });
            })
        }
    }
}

export default exportCSVFile;
