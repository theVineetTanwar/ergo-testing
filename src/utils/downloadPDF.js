import { getFormateddData} from './convertJSONtoCSV.js';
// const BASE_PDF_URL = 'http://localhost:3001/';
const BASE_PDF_URL = 'https://emuca.herokuapp.com/';
// const BASE_PDF_URL = 'https://postmark-server.herokuapp.com/';
// const BASE_PDF_URL = 'https://infinite-beach-25229.herokuapp.com/';

export const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };


const downloadPDFFile = async( dataArray = [] , userName, userEmail) => {
  const postData = {
    "recieverEmail": userEmail.trim(),
    "first_name": userName.trim()
  }
    if(dataArray.length < 1){
        window.alert('No se han encontrado datos. Por favor, selecciona todas las opciones e inténtalo nuevamente.');
        return false;
    }
    const items = {'data' : getFormateddData(dataArray)};

    const response = await fetch(BASE_PDF_URL + 'api/pdf/emuca', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(items),
      }).then(tmpResponse => {
            return tmpResponse.ok ?  tmpResponse.blob() : null;
        }).catch((err)=>{
            console.log('err.>>>>>>>>>>>>>>>>>', err)
            window.alert('Some unrecognised error while sending email. Please try again after some time')
            return false;
        })


        if(response){
          // const url = window.URL.createObjectURL(new Blob([data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'file.pdf');
            // document.body.appendChild(link);
            // link.click();
            blobToBase64(response).then(res => {
              const attachment = [
                {
                  "Name": "emuca.pdf",
                  "Content": res.replace("data:application/pdf;base64,", ""),
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
                    });
            });

          return true;
        }else{
          window.alert('Ha ocurrido un error generando el email. Por favor, inténtalo nuevamente')
          return false;

        }
}

export default downloadPDFFile;