/**
 * Created by guinetik on 1/28/16.
 */

module.exports.email = {
    _hookTimeout: 60000,
    service: 'SES',
    // auth: {
    //   user: 'AKIAJPGJSC2Y3AWPPO5A',
    //   pass: 'Ao0ebjIlhF4rlrwPu3OK+FuYzH2G8ei1wp4TrG7QbT1K'
    // },
    transporter: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
            user: "AKIAJMQBDXC76EE3NVBQ",
            pass: "Aje5LVXY40XoH9fG7P3gz7qmXvtb9NCu7YZW7tecJq6A"
        }
    },
    from: 'contato@guardioesdasaude.org',
    // alwaysSendTo: 'contato@guardioesdasaude.org',
    testMode: false
};
