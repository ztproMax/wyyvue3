"use strict";(self["webpackChunkwyy_app"]=self["webpackChunkwyy_app"]||[]).push([[464],{129:function(s,e,i){i.r(e),i.d(e,{default:function(){return C}});var t=i(3396),a=i(9242),n=i(7139);const l=s=>((0,t.dD)("data-v-6753534a"),s=s(),(0,t.Cn)(),s),o={class:"searchTop"},r=l((()=>(0,t._)("use",{"xlink:href":"#icon-zuojiantou"},null,-1))),c=[r],h={class:"searchHistory"},d=l((()=>(0,t._)("span",{class:"lishi"},"历史",-1))),u=["onClick"],y=l((()=>(0,t._)("use",{"xlink:href":"#icon-shanchu"},null,-1))),k=[y],g={class:"itemList"},p=["onClick"],w={class:"leftSpan"},L={class:"itemRight"},f={key:0,class:"icon bofang","aria-hidden":"true"},m=l((()=>(0,t._)("use",{"xlink:href":"#icon-shipinbofang"},null,-1))),v=[m],_=l((()=>(0,t._)("svg",{class:"icon liebiao","aria-hidden":"true"},[(0,t._)("use",{"xlink:href":"#icon-31liebiao"})],-1)));function K(s,e,i,l,r,y){return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("div",o,[((0,t.wg)(),(0,t.iD)("svg",{class:"icon","aria-hidden":"true",onClick:e[0]||(e[0]=e=>s.$router.go(-1))},c)),(0,t.wy)((0,t._)("input",{type:"text",placeholder:"zt",onKeydown:e[1]||(e[1]=(0,a.D2)(((...s)=>y.enterKey&&y.enterKey(...s)),["enter"])),"onUpdate:modelValue":e[2]||(e[2]=s=>r.searchKey=s)},null,544),[[a.nr,r.searchKey]])]),(0,t._)("div",h,[d,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(r.keyWordList,(s=>((0,t.wg)(),(0,t.iD)("span",{key:s,class:"spankey",onClick:e=>y.searchHistory(s)},(0,n.zw)(s),9,u)))),128)),((0,t.wg)(),(0,t.iD)("svg",{class:"icon","aria-hidden":"true",onClick:e[3]||(e[3]=(...s)=>y.delHistory&&y.delHistory(...s))},k)),(0,t._)("div",g,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(r.searchList,((s,e)=>((0,t.wg)(),(0,t.iD)("div",{class:"item",key:e},[(0,t._)("div",{class:"itemLeft",onClick:e=>y.updataIndex(s)},[(0,t._)("span",w,(0,n.zw)(e+1),1),(0,t._)("div",null,[(0,t._)("p",null,(0,n.zw)(s.name),1),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(s.artists,((s,e)=>((0,t.wg)(),(0,t.iD)("span",{key:e},(0,n.zw)(s.name),1)))),128))])],8,p),(0,t._)("div",L,[0!=s.mvid?((0,t.wg)(),(0,t.iD)("svg",f,v)):(0,t.kq)("",!0),_])])))),128))])])],64)}i(541);var W=i(2884),D={data(){return{keyWordList:[],searchKey:"",searchList:[]}},mounted(){this.keyWordList=JSON.parse(localStorage.getItem("keyWordList"))||[]},methods:{enterKey:async function(){if(""!=this.searchKey){this.keyWordList.unshift(this.searchKey),this.keyWordList=[...new Set(this.keyWordList)],this.keyWordList.length>8&&this.keyWordList.splice(this.keyWordList.length-1,1),localStorage.setItem("keyWordList",JSON.stringify(this.keyWordList));let s=await(0,W.xK)(this.searchKey);console.log(s),this.searchList=s.data.result.songs,this.searchKey=""}},delHistory:function(){localStorage.removeItem("keyWordList"),this.keyWordList=[]},searchHistory:async function(s){let e=await(0,W.xK)(s);console.log(e),this.searchList=e.data.result.songs},updataIndex:function(s){s.al=s.album,s.al.picUrl=s.album.artist.img1v1Url,this.$store.commit("pushPlayList",s),this.$store.commit("updataPlayListIndex",this.$store.state.playList.length-1)}}},x=i(89);const H=(0,x.Z)(D,[["render",K],["__scopeId","data-v-6753534a"]]);var C=H}}]);
//# sourceMappingURL=search.478a3120.js.map