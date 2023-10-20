 <template>
 <div style="height: 700px; width: 100%">
    <l-map
    ref="map"
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
    >
      <l-tile-layer
        :url="url"
      />

    </l-map>
  </div>
</template>

<script>
//import { L } from "leaflet";
import { LMap, LTileLayer, } from "vue2-leaflet";
import './leaflet-canvas-marker.js';
import marker1 from '../assets/marker1.png';
import generateData from '../util/generateLatLng';

export default {
  name: "MapDemo",
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 10,
      center: [27.98385,116.358351],
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      mapObj:'',
      ciLayer:''
    };
  },
  mounted(){
    this.mapObj = this.$refs.map.mapObject;
    this.mapObj.on('zoomend', () => {
      this.map_drag();
      });
      this.mapObj.on('moveend', () => {
        this.map_drag();
      });
    // eslint-disable-next-line no-undef
    this.ciLayer = L.canvasIconLayer({}).addTo(this.mapObj);
    const xy = this.getboundary();
    const data = generateData(...xy);
    this.draw(data);
  },
  methods: {
    //获取边界坐标，返回格式[left,right,top,bottom];
    getboundary(){
      const leftdownLng = this.$refs.map.mapObject.getBounds().getSouthWest()
        .lng;
      const leftdownLat = this.$refs.map.mapObject.getBounds().getSouthWest()
        .lat;
      const rightupLng = this.$refs.map.mapObject.getBounds().getNorthEast()
        .lng;
      const rightupLat = this.$refs.map.mapObject.getBounds().getNorthEast()
        .lat;
        return [leftdownLat,rightupLat,leftdownLng,rightupLng];
    },
    map_drag(){
      const xy = this.getboundary();
    const data = generateData(...xy);
    this.draw(data);
    },
    //打点
    draw(data){
      //marker点变化后,清空marker，canvas重绘
      this.ciLayer && this.ciLayer.clearLayers();
      
      // eslint-disable-next-line no-undef
      const icon = L.icon({
        iconUrl: marker1,
        iconSize: [20, 18],
        iconAnchor: [10, 9],
      });
      const markers = data.map(item => {
        // eslint-disable-next-line no-undef
        return L.marker([item.latitude, item.longitude], {
          icon,
          //方便区分打点
          diyId: item.id,
        });
      });
      this.ciLayer.addLayers(markers);
    },

    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>