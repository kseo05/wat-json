// @flow

/**
 * JSON Object Path Manager.
 * @static
 * @ignore
 */
class JSONObjectPathManager {
  // TODO: support https://flowtype.org/docs/quick-reference.html#classes
  // _asList: Array<number>;
  // _asString: String;
  // _isDirtyString: boolean;
  // _ancestorPathList: Array<String>;
  // _isRoot: boolean;

  constructor () {
    this._isRoot = true;
  }

  init () {
    this._isRoot = false;
    this._asList = [0];
    this._asString = '$.0';
    this._isDirtyString = false;
    this._ancestorPathList = [];
  }

  increaseID () {
    this._asList[this._asList.length-1]++;
    this._isDirtyString = true;
  }

  decreaseID () {
    this._asList[this._asList.length-1]--;
    this._isDirtyString = true;
  }

  increaseDepth () {
    if (this._isRoot) {
      this.init();
    } else {
      this._ancestorPathList[this._ancestorPathList.length] = this._getCurrentPath();
      this._asList[this._asList.length] = 0;
      this._asString += '.0';
    }
  }

  decreaseDepth () {
    this._ancestorPathList.pop();
    this._asList.pop();
    this._isDirtyString = true;
  }

  generatePath (): string {
    var result: string = this.getCurrentPath();
    this.increaseID();
    return result;
  }

  getAncestorPathList (): Array<String> {
    return this._ancestorPathList;
  }

  getCurrentPath (): string {
    if (this._isDirtyString) {
      this._updateString();
    }
    return this._asString;
  }

  _updateString () {
    this._asString = '$.' + this._asList.join('.');
    this._isDirtyString = false;
  }
};

module.exports = JSONObjectPathManager;
