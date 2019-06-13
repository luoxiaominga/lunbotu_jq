var nowIndex = 0,
    w = $('.wrapper').width(), //520
    len = $('.item').length, //5
    slider_timer = undefined,
    flag = true;

function init() { //执行bindEvent，slider_auto
    bindEvent();
    slider_auto();
}

function bindEvent() {
    $('.prevBtn').add($('.nextBtn')).add($('.item')).on('click', function () { // 判断点击的是向前，向后，小圆点，分别绑定事件
        if ($(this).attr('class') == 'prevBtn') {
            move('prev');
        } else if ($(this).attr('class') == 'nextBtn') {
            move('next');
        } else {
            var index = $(this).index();
            move(index);
        }
        changeOrderStyle(nowIndex);
    })
    $('.wrapper') // 鼠标进出轮播图时左右焦点的事件
        .mouseenter(function () {
            $('.btn').css({
                display: 'block'
            });
            clearTimeout(slider_timer);
        })
        .mouseleave(function () {
            $('.btn').css({
                display: 'none'
            });
            clearTimeout(slider_timer);
            slider_auto();
        })
    $('.btn a').mouseover(function () {
        clearTimeout(slider_timer);
        slider_auto();
    })
}

function move(direction) {
    if (flag) {
        flag = false;
        var a = 1;
        // 传进来的direction是向前向后的情况
        if (direction == 'prev' || direction == 'next') {
            if (direction == 'prev') {
                if (nowIndex == 0) { // 在第一张并且向前切换的情况
                    $('.img-box').css({
                        left: -(w * len)
                    });
                    nowIndex = len - 1;
                } else {
                    nowIndex = nowIndex - 1;
                }
            } else {
                if (nowIndex == 4) { // 在最后一张并且向后切换的情况
                    a = 0;
                    $('.img-box').animate({
                        left: -(w * len)
                    }, function () {
                        $(this).css({
                            left: 0
                        });
                        clearTimeout(slider_timer);
                        slider_auto();
                        flag = true;
                    })
                    nowIndex = 0;
                } else {
                    nowIndex = nowIndex + 1;
                }
            }
        } else { // 传进来的direction是索引的情况  
            nowIndex = direction;
        }
        if (a) {
            $('.img-box').animate({
                left: -(w * nowIndex)
            }, function () {
                clearTimeout(slider_timer);
                slider_auto();
                flag = true;
            });
        }
    }

}
// 切换小圆点样式
function changeOrderStyle(index) {
    $('.active').removeClass('active');
    $('.item').eq(index).addClass('active');
}

function slider_auto() {
    slider_timer = setTimeout(function () {
        move('next');
        changeOrderStyle(nowIndex);
    }, 3000)
}
init();