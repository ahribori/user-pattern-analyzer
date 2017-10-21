const onLoad = () => {
    console.log('[LOAD]');
};

const onClick = (e) => {
    console.log('[CLICK]');
    send({
        type: 'click',
        data: {
            pageX: e.pageX,
            pageY: e.pageY,
            x: e.x,
            y: e.y,
            location: {
                href: location.href,
                origin: location.origin,
                pathname: location.pathname
            },
            screen: `${screen.width}*${screen.height}`
        }
    });
};

const onBeforeUnload = () => {
    console.log('[BEFOREUNLOAD]')
};

const onScroll = (e) => {
    console.log('[SCROLL]');
    const top = document.body.scrollTop;
    const bottom = document.body.scrollTop + document.body.clientHeight;
    console.log(top, bottom);
};

const onError = (e) => {
    console.log('[ERROR]')
};

const onAborted = (e) => {
    console.log('[ABORTED]')
};

const send = (data, success) => {
    const url = `${SERVER_URL}/api/analytics/${data.type}`;
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    if (data) { // POST
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                if (typeof success === 'function') {
                    success(xhr.responseText);
                }
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('data=' + JSON.stringify(data));
        return xhr;
    } else { // GET
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                if (typeof success === 'function') {
                    success(xhr.responseText);
                }
            }
        };
        xhr.send();
        return xhr;
    }
}

/**
 * onload 또는 load 이벤트에 onLoad function을 바인딩
 */
(function () {
    if (window.attachEvent) {
        window.attachEvent('onload', onLoad);
        window.attachEvent('click', onClick);
        window.attachEvent('beforeunload', onBeforeUnload);
        window.attachEvent('scroll', onScroll);
        window.attachEvent('error', onError);
        window.attachEvent('onAbort', onAborted);
    } else {
        window.addEventListener('load', onLoad, false);
        window.addEventListener('click', onClick, false);
        window.addEventListener('beforeunload', onBeforeUnload, false);
        window.addEventListener('scroll', onScroll, false);
        window.addEventListener('error', onError, false);
        window.addEventListener('abort', onAborted, false);
    }
}());
