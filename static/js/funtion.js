/************
スマホのハンバーガーボタンクリック時の動作
************/
$(document).ready(function () {
    var touch = false;
    $('.sp-global-header__hamburger').on('click touchstart', function (e) {
        switch (e.type) {
            case 'touchstart':
                drawerToggle();
                touch = true;
                return false;
                break;
            case 'click':
                if (!touch)
                    drawerToggle();
                return false;
                break;
        }
        function drawerToggle() {
            $('body').toggleClass('drawer-opened');
            touch = false;
        }
    })
    $('#overlay').on('click touchstart', function () {
        $('body').removeClass('drawer-opened');
    })
});


/************
スマホのドトワーメニューが開いている間、メニュー以外のクロールを固定する
************/
$(document).ready(function () {
    var touch = false;
    var state = false;
    var scrollPosition;
    $('.sp-global-header__hamburger, #overlay').on('click touchstart', function (e) {
        switch (e.type) {
            case 'touchstart':
                fixBackground();
                touch = true;
                return false;
                break;
            case 'click':
                if (!touch)
                    fixBackground();
                return false;
                break;
        }
        function fixBackground() {
            if (state == false) {
                //現在のスクロール値を取得
                scrollPosition = $(window).scrollTop();
                //bodyの高さを画面の高さにし、固定する
                //position:fixedをかけるとトップに戻ってしまうので、現在のスクロール値のtopを指定する
                $('body').addClass('page-fixed').css({ 'top': -scrollPosition });
                $('.sp-global-header__drawernav').addClass('drawernav-open');
                state = true;
            } else {
                //閉じる時は、bodyのfixedを解除
                $('body').removeClass('page-fixed').css({ 'top': 0 });
                //再び元のスクロール位置へ戻す。
                window.scrollTo(0, scrollPosition);
                $('.sp-global-header__drawernav').removeClass('drawernav-open');
                state = false;
            }
            touch = false;
        }
    })
});


/************
固定ヘッダー
************/
$(function () {
    $('.sticky-header').each(function () {

        var $window = $(window), // ウィンドウを jQuery オブジェクト化
            $header = $(this),   // ヘッダーを jQuery オブジェクト化
            // ヘッダーのデフォルト位置を取得
            headerOffsetTop = $header.offset().top;

        /*
        下にスクロールで消えて、上にスクロールで現れる固定メニューにする際、startPosを有効にする。
        スクロールの基準を、startPosとします。最初はスクロールしていませんので値は0。
        それ以降、この値はスクロールし始めた位置となる。
        */
        // var startPos = 0;

        // ウィンドウのスクロールイベントを監視。ウィンドウがスクロールするごとに処理を実行する。
        $window.on('scroll', function () {
            // ウィンドウのスクロール量をチェックし、
            // ヘッダーのデフォルト位置を過ぎていればクラスを付与。そうでなければ削除。
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }

            /*
            下にスクロールで消えて、上にスクロールで現れる固定メニューにする際、以下を有効にする。
            スクロールの基準を、startPosとします。最初はスクロールしていませんので値は0。
            それ以降、この値はスクロールし始めた位置となる。
            */
            //**************************************
            // スクロールしたときの位置 
            // var currentPos = $(this).scrollTop();
            /* スクロールしたときの位置currentPosの値が、スクロールの基準となる位置startPosの値より大きいか小さいかで、
               上にスクロールしたか、下にスクロールしたかを判別 */
            // if (currentPos > startPos) {
            //     // ちょっと下にスクロールしただけでメニューが消えてしまうのも不便なので、200px以上スクロールしてから消えるようにする
            //     if($(window).scrollTop() >= 200) {
            //         $header.removeClass('sticky');
            //     }
            // }

            /* 次にスクロールしたときの基準を決めておく必要があるため、
               次にスクロールしたときはこの値を基準として、上にスクロールしたか、下にスクロールしたのかを判定 */
            // startPos = currentPos;
            //**************************************

        });

        // ウィンドウのスクロールイベントを発生させる
        // (ヘッダーの初期位置を調整するため)
        $window.trigger('scroll');

    });
});


/************
少しスクロールしたら「トップへ戻るボタン」を表示
************/
$(function () {
    var topBtn = $('.page-top');
    topBtn.hide();
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});


/************
スムーススクロール
************/
$(function () {
    // #で始まるリンクをクリックしたら実行されます
    $('a[href^="#"]').click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒で記述
        // 出発地点の値を取得
        var href = $(this).attr("href");
        // 到着地点を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 到着地点を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });
});


/************
可視範囲に入ってからアニメーション
************/
$(function () {
    $(window).scroll(function () {
        //スクロールした際に下記の要素ごとに、これ以下に記述する内容が実行
        $('.scroll-effect').each(function () {
            //.aboutus__effectの画面上部からの距離
            var imgPosition = $(this).offset().top;
            //スクロールの量
            var scroll = $(window).scrollTop();
            //ウィンドウの高さ
            var windowHeight = $(window).height();
            //要素が画面の下から1/5のところまでスクロールした時、これ以下を実行
            if (scroll > imgPosition - windowHeight + windowHeight / 5) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    });
});