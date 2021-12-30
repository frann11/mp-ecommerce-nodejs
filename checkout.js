const mercadopago = require('mercadopago')

async function checkoutMercadoPago({productName,productPrice,img,unit,url}){
console.log(url)
mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
})
//preferencia completa

const preference = {
    items: [
        {
            id: 1234,
            title: productName,
            currency_id: "ARS",
            picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            description: "Dispositivo móvil de Tienda e-commerce",
            category_id: "art",
            quantity: 1,
            unit_price: productPrice,
        }
    ],
    payer: {
        name: "Lalo",
        surname: "Landa",
        email:'test_user_63274575@testuser.com',
        phone: {
            area_code: '11',
            number: 22223333
        },
        identification: {
            type: "DNI",
            number: "12345678"
        },
        address: {
            street_name: "Falsa",
            street_number: 123,
            zip_code: "1111"
        }
    },
    back_urls: {
        success: url+"/?success=true",
        failure: `${url}/detail?img=${img.replace('/','%2F')}&title=${productName.replace(' ','+')}&price=${productPrice}&unit=${unit}&failure=true`,
        pending: url+"/?pending=true",
    },
    auto_return: "approved",
    payment_methods: {
        excluded_payment_methods: [
            {
                "id": "amex"
            }
        ],
        excluded_payment_types: [
            {
                "id": "atm"
            }
        ],
        installments: 6
    },
    notification_url: "https://enjirthf7mtr9nf.m.pipedream.net",
    statement_descriptor: "Tienda e-commerce",
    external_reference: "franciscoberthet@gmail.com",
    expires: false,
}

let preferencia 
await mercadopago.preferences.create(preference)
.then(function(preference){
  // Este valor reemplazará el string "$init_point$" en tu HTML
  console.log(preference)
  global.init_point = preference.body.init_point;
  preferencia = preference
}).catch(function(error){
  console.log(error);
});

return preferencia
}

module.exports= {checkoutMercadoPago}