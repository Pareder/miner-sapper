(function(t){function e(e){for(var i,r,a=e[0],l=e[1],c=e[2],h=0,d=[];h<a.length;h++)r=a[h],o[r]&&d.push(o[r][0]),o[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(d.length)d.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],i=!0,a=1;a<s.length;a++){var l=s[a];0!==o[l]&&(i=!1)}i&&(n.splice(e--,1),t=r(r.s=s[0]))}return t}var i={},o={app:0},n=[];function r(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=i,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var u=l;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var i=s("64a9"),o=s.n(i);o.a},1:function(t,e){},1392:function(t,e,s){"use strict";var i=s("907a"),o=s.n(i);o.a},"29c5":function(t,e,s){"use strict";var i=s("6311"),o=s.n(i);o.a},"3e7f":function(t,e,s){"use strict";var i=s("78af"),o=s.n(i);o.a},"4e50":function(t,e,s){"use strict";var i=s("f802"),o=s.n(i);o.a},"4ed6":function(t,e,s){"use strict";var i=s("cee9"),o=s.n(i);o.a},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("097d");var i=s("2b0e"),o=s("28dd"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"p-20"},[s("router-view")],1)])},r=[],a={name:"app"},l=a,c=(s("034f"),s("2877")),u=Object(c["a"])(l,n,r,!1,null,null,null);u.options.__file="App.vue";var h=u.exports,d=s("8c4f"),f=[37,38,39,40],m={miner:{easy:{size:8,bombsCount:10},medium:{size:12,bombsCount:30},hard:{size:16,bombsCount:55}},snake:{size:20,arrowCodes:f},tetris:{size:[15,10],totalModels:7,arrowCodes:f},crush:{size:20,colors:["red","green","blue","yellow","purple","orange"]}},p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"buttons"},[s("h1",[t._v("Miner v.1.23.913.R.111")]),s("router-link",{staticClass:"btn",attrs:{to:"/miner/easy",tag:"button"}},[t._v("Easy")]),s("router-link",{staticClass:"btn",attrs:{to:"/miner/medium",tag:"button"}},[t._v("Medium")]),s("router-link",{staticClass:"btn",attrs:{to:"/miner/hard",tag:"button"}},[t._v("Hard")]),s("router-link",{staticClass:"btn",attrs:{to:"/snake",tag:"button"}},[t._v("Snake")]),s("router-link",{staticClass:"btn",attrs:{to:"/tetris",tag:"button"}},[t._v("Tetris")]),s("router-link",{staticClass:"btn",attrs:{to:"/crush",tag:"button"}},[t._v("Crush")])],1)},v=[],b=(s("4ed6"),{}),k=Object(c["a"])(b,p,v,!1,null,"52696546",null);k.options.__file="Home.vue";var M=k.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",[t.victory?s("Modal",{attrs:{time:t.spentTime},on:{restart:t.createField}}):t._e(),s("div",{staticClass:"field"},t._l(t.cells,function(e,i){return s("div",{key:i,staticClass:"line"},t._l(e,function(e,o){return s("div",{key:i+""+o,staticClass:"cell",class:e&&e.clicked?e.value===t.bomb?"bomb":"opened":e&&e.rightClicked?"flag":"",on:{click:function(e){t.cellClick(i,o)},contextmenu:function(e){e.preventDefault(),t.cellRightClick(i,o)}}},[e&&e.clicked&&-1===[t.bomb,0].indexOf(e.value)?s("span",[t._v(t._s(e.value))]):t._e()])}),0)}),0),s("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.createField(e)}}},[t._v("Restart")])],1)])},_=[],y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"modal"},[s("div",{staticClass:"modal__backdrop"}),s("div",{staticClass:"modal__inner"},[s("div",{staticClass:"modal__top"},[s("h2",[t._v("Good job!")])]),s("div",{staticClass:"modal__body"},[s("p",[t._v("Enter your name to post the result "),s("span",{staticClass:"text--green text--bold"},[t._v(t._s(t.$route.path.includes("miner")?t.formatTime(t.result):t.result))])]),t.leaderboard?s("Leaderboard",{attrs:{leaderboard:t.leaderboard,position:t.position,time:t.result,name:t.name},on:{formatTime:t.formatTime}}):s("Form",{attrs:{sendingError:t.sendingError},on:{submitForm:t.getLeaderboard}}),s("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){t.$emit("restart")}}},[t._v("Restart")])],1)])])])},g=[],w=(s("7f7f"),s("c5f6"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("form",{staticClass:"form",on:{submit:function(e){return e.preventDefault(),t.setNickname(e)}}},[s("div",{staticClass:"row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"name",attrs:{type:"text",placeholder:"Enter your name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),s("input",{staticClass:"submit",attrs:{type:"submit",value:"Send",disabled:t.sent}})]),t.error?s("div",{staticClass:"error"},[t._v("Name length should be between 3 and 20 symbols")]):t._e(),t.sendingError?s("div",{staticClass:"error"},[t._v("We apologize, server is currently unavailable, try again later")]):t._e()])}),z=[],T={data:function(){return{name:"",error:!1,sent:!1}},props:{sendingError:{type:Boolean}},methods:{setNickname:function(){this.name.length>2&&this.name.length<20?(this.error=!1,this.sent=!0,this.$emit("submitForm",this.name)):this.error=!0}}},x=T,O=(s("4e50"),Object(c["a"])(x,w,z,!1,null,"07be6033",null));O.options.__file="Form.vue";var E=O.exports,S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"leaderboard"},[s("h3",[t._v("Leaderboard")]),s("ol",t._l(t.leaderboard,function(e,i){return s("li",{key:i,class:e.name===t.name?"leader":"",attrs:{"data-position":i+1}},[s("mark",[t._v(t._s(e.name))]),s("span",[t._v(t._s(t.$route.path.includes("miner")?t.formatTime(e.result):e.result))])])}),0),t.position>3?s("div",[s("p",{staticClass:"skip"},[t._v("...")]),s("ol",[s("li",{staticClass:"not_leader",attrs:{"data-position":t.position}},[s("mark",[t._v(t._s(t.name))]),s("span",[t._v(t._s(t.$route.path.includes("miner")?t.formatTime(t.result):t.result))])])])]):t._e()])},j=[],D={props:{leaderboard:{type:Array},position:{type:Number},result:{type:Number},name:{type:String}}},$=D,N=(s("1392"),Object(c["a"])($,S,j,!1,null,"1a1b3775",null));N.options.__file="Leaderboard.vue";var F=N.exports,I={data:function(){return{leaderboard:null,position:null,name:"",sendingError:!1}},props:{result:{type:Number}},methods:{getLeaderboard:function(t){var e=this;this.name=t,this.$http.post("/result",{name:this.name,result:this.result,mode:this.$route.path}).then(function(t){e.sendingError=!1,e.leaderboard=t.body.leaderboard,e.position=t.body.position},function(t){e.sendingError=!0,console.log(t.statusText)})}},components:{Form:E,Leaderboard:F}},L=I,P=(s("29c5"),Object(c["a"])(L,y,g,!1,null,"4df5e9f1",null));P.options.__file="Modal.vue";var B=P.exports,K={data:function(){return{size:this.options.size,cells:null,bombsCount:this.options.bombsCount,bomb:"boom",finish:null,victory:null,startTime:null,endTime:null}},props:{options:{type:Object}},computed:{spentTime:function(){return+((this.endTime-this.startTime)/1e3).toFixed(2)}},created:function(){this.createField()},methods:{createField:function(){this.initData(),this.setBombsPosition()},initData:function(){this.finish=!1,this.victory=!1,this.startTime=null,this.endTime=null,this.cells=Array(this.size);for(var t=0;t<this.size;t++)this.cells[t]=Array(this.size)},setBombsPosition:function(){var t=0;while(t<this.bombsCount){var e=[this.randomNumber(),this.randomNumber()];this.cells[e[0]][e[1]]&&this.cells[e[0]][e[1]].value===this.bomb||(t++,this.cells[e[0]][e[1]]={value:this.bomb,clicked:!1,rightClicked:!1})}this.setCellsNumbers()},setCellsNumbers:function(){for(var t=0;t<this.cells.length;t++)for(var e=0;e<this.cells[t].length;e++)this.cells[t][e]&&this.cells[t][e].value===this.bomb||(this.cells[t][e]={value:this.checkBombs(t,e),clicked:!1,rightClicked:!1})},checkBombs:function(t,e){var s=this,i=0,o=this.positions(t,e);return o.map(function(t){s.cells[t[0]]&&s.cells[t[0]][t[1]]&&s.cells[t[0]][t[1]].value===s.bomb&&i++}),i},randomNumber:function(){return Math.floor(Math.random()*this.size)},cellClick:function(t,e){this.startTime||(this.startTime=Date.now()),this.cells[t][e].clicked||this.finish||(0===this.cells[t][e].value&&this.discardZeros(t,e),this.setCells(t,e,"clicked",!0),this.checkFinish(t,e),this.checkBomb(t,e))},cellRightClick:function(t,e){this.finish||this.setCells(t,e,"rightClicked",!this.cells[t][e].rightClicked)},setCells:function(t,e,s,i){this.$set(this.cells[t][e],s,i),this.$set(this.cells[t],e,this.cells[t][e]),this.$set(this.cells,t,this.cells[t])},checkFinish:function(t,e){var s=this,i=this.cells.every(function(t){return t.every(function(t){return t.clicked||t.value===s.bomb})});i&&(this.endTime=Date.now(),this.finish=!0,this.victory=!0)},checkBomb:function(t,e){if(this.cells[t][e].value===this.bomb){this.finish=!0;for(var s=0;s<this.cells.length;s++)for(var i=0;i<this.cells[s].length;i++)this.cells[s][i].value===this.bomb&&(this.cells[s][i].clicked=!0)}},discardZeros:function(t,e){var s=this,i=this.positions(t,e);i.map(function(t){s.cells[t[0]]&&s.cells[t[0]][t[1]]&&!s.cells[t[0]][t[1]].clicked&&(s.cells[t[0]][t[1]].clicked=!0,0===s.cells[t[0]][t[1]].value&&s.discardZeros(t[0],t[1]))})},positions:function(t,e){return[[t-1,e-1],[t-1,e],[t-1,e+1],[t,e-1],[t,e+1],[t+1,e-1],[t+1,e],[t+1,e+1]]}},components:{Modal:B}},H=K,A=(s("97e6"),Object(c["a"])(H,C,_,!1,null,"626f88d1",null));A.options.__file="Miner.vue";var R=A.exports,Z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{ref:"field",staticClass:"field"},t._l(t.cells,function(e,i){return s("div",{key:i,staticClass:"line"},t._l(e,function(t,e){return s("div",{key:i+""+e,staticClass:"cell",class:t||""})}),0)}),0),t.lose?s("LoseModal",{on:{restart:t.initData}}):t._e()],1)},J=[],Y=(s("6762"),s("2fdb"),s("6c7b"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"modal"},[s("div",{staticClass:"modal__backdrop"}),s("div",{staticClass:"modal__inner"},[s("div",{staticClass:"modal__top"},[s("h2",[t._v("You lose")])]),s("div",{staticClass:"modal__body"},[s("p",[t._v("You can try again.")]),s("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){t.$emit("restart")}}},[t._v("Restart")])])])])])}),G=[],W=(s("94e8"),{}),q=Object(c["a"])(W,Y,G,!1,null,"b290a4a4",null);q.options.__file="LoseModal.vue";var Q=q.exports,U={data:function(){return{size:this.options.size,arrowCodes:this.options.arrowCodes,cells:null,snake:null,code:null,bonus:null,arrowPressed:!1,lose:!1}},props:{options:{type:Object}},created:function(){this.setKeyEventHandler(),this.initData()},methods:{setKeyEventHandler:function(){window.addEventListener("keydown",this.onKeyDown)},initData:function(){this.cells=new Array(this.size);for(var t=0;t<this.cells.length;t++)this.cells[t]=new Array(this.size).fill(0);this.setDirection(),this.setSnake(),this.setBonus(),this.arrowPressed=!1,this.lose=!1,this.checkIntersection(),this.moveSnake()},setDirection:function(){this.code=Math.floor(Math.random()*(this.arrowCodes[3]-this.arrowCodes[0]+1)+this.arrowCodes[0])},setSnake:function(){var t=[this.randomNumber(),this.randomNumber()];if(t[0]<2||t[0]>this.size-4||t[1]<2||t[1]>this.size-4)this.setSnake();else switch(this.snake=[],this.snake.push(t),this.code){case this.arrowCodes[0]:this.snake.push([t[0],t[1]+1]),this.snake.push([t[0],t[1]+2]);break;case this.arrowCodes[1]:this.snake.push([t[0]+1,t[1]]),this.snake.push([t[0]+2,t[1]]);break;case this.arrowCodes[2]:this.snake.push([t[0],t[1]-1]),this.snake.push([t[0],t[1]-2]);break;case this.arrowCodes[3]:this.snake.push([t[0]-1,t[1]]),this.snake.push([t[0]-2,t[1]]);break}},setBonus:function(){var t=[this.randomNumber(),this.randomNumber()];this.snake.some(function(e){return e[0]===t[0]&&e[1]===t[1]})?this.setBonus():(this.bonus=[].concat(t),this.cells[this.bonus[0]][this.bonus[1]]="bonus")},setTimeOut:function(){var t=this;setTimeout(function(){t.moveSnake()},150)},moveSnake:function(){for(var t=this,e=this.snake[this.snake.length-1],s=this.snake.length-1;s>=0;s--)if(0===s)switch(this.code){case this.arrowCodes[0]:0===this.snake[0][1]?this.snake[0][1]=this.size-1:this.snake[0][1]--;break;case this.arrowCodes[1]:0===this.snake[0][0]?this.snake[0][0]=this.size-1:this.snake[0][0]--;break;case this.arrowCodes[2]:this.snake[0][1]===this.size-1?this.snake[0][1]=0:this.snake[0][1]++;break;case this.arrowCodes[3]:this.snake[0][0]===this.size-1?this.snake[0][0]=0:this.snake[0][0]++}else this.snake[s][0]=this.snake[s-1][0],this.snake[s][1]=this.snake[s-1][1];this.snake[0][0]===this.bonus[0]&&this.snake[0][1]===this.bonus[1]&&(this.snake.push([e[0],e[1]]),this.snake.length===Math.pow(this.size,2)?this.lose=!0:this.setBonus()),this.snake.some(function(e,s){return s&&e[0]===t.snake[0][0]&&e[1]===t.snake[0][1]})?this.lose=!0:(this.checkIntersection(),this.setCells(this.snake[0][0]),this.setTimeOut(),this.arrowPressed=!1)},checkIntersection:function(){for(var t=this,e=0;e<this.cells.length;e++)for(var s=0;s<this.cells[e].length;s++)"bonus"!==this.cells[e][s]&&(this.cells[e][s]=0);this.snake.map(function(e,s){t.cells[e[0]][e[1]]=0===s?"full cell--first":"full"})},onKeyDown:function(t){this.code!==t.keyCode&&this.code!==t.keyCode+2&&this.code!==t.keyCode-2&&!this.arrowPressed&&this.arrowCodes.includes(t.keyCode)&&(this.arrowPressed=!0,this.code=t.keyCode,this.checkIntersection(),this.setCells(this.snake[0][0]))},setCells:function(t){this.$set(this.cells,t,this.cells[t])},randomNumber:function(){return Math.floor(Math.random()*this.size)}},components:{LoseModal:Q}},V=U,X=(s("b8f8"),Object(c["a"])(V,Z,J,!1,null,"fd0f4a26",null));X.options.__file="Snake.vue";var tt=X.exports,et=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h1",[t._v("Score: "+t._s(t.score))]),s("div",{staticClass:"game"},[s("div",{ref:"field",staticClass:"field"},t._l(t.cells,function(e,i){return s("div",{key:i,staticClass:"line"},t._l(e,function(e,o){return s("div",{key:i+""+o,staticClass:"cell",style:e&&e.value?"background-color: "+t.lighten(e.color)+"; border: 1px solid "+e.color:""})}),0)}),0),s("div",{staticClass:"next_model"},t._l(3,function(e,i){return s("div",{key:i,staticClass:"line"},t._l(t.options.size[1],function(e,o){return s("div",{key:i+""+o,staticClass:"cell",style:t.checkNext(i,o)?"background-color: "+t.lighten(t.nextModel.color)+"; border: 1px solid "+t.nextModel.color:""})}),0)}),0)]),t.lose?s("Modal",{attrs:{result:t.score},on:{restart:t.initData}}):t._e()],1)},st=[],it=s("2909"),ot=function(t,e,s){switch(t){case 1:e=nt(e,s);break;case 3:e=rt(e,s);break;case 4:e=at(e,s);break;case 5:e=lt(e,s);break;case 6:e=ct(e,s);break;case 7:e=ut(e,s,s);break;default:return!1}return e},nt=function(t,e){return e?(t[0][0]-=2,t[0][1]-=2,t[1][0]-=1,t[1][1]-=1,t[3][0]+=1,t[3][1]+=1,e=!1):(t[0][0]+=2,t[0][1]+=2,t[1][0]+=1,t[1][1]+=1,t[3][0]-=1,t[3][1]-=1,e=!0),{rotatedModel:t,rotatedStatus:e}},rt=function(t,e){return 0===e?(t[0][0]-=1,t[0][1]+=1,t[2][0]+=1,t[2][1]+=1,t[3][0]+=1,t[3][1]-=1,e=1):1===e?(t[0][0]+=1,t[0][1]-=1,t[2][0]+=1,t[2][1]-=1,t[3][0]-=1,t[3][1]+=1,e=2):2===e?(t[0][0]-=1,t[0][1]+=1,t[2][0]-=1,t[2][1]-=1,t[3][0]+=1,t[3][1]-=1,e=3):3===e&&(t[0][0]+=1,t[0][1]-=1,t[2][0]-=1,t[2][1]+=1,t[3][0]-=1,t[3][1]+=1,e=0),{rotatedModel:t,rotatedStatus:e}},at=function(t,e){return e?(t[0][0]-=1,t[0][1]-=1,t[2][0]-=1,t[2][1]+=1,t[3][1]+=2,e=!1):(t[0][0]+=1,t[0][1]+=1,t[2][0]+=1,t[2][1]-=1,t[3][1]-=2,e=!0),{rotatedModel:t,rotatedStatus:e}},lt=function(t,e){return e?(t[0][0]-=1,t[0][1]-=1,t[2][0]+=1,t[2][1]-=1,t[3][0]+=2,e=!1):(t[0][0]+=1,t[0][1]+=1,t[2][0]-=1,t[2][1]+=1,t[3][0]-=2,e=!0),{rotatedModel:t,rotatedStatus:e}},ct=function(t,e){return 0===e?(t[0][0]-=1,t[0][1]-=1,t[2][0]+=1,t[2][1]+=1,t[3][0]+=2,e=1):1===e?(t[0][0]-=1,t[0][1]+=1,t[2][0]+=1,t[2][1]-=1,t[3][1]-=2,e=2):2===e?(t[0][0]+=1,t[0][1]+=1,t[2][0]-=1,t[2][1]-=1,t[3][0]-=2,e=3):3===e&&(t[0][0]+=1,t[0][1]-=1,t[2][0]-=1,t[2][1]+=1,t[3][1]+=2,e=0),{rotatedModel:t,rotatedStatus:e}},ut=function(t,e){return 0===e?(t[0][0]-=1,t[0][1]-=1,t[2][0]+=1,t[2][1]+=1,t[3][1]+=2,e=1):1===e?(t[0][0]-=1,t[0][1]+=1,t[2][0]+=1,t[2][1]-=1,t[3][0]+=2,e=2):2===e?(t[0][0]+=1,t[0][1]+=1,t[2][0]-=1,t[2][1]-=1,t[3][1]-=2,e=3):3===e&&(t[0][0]+=1,t[0][1]-=1,t[2][0]-=1,t[2][1]+=1,t[3][0]-=2,e=0),{rotatedModel:t,rotatedStatus:e}},ht=ot,dt={data:function(){return{size:this.options.size,cells:null,currentModel:null,nextModel:null,randomModel:null,randomNextModel:null,score:0,timeout:null,lose:!1,stepTime:null,stepInterval:null}},props:{options:{type:Object}},computed:{spentTime:function(){return+((this.endTime-this.startTime)/1e3).toFixed(2)}},created:function(){this.initData()},methods:{initData:function(){this.score=0,this.stepTime=500,this.lose=!1,this.startTime=null,this.endTime=null,this.cells=new Array(this.size[0]);for(var t=0;t<this.cells.length;t++)this.cells[t]=new Array(this.size[1]).fill({value:0});this.setKeyEventHandler(),this.buildModel(),this.setTimeOut(),this.setStepTime()},setKeyEventHandler:function(){this.lose?window.removeEventListener("keydown",this.onKeyDown):window.addEventListener("keydown",this.onKeyDown)},onKeyDown:function(t){var e=this;switch(t.keyCode){case this.options.arrowCodes[0]:this.currentModel.model.every(function(t){return t[1]>0&&"set"!==e.cells[t[0]][t[1]-1].value})&&this.currentModel.model.map(function(t){t[1]--});break;case this.options.arrowCodes[1]:this.rotateModel();break;case this.options.arrowCodes[2]:this.currentModel.model.every(function(t){return t[1]<e.size[1]-1&&"set"!==e.cells[t[0]][t[1]+1].value})&&this.currentModel.model.map(function(t){t[1]++});break;case this.options.arrowCodes[3]:if(this.currentModel.model.some(function(t){return t[0]===e.size[0]-1||"set"===e.cells[t[0]+1][t[1]].value}))return this.setModel(),void this.buildModel();this.currentModel.model.map(function(t){t[0]++});break}this.checkIntersection(),this.setCells(this.currentModel.model[0][0])},setTimeOut:function(){var t=this;this.timeout=setTimeout(function(){t.moveModel()},this.stepTime)},setStepTime:function(){var t=this;this.stepInterval=setInterval(function(){t.stepTime>100?t.stepTime--:clearInterval(t.stepInterval)},3e3)},buildModel:function(){var t=this;if(this.randomModel=this.randomNextModel||Math.ceil(Math.random()*this.options.totalModels),this.randomNextModel=Math.ceil(Math.random()*this.options.totalModels),this.currentModel=this.nextModel||{color:this.randomColor(),model:this.randomizeModel(this.randomModel)},this.nextModel={color:this.randomColor(),model:this.randomizeModel(this.randomNextModel)},this.currentModel.model.some(function(e){return"set"===t.cells[e[0]][e[1]].value}))return clearTimeout(this.timeout),clearInterval(this.stepInterval),this.timeout=null,this.lose=!0,this.setKeyEventHandler(),!0},randomizeModel:function(t){switch(t){case 1:return[[0,Math.floor(this.options.size[1]/2)-2],[0,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)],[0,Math.floor(this.options.size[1]/2)+1]];case 2:return[[1,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)],[1,Math.floor(this.options.size[1]/2)]];case 3:return[[1,Math.floor(this.options.size[1]/2)-2],[1,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)-1],[1,Math.floor(this.options.size[1]/2)]];case 4:return[[1,Math.floor(this.options.size[1]/2)-2],[1,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)]];case 5:return[[0,Math.floor(this.options.size[1]/2)-2],[0,Math.floor(this.options.size[1]/2)-1],[1,Math.floor(this.options.size[1]/2)-1],[1,Math.floor(this.options.size[1]/2)]];case 6:return[[2,Math.floor(this.options.size[1]/2)-1],[1,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)-1],[0,Math.floor(this.options.size[1]/2)]];case 7:return[[2,Math.floor(this.options.size[1]/2)],[1,Math.floor(this.options.size[1]/2)],[0,Math.floor(this.options.size[1]/2)],[0,Math.floor(this.options.size[1]/2)-1]]}},moveModel:function(){for(var t=!1,e=!1,s=0;s<this.currentModel.model.length;s++){var i=this.currentModel.model[s][0],o=this.currentModel.model[s][1];if(i===this.size[0]-1||this.cells[i+1]&&"set"===this.cells[i+1][o].value){this.setModel(),e=this.buildModel(),t=!0;break}}t||this.currentModel.model.map(function(t){t[0]++}),e||(this.checkIntersection(),this.setCells(this.currentModel.model[0][0]),this.setTimeOut())},setModel:function(){var t=this;this.currentModel.model.map(function(e){t.cells[e[0]][e[1]]={color:t.currentModel.color,value:"set"}}),this.checkFullLine()},rotateModel:function(){for(var t=this,e=[],s=0;s<this.currentModel.model.length;s++)e[s]=Object(it["a"])(this.currentModel.model[s]);var i=this.currentModel.rotated||0;if(e=ht(this.randomModel,e,i),e){if(e.rotatedModel.some(function(t){return t[1]<0})?e.rotatedModel.map(function(t){return++t[1]}):e.rotatedModel.some(function(e){return e[1]>t.size[1]-1})?e.rotatedModel.map(function(t){return--t[1]}):e.rotatedModel.some(function(t){return t[0]<0})&&e.rotatedModel.map(function(t){return++t[0]}),e.rotatedModel.some(function(e){return e[0]>=0&&e[1]>=0&&"set"===t.cells[e[0]][e[1]].value}))return;this.currentModel.model=e.rotatedModel,this.currentModel.rotated=e.rotatedStatus}},checkIntersection:function(){for(var t=this,e=0;e<this.size[0];e++)for(var s=0;s<this.size[1];s++)"set"!==this.cells[e][s].value&&(this.cells[e][s].value=0);this.currentModel.model.map(function(e){t.cells[e[0]][e[1]]={color:t.currentModel.color,value:1}})},checkFullLine:function(){var t=this,e=0;this.cells.map(function(s,i){if(s.every(function(t){return t.value})){for(var o=i;o>0;o--)for(var n=0;n<t.cells[o].length;n++)t.cells[o][n].value=t.cells[o-1][n].value;e++}}),e&&(this.score+=Math.pow(e,2))},setCells:function(t){this.$set(this.cells,t,this.cells[t])},checkNext:function(t,e){return this.nextModel.model.some(function(s){return s[0]===t&&s[1]===e})},randomColor:function(){var t=[113,178,128],e=[Math.floor(255*Math.random()),Math.floor(255*Math.random()),Math.floor(255*Math.random())];return this.contrast(e,t)<3?this.randomColor():"rgb(".concat(e[0],",").concat(e[1],",").concat(e[2],")")},luminanace:function(t){var e=t.map(function(t){return t/=255,t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)});return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t,e){var s=this.luminanace(t)+.05,i=this.luminanace(e)+.05;return s>i?s/i:i/s},lighten:function(t){return"rgba".concat(t.slice(3,-1),", 0.8)")}},components:{Modal:B}},ft=dt,mt=(s("3e7f"),Object(c["a"])(ft,et,st,!1,null,"c542ab48",null));mt.options.__file="Tetris.vue";var pt=mt.exports,vt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h1",[t._v("Score: "),s("span",[t._v(t._s(t.score))])]),s("div",{ref:"field",staticClass:"field"},t._l(t.cells,function(e,i){return s("div",{key:i,staticClass:"line"},t._l(e,function(e,o){return s("div",{key:i+""+o,staticClass:"cell",on:{click:function(e){t.onCellClick(i,o)}}},[s("div",{staticClass:"cell__content",class:e})])}),0)}),0),t.finish?s("Modal",{attrs:{result:t.score},on:{restart:t.initData}}):t._e()],1)},bt=[],kt=s("53ca"),Mt={data:function(){return{size:this.options.size,cells:null,colors:this.options.colors,emptyColor:"transparent",score:0,finish:!1}},props:{options:{type:Object}},created:function(){this.initData()},methods:{initData:function(){this.finish=!1,this.cells=[];for(var t=0;t<this.size;t++){this.cells[t]=[];for(var e=0;e<this.size;e++)this.cells[t][e]=this.colors[this.randomColor()]}},onCellClick:function(t,e){if(this.cells[t][e]!==this.emptyColor){var s=this.cells[t][e];this.cells[t][e]=this.emptyColor;var i=this.checkColor(t,e,s);i.length<2?this.cells[t][e]=s:(this.moveDown(i),this.calcScore(i.length),this.setCells(t),this.checkFinish())}},checkColor:function(t,e,s,i){var o=this,n=i||[];n.push([t,e]);var r=this.positions(t,e);return r.map(function(t){o.cells[t[0]]&&o.cells[t[0]][t[1]]===s&&(o.cells[t[0]][t[1]]=o.emptyColor,o.checkColor(t[0],t[1],s,n))}),n},checkFinish:function(){for(var t=this,e=function(e){for(var s=function(s){var i=t.positions(e,s),o=i.some(function(i){return t.cells[i[0]]&&t.cells[e][s]!==t.emptyColor&&t.cells[e][s]===t.cells[i[0]][i[1]]});if(o)return{v:{v:void 0}}},i=0;i<t.cells[e].length;i++){var o=s(i);if("object"===Object(kt["a"])(o))return o.v}},s=0;s<this.cells.length;s++){var i=e(s);if("object"===Object(kt["a"])(i))return i.v}this.finish=!0},moveDown:function(t){for(var e=t.map(function(t){return t[1]}),s=Math.min.apply(Math,e),i=Math.max.apply(Math,e),o=s;o<=i;o++)for(var n=this.size-1;n>=0;n--)if(this.cells[n][o]===this.emptyColor)for(var r=n-1;r>=0;r--)if(this.cells[r][o]!==this.emptyColor){this.cells[n][o]=this.cells[r][o],this.cells[r][o]=this.emptyColor;break}},calcScore:function(t){this.score+=2*t*Math.ceil(t/10)},setCells:function(t){this.$set(this.cells,t,this.cells[t])},randomColor:function(){return Math.floor(Math.random()*this.colors.length)},positions:function(t,e){return[[t-1,e],[t,e-1],[t,e+1],[t+1,e]]}},components:{Modal:B}},Ct=Mt,_t=(s("94d2"),Object(c["a"])(Ct,vt,bt,!1,null,"38eaadfb",null));_t.options.__file="Crush.vue";var yt=_t.exports;i["a"].use(d["a"]);var gt=new d["a"]({mode:"hash",base:"/",routes:[{name:"Home",path:"/",component:M},{name:"Easy",path:"/miner/easy",component:R,props:{options:m.miner.easy}},{name:"Medium",path:"/miner/medium",component:R,props:{options:m.miner.medium}},{name:"Hard",path:"/miner/hard",component:R,props:{options:m.miner.hard}},{name:"Snake",path:"/snake",component:tt,props:{options:m.snake}},{name:"Tetris",path:"/tetris",component:pt,props:{options:m.tetris}},{name:"Crush",path:"/crush",component:yt,props:{options:m.crush}}]}),wt=gt;i["a"].use(o["a"]),i["a"].config.productionTip=!1;var zt=function(t){return t>9?t:"0"+t};i["a"].prototype.formatTime=function(t){var e=Math.floor(t/60),s=t-60*e;return"".concat(zt(e),":").concat(zt(s))},new i["a"]({router:wt,render:function(t){return t(h)}}).$mount("#app")},6311:function(t,e,s){},"64a9":function(t,e,s){},"750b":function(t,e,s){},"78af":function(t,e,s){},"907a":function(t,e,s){},"94d2":function(t,e,s){"use strict";var i=s("750b"),o=s.n(i);o.a},"94e8":function(t,e,s){"use strict";var i=s("cae9"),o=s.n(i);o.a},"97e6":function(t,e,s){"use strict";var i=s("b5d0"),o=s.n(i);o.a},b5d0:function(t,e,s){},b8f8:function(t,e,s){"use strict";var i=s("cea1"),o=s.n(i);o.a},cae9:function(t,e,s){},cea1:function(t,e,s){},cee9:function(t,e,s){},f802:function(t,e,s){}});
//# sourceMappingURL=app.d06be426.js.map