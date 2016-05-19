## TODO
* SVG Document 에 대한 watDomJSON 의 파싱 지원.
 * jsdom 은 svg 1.1 을 지원하지 않음. phantomjs 를 사용해야 할듯.
  * 이 팁대로 하면 서버 안띄우고 phantomjs 를 쓸수 있음. [link](http://stackoverflow.com/questions/11744089/phantomjs-create-page-from-string)
* jsonpaph 적용 여부... 그냥 따로 모듈화 해서 응용단에서 같이 쓰는게 좋을 듯.
* Built-in Object (window, document) 에 대한 면밀한 파싱 지원.
* Built-in Function (Event) 의 instance 에 대한 면밀한 파싱 지원.
