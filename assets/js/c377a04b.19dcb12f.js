(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{103:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return u}));var r=t(3),a=t(7),i=(t(0),t(114)),c={},o={unversionedId:"index",id:"index",isDocsHomePage:!1,title:"index",description:"PepperBot",source:"@site/docs/index.md",slug:"/index",permalink:"/PepperBot/docs/index",editUrl:"https://github.com/SSmJaE/PepperBot/edit/master/docs/docs/index.md",version:"current",lastUpdatedBy:"EdIfiMr",lastUpdatedAt:1621287369,formattedLastUpdatedAt:"5/17/2021"},s=[],p={toc:s};function u(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{align:"center"},"PepperBot"),Object(i.b)("p",{align:"center"},"A lightweight QQ bot logic framework, for human"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-py"},'# \u6ce8\u518c\u7fa4\u4e8b\u4ef6\n@register(groupId=123456789)\nclass WhateverNameYouWant:\n    """class\u540d\u79f0\u53ef\u4ee5\u968f\u610f\u8bbe\u7f6e"""\n\n    # \u5982\u65b9\u6cd5\u540dadd_group\u6240\u793a\uff0c\u8fd9\u662f\u52a0\u7fa4\u8bf7\u6c42\u7684\u4e8b\u4ef6\u54cd\u5e94\n    async def add_group(self, bot: AddGroupBot, comment: str, **kwargs):\n        if "\u52a0\u5165\u6211" in comment:\n            await bot.resolve() # \u63a5\u53d7\n        else:\n            await bot.reject() # \u62d2\u7edd\n\n    # \u4e8b\u4ef6\u4e5f\u6709\u751f\u547d\u5468\u671f\uff0cbefore\uff0cafter\uff0c\u53ef\u4ee5\u8fdb\u884c\u62e6\u622a\u7b49\u64cd\u4f5c\n    async def before_group_message(self, **kwargs):\n        pass\n\n    # \u7fa4\u804a\u6d88\u606f\u7684\u4e8b\u4ef6\u54cd\u5e94\n    # \u6240\u6709\u53c2\u6570\u90fd\u6709\u5b8c\u5584\u7684\u7c7b\u578b\u63d0\u793a\uff0c\u4e0d\u9700\u8981\u8bb0\u5fc6\uff0c\u4ee5PascalCase\u7684\u65b9\u6cd5\u540d\u52a0\u4e0a\u53c2\u6570\u540d\u5373\u53ef\n    # \u5982 GroupMessageBot = group_message + bot\n    async def group_message(self, bot: GroupMessageBot, chain: MessageChain, sender: Sender, **kwargs):\n        # chain\u5373\u4e3a\u6d88\u606f\u94fe\uff0cpure_text\u662f\u6d88\u606f\u4e2d\u7684\u7eaf\u6587\u672c\uff0c\u4e0d\u5305\u542b\u8868\u60c5\u3001\u56fe\u7247\u7b49\n        if "\u64a4\u56de\u6211" == chain.pure_text:\n            await chain.withdraw() # \u53ef\u4ee5\u76f4\u63a5\u201c\u64a4\u56de\u6d88\u606f\u201d\uff0c\u7b26\u5408\u76f4\u89c9\n\n        if "\u8e22\u51fa\u6211" == chain.pure_text:\n            await sender.kickout() # \u53ef\u4ee5\u76f4\u63a5\u8e22\u51fa\u53d1\u8a00\u7fa4\u5458\n\n        # \u4e5f\u53ef\u4ee5\u5bf9\u6d88\u606f\u94fe\u8fdb\u884cin\u64cd\u4f5c\uff0c\u76f8\u5f53\u4e8ein chain.pure_text\n        if "\u7981\u8a00\u6211" in chain:\n            await sender.ban(10) # \u53ef\u4ee5\u76f4\u63a5\u7981\u8a00\u53d1\u8a00\u7fa4\u5458\n\n        # \u5224\u65ad\u6d88\u606f\u94fe\u4e2d\uff0c\u662f\u5426\u5305\u542b\u6587\u672c\u6d88\u606f"\u7981\u8a00\u6211"\n        # \u4e0e\u4e0a\u4e00\u6761\u8bed\u53e5\u4e0d\u7b49\u4ef7\n        # \u5982\u679c\u6d88\u606f\u94fe\u4e3aText("\u8bf7\u7981\u8a00\u6211)\uff0c\u5219\u5e76\u4e0d\u4e0eText("\u7981\u8a00\u6211")\u76f8\u7b49\n        # \u56e0\u4e3apure_text\u662f\u6240\u6709Text\u7247\u6bb5join\u8d77\u6765\u7684\n        # \u5982\u679c\u6709Text("\u6587\u5b571")Face(100)Text("\u6587\u5b572")\u8fd9\u6837\u4e00\u6761\u6d88\u606f\n        # \u5219pure_text\u4e3a"\u6587\u5b571\u6587\u5b572"\n        if Text("\u7981\u8a00\u6211") in chain:\n            pass\n\n        # \u53ef\u4ee5\u76f4\u63a5\u5224\u65ad\u6d88\u606f\u94fe\u4e2d\u662f\u5426\u5305\u542b\u8868\u60c5\uff0c\u5e76\u4e0d\u6307\u5b9a\u662f\u54ea\u4e00\u4e2a\u8868\u60c5\n        if Face in chain:\n            pass\n\n        # \u6307\u5b9a\u4e86\u662f\u201c\u7b11\u8138\u201d\u8868\u60c5\uff0c\u5224\u65ad\u6d88\u606f\u94fe\u4e2d\u662f\u5426\u5305\u542b\u7b11\u8138\n        if Face(100) in chain:\n            pass\n\n        # chain.has\u7684\u6548\u679c\u4e0ein\u4e00\u81f4\n        if chain.has(Image):\n            pass\n\n        # \u4e00\u4e2a\u5feb\u6377\u64cd\u4f5c\uff0c\u8fd4\u56de\u8868\u60c5\u5b58\u5728\u4e0e\u5426\uff0c\u4e0e\u6700\u540e\u4e00\u4e2a\u8868\u60c5\n        # \u4e5f\u53ef\u4ee5\u6307\u5b9a\u5177\u4f53\u7684\u8868\u60c5\u662f\u5426\u5b58\u5728\uff0chas_and_last(Face(100))\n        hasFace, face = chain.has_and_last(Face) \n        if hasFace:\n            await bot.group_msg(face)\n\n        # \u83b7\u53d6\u6d88\u606f\u94fe\u4e2d\u7684\u6240\u6709\u8868\u60c5\n        faces = chain.faces\n\n        # \u652f\u6301\u5207\u7247\u64cd\u4f5c\n        firstFace = faces[0]\n\n        # \u4e5f\u652f\u6301\u5176\u5b83\u6d88\u606f\u7247\u6bb5\n        images = chain.images\n        images[1:3]\n\n        # \u53ef\u4ee5\u76f4\u63a5\u5bf9chain\u8fdb\u884c\u6b63\u5219\u64cd\u4f5c\uff0c\u4e0d\u7528\u624b\u52a8\u4f7f\u7528re\u5e93\n        if chain.regex("\u8bf7?\u7981\u8a00\u6211?"):\n            await sender.ban(10)\n\n        if chain.regex("\u6709\u4eba(\u5728|\u5417|\u561b|\u5728\u5417).?"):\n            # \u53d1\u9001\u4e00\u6761\u7fa4\u6d88\u606f\n            # \u63a5\u53d7\u4efb\u610f\u4e2a\u53c2\u6570\uff0c\u5fc5\u987b\u662f\u5408\u6cd5\u7684\u6d88\u606f\u7247\u6bb5\uff0c\u6bd4\u5982Text\uff0cFace\uff0cImage\n            await bot.group_msg( \n                Text("\u6ca1\u4eba"),\n                Face(150)\n            )\n\n        # \u5bf9\u4e8e\u591a\u6761\u4ef6\u5224\u65ad\uff0c\u63d0\u4f9b\u4e86any\uff0c\u6bcf\u4e00\u4e2a\u53c2\u6570\u90fd\u662f\u4e00\u4e2a\u6b63\u5219\n        if chain.any("\u80fd", "\u53ef\u4ee5") and chain.any("\u8003\u8bd5", "\u6d4b\u8bd5"):\n            # \u5f15\u7528\u56de\u590d\n            await chain.reply( \n                Text("\u652f\u6301\u73ed\u7ea7\u6d4b\u8bd5\uff0c\u4e0d\u8fc7\u9898\u76ee\u6536\u5f55\u4e0d\u5b8c\u6574\\n"),\n                Text("\u4e3a\u4ec0\u4e48\u4e0d\u81ea\u5df1\u8bd5\u4e00\u8bd5\u5462\uff1f"),\n                Face(100)\n            )\n')))}u.isMDXComponent=!0},114:function(e,n,t){"use strict";t.d(n,"a",(function(){return f})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),u=function(e){var n=a.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},f=function(e){var n=u(e.components);return a.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},l=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=u(t),l=r,m=f["".concat(c,".").concat(l)]||f[l]||d[l]||i;return t?a.a.createElement(m,o(o({ref:n},p),{},{components:t})):a.a.createElement(m,o({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,c=new Array(i);c[0]=l;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var p=2;p<i;p++)c[p]=t[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}l.displayName="MDXCreateElement"}}]);