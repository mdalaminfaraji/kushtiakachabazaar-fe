/* eslint-disable @typescript-eslint/no-unsafe-function-type */
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element | null, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setPosition(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng;
    setMap(map: Map | null): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    constructor(sw: LatLng | LatLngLiteral, ne: LatLng | LatLngLiteral);
  }

  class Geocoder {
    geocode(
      request: GeocoderRequest,
      callback: (results: GeocoderResult[], status: string) => void
    ): void;
  }

  namespace places {
    class Autocomplete {
      constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
      addListener(eventName: string, handler: Function): MapsEventListener;
      getPlace(): PlaceResult;
    }
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    restriction?: MapRestriction;
    mapTypeControl?: boolean;
  }

  interface MapRestriction {
    latLngBounds: { north: number; south: number; east: number; west: number };
    strictBounds?: boolean;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    draggable?: boolean;
  }

  interface AutocompleteOptions {
    bounds?: LatLngBounds;
    componentRestrictions?: { country: string };
    fields?: string[];
    strictBounds?: boolean;
  }

  interface PlaceResult {
    formatted_address?: string;
    geometry?: {
      location: LatLng;
    };
  }

  interface GeocoderRequest {
    location?: LatLng | LatLngLiteral;
  }

  interface GeocoderResult {
    formatted_address: string;
    geometry: {
      location: LatLng;
    };
  }

  interface MapsEventListener {
    remove(): void;
  }
}
