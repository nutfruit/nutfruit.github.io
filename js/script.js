(function () {
    'use strict';
    var url, request;
    url = window.location.href.replace(window.location.hash, '');
    url = 'http://wechat.ctytea.com/token/item/jssdk/signature.php?url=' + encodeURIComponent(url);
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState == '4' && request.status == '200' || request.status == '304') {
            var data = JSON.parse(request.responseText);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ['previewImage', 'closeWindow', 'openProductSpecificView', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });
            wx.ready(function () {
                var shareInfo = {
                    title: document.title,
                    desc: '心中有茶 时时花开',
                    link: window.location.href,
                    imgUrl: document.querySelector('.content img') ? document.querySelector('.content img').src : 'http://images.ctytea.com/immobile/991890b2762c6b54d739edaf9ee5bd1bbcb6b4ac.png'
                };
                wx.onMenuShareQQ(shareInfo);
                wx.onMenuShareWeibo(shareInfo);
                wx.onMenuShareQZone(shareInfo);
                wx.onMenuShareTimeline(shareInfo);
                wx.onMenuShareAppMessage(shareInfo);
            });
            var post = document.querySelector('.post');
            post && post.addEventListener('click', function (event) {
                if (event.target.nodeName === 'IMG') {
                    var image = event.target.src;
                    var images = new Array();
                    var pictures = post.querySelectorAll('img');
                    for (var i = 0; i < pictures.length; i++) {
                        images.push(pictures[i].src);
                    }
                    wx.previewImage({
                        current: image,
                        urls: images
                    });
                }
            });
        }
    };
    request.send(null);
})();
(function () {
    var button = document.querySelector('.showQRcode');
    button && button.addEventListener('click', function (event) {
        // document.documentElement.scrollTop = document.body.scrollTop = document.body.scrollHeight;
        document.body.classList.add('modal');
    });
})();