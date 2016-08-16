//@flow

/**
 * Object Reference Manager for WatJSON.
 * @static
 * @ignore
 */
class WatObjectReferenceManager {
  _map: Map;

  constructor () {
    this._map = new Map();
  }

  registerObject (id: String, watJSON: Object, obj: Object) {
    this._map.put(id, { watJSON, obj });
  }

  findIdByObject (target: Object): string|null {
    var it: Object = this._map.entries().next();

    while (!it.done) {
      if (it.value[1].obj === target) {
        return it.value[0];
      }
    }

    return null;
  }

  findObjectById (id: String): Object|null {
    var val = this._map.get(id);
    return val ? val.obj : null;
  }

  findWatJSONObjectById (id: String): Object|null {
    var val = this._map.get(id);
    return val ? val.watJSON : null;
  }
}

module.exports = WatObjectReferenceManager;
