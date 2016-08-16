<a name="module_watJSON"></a>

## watJSON
A library to convert general javascript objects to JSON objects and vice versa.

**See**: [watJSON](http://git.web-uhee.com/lib/watJSON)  
**Version**: 0.0.1  
**Author:** Jae-Yeop Kim <kseo05com@gmail.com>  
**License**: MIT  
**Copyright**: (c) web-uhee.com 2016  

* [watJSON](#module_watJSON)
    * [.toWatJSON(obj, [options])](#module_watJSON.toWatJSON) ⇒ <code>watJSON.WatJSONObject</code>
    * [.fromWatJSON(obj, [options])](#module_watJSON.fromWatJSON) ⇒ <code>any</code>
    * [.WatJSONObject](#module_watJSON.WatJSONObject) : <code>Object</code>
    * [.Options](#module_watJSON.Options) : <code>Object</code>

<a name="module_watJSON.toWatJSON"></a>

### watJSON.toWatJSON(obj, [options]) ⇒ <code>watJSON.WatJSONObject</code>
Convert an object to an watJSON object.
Object (obj) can have a veriety of types. (Javascript/JSON Object, HTMLElement, HTMLCollection)
It can contain objects which has types mentioned above as JSON Object.

**Kind**: static method of <code>[watJSON](#module_watJSON)</code>  
**Returns**: <code>watJSON.WatJSONObject</code> - converted watJSON object.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>any</code> | an object to convert. |
| [options] | <code>watJSON.Options</code> | converting options. |

<a name="module_watJSON.fromWatJSON"></a>

### watJSON.fromWatJSON(obj, [options]) ⇒ <code>any</code>
Convert an watJSON an object to an original object.

**Kind**: static method of <code>[watJSON](#module_watJSON)</code>  
**Returns**: <code>any</code> - converted original object.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>watJSON.WatJSONObject</code> | an watJSON object to convert. |
| [options] | <code>watJSON.Options</code> | converting options. |

<a name="module_watJSON.WatJSONObject"></a>

### watJSON.WatJSONObject : <code>Object</code>
JSON-friendly object type.
You can handle it as a JSON-formatted object.
`WatJSONObject` object contains the data of object as much as possible.

**Kind**: static typedef of <code>[watJSON](#module_watJSON)</code>  
<a name="module_watJSON.Options"></a>

### watJSON.Options : <code>Object</code>
Common converting options.

**Kind**: static typedef of <code>[watJSON](#module_watJSON)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extTypes | <code>Object</code> |  | Options about converting objects which JSON global object cannot convert. |
| extTypes.undef | <code>boolean</code> | <code>true</code> | Use `true` if you wanna convert `undefined` objects. |
| extTypes.nan | <code>boolean</code> | <code>true</code> | Use `true` if you wanna convert `NaN` objects. |
| extTypes.infinity | <code>boolean</code> | <code>true</code> | Use `true` if you wanna convert `infinity` objects. |
| extTypes.func | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert function objects. |
| extTypes.constructorFunc | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert the `constructor` of instances. |
| extTypes.functionValue | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert between the `function` source code and a string when converting function objects. |
| extTypes.nativeFunction | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert native function objects. But, watJSON cannot restore them by `parse` or `fromWatJSON`. |
| extTypes.htmlElement | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert `HTMLElement` objects. It is just used in a web browser. |
| extTypes.htmlCollection | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert `HTMLCollection` objects. It is just used in a web browser. |
| extTypes.proto | <code>boolean</code> | <code>true</code> | Use `true` if you wanna convert the prototype of objects until the converter reaches the instance of `Object`. |
| extTypes.rootPrototype | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert `objectPrototypeNative`. |
| extTypes.unknownObject | <code>boolean</code> | <code>true</code> | Use `true` if you wanna convert objects when watJSON could not find out its type. |
| extTypes.errorObject | <code>boolean</code> | <code>true</code> | Use `true` if you wanna get conversion error objects. |
| useWatDomJSON | <code>boolean</code> | <code>true</code> | You can use watDomJSON library when you convert between `HTMLElement`/`HTMLCollection` object and `WatDomJSON` object. If you don't use this option, parsed result will be a html string. |
| useFunctionAST | <code>boolean</code> | <code>false</code> | Use `true` if you wanna convert between the `function` source code and a `AST`, not a string. |
