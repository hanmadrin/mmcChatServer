const Message = require('./models/Message');
const Item = require('./models/Item');
const chatDemos = {
  beforeVin: {
    // first message no reply
    state1: [
      {
        sent_from: "me",
        message: "Hey, can you send me the VIN?",
        type: "text",
        days: 5
      },
      {
        sent_from: "seller",
        message: "Text me instead. 199-677-384",
        type: "text",
        days: 4
      },
      {
        sent_from: "seller",
        message: "why shoudl i?",
        type: "text",
        days: 3
      },


      {
        sent_from: "seller",
        message: "https://scontent-iad3-1.xx.fbcdn.net/v/t1.15752-9/568194562_2062143817654623_8831921412069969126_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_ohc=_dR7_f-VG7kQ7kNvwGLgr0a&_nc_oc=Adlj0NEy13AzOH2JETbkX8BdFkYhdzUo5tbh4wSdU6pFJZJ8nboXrjXmYvE5OCiuOTk&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&oh=03_Q7cD4AFjzxkmmk6RQP1Kaxf5Zn0-KjXmGZR5M6qca8cESec4ZQ&oe=69615958",
        type: "image",
        days: 1
      }
    ]
  }

}
const item_id = 10844042714;
const fb_id = '10';
const fb_user_name = 'TEST';

async function demoMessageImplant() {
  const chatDemo = chatDemos['beforeVin']['state1'];
  const item = await Item.findOne({ where: { item_id: item_id } });
  if (!item) {
    console.log('Item not found');
    Item.create({ item_id: item_id, fb_id: fb_id, fb_user_name: fb_user_name });
  }
  // delete older messages
  await Message.destroy({ where: { item_id: item_id } });
  for (const msg of chatDemo) {
    await Message.create({
      fb_id: fb_id,
      item_id: item_id,
      sent_from: msg.sent_from,
      message: msg.message,
      type: msg.type,
      timestamp: new Date(Date.now() - msg.days * 24 * 60 * 60 * 1000).getTime()
    });
  }
  console.log('Demo messages implanted');
}
demoMessageImplant();