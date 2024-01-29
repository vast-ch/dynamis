import Component from '@glimmer/component';
// @ts-expect-error types do not exist
import LeafletMap from 'ember-leaflet/components/leaflet-map';
import { hash } from '@ember/helper';
import type { GeoModel } from 'dynamis/handlers/geo-handler';
import { cssTransition } from 'ember-css-transitions';
import { eq } from 'ember-truth-helpers';
import { fn } from '@ember/helper';

export interface AssessmentMapSignature {
  // Element: HTMLTableElement;
  Args: {
    points: Array<GeoModel>;
    selectedPoint: GeoModel | undefined;
    select: ({ point }: { point: GeoModel | undefined }) => void;
  };
}

export default class AssessmentMap extends Component<AssessmentMapSignature> {
  lat = '46.6797744';
  lng = '7.8535008';
  zoom = 15;

  <template>
    <LeafletMap
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      class='animate__animated col-span-full h-64'
      {{cssTransition
        enterClass='opacity-100'
        enterActiveClass='animate__fadeIn'
        enterToClass='opacity-100'
        leaveClass='opacity-100'
        leaveActiveClass='animate__fadeOut'
        leaveToClass='opacity-100'
      }}
      as |layers|
    >
      {{! https://wms.geo.admin.ch/?=&SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=ch.swisstopo.pixelkarte-farbe-pk1000.noscale&STYLES=&FORMAT=image/jpeg&TRANSPARENT=false&HEIGHT=256&WIDTH=256&SRS=EPSG:3857&BBOX=782715.1696402048,5792092.255337514,939258.2035682457,5948635.289265557 }}
      <layers.tile
        @url='https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg'
      />

      {{#each @points as |point|}}

        <layers.marker
          @location={{hash lat=point.lat lng=point.lon}}
          @onClick={{fn @select (hash point=point)}}
          as |marker|
        >
          <marker.popup @popupOpen={{eq point @selectedPoint}}>
            {{point.labelPlainText}}
          </marker.popup>
        </layers.marker>
      {{/each}}
      {{! Specify child layer components here }}
    </LeafletMap>
  </template>
}
