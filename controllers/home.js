
module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    send_email: ()=>{
        try {
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.MyAPIKey

            new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
                {
                    'subject':'this is a test for the api',
                    'templateId': 15,
                    'sender' : {'email':'myquotes@policymatch.world', 'name':'policy match'},
                    'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
                    'to' : [{'name': 'test test', 'email':'oldjapolo@gmail.com'}],
                    'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
                    'params' : {
                    'bodyMessage':'Hope this works this time!',
                    'userEmail': userEmail,
                    'firstName': firstName,
                    }
                }
                ).then(function(data) {
                console.log(data);
                })
        } catch (error) {
            console.log(error)
        }
    }
}