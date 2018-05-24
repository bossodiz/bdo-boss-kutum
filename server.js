const Discord = require('discord.js'); //เรียก discord.js มาใช้
const botRem = new Discord.Client(); //ประกาศ client ขึ้นมา

//คูดาวน์ 8 ชม.
var loopStart = 28800000;
var loopEnd   = 50400000;
var limitTime = 21600000;

var addtimezone = 25200000;


var moment = require('moment-timezone');

var kutumDead;
var kutumRespawnStart;
var kutumRespawnEnd;

//event นี้ทำงานเมื่อ login สำเร็จ
botRem.on('ready', () => {
    console.log('Kutum ready!');
});
//รอรับ event message เวลามีข้อความโผล่มาในแชท function นี้ก็จะทำงาน
botRem.on('message', message => { 
    var command = message.content.replace(/\s\s+/g, ' ');
    if (command === 'คูทุม') {
        message.reply('คูทุมจะเกิดเวลา '+convertTime(kutumRespawnStart)+' น. - ' +  convertTime(kutumRespawnEnd) + ' น.'  );
    }else if(command === 'คูทุมตาย'){
        kutumDead = new Date(moment.now()+addtimezone);
        kutumRespawnStart = new Date(moment.now()+loopStart+addtimezone);
        kutumRespawnEnd = new Date(moment.now()+loopEnd+addtimezone);
        message.reply('รีเซ็ตลูปเกิด คูทุมตายเวลา '+convertTime(kutumDead)+ ' น.');
    }else if(command === 'คูทุมรอเกิด'){
        kutumRespawnStart = new Date(moment.now()+addtimezone);
        kutumRespawnEnd = new Date(moment.now()+limitTime+addtimezone);
        message.reply('เซ็ตเวลาคูทุมเกิด '+convertTime(kutumRespawnStart)+' น. - ' +  convertTime(kutumRespawnEnd) + ' น.'  );
    }else if(command.substring(0,7) === 'คจาเกิด'){
        var valuetext = command.substring(8,command.length).split(" ");
        var a = valuetext[0];
        var b = valuetext[1];
        var c = valuetext[2];

        if(c === 'ชม'){
            var time = parseInt(b)*60*60;
        }else{
            var time = parseInt(b)*60;
        }
        if(a === '+'){
            kutumRespawnStart = kutumRespawnStart+time;
            kutumRespawnEnd = kutumRespawnEnd+time;
        }else{
            kutumRespawnStart = kutumRespawnStart-time;
            kutumRespawnEnd = kutumRespawnEnd-time;
        }
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



botRem.login('NDQ1NjgxMjg2OTI2MDQxMTE2.Ddu_Eg.HKqcjmXZbGAjppC1Ss3EUEf0oCA');


