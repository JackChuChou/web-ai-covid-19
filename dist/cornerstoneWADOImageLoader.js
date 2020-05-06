var cornerstoneWADOImageLoader=function(a,b,c){"use strict";function d(a){return"RGB"===a||"PALETTE COLOR"===a||"YBR_FULL"===a||"YBR_FULL_422"===a||"YBR_PARTIAL_422"===a||"YBR_PARTIAL_420"===a||"YBR_RCT"===a?!0:!1}function e(a,b,e){void 0===e&&(e=0);var f=a.string("x00280004"),g=d(f);return g===!1?c.makeGrayscaleImage(b,a,a.byteArray,f,e):c.makeColorImage(b,a,a.byteArray,f,e)}function f(c){var d=a.Deferred(),f=c;f=f.substring(9);var h,i=f.indexOf("frame=");if(-1!==i){var j=f.substr(i+6);h=parseInt(j),f=f.substr(0,i-1)}if(void 0!==h&&g.hasOwnProperty(f)){var k=g[f],l=e(k,c,h);return l.then(function(a){d.resolve(a)},function(){d.reject()}),d}var m=new XMLHttpRequest;return m.open("get",f,!0),m.responseType="arraybuffer",m.onreadystatechange=function(){if(4===m.readyState)if(200===m.status){var a=m.response,b=new Uint8Array(a),i=dicomParser.parseDicom(b);void 0!==h&&(g[f]=i);var j=e(i,c,h);j.then(function(a){d.resolve(a)},function(){d.reject()})}else d.reject()},m.onprogress=function(d){if(d.lengthComputable){var e=d.loaded,f=d.total,g=Math.round(e/f*100);a(b).trigger("CornerstoneImageLoadProgress",{imageId:c,loaded:e,total:f,percentComplete:g})}},m.send(),d}void 0===c&&(c={});var g={};return b.registerImageLoader("dicomweb",f),c}($,cornerstone,cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a){"use strict";function b(a,b){if(void 0===a)throw"decodeRGB: rgbBuffer must not be undefined";if(a.length%3!==0)throw"decodeRGB: rgbBuffer length must be divisble by 3";for(var c=a.length/3,d=0,e=0,f=0;c>f;f++)b[e++]=a[d++],b[e++]=a[d++],b[e++]=a[d++],b[e++]=255}return void 0===a&&(a={}),a.decodeRGB=b,a}(cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a){"use strict";function b(a,b){if(void 0===a)throw"decodeRGB: ybrBuffer must not be undefined";if(a.length%3!==0)throw"decodeRGB: ybrBuffer length must be divisble by 3";for(var c=a.length/3,d=0,e=0,f=0;c>f;f++){var g=a[d++],h=a[d++],i=a[d++];b[e++]=g+1.402*(i-128),b[e++]=g-.34414*(h-128)-.71414*(i-128),b[e++]=g+1.772*(h-128),b[e++]=255}}return void 0===a&&(a={}),a.decodeYBRFull=b,a}(cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a){"use strict";function b(a){var b=a.string("x00280030");if(b&&b.length>0){var c=b.split("\\");return{row:parseFloat(c[0]),column:parseFloat(c[1])}}return{row:void 0,column:void 0}}return void 0===a&&(a={}),a.getPixelSpacing=b,a}(cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a){"use strict";function b(a){var b={intercept:0,slope:1},c=a.floatString("x00281052"),d=a.floatString("x00281053");return c&&(b.intercept=c),d&&(b.slope=d),b}return void 0===a&&(a={}),a.getRescaleSlopeAndIntercept=b,a}(cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a){"use strict";function b(a){var b={windowCenter:void 0,windowWidth:void 0},c=a.floatString("x00281050"),d=a.floatString("x00281051");return c&&(b.windowCenter=c),d&&(b.windowWidth=d),b}return void 0===a&&(a={}),a.getWindowWidthAndCenter=b,a}(cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a,b,c){"use strict";function d(a){return e(String.fromCharCode.apply(null,Array.prototype.slice.apply(new Uint8Array(a))))}function e(a){var b;try{return decodeURIComponent(escape(a))}catch(c){if(b=c,b instanceof URIError)return a;throw b}}function f(b,e,f,g,i,j){h.height=i,h.width=g;var k,l=b.elements.x7fe00010,m=l.dataOffset,n=b.string("x00020010"),o=g*i*3,p=m+j*o,q=h.getContext("2d"),r=q.createImageData(g,i),s=a.Deferred();if("RGB"===f)return k=new Uint8Array(e.buffer,p,o),c.decodeRGB(k,r.data),s.resolve(r),s;if("YBR_FULL"===f)return k=new Uint8Array(e.buffer,p,o),c.decodeYBRFull(k,r.data),s.resolve(r),s;if("YBR_FULL_422"===f&&"1.2.840.10008.1.2.4.50"===n){k=dicomParser.readEncapsulatedPixelData(b,b.elements.x7fe00010,j);var t=new Blob([k],{type:"image/jpeg"}),u=new FileReader;return void 0===u.readAsBinaryString?u.readAsArrayBuffer(t):u.readAsBinaryString(t),u.onload=function(){var a=new Image;a.onload=function(){q.drawImage(this,0,0),r=q.getImageData(0,0,g,i),s.resolve(r)},a.onerror=function(){s.reject()},a.src=void 0===u.readAsBinaryString?"data:image/jpeg;base64,"+window.btoa(d(u.result)):"data:image/jpeg;base64,"+window.btoa(u.result)},s}throw"no codec for "+f}function g(d,e,g,j,k){var l=c.getPixelSpacing(e),m=e.uint16("x00280010"),n=e.uint16("x00280011"),o=c.getRescaleSlopeAndIntercept(e),p=4,q=m*n,r=q*p,s=c.getWindowWidthAndCenter(e),t=a.Deferred(),u=f(e,g,j,n,m,k);return u.then(function(a){function c(){return a.data}function f(){return a}function g(){if(i===d)return h;h.height=m,h.width=n;var b=h.getContext("2d");return b.putImageData(a,0,0),i=d,h}var j={imageId:d,minPixelValue:0,maxPixelValue:255,slope:o.slope,intercept:o.intercept,windowCenter:s.windowCenter,windowWidth:s.windowWidth,render:b.renderColorImage,getPixelData:c,getImageData:f,getCanvas:g,rows:m,columns:n,height:m,width:n,color:!0,columnPixelSpacing:l.column,rowPixelSpacing:l.row,data:e,invert:!1,sizeInBytes:r};void 0===j.windowCenter&&(j.windowWidth=255,j.windowCenter=128),t.resolve(j)},function(){t.reject()}),t}void 0===c&&(c={});var h=document.createElement("canvas"),i="";return c.makeColorImage=g,c}($,cornerstone,cornerstoneWADOImageLoader),cornerstoneWADOImageLoader=function(a,b,c){"use strict";function d(a){var b=a.uint16("x00280103"),c=a.uint16("x00280100");return 0===b&&8===c?1:0===b&&16===c?2:1===b&&16===c?3:void 0}function e(a,b,c,d){var e=dicomParser.readEncapsulatedPixelData(a,a.elements.x7fe00010,d),f=new JpxImage;f.parse(e);var g=f.width,h=f.height;if(g!==b)throw"JPEG2000 decoder returned width of "+g+", when "+b+" is expected";if(h!==c)throw"JPEG2000 decoder returned width of "+h+", when "+c+" is expected";var i=f.componentsCount;if(1!==i)throw"JPEG2000 decoder returned a componentCount of "+i+", when 1 is expected";var j=f.tiles.length;if(1!==j)throw"JPEG2000 decoder returned a tileCount of "+j+", when 1 is expected";var k=f.tiles[0],l=k.items;return l}function f(a,b,c,e){var f=d(a),g=a.elements.x7fe00010,h=g.dataOffset,i=b*c,j=0;return 1===f?(j=h+e*i,new Uint8Array(a.byteArray.buffer,j,i)):2===f?(j=h+e*i*2,new Uint16Array(a.byteArray.buffer,j,i)):3===f?(j=h+e*i*2,new Int16Array(a.byteArray.buffer,j,i)):void 0}function g(a,b,c,d){var g=a.string("x00020010");return"1.2.840.10008.1.2.4.90"===g||"1.2.840.10008.1.2.4.91"===g?e(a,b,c,d):f(a,b,c,d)}function h(a){var b=d(a);if(1===b)return 1;if(2===b||3===b)return 2;throw"unknown pixel format"}function i(a){for(var b=65535,c=-32768,d=a.length,e=a,f=0;d>f;f++){var g=e[f];b=Math.min(b,g),c=Math.max(c,g)}return{min:b,max:c}}function j(d,e,f,j,k){function l(){return v}var m=c.getPixelSpacing(e),n=e.uint16("x00280010"),o=e.uint16("x00280011"),p=c.getRescaleSlopeAndIntercept(e),q=h(e),r=n*o,s=r*q,t="MONOCHROME1"===j,u=c.getWindowWidthAndCenter(e),v=g(e,o,n,k),w=i(v),x={imageId:d,minPixelValue:w.min,maxPixelValue:w.max,slope:p.slope,intercept:p.intercept,windowCenter:u.windowCenter,windowWidth:u.windowWidth,render:b.renderGrayscaleImage,getPixelData:l,rows:n,columns:o,height:n,width:o,color:!1,columnPixelSpacing:m.column,rowPixelSpacing:m.row,data:e,invert:t,sizeInBytes:s};if(void 0===x.windowCenter){var y=x.maxPixelValue*x.slope+x.intercept,z=x.minPixelValue*x.slope+x.intercept;x.windowWidth=y-z,x.windowCenter=(y+z)/2}var A=a.Deferred();return A.resolve(x),A}return void 0===c&&(c={}),c.makeGrayscaleImage=j,c}($,cornerstone,cornerstoneWADOImageLoader);