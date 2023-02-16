var SibApiV3Sdk = require('sib-api-v3-sdk'); //require the sendinblue node module for the API to work

module.exports = {
    getIndex: (req,res)=>{ //home directory route
        res.render('index.ejs')
    },
    sendEmail: async (req,res) => { //our sendEmail route 
        let { userEmail, firstname, ingredients, address, message } = req.body //destructure the variables we need from the request body
        res.redirect('/') //redirect back to our form once the entry has been registered
        async function sendToEmail(){  //define a function that will host our API codeblock
            try { //the try catch statement is most appropriate since incase of errors, the error is return (good for debugging processes)
                SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.MyAPIKey

                new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
                        'subject':'Your order from Vending.com',
                        'templateId': 808, //the id is provided when creating a template and we parse in the parameters below into out email template
                        'sender' : {'email':'thevendor@vending.com', 'name':'the vendor'},
                        'replyTo' : {'email':'support@vending.com', 'name':'vending support'},
                        'to' : [{'name': firstname, 'email': userEmail}],
                        // 'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>', 
                        'params' : { //these are the parameters or values we will send via the API and plug them into our email template
                        // 'bodyMessage':'confirm the sending of your products',
                            'userEmail': userEmail,
                            'firstName': firstname,
                            'ingredients': ingredients,
                            'address': address,
                            'message': message,
                        }
                    })
                    .then(function(data) {
                        console.log(data); //this will display our success message
                    })
            } catch (error) {
                console.log(error) //any error we face within the operation will be shown when the error is caught 
            }
        }

        sendToEmail() //calling our function to action will allow the code to run otherwise, we will only collect the information and do nothing with it
    }
}