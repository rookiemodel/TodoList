/**
 * detect.js
 */
var _Device={};_Device.smartphone=false;_Device.tablet=false;_Device.type=0;_Device.os=0;function checkDevice(){if(navigator.userAgent.match(/Android/)!=null){if(navigator.userAgent.match(/mobile|Mobile/)!=null){_Device.type=2}else{_Device.type=1;}_Device.os=0;}else{var minSiteWidth=480;var maxSiteWidth=1024;var w=($(window).width()<window.screen.width)?$(window).width():window.screen.width;if(navigator.userAgent.match(/iPhone|iPad|iPod/)!=null){_Device.os=1}else{_Device.os=2}if(navigator.userAgent.match(/webOS|iPhone|iPad|iPod|BlackBerry/)!=null){if(w<=minSiteWidth||(navigator.userAgent.match(/iPhone|iPod|BlackBerry/)!=null&&navigator.platform.match(/iPad/)==null)){_Device.type=2;}else{_Device.type=1;}}else{_Device.type=0;}}if(_Device.type==2){_Device.tablet=false;_Device.smartphone=true}else if(_Device.type==1){_Device.tablet=true;_Device.smartphone=false}else{_Device.smartphone=_Device.tablet=false}}_Browser={};function browserDetect(){_Browser.ie6=false;_Browser.ie7=false;_Browser.ie8=false;_Browser.ie9=false;_Browser.ie10=false;_Browser.ie11_over=false;_Browser.msie=false;_Browser.mozilla=false;_Browser.safari=false;_Browser.chrome=false;_Browser.version=0;_Browser.name="etc";var objappVersion=navigator.appVersion;var objAgent=navigator.userAgent;var objbrowserName=navigator.appName;var objfullVersion=""+parseFloat(navigator.appVersion);var objBrMajorVersion=parseInt(navigator.appVersion,10);var objOffsetName,objOffsetVersion,ix;var iev=0;var ieold=(/MSIE (\d+\.\d+);/.test(navigator.userAgent));var trident= ! !navigator.userAgent.match(/Trident\/7.0/);var rv=navigator.userAgent.indexOf("rv:11.0");if(ieold)iev=new Number(RegExp.$1);if(navigator.appVersion.indexOf("MSIE 10")!=-1)iev=10;if(trident&&rv!=-1)iev=11;if(iev!=0||(objOffsetVersion=objAgent.indexOf("MSIE"))!=-1){_Browser.name="Microsoft Internet Explorer";_Browser.msie=true;_Browser.version=iev;if(_Browser.version<7){_Browser.ie6=true}else if(_Browser.version<8){_Browser.ie7=true}else if(_Browser.version<9){_Browser.ie8=true}else if(_Browser.version<10){_Browser.ie9=true}else if(_Browser.version<11){_Browser.ie10=true}else{_Browser.ie11_over=true}}else{if((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1){_Browser.chrome=true;objbrowserName="Chrome";objfullVersion=objAgent.substring(objOffsetVersion+7)}else if((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1){_Browser.mozilla=true;objbrowserName="Firefox"}else if((objOffsetVersion=objAgent.indexOf("Safari"))!=-1){_Browser.safari=true;objbrowserName="Safari";objfullVersion=objAgent.substring(objOffsetVersion+7);if((objOffsetVersion=objAgent.indexOf("Version"))!=-1)objfullVersion=objAgent.substring(objOffsetVersion+8);}else if((objOffsetName=objAgent.lastIndexOf(" ")+1)<(objOffsetVersion=objAgent.lastIndexOf("/"))){objbrowserName=objAgent.substring(objOffsetName,objOffsetVersion);objfullVersion=objAgent.substring(objOffsetVersion+1);if(objbrowserName.toLowerCase()==objbrowserName.toUpperCase()){objbrowserName=navigator.appName}}if((ix=objfullVersion.indexOf(";"))!=-1)objfullVersion=objfullVersion.substring(0,ix);if((ix=objfullVersion.indexOf(" "))!=-1)objfullVersion=objfullVersion.substring(0,ix);objBrMajorVersion=parseInt(""+objfullVersion,10);if(isNaN(objBrMajorVersion)){objfullVersion=""+parseFloat(navigator.appVersion);objBrMajorVersion=parseInt(navigator.appVersion,10)}_Browser.name=objbrowserName;_Browser.version=objBrMajorVersion}}checkDevice();browserDetect();

/**
 * Platform Divistion
 */
var Platform = Platform || (function() {
    function division() {
        switch( _Device.type ) {
            case 2 : resetViewport(); break;		// Mobile
        }
    }

    function resetViewport() {
        var ratio = 0.5;
        $("meta[name=viewport]").attr('content', 'width=device-width, initial-scale='+ratio+', minimum-scale='+ratio+', maximum-scale='+ratio);
    }

    return {
        division: division
    }
})();