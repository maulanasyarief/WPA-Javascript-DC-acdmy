var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BEqY2GiRKjG5F2o8X5bFGGT-Qqtmf4s9H8WPvV44YfMkktG0XorPGQWPCNGEfT0YPSi8meBdudmHDtbs1divjPs",
    "privateKey": "m8cIEM3Vdx6_CYvgCa4lEXOI6-xmbX8Dc-aQvIPyb44"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/dw5cYPRVdFw:APA91bESoqyTrqiYCnl8vIfqzLDaGz_oJ1Ks2DsJcZX-v3HmYUsSsAe8tZxCXUQ89S1cA8-awWzmewYXw10EZoPQTixddQcK_Jk4cl0HfCg6KSOt-MuGCMAb-KIS6gcHEYkJOd0BfITK",
    "keys": {
        "p256dh": "BOJs5ziTCN6FxH0pCTV7CDCf+fHJ8e6h0GdAo6IBcDSa3bjja2e4NvgINAvDVPeT4l5T8/AmrOKt+p4RtLYOr6c=",
        "auth": "20giY/R3AScc9gh//UWb0A=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '573976425451',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);