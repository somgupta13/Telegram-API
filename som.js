const { MTProto } = require('@mtproto/core');
const prompt = require('prompt');

const mtproto = new MTProto({
api_id: 105,
api_hash: '85b72864f343b7346733c847',

test: false,
});

const phone = '+91808560';
const code = '2222';
// const password = 'hellojs';

function sendCode(phone) {
console.log("hello");
return mtproto.call('auth.sendCode', {
api_id: 1056,
api_hash: '85b72864f343b7346733c8472',
	// current_number: false,
phone_number: phone,
settings: {
_: 'codeSettings',
},
})
// .catch(error=>{console.log(error)});
}

sendCode(phone)
.catch(error => {
if (error.error_message.includes('_MIGRATE_')) {
      const [type, nextDcId] = error.error_message.split('_MIGRATE_');

      mtproto.setDefaultDc(+nextDcId);

      return sendCode(phone).catch(error=>{console.log(error)});;
}
})
.then( result => {
f1(result.phone_code_hash);

})

async function f1(phone_code_hash){
prompt.start();
await prompt.get(['username'], async function (err, result) {
if (err) { console.log(err); }
else{
// console.log(phone,phone_code_hash,result.username);
// console.log(typeof(result.username));

 		const { user } = await mtproto.call('auth.signIn', {
			phone_number   : phone,
			phone_code_hash: phone_code_hash,
			phone_code     : result.username
		}).then(result => {
			console.log("Logged:", result);
			console.log("Logged:", result.user);
			//  mtproto.call('messages.sendMessage',{
			// 	peer:{
			// 		_ :'inputPeerUser',
			// 		user_id:1057346232,
			// 		access_hash:0							 
			// 	},
			// 	message:"hiii",
			// 	random_id:6788
				
			// }).then(result=>{console.log(result);});
			// 		const getChat = async () => {
			// const dialogs = await mtproto.call(
			// 				'messages.getDialogs', {
			// limit: 50,
			// }
			// 			)
			// const { chats } = dialogs
			// const selectedChat = await selectChat(chats)

			// return selectedChat
			// 	}
			// console.log(getChat());	
			
			
// console.log("Logged:", result.user.username);
return result;
}).catch(error => {
			console.log("ff")
console.log(error);
process.exit();
});
	
 }
});
}


