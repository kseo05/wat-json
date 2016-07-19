## TODO
* dev-server inline html 로 사용 가능한 gulp task 추가.
 * http://phantomjs.org/api/
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
  * 그냥 따로 프로젝트를 파는 것을 검토.
* SVG Document 에 대한 watDomJSON 의 파싱 지원.
 * jsdom 은 svg 1.1 을 지원하지 않음. phantomjs 를 사용해야 할듯.
  * 아래의 팁대로 하면 서버 안띄우고 phantomjs 를 쓸수 있음.
  * [link](http://stackoverflow.com/questions/11744089/phantomjs-create-page-from-string)
 * https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html#SVG_in_HTML
* jsonpaph 적용 여부... 그냥 따로 모듈화 해서 응용단에서 같이 쓰는게 좋을 듯.
* Built-in Object (window, document) 에 대한 면밀한 파싱 지원.
* Built-in Function (Event) 의 instance 에 대한 면밀한 파싱 지원.
