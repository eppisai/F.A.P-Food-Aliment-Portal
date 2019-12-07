(function(){try{var i=window.$MicrosoftMaps8,n=i.Internal,d=n._BoundsAccumulator,u=n._Debug,g=n._Dispatcher,nt=n._WorkDispatcher,tt=n._EventBinding,it=n._Gimme,w=n._Helper,rt=n._JSEvent,ut=i.ImageryMapLayer,e=n._LatLonCrs,b=i.LocationRect,o=n._LruCache,f=i.Location,ft=i.MapMath,et=n._MercatorCube,ot=i.MercatorCubeCrs,st=n._MercatorTileUtility,ht=n._Observable,ct=n._ObservableObject,lt=n._Overlay,at=n._OverlayManager,r=i.Point,vt=i.Size,c=n._VectorMath,yt=i.VectorMapLayer,pt=n._Network,wt=n._GeometryGeneralizer,bt=i.BasicTemplate,kt=i.GlobalConfig,s=function(){function n(n,t,i,r,f,o){var l,s,h,a;r===void 0&&(r=256);f===void 0&&(f=256);o===void 0&&(o=e.instance);u.assertIsInteger(n,"x");u.assertIsInteger(t,"y");u.assertIsInteger(i,"zoom");u.assertIsInteger(r,"width");u.assertIsInteger(f,"height");l=1<<i;this.x=n;this.y=t;this.zoom=i;this.pixelWidth=r;this.pixelHeight=f;this.crs=o;s=(o.bounds[1]-o.bounds[3])/l;h=(o.bounds[2]-o.bounds[0])/l;this.bounds=[o.bounds[0]+h*t,o.bounds[3]+s*n+s,o.bounds[0]+h*t+h,o.bounds[3]+s*n,];var c="",v=n,y=t;for(a=0;a<i;a++)c=((v&1)+2*(y&1)).toString()+c,v>>=1,y>>=1;this.quadKey=c;this._stringValue=o.id+"PryamidTile"+c}return n.prototype.getParent=function(){var t=null;return this.zoom>1&&(t=new n(Math.floor(this.x/2),Math.floor(this.y/2),this.zoom-1)),t},n.prototype.toString=function(){return this._stringValue},n.fromQuadKey=function(t,i,r,u){var f,s,h;u===void 0&&(u=e.instance);var c=0,l=0,o=t.length;for(f=o;f>0;f--)s=1<<f-1,h=t.charCodeAt(o-f)-48,h&1&&(c|=s),h&2&&(l|=s);return new n(c,l,o,i,r,u)},n.areEqual=function(n,t){return n&&t&&n.quadKey===t.quadKey&&n.crs===t.crs},n}(),t=function(){function n(){}return n.getLodFromGroundResolution=function(n,t,i){var u=Math.cos(t*c.radiansPerDegree)*156543.04,r=c.log2(u/n);return r=Math.round(r),Math.max(r-i,1)},n.getTileIdFromLocation=function(t,i,r){var u=n.latLongToPixelXY(t,i);return r&&(u.x+=r.x,u.y+=r.y),n.pixelXYToTileXY(u)},n.clip=function(n,t,i){return Math.min(Math.max(n,t),i)},n.getMapSize=function(t){return n.tileLength<<t},n.latLongToPixelXY=function(t,i){var o=n.clip(t.latitude,n.minLatitude,n.maxLatitude),s=f.normalizeLongitude(t.longitude),h=(s+180)/360,e=Math.sin(o*Math.PI/180),c=.5-Math.log((1+e)/(1-e))/(4*Math.PI),u=n.getMapSize(i),l=Math.floor(n.clip(h*u+.5,0,u-1)),a=Math.floor(n.clip(c*u+.5,0,u-1));return new r(l,a)},n.pixelXYToTileXY=function(t){var i=Math.floor(t.x/n.tileLength),u=Math.floor(t.y/n.tileLength);return new r(i,u)},n.pixelXYToTile=function(t,i){var r=Math.floor(t.x/n.tileLength),u=Math.floor(t.y/n.tileLength);return new s(r,u,i,n.tileLength,n.tileLength,e.instance)},n.tileXYToPixelXY=function(t){var i=t.x*n.tileLength,u=t.y*n.tileLength;return new r(i,u)},n.tileToPixelXY=function(t){var i=t.x*n.tileLength,u=t.y*n.tileLength;return new r(i,u)},n.pixelXYToLatLong=function(t,i){var r=n.getMapSize(i),u=n.clip(t.x,0,r-1)/r-.5,e=.5-n.clip(t.y,0,r-1)/r,o=90-360*Math.atan(Math.exp(-e*2*Math.PI))/Math.PI,s=360*u;return new f(o,s)},n.quadKeyToLocationRect=function(t){var i=t.length,u=n.quadKeyToTileXY(t),f=u.x*n.tileLength,e=u.y*n.tileLength,o=f+n.tileLength,s=e+n.tileLength;return b.fromCorners(n.pixelXYToLatLong(new r(f,e),i),n.pixelXYToLatLong(new r(o,s),i))},n.quadKeyToTileXY=function(n){for(var t,u=0,f=0,e=n.length,i=e;i>0;i--){t=1<<i-1;switch(n[e-i]){case"0":break;case"1":u|=t;break;case"2":f|=t;break;case"3":u|=t;f|=t;break;default:throw"Invalid QuadKey digit sequence.";}}return new r(u,f)},n.tileLength=256,n.minLatitude=-85.05112878,n.maxLatitude=85.05112878,n.minLongitude=-180,n.maxLongitude=180,n}(),l=function(){function n(n){this._lodOffset=n?n:0}return n.prototype.getRegionsInBounds=function(i,r,u,f){u===void 0&&(u=t.tileLength);var e=r-.001*r,o=n._getLodFromScale(e,this._lodOffset);return n._getRegionsInternal(i,o,u,f)},n.prototype.getRegions=function(i,r,u,f){u===void 0&&(u=t.tileLength);var e=t.getLodFromGroundResolution(r,i.center.latitude,this._lodOffset);return n._getRegionsInternal(i,e,u,f)},n._getLodFromScale=function(t,i){for(var u,f=n._scaleToLod.length,r=0;r<f;r++)if(u=n._scaleToLod[r],t<=u.scale)return Math.max(u.lod-i,1)},n._getRegionsInternal=function(n,f,e,o){var l,y,a;u.assertIsInteger(f,"lod");var h=t.getTileIdFromLocation(n.getNorthwest(),f,new r(1,1)),c=t.getTileIdFromLocation(n.getSoutheast(),f,new r(-1,-1)),p=[],v=t.getMapSize(f)/e,w=h.x<=c.x?c.x-h.x+1:v+c.x-h.x+1;for(n.crossesInternationalDateLine()&&n.width>=180&&h.x===c.x&&(w=v),l=h.x,y=0;y<w;y++){for(l===v&&(l=0),a=h.y;a<=c.y;a++)p.push(new s(l,a,f,e,e,o?o:i.MercatorCubeCrs.instance));l++}return p},n._scaleToLod=[{scale:.0187,lod:23},{scale:.0373,lod:22},{scale:.0746,lod:21},{scale:.1493,lod:20},{scale:.2986,lod:19},{scale:.5972,lod:18},{scale:1.1943,lod:17},{scale:2.3887,lod:16},{scale:4.7773,lod:15},{scale:9.5546,lod:14},{scale:19.1093,lod:13},{scale:38.2185,lod:12},{scale:76.437,lod:11},{scale:152.8741,lod:10},{scale:305.7481,lod:9},{scale:611.4962,lod:8},{scale:1222.9925,lod:7},{scale:2445.9849,lod:6},{scale:4891.9698,lod:5},{scale:9783.9396,lod:4},{scale:19567.8792,lod:3},{scale:39135.7585,lod:2},{scale:Number.POSITIVE_INFINITY,lod:1}],n}(),a=function(){function n(n,t,i,r){this.image=n;this.cacheKey=t;this.tileRegion=i;this.requestedRegion=r||i}return n}(),v=function(){function n(){}return n.addTile=function(t,i){u.assertNotNull(t,"tile");t&&(i?n._sharedBackgroundCache.addItem(t.cacheKey,t):n._sharedCache.addItem(t.cacheKey,t))},n.getTile=function(t,i){return i?n._sharedBackgroundCache.getItem(t):n._sharedCache.getItem(t)||n._sharedBackgroundCache.getItem(t)},n.getBackgroundTile=function(t,i){var r;return r=i?n._sharedBackgroundCache.getInternalDictionary()[t]:n._sharedCache.getInternalDictionary()[t]||n._sharedBackgroundCache.getInternalDictionary()[t],r&&r.item},n._sharedCacheSize=256,n._sharedBackgroundCacheSize=64,n._sharedCache=new o(n._sharedCacheSize),n._sharedBackgroundCache=new o(n._sharedBackgroundCacheSize),n}(),y=function(){function n(n){this._quadKey=n.quadKey;this.id="sheetcrs-"+n.quadKey;this._tileXY=t.quadKeyToTileXY(n.quadKey);this.bounds=n.bounds}return n.prototype.projectToX=function(i,r){var u=this._getSheetLod(),e=new f(i,r),o=t.latLongToPixelXY(e,u),s=t.tileXYToPixelXY(this._tileXY),h=n._maxValue/256;return(o.x-s.x)*h},n.prototype.projectToY=function(i,r){var u=this._getSheetLod(),e=new f(i,r),o=t.latLongToPixelXY(e,u),s=t.tileXYToPixelXY(this._tileXY),h=n._maxValue/256;return(o.y-s.y)*h},n.prototype.toLatitude=function(i,u){var s=this._getSheetLod(),f=new r(this._tileXY.x,this._tileXY.y),e,o;return f.x+=i/n._maxValue,f.y+=u/n._maxValue,e=t.tileXYToPixelXY(f),o=t.pixelXYToLatLong(e,s),o.latitude},n.prototype.toLongitude=function(i,u){var s=this._getSheetLod(),f=new r(this._tileXY.x,this._tileXY.y),e,o;return f.x+=i/n._maxValue,f.y+=u/n._maxValue,e=t.tileXYToPixelXY(f),o=t.pixelXYToLatLong(e,s),o.longitude},n.prototype._getSheetLod=function(){return this._quadKey.length},n._maxValue=512,n}(),h=function(){function n(n){this.quadKey=n;this.lod=n.length;this.crs=new y(this);this.bounds=this.crs.bounds}return n}(),k=function(){function n(){this._pyramidTileSpatialIndex=new l(1)}return n.prototype.getRegionsInBounds=function(n,t){for(var f,e,r=[],u=this._pyramidTileSpatialIndex.getRegionsInBounds(n,t),i=0;i<u.length;i++)f=u[i].quadKey,e=new h(f),r.push(e);return r},n.prototype.getRegions=function(n,t){for(var f,e,r=[],u=this._pyramidTileSpatialIndex.getRegions(n,t),i=0;i<u.length;i++)f=u[i].quadKey,e=new h(f),r.push(e);return r},n}(),dt=function(){function n(t){this._maxSharedCacheSize=256;this._minSharedCacheSize=128;this._tileSize=65536;this._cachingMultiplier=8;u.assertNotNull(t,"map");this._map=t;var i=this._getTileCacheSize();n._sharedCache?n._sharedCache.setCapacity(i):n._sharedCache=new o(i)}return n.prototype.addTile=function(t){u.assertNotNull(t,"tile");var i=this._getKey(t.tileId);n._sharedCache.addItem(i,t)},n.prototype.getTile=function(t){var i=this._getKey(t);return n._sharedCache.getItem(i)},n.prototype.updateTileCacheSize=function(t,i){if(n._sharedCache){var r=this._getTileCacheSize(t,i);n._sharedCache.setCapacity(r)}},n.prototype._getTileCacheSize=function(t,i){var r=n._sharedCacheSize,u=typeof t=="number"&&typeof i=="number"?t*i:this._tileSize,o=w._isFeatureEnabled("bE2Labels")?u/this._tileSize:1,f=this._map.getActualSize(),e=Math.ceil(this._map.getDpiScale()),s=e>1?Math.pow(2,e):1;return r=Math.min(Math.ceil(f.height*f.width/u)*s*this._cachingMultiplier,this._maxSharedCacheSize),Math.max(this._minSharedCacheSize/o,r)},n.prototype._getKey=function(n){var t=n.quadKey,i=n.crs;return t+="_"+i.id,i.version&&(t+="_"+i.version),this._map.getAllLayers().hasUserLayers()&&(t+="_"+this._map.getId()),t},n._sharedCacheSize=256,n}();i.PyramidTileId=s;n.PyramidTileSpatialIndex=l;n.SheetId=h;n.SheetCrs=y;n.SheetSpatialIndex=k;n.TileSystemHelper=t;n.RasterTileCache=typeof v!="undefined"?v:null;n.RasterTile=typeof a!="undefined"?a:null}catch(p){if(i.logger)i.logger.logCriticalError(p);else throw p;}}).call(window)