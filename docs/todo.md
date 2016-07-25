## TODO
* constructor 에 대한 format 단순화 검토.
 * constructor 는 function 이므로, 그 아래에 function 용 custom literal 을 둘 필요가 없음.
* watEventJSON 구현.
 * Event Object 에 대한 JSON 변환 지원.
  * https://facebook.github.io/react/docs/events.html - React 의 SyntheticEvent 형식으로.
  * Research 결과, 아직 특별히 해야 할 상황이 생기지 않음. 해야되는 상황에서 추가.
* 상호참조 혹은 자가참조 문제 해결.
 * object literal 에서 자기참조/상호참조 문제가 생겨서 무한루프가 발생할 수 있음.
 * 그래서 자기참조/상호참조 문제가 생겼을 경우, 해당 개체들에 대한 object literal 을 표시하지 않고, 해당 object 에 대한 참조를 위한 id 만 표시하는 형태가 되어야 함.
 * Object Map & Object ID
  * { __OBJECTMAP__ : { [__OBJECTID__] : [Object] } }
  * { __OBJECTID__ : [string|number] }
* fromWatJSON 으로 새 객체를 만드는 것이 아니라, 기존 객체에 투영? 시키는 기능 추가.
* primary type 과 custom object type 에 대한 정리.
 * primary type === object & custom object type === Object 등등.
 * [참고1](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
 * [참고2](http://javascript.crockford.com/remedial.html)
 * [object String|Date|Math] Since javascript 1.8.5 [object Undefined|Null]
* demo 구현. (dev, basic, object-explorer 로 간소화)
 * 공용 UI - 상단에 textarea 하나, 하단에 'toWatJSON()', 'fromWatJSON()' button 1개씩.
 * model (basic)
  * global.sampleModel 에 지원하는 모든 종류의 객체가 들어가 있음.
  * 이를 각 button 의 전달인자로 사용.
  * watJSON 결과는 textarea 에 출력.
 * view (dom-tree)
  * 공용 UI 우측에 sampleView container 가 있고, 각종 html / svg element 가 있음.
  * 이 container 를 각 button 의 전달인자로 사용.
  * watJSON 결과는 textarea 에 출력.
 * object explorer
  * tree view (어디 쓸만한 react component 있으면 사용) 로 sample Model 을 toWatJSON 변환 결과를 확인 가능.
  * React Component 로 제작.
  * Flux Architecture 사용.
  * 그냥 따로 프로젝트를 파는 것을 검토.
* SVG Document 에 대한 watDomJSON 의 파싱 지원.
 * jsdom 은 svg 1.1 을 지원하지 않음. phantomjs 를 사용해야 할듯.
  * 아래의 팁대로 하면 서버 안띄우고 phantomjs 를 쓸수 있음.
  * [link](http://stackoverflow.com/questions/11744089/phantomjs-create-page-from-string)
 * https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html#SVG_in_HTML
* jsonpaph 적용 여부... 그냥 따로 모듈화 해서 응용단에서 같이 쓰는게 좋을 듯.
* canvas 제공.
* Built-in Object (window, document) 에 대한 면밀한 파싱 지원. (중요한 것만)
 * global 이하의 모든 내용을 파싱하는 것이 최종 목표. 
* Built-in Function (Event) 의 instance 에 대한 면밀한 파싱 지원.
* Canvas data 에 대한 파싱 지원. (compressing library 알아보기)
