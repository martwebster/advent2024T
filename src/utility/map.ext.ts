export {}

declare global {
  interface Map<K, V> {
    /**
     * Filter the map
     */
    filter(callback: (item: [K, V]) => boolean): Map<K, V>

    /**
     * sort the map. This produces a new Map
     */
    sort(callback: (a: [K, V], b: [K, V]) => number): Map<K, V>

    /**
     * Retrieve the first item in the map
     */
    first(): [K, V]
  }
}

Map.prototype.filter = function(callback: (item: [any, any]) => boolean) {
  return new Map([...this.entries()].filter(callback))
}

Map.prototype.sort = function(callback: (a: [any, any], b: [any, any]) => number) {
  return new Map([...this.entries()].sort(callback))
}

Map.prototype.first = function() {
  return this.entries().next().value!
}