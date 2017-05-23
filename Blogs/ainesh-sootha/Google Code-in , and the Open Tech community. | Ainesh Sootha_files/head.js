window.__ATA = {
        scriptSrc: '//s.pubmine.com/showad.js',
        slotPrefix: 'automattic-id-',
        passbackReceiver: 'automattic-passback-receiver',
        passbackSrc: '//s.pubmine.com/passback.html',
        customParams: _ipw_custom,
        initAd: function(o){
                var o=o||{},g=window,d=g.document,wr=d.write,id=g.__ATA.id();wr.call(d,
                '<div id="'+id+'" data-section="'+(o.sectionId||0)+'"'+(o.type?('data-type="'+o.type+'"'):'')+' '+(o.forcedUrl?('data-forcedurl="'+o.forcedUrl+'"'):'')+' style="width:'+(o.width||0)+'px; height:'+(o.height||0)+'px;">');g.__ATA.displayAd(id, o.customParams);wr.call(d,'</div>');
        },
        displayAd: function(id){window.__ATA.ids=window.__ATA.ids||{};window.__ATA.ids[id]=1;},
        id: function(){return window.__ATA.slotPrefix+(parseInt(Math.random()*10000,10)+1+(new Date()).getMilliseconds());}
};
// including ad delivery script
(function(g,d,ata,sync){
        var pr="https:"===d.location.protocol?"https:":"http:",src=pr+ata.scriptSrc,st="text/javascript";
        (sync===true)?d.write('<scr'+'ipt type="'+st+'" src="'+src+'"><\/scr'+'ipt>'):inj(src,st);
        function inj(url,st) {
                var s=d.createElement("script"),n=d.getElementsByTagName("script")[0],p=n.parentNode,ib=p.insertBefore;
                s.type=st;s.src=url;s.async=true;(navigator.userAgent.indexOf("Opera")!==-1)?setTimeout(function(){ib.call(p,s,n);},0):ib.call(p,s,n);
        }})(window, window.document, window.__ATA, window.__ATA.isSync);
