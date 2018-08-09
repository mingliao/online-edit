;function createXMLHTTPRequest() {
    //1.创建XMLHttpRequest对象
    //这是XMLHttpReuquest对象无部使用中最复杂的一步
    //需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码
    var xmlHttpRequest;
    if (window.XMLHttpRequest) {
        //针对FireFox，Mozillar，Opera，Safari，IE7，IE8
        xmlHttpRequest = new XMLHttpRequest();
        //针对某些特定版本的mozillar浏览器的BUG进行修正
        if (xmlHttpRequest.overrideMimeType) {
            xmlHttpRequest.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {
        //针对IE6，IE5.5，IE5
        //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
        //排在前面的版本较新
        var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
        for ( var i = 0; i < activexName.length; i++) {
            try {
                //取出一个控件名进行创建，如果创建成功就终止循环
                //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
                xmlHttpRequest = new ActiveXObject(activexName[i]);
                if(xmlHttpRequest){
                    break;
                }
            } catch (e) {
            }
        }
    }
    return xmlHttpRequest;
}

function copyToClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        clipboardData.setData("Text", txt);
        alert("复制成功！");

    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor("text/unicode");
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("复制成功！");
    }
}

function get(url, success, error){
    var req = createXMLHTTPRequest();
    if(req){
        req.open("GET", url, true);
        req.onreadystatechange = function(res){
            if(req.readyState == 4){
                if(req.status = 200)
                {
                    success(req.responseText,req.statusText);
                } else {
                    error(req.responseText,req.statusText);
                }
            }
        }
        req.send(null);
    }
}
//监听div大小变化
(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o: q.width();
                r.h = p !== c ? p: q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function() {
                a.each(function() {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);

// function parseURI(url) {
//     var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
//     // authority = '//' + user + ':' + pass '@' + hostname + ':' port
//     return (m ? {
//         href     : m[0] || '',
//         protocol : m[1] || '',
//         authority: m[2] || '',
//         host     : m[3] || '',
//         hostname : m[4] || '',
//         port     : m[5] || '',
//         pathname : m[6] || '',
//         search   : m[7] || '',
//         hash     : m[8] || ''
//     } : null);
// }
// /**相对路径转绝对路径**/
// function absolutizeURI(base, href) {
//
//     function removeDotSegments(input) {
//         var output = [];
//         input.replace(/^(\.\.?(\/|$))+/, '')
//             .replace(/\/(\.(\/|$))+/g, '/')
//             .replace(/\/\.\.$/, '/../')
//             .replace(/\/?[^\/]*/g, function (p) {
//                 if (p === '/..') {
//                     output.pop();
//                 } else {
//                     output.push(p);
//                 }
//             });
//         return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
//     }
//
//     href = parseURI(href || '');
//     base = parseURI(base || '');
//
//     return !href || !base ? null : (href.protocol || base.protocol) +
//     (href.protocol || href.authority ? href.authority : base.authority) +
//     removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
//     (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
//     href.hash;
// }

// var config;
// function getConfig(data) {
//     console.log(data);
// }
(function(window, document, undefined) {
    var editor = null;
    var relativeMap = null;
    var tree = null;
    var resizing = false;
    var url = "../samples/";

    /**初始化复制功能**/
    var copyButton = document.createElement("button");
    copyButton.setAttribute("data-clipboard-target",".CodeMirror-code");
    copyButton.setAttribute("id","copyBtn");
    copyButton.style.display = "none";
    $('body').append($(copyButton));
    new Clipboard("#copyBtn");

    if(!window.location.toString().split("#")[1])
    {
        window.location = window.location.toString() + "#Map/basic";
    }

    /**初始化文本编辑器**/
    function initEditor(){
        if(!editor){
            var mixedMode = {
                name: "htmlmixed",
                scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                    mode: null},
                    {matches: /(text|application)\/(x-)?vb(a|script)/i,
                        mode: "javascript"}]
            };
            editor = CodeMirror.fromTextArea(document.getElementById("codeEdit"), {
                mode:mixedMode,
                // lineWrapping: true,
                theme: "monokai",
                styleActiveLine: true,
                matchBrackets:true
            });
            $(".edit-setting").addClass("editorReady");
        }else{
            editor.setValue($("#codeEdit").val());
        }
    }

    /*
     * 分块插件
     */
    Split(['#aside-tree','#left-area','#right-area'], {
        sizes: [12,40,48]
    });

    /*
     * 编辑器大小改变刷新editor
     */
    $("#left-area").resize(function() {
        if(editor && !resizing)
        {
            resizing = true;
            editor.refresh();
            resizing = false;
        }
    });

    /*
     * 滚动条
     */
    // Scrollbar.init($(".tree-wrap")[0],{
    //     speed: 2,
    //     overscrollEffect: 'bounce',
    //     overscrollEffectColor: '#d2527f'
    // });
    new Optiscroll(document.getElementById('aside-tree'), { forceScrollbars: true });

    /*
     * 获取实例配置
     */
    // $.getJSON("config.json",function(res) {
    //     initSelect(JSON.parse(res));
    // });
    get(
        "config.json",
        function(res) {
            initSelect(JSON.parse(res));
        }
    );


    /**初始化下拉选项**/
    function initSelect(config) {
        //生成树
        tree = createTree("tree-div");
        var _config = config[0].groups,nodeName1,nodeName2;
        for(var i = 0,i_len = _config.length; i < i_len; i++)
        {
            nodeName1 = _config[i].name.split(":");
            nodeName1 = _config[i].name.split("：").length > nodeName1.length? _config[i].name.split("：") : nodeName1;
            if(_config[i].classes){
                var node1 = tree.createNode(
                    (nodeName1[1]?nodeName1[1]:nodeName1[0]),
                    false,
                    "assets/images/tree.png",
                    null,
                    {
                        lastNode:false,
                        name: nodeName1[0]
                    }
                );
                var childNode = _config[i].classes;
                for(var j = 0,j_len = childNode.length;j < j_len;j++)
                {
                    var _name = childNode[j].split(".");
                    _name = _name[_name.length-1];
                    nodeName2 = _name.split(":");
                    nodeName2 = _name.split("：").length > nodeName2.length? _name.split("：") : nodeName2;
                    node1.createChildNode(
                        (nodeName2[1]?nodeName2[1]:nodeName2[0]),
                        false,
                        "assets/images/leaf.png",
                        {
                            lastNode:true,
                            name: nodeName2[0]
                        }
                    );
                }
            } else {
                var node1 = tree.createNode(
                    (nodeName1[1]?nodeName1[1]:nodeName1[0]),
                    false,
                    "assets/images/leaf.png",
                    null,
                    {
                        lastNode:true,
                        name: nodeName1[0]
                    }
                );
            }
        }
        tree.drawTree();

        //树上点击事件
        tree.nodeClick = function(ele,node) {
            //判断是否为最后一个标签
            if(node.tag.lastNode)
            {
                var page,iframe;
                if(node.parent && node.parent.tag.name)
                {
                    page = url + node.parent.tag.name + "/" + node.tag.name + ".html";
                    window.location = window.location.toString().split("#")[0] + "#" + node.parent.tag.name + "/" + node.tag.name;
                } else {
                    page = url + "/" + node.tag.name + ".html";
                    window.location = window.location.toString().split("#")[0] + "#" + node.tag.name
                }
                iframe = $("#map-iframe");
                iframe.attr("src", page);
                iframe.one("load",function() {
                    relativeMap = changRelativeSource($(this));
                    getResource(page);
                    iframe.off("load");
                })
            }
        }
        menuLocation();
    }

    /**修改相对路径**/
    function changRelativeSource($ele) {
        var _scripts = $ele.contents().find("script");
        var _link = $ele.contents().find("link");
        var scriptMap = {},linkMap = {},temp;
        for(var i = 0,len = _scripts.length;i < len;i++)
        {
            temp = $(_scripts[i]);
            if(temp.text()) {continue}
            scriptMap[temp.attr("src")] = temp[0].src;
        }
        for(var i = 0,len = _link.length;i < len;i++)
        {
            temp = $(_link[i]);
            linkMap[temp.attr("href")] = temp[0].href;
        }
        return $.extend(scriptMap, linkMap);
    }

    /**获取HTML源码**/
    function getResource(url) {
        get(
            url,
            function(res) {
                var str = res;//str即为返回的html内容
                for(var i in relativeMap)
                {
                    str = str.replace(i,relativeMap[i]);
                }
                localStorage.content = str;
                $("#codeEdit").val(str);
                initEditor();
            }
        )
    }

    /**将用户修改过的代码加载到iframe中**/
    function run(){
            var $iFrame = $('#map-iframe');
            var iframeContent=$("#codeEdit").val();

            if(editor){
                iframeContent=editor.getValue();
            }
            iframeContent = iframeContent.slice(iframeContent.indexOf('<html'))
            // var nr = iframeContent.indexOf("<body>");
            // var iframeHead = iframeContent.slice(0,nr);
            // var iframeFooter=iframeContent.slice(nr,iframeContent.length);
            var contentWindow = $iFrame[0].contentWindow;
            $iFrame.one('load', function(){
                contentWindow.document.open();
                contentWindow.document.write(iframeContent);
                // contentWindow.document.write(iframeFooter);
                contentWindow.document.close();
            });
            $iFrame.attr('src', 'about:blank');

    }

    function refresh(){
        $("#codeEdit").val(localStorage.content);
        initEditor();
        run();
    }

    function downLoadHtml(){
        var location = window.location.toString();
        var page;
        var index = location.indexOf('#');
        if (index > 0) {
            page = url + location.substr(index + 1, location.length - 1) + '.html';
            var iframe = $('#map-iframe')
            iframe.attr("src", page);
            iframe.on("load",function() {
                relativeMap = changRelativeSource($(this));
                getResource(page);
                menuLocation();
                iframe.off("load");
            })
        }
    }

    /**刷新页面保证menu的定位**/
    function menuLocation(){
        var id = window.location.toString().split("#")[1];
        if(!id){return}
        id = id.split("/");
        var trees = tree.childNodes,node2;
        for(var i = 0,len = trees.length;i < len;i++)
        {
            if(id[1])
            {
                if(trees[i].tag.name == id[0])
                {
                    $(trees[i].elementLi).children("img").click();
                    node2 = trees[i].childNodes;
                    if(node2 && node2.length != 0)
                    {
                        for(var j = 0,j_len = node2.length;j < j_len;j++)
                        {
                            if(node2[j].tag.name == id[1])
                            {
                                $(node2[j].elementLi).children("span").click();
                                break;
                            }
                        }
                    }
                }
            } else {
                if(trees[i].tag.name == id[0])
                {
                    trees[i].elementLi.click();
                    break;
                }
            }
        }
    }

    /**点击运行**/
    $("#rerun").click(function() {
        if(!editor) {return}
        run();
    })
    /**点击重置**/
    $("#refresh").click(function() {
        if(!editor) {return}
        refresh();
    })
    /**复制**/
    $("#copy").click( function() {
        // CodeMirror.commands.selectAll(editor);
        if(!editor) {return};
        copyButton.click();
        $(".copy-message").addClass("copyed");
        setTimeout(function() {
            $(".copy-message").removeClass("copyed");
        },2000)
    })
})(window,document)





