const Discord = require('discord.js'); //เรียก discord.js มาใช้
const botRem = new Discord.Client(); //ประกาศ client ขึ้นมา

//คูดาวน์ 8 ชม.
var loopStart = 28800000;
var loopEnd   = 50400000;
var limitTime = 21600000;

var addtimezone = 25200000;


var moment = require('moment-timezone');

var kutumDead = new Date();
var kutumRespawnStart = new Date();
var kutumRespawnEnd = new Date();

var bossreset = true;

//event นี้ทำงานเมื่อ login สำเร็จ
botRem.on('ready', () => {
    console.log('Kutum ready!');
});
//รอรับ event message เวลามีข้อความโผล่มาในแชท function นี้ก็จะทำงาน
botRem.on('message', message => { 
    var command = message.content.replace(/\s\s+/g, ' ');
    if (command === 'คูทุม') {
        if(!bossreset){
            message.reply('คูทุมจะเกิดเวลา '+convertTime(kutumRespawnStart)+' น. - ' +  convertTime(kutumRespawnEnd) + ' น.'  );
        }else{
            message.reply('เซิฟเวอร์ปิดปรับปรุง รอเวลารายงานใหม่');
        }
    }else if(command === 'คูทุมรีเซ็ต'){
        bossreset = true;
        message.reply('คูทุมรีเซ็ต');
    }else if(command === 'คูทุมตาย'){
        bossreset = false;
        kutumDead = new Date(moment.now()+addtimezone);
        kutumRespawnStart = new Date(moment.now()+loopStart+addtimezone);
        kutumRespawnEnd = new Date(moment.now()+loopEnd+addtimezone);
        message.reply('รีเซ็ตลูปเกิด คูทุมตายเวลา '+convertTime(kutumDead)+ ' น.');
    }else if(command.substring(0,9) === 'คูทุมเกิด'){
        var valuetext = command.substring(10,command.length).split(" ");
        var a = valuetext[0];
        var b = valuetext[1];
        var c = valuetext[2];

        if(c === 'ชม'){
            var time = parseInt(b)*60*60*1000;
        }else{
            var time = parseInt(b)*60*1000;
        }
        if(a === '+'){
            kutumRespawnStart = kutumRespawnStart.setTime(kutumRespawnStart.getTime()+time);
            kutumRespawnEnd = kutumRespawnEnd.setTime(kutumRespawnEnd.getTime()+time);
        }else{
            kutumRespawnStart = kutumRespawnStart.setTime(kutumRespawnStart.getTime()-time);
            kutumRespawnEnd = kutumRespawnEnd.setTime(kutumRespawnEnd.getTime()-time);
        }
        kutumRespawnStart = new Date(kutumRespawnStart);
        kutumRespawnEnd = new Date(kutumRespawnEnd);
        message.reply('คูทุมจะเกิดเวลา '+convertTime(kutumRespawnStart)+' น. - ' +  convertTime(kutumRespawnEnd) + ' น.'  );
    }


});


function convertTime(vardate){
    var hour;
    var minute;
    
    if (vardate.getHours().toString().length == 1){
        hour = '0'+vardate.getHours().toString();
    }else{
        hour = vardate.getHours().toString();
    }

    if (vardate.getMinutes().toString().length == 1){
        minute = '0'+vardate.getMinutes().toString();
    }else{
        minute = vardate.getMinutes().toString();
    }

    return hour+':'+minute;
}



botRem.login('NDQ5MTQ2Nzg2NzI5Mjk1ODcy.DegcEA.iZk4LOSP-vjqFQVtAaV1w8gqhW0');


