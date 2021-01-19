(this.webpackJsonpmixtape_planner=this.webpackJsonpmixtape_planner||[]).push([[0],{155:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return f}));var a=n(26),i=n.n(a),r=n(156),o=n(112),c=n(46),l=n(253),s=n(125),u=n(248),h=n(255),d=n(254),b=n(249),j=n(165),x=n(69),g=n(47),O=n(157),p=n(68),m=n(158),f=function(){var e=Object(c.a)(i.a.mark((function e(n){var a,f,A,y,v,M,S,k,I,T,w,C,L,B,E,R,P;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.tracks,f=n.intro,A=n.outro,y=n.targetLength,v=n.penalties,M=n.tolerance,S=n.seed,k=n.timeout,I=void 0===k?.5:k,T=Object.fromEntries(Object.keys(v).map((function(t){var e=l.a(s.a(["properties",t]),a);return[t,Object(x.a)(e)]}))),w=u.a((function(t,e,n){var a=T[e],i=a.min,r=a.max;return{weight:n[e].weight,values:Object(x.b)(i,r)(h.a(0,y).map((function(t){return n[e].fn(t)})))}}),v),C=function(t,e){var n=Object.keys(w).map((function(n){var a=w[n];return a.weight*Object(p.b)(a.values[t],e.properties[n])}));return d.a(n)},L=[],B={path:[],penalty:1/0},E=function e(n,a,l){return new Promise((function(s){return t(Object(c.a)(i.a.mark((function t(){var c,u,h,d,x,O,p,m,f,A;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=C(n.currentLength,n.track),u=n.currentPenalty+c,h=n.currentLength===y-2,d=h?void 0:Object(g.a)(n.track,l).filter((function(t){return C(n.currentLength+1,t)<M})),h&&u<B.penalty){for(x=[],O=n;null!==O;)x.push(O.track),O=O.previous;B={penalty:u,path:[].concat(Object(o.a)(b.a(x)),[a])},L.splice(0,0,B),console.log("Found path with penalty: ".concat(u))}if(!(Object(g.c)(!1)(n.track,a)>y-n.currentLength-3||h||0===d.length||n.currentPenalty>B.penalty)){t.next=8;break}return t.abrupt("return",s());case 8:p=0,m=Object(r.a)(d),t.prev=10,m.s();case 12:if((f=m.n()).done){t.next=19;break}return A=f.value,0===n.currentLength&&(console.log("".concat(Math.round(p/d.length),"%")),p++),t.next=17,e({previous:n,track:A,currentLength:n.currentLength+1,currentPenalty:n.currentPenalty+c},a,j.a([A],l));case 17:t.next=12;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(10),m.e(t.t0);case 24:return t.prev=24,m.f(),t.finish(24);case 27:return t.abrupt("return",s());case 28:case"end":return t.stop()}}),t,null,[[10,21,24,27]])}))))}))},R=Date.now(),e.next=10,Object(O.a)((function(){return E({previous:null,track:f,currentLength:0,currentPenalty:0},A,j.a([f,A],a).sort((function(){return m(S)-.5})))}),60*I*1e3);case 10:return P=Date.now()-R,console.log("Graph done"),console.log("Tracks: ".concat(a.length,", Graph time: ").concat(P)),e.abrupt("return",L);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}).call(this,n(136).setImmediate)},157:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var a=n(26),i=n.n(a),r=n(46),o=function(t,e){var n;return Promise.race([new Promise((function(t){return n=setTimeout((function(){return console.log("Timeout!"),t()}),e)})),new Promise(function(){var e=Object(r.a)(i.a.mark((function e(a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t();case 2:return r=e.sent,console.log("Done"),clearTimeout(n),e.abrupt("return",a(r));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())])}},182:function(t,e,n){},183:function(t,e,n){},221:function(t,e){},229:function(t,e){},231:function(t,e){},244:function(t,e,n){"use strict";n.r(e);var a=n(2),i=n(0),r=n.n(i),o=n(14),c=n.n(o),l=(n(182),n(13)),s=(n(183),n(91)),u=n(26),h=n.n(u),d=n(152),b=n(46),j=n(112),x=n(153),g=n(116),O=n.n(g),p=function(t){var e=t.trim().split("\n").map((function(t){return t.trim().split("\t")}));if(0===e.length)return[];var n=e[0],a=e.filter((function(t){return t.length===n.length}));O()("artist"===n[0].toLowerCase()),O()("title"===n[1].toLowerCase()),O()("key"===n[2].toLowerCase()||"key text"===n[2]);var i=n.slice(3);return a.slice(1).map((function(t){var e=Object(x.a)(t),n=e[0],a=e[1],r=e[2],o=e.slice(3);try{return{title:a,artist:n,keyNumber:parseInt(r.slice(0,-1)),isMinor:"B"===r[r.length-1]||"d"===r[r.length-1],properties:Object.fromEntries(o.map((function(t,e){return[i[e],t.match(/(\d+)$/)[1]]})))}}catch(c){console.error("Error processing row: ".concat(a," ").concat(n," ").concat(r," ").concat(o))}}))},m="Artist\tTitle\tKey\tComment\nInspected\tDestroy\t11A\t1\nSweatson Klank\tSmile (Original Mix)\t10B\t2\nInspected\tOnce\t9A\t3\nShield\tSlavik\t8A\t6\nIvy Lab\tHotel Motel (Original Mix)\t7A\t7\nCraze, Balatron\tWord Up (feat. Balatron) (Original Mix)\t6A\t8\nMefjus\tAssembler (Original Mix)\t7A\t10\n",f=n(125),A=n(255),y=n(300),v=n(253),M=n(111),S=n(319),k=n(165),I=n(304),T=n(305),w=n(310),C=n(68),L=n(69),B=n(301),E=n(251),R=n(309),P=n(293),D=n(297),H=n(296),F=n(292),N=n(294),K=n(295),z=n(291),W=n(47),V=n(154),G=n.n(V),J=n(316),U=G()({root:{width:"100%"},container:{maxHeight:400}});function Y(t){var e=t.tracks,n=t.editing,i=t.selectedTrackIndex,r=t.onTrackSelected,o=U();return Object(a.jsx)(z.a,{className:o.root,children:Object(a.jsx)(F.a,{className:o.container,children:Object(a.jsxs)(P.a,{stickyHeader:!0,size:"small",children:[Object(a.jsx)(N.a,{children:Object(a.jsxs)(K.a,{children:[n?Object(a.jsx)(H.a,{children:"Select"}):null,Object(a.jsx)(H.a,{children:"Artist"}),Object(a.jsx)(H.a,{children:"Title"}),Object(a.jsx)(H.a,{children:"Key"}),e[0]?Object.keys(e[0].properties).map((function(t,e){return Object(a.jsx)(H.a,{children:t.replace(/^./,t[0].toUpperCase())},e)})):null]})}),Object(a.jsx)(D.a,{children:e.map((function(t,e){return Object(a.jsxs)(K.a,{children:[n?Object(a.jsx)(H.a,{children:Object(a.jsx)(J.a,{checked:i===e,onChange:function(){return r(e)}})},"select"):null,Object(a.jsx)(H.a,{children:t.artist}),Object(a.jsx)(H.a,{children:t.title}),Object(a.jsx)(H.a,{children:Object(W.b)(t.keyNumber,t.isMinor)}),Object.values(t.properties).map((function(t){return Object(a.jsx)(H.a,{children:t},"property")}))]},e)}))})]})})})}var Z,_=n(317),X=n(320),q=n(315),$=n(321),Q=n(53),tt=n.n(Q),et=n(306),nt=n(307),at=n(302),it=n(155),rt=n(308),ot=function(t){var e="Artist\tTitle\tKey\t".concat(Object.keys(t[0].properties).join("\t")),n=t.map((function(t){var e=t.title,n=t.artist,a=t.keyNumber,i=t.isMinor,r=t.properties;return"".concat(n,"\t").concat(e,"\t").concat(Object(W.b)(a,i),"\t").concat(Object.values(r).join("\t"))})).join("\n");return"".concat(e,"\n").concat(n)},ct=n(106),lt=n.n(ct),st=n(318),ut=n(298),ht=n(159),dt=n.n(ht),bt=n(299),jt=n(250),xt=function(t){return Object(a.jsxs)(st.a,{children:[Object(a.jsx)(ut.a,{expandIcon:Object(a.jsx)(dt.a,{color:"primary"}),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header",children:"Instructions"}),Object(a.jsx)(bt.a,{children:Object(a.jsxs)(jt.a,{children:["The planner is rather picky about the input it gets currently (a TSV formatted text with Artist, Title, Key and Comment columns). In order to produce such a file do the following:",Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),"Export a playlist from Traktor as a web page. Include the Artist, Title, Key (or Key Text) and Comment columns. The planner uses the Comment column as input for the mood (target curve). The column can contain other data as well, but it needs to end with a number. If you are using ",Object(a.jsx)("a",{href:"https://mixedinkey.com",children:"Mixed in Key"}),", you can configure it to write the energy level to the comment tag (Settings > Update Tags > Where to write it > Overwrite comments). If you do not have Mixed in Key, you can use a service like"," ",Object(a.jsx)("a",{href:"https://tunebat.com",children:"Tunebat"})," to get the key and mood info.",Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),t.children]})})]})},gt=function(t){return f.a([0],Object.entries(t.properties))},Ot=function(t){return f.a([1],gt(t))},pt=function(t,e,n){var a=t.min,i=t.max;return Object(L.b)(a,i)(A.a(0,e).map((function(t){return n(t)})))},mt=(Z=10,function(t){return t.length>Z?"".concat(t.substring(0,Z),"..."):t}),ft=function(){var t=Object(i.useState)("Artist\tTitle\tKey\tComment\nInspected\tDestroy\t11A\t1\nEPROM\t9 To Ya Dome\t12A\t6\ndope\tIt Ain't Bangin'\t4A\t6\nEPROM & G Jones\tWarrior\t4A\t2\nEPROM\tSamurai\t4A\t9\nEPROM\tBrixton\t4A\t4\nHolly\tHolly & Mr. Bill - Geen Idee\t9A\t5\nInspected\tRead\t9A\t2\nInspected\tOnce\t9A\t3\nInspected\tThen\t9A\t9\nKursa\tT\u014dsuto\t4A\t6\nKursa\tDat Style\t4A\t6\nKursa\tHip-Hopeless\t4A\t6\nKursa X Lone Drum\tUnarmoured Sulk\t4A\t7\nKursa\tYea, OK\t12A\t6\nMark Instinct\tMark Instinct - Singularity\t9A\t8\nSKEW & occup\xe9\tBad Replica\t5A\t10\nSkew & ReDraft\tNo Hype\t4A\t4\nSKEW\tCharged Up\t9A\t7\nSKEW\tDon Robot\t5A\t7\nSKEW\tCyborg Rising\t1A\t4\nSKEW\tAcid Meltdown\t2A\t2\nDroeloe\tStep By Step (Fytch Remix)\t10A\t6\nMo Vibez\tLike Us (Original Mix)\t10A\t8\nEkcle\tCrafted In Ice\t10A\t7\nFytch, Graves\tExhale feat. Fytch (Original Mix)\t11A\t6\nShades\tGravediggin' feat. Alix Perez and Eprom (Original Mix)\t11A\t3\nAleph\tGoliath (Original Mix)\t11A\t2\nSofie Letitre\tI'll Be Fine (Zes Remix)\t11A\t8\nShades\tCreepin' (Original Mix)\t11A\t7\nMonty\tSharp Teeth (Original Mix)\t11A\t8\nyunis\tIllusions\t11A\t6\nSignal, Disprove, Ordure\tZwendel feat. Ordure (Original Mix)\t12A\t7\nRun Dmt, Vorso\tGamma Ray (feat. Vorso) (Original Mix)\t12A\t5\nKije\tMorze (Original Mix)\t12A\t6\nRun Dmt\tTesseract (Vorso Remix)\t1A\t0\nChee\tPedigrief (Original Mix)\t1A\t7\nMystic State\tEffwatya (Ft.Third Degree)\t2A\t5\nG Jones\tIn Your Head (Original Mix)\t2A\t8\nSigns\tPolymorph (Original Mix)\t2A\t7\nMo Vibez, L.o.J, L*o*J\tWisdom (Feat. L*o*J) feat. L*o*J (Original Mix)\t2A\t4\nBalatron\tWay Back (Original Mix)\t2B\t9\nBalatron\tPoseidon (Original Mix)\t2B\t6\nMystic State\tWhole Half\t2B\t6\nBalatron\tHUGINN (Original Mix)\t2B\t7\nCesco\tDrones\t4A\t6\nMr.Frenkie\tAttrakt (Original Mix)\t4A\t8\nSigns\tNaegleria (Original Mix)\t4A\t7\nEnei\tCrunchy (Original Mix)\t4A\t4\nAleph\tSolomon (Original Mix)\t4A\t6\nShield\tVatos\t4A\t8\nCrimes!\tClicc (Original Mix)\t4A\t7\nThelem\tThird Time Lucky\t4A\t8\nV. A.\tDJ Ride - Pump My\t4A\t6\nBalatron\tD.Y.E Pop (Original Mix)\t4A\t5\nSigns\tSkin Out (Original Mix)\t4A\t4\nDJ Craze, Icicle, Teddy Killerz\tLouder feat. DJ Craze (Original Mix)\t4A\t7\nEmperor\tJounce (Ivy Lab's 20/20 Remix)\t4A\t6\nIvy Lab\tMagikess (Original Mix)\t4A\t6\nVue\tHologram (Original Mix)\t4A\t5\nChee\tGet Hot ft. Noclu (G Jones Remix)\t4A\t8\nKursa\tPrecisely\t4A\t7\nV. A.\tVorso - Cephalopod\t4A\t8\nWoolymammoth\tPrasak (Original Mix)\t4A\t4\nCrimes!\tRealson (Original Mix)\t4A\t7\nTsuruda\tKicking Wolf\t4A\t5\nMefjus\tRingshifter (Culprate Remix)\t4A\t8\nCulprate & Skope\tBlowfish\t4A\t6\nIvy Lab\tIvy Lab - Jinxed\t4A\t5\nBreak, SpectraSoul\tInside (Original Mix)\t4A\t3\nARKTKT\tUminari\t5A\t5\nCreepa, Mo Vibez\tDR777 (Original Mix)\t5A\t4\nARKTKT\tTesseract\t5A\t5\nMystic State\tZoo (Ft.Jakaboski)\t5A\t6\nShield\tDank Drip\t5A\t5\nAk:Hash\tShady (Original Mix)\t6A\t9\nBalatron\tFlip Your Hands (Original Mix)\t6A\t10\nCraze, Balatron\tWord Up (feat. Balatron) (Original Mix)\t6A\t8\nShield\tViking Journey\t6A\t7\nBalatron\tMUNINN (Original Mix)\t6A\t7\nHerzeloyde\tSlice & Dice\t7A\t5\nEkcle\tWithin The Palms Of A God\t7A\t6\nV. A.\tSkew & yunis - Trippin\t7A\t8\nSignal, Apashe, Black Prez\tDies Irae (Signal Remix)\t7A\t6\nIvy Lab\tHotel Motel (Original Mix)\t7A\t7\nEwol\tDespair (Ak:Hash Remix)\t7A\t6\nShield\tSlavik\t8A\t6\nEkcle\tMoonstone\t8A\t6\nShades\tIron Sharpens Iron (Original Mix)\t8A\t6\nAk:Hash\tStoner (Original Mix)\t8A\t3\nShield\tChicago\t8A\t1\nShield\tDracula\t8A\t6\nShield\tHorrormovie (Shuffle Edit)\t8A\t6\nShield\tBowling Frontier\t9A\t6\nHerzeloyde\tInverted Bumps ft Hapa & Tsuruda\t9A\t6\nMo Vibez\tModulation\t9A\t8\nV. A.\t1-800-BAD-TRIP - Turtle Soup\t9A\t7\nShades\tChiron (Remix)\t9A\t0\nPhazz\tCaution (Original Mix)\t9A\t6\nShield\tHome Alone\t9A\t7\nShield\tHorrormovie (Dirty VIP)\t9A\t5\nKije\tOnce Again (Original Mix)\t9A\t8\nShades, Ivy Lab\tSleaze (Original Mix)\t9A\t5\nCrimes!\tFXXXUp (Original Mix)\t9A\t9\nSabre\tYoga (Original Mix)\t9A\t6\nCraze, Shield\tHumans are Stupid (feat. Shield) (Original Mix)\t9A\t5\nJon Casey\tDimes\t9A\t8\nMad Zach\tRobovox (Original Mix)\t2d\t1\nJUNE MILLER/TEDDY KILLERZ\tWildlife (CVPELLV remix)\t9A\t5\nMonuman\tRise\t2A\t9\nNoisia/Ivy Lab\tPossession\t7A\t6\nSHIELD\tFools\t4A\t8\nShield & Submarine\tMarch Of Giants\t4A\t2\nSigns\tClap Yah\t4A\t6\nNoisia, Mono & Poly\tThe Nomad\t5A\t1\nBlack Sun Empire, Noisia\tHideous (Doctrine Remix)\t6A\t5\nSHIELD\tMy Flava\t6A\t4\nRICHIE BRAINS\tLikkle Som\t8A\t2\nIVY LAB\tBerlusconi\t8A\t7\nBleep Bloop\tRecombine\t9A\t2\nIvy Lab & Tim Parker\tU Smart\t9A\t5\nPosij\tGrab The Cookie\t9A\t5\nFlosstradamus\tRoll Up (Baauer Remix)\t4A\t9\nEmperor\tForeword (Original Mix)\t2B\t7\nSigns\tUnchained\t4A\t0\nSigns\tSacril\xc3\xa8ge (Original Mix)\t4A\t2\nSigns, Sotilas\tFrench Slang (Original Mix)\t4A\t5\n\t4A - 170 - Shield - Horrormovie (Full)\t4A\t6\nLevela\tRiot Shield\t4A\t10\nShield\tDomestic Problems\t6A\t2\nShield\tHollywood Swing\t6A\t2\nHolly\tHolly vs. Shield - Schizo\t4A\t7\nHolly\tHolly vs. Shield - Schizo (Subp Yao Remix)\t9A\t6\nShield, Ordure\tDumflad (Original Mix)\t4A\t6\nShield\tBe_F\t4A\t1\nShield & 2Stars\tPink Soap\t5A\t3\nShield\tSkippy Vinyl (Original Mix)\t5A\t3\n\tShield - Nightlife (CART FREEBIE)\t6A\t1\n\tShield - I Like That (CART FREEBIE) v2\t6A\t10\nShield\tGoofy (Original Mix)\t7A\t6\nShield\tCopenhagen (Original Mix)\t9A\t2\nPEREZ, Alix/EPROM\tChiron\t9A\t4\nShades\tPowers of Two feat. Alix Perez and Eprom (Original Mix)\t6B\t7\nShades\tSickle (Original Mix)\t6A\t6\nIvy Lab\tCalculate (Original Mix)\t10A\t6\nMonuman\tSasquatch (Original Mix)\t4A\t7\nEprom\tPipe Dream (Original Mix)\t5A\t1\nEprom, ZEKE BEATS\tHumanoid 2.0 (Original Mix)\t4A\t8\nBalatron\tZero Caliber (Original Mix)\t11A\t6\nBalatron\tPoseidon (Original Mix)\t2B\t7\nBalatron\tStraight Thuggin (Original Mix)\t4A\t6\nBalatron\tNeck Snapper (Original Mix)\t4A\t0\nIVY LAB\tUbane\t9A\t8\nIVY LAB\tPlanebeats\t4A\t3\nIvy Lab\tSunday Crunk (Mefjus Remix)\t8A\t7\nIVY LAB\tThird World Cop\t2A\t1\nEmperor, Ivy Lab\tPepper (Deft Remix)\t4A\t8\nIvy Lab\tShamrock V.I.P (Original Mix)\t9A\t9\nIvy Lab\tStars (Original Mix)\t9A\t1\nIvy Lab\tAll Day Swimming (Original Mix)\t7A\t4\nTwo Fingers, Ivy Lab\tOrange (Original Mix)\t6A\t3\nTwo Fingers, Ivy Lab\tHotline (Original Mix)\t6A\t7\nIvy Lab x Two Fingers\t\"Hotline\"\t6A\t10\nIvy Lab\tIvy Lab - Space War 169 (Instrumental)\t4A\t2\nIvy Lab\tIvy Lab feat. Onoe Caponoe & L-Zee Roselli - Space War 169\t4A\t6\nIvy Lab\tSpooky Dub (Original Mix)\t4A\t5\nIvy Lab\tChic (Original Mix)\t4A\t4\nIvy Lab\t650 CC (Original Mix)\t4A\t0\nIvy Lab\tIvy Lab - Wideboi\t1B\t7\nIvy Lab\tIvy Lab - Zip It\t11A\t0\nIvy Lab\tWhen I Go (Original Mix)\t10A\t7\nTsuruda\tHammer (Original Mix)\t9A\t5\nTsuruda\tJokes (Original Mix)\t9A\t6\nTsuruda\tOut Here (Original Mix)\t2A\t8\nTsuruda\tPack Heat (Original Mix)\t12A\t2\nTsuruda\tCousin Litt's Revenge (Original Mix)\t11A\t7\nTsuruda\traider (Original Mix)\t9A\t7\nBleep Bloop, Tsuruda\tTremors (Original Mix)\t4A\t9\nTim Parker\tWarped Wing (Original Mix)\t6A\t6\nTim Parker\tRules (Original Mix)\t5A\t10\nCruk, Shyun\tCreatures (Original Mix)\t4A\t3\nMono/Poly\tTeach You All A Lesson\t5A\t2\nG Jones\tImmortal Light (Original Mix)\t4A\t9\nEPROM & G Jones\tWarrior\t4A\t7\nG Jones\tTime (Original Mix)\t5A\t4\nG Jones\tHelix (Original Mix)\t11A\t1\nIMANU\tNoir (Original Mix)\t9A\t7\nIMANU\tDream Mentor (Original Mix)\t4A\t2\nHolly, Machinedrum\tBerry Patch (IMANU Remix)\t12A\t3\nPosij\tHella Sideways (Original Mix)\t12B\t2\nSweatson Klank\tSmile (Original Mix)\t10B\t2\nNoer the Boy\tNosferatu's Castle (Original Mix)\t5A\t9\nNoer the Boy\tZaroff (Original Mix)\t4A\t5\nNoer the Boy\tTour (Original Mix)\t2A\t4\nTek Genesis\tRaid (Jon Casey Remix)\t7A\t9\nMark Instinct\tMark Instinct & Holly - The Bends (CRIMES! Remix)\t4A\t1\nBalatron\tDat Buddah Shii (Original Mix)\t6A\t0\nBalatron\tZout (Original Mix)\t4A\t9\nBalatron\tActively Faded (Original Mix)\t9A\t5\nTorbj\xc3\xb8rn\tMan's Got Game (Sigrah Remix)\t12A\t8\nMefjus\tAssembler (Original Mix)\t7A\t10\n"),e=Object(l.a)(t,2),n=e[0],r=e[1],o=Object(i.useState)(p(n)),c=Object(l.a)(o,2),s=c[0],u=c[1],x=Object(i.useState)([]),g=Object(l.a)(x,2),O=g[0],P=g[1],D=Object(i.useState)({penalty:void 0,path:p(m)}),H=Object(l.a)(D,2),F=H[0],N=H[1],K=Object(i.useState)(7),z=Object(l.a)(K,2),W=z[0],V=z[1],G=Object(i.useState)(2),J=Object(l.a)(G,2),U=J[0],Z=J[1],Q=Object(i.useState)(1.5),ct=Object(l.a)(Q,2),st=ct[0],ut=ct[1],ht=Object(i.useState)(!1),dt=Object(l.a)(ht,2),bt=dt[0],jt=dt[1],ft=Object(i.useState)(!0),At=Object(l.a)(ft,2),yt=At[0],vt=At[1],Mt=Object(i.useState)(!1),St=Object(l.a)(Mt,2),kt=St[0],It=St[1],Tt=Object(i.useState)(!1),wt=Object(l.a)(Tt,2),Ct=wt[0],Lt=wt[1],Bt=Object(i.useState)(s[0]),Et=Object(l.a)(Bt,2),Rt=Et[0],Pt=Et[1],Dt=Object(i.useState)(y.a(s)),Ht=Object(l.a)(Dt,2),Ft=Ht[0],Nt=Ht[1],Kt=Object(i.useState)(!0),zt=Object(l.a)(Kt,2),Wt=zt[0],Vt=zt[1],Gt=Object(i.useState)(0),Jt=Object(l.a)(Gt,2),Ut=Jt[0],Yt=Jt[1],Zt=Object(i.useState)(!1),_t=Object(l.a)(Zt,2),Xt=_t[0],qt=_t[1],$t=Object(i.useState)([8,8,9,9,2,3,6,9,10,5,6,7,10,10,6,7,8,9,10,10].map((function(t){return{value:t}}))),Qt=Object(l.a)($t,2),te=Qt[0],ee=Qt[1],ne=Object(i.useState)(""),ae=Object(l.a)(ne,2),ie=ae[0],re=ae[1],oe=Object(i.useState)(!0),ce=Object(l.a)(oe,2),le=ce[0],se=ce[1],ue=Object(i.useState)(m),he=Object(l.a)(ue,2),de=he[0],be=he[1],je=Object(L.a)(v.a(Ot,s)),xe=[{name:"Raising Saw",fn:Object(C.c)(7,W)},{name:"Saw",fn:Object(C.d)(7)},{name:"Absolute sine",fn:C.a},{name:"Manual",fn:function(t){return te[t].value}}],ge=Object(i.useState)(xe[0]),Oe=Object(l.a)(ge,2),pe=Oe[0],me=Oe[1],fe=Object(i.useState)(pt(je,W,pe.fn)),Ae=Object(l.a)(fe,2),ye=Ae[0],ve=Ae[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(B.a,{maxWidth:"md",children:[Object(a.jsx)("h1",{children:"Mixtape Planner"}),Object(a.jsx)("p",{children:"There are a huge number of ways to arrange tracks and finding just the right one that matches the mood you are after can be a burden. Want to go from one track to another, but just cannot seem to find the right tracks to put in between them? This is just the right tool for the job!"}),Object(a.jsx)("p",{children:"Start by dropping a list of tracks below, selecing the track to start from, the track to end up at and the mood you are after. Let the planner work its magic and prepare to be amazed by the combinations it spits out!"}),Object(a.jsxs)("p",{children:["If giving the task of generating tracklists to a computer feels uncanny, you can use the tool for only visualising your plans by heading over to the ",Object(a.jsx)("a",{href:"#result",children:"Result section"})," and dropping your tracks there instead!"]}),Object(a.jsx)("h2",{children:"Parameters"}),Object(a.jsxs)("h3",{children:["Playlist"," ",Object(a.jsx)(E.a,{size:"small",disabled:bt,onClick:function(){if(yt){vt(!1);var t=p(n);u(t),Vt(!0),Pt(t.find(M.a(Rt))),Nt(t.find(M.a(Ft)))}else vt(!0)},color:"primary",variant:"contained",children:yt?"Parse":"Import / Edit"})]}),yt?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(xt,{children:"After exporting the playlist, open the web page and copy and paste the contents (including the headers) into the field below. Then click the Parse button above and if everything goes well, you are ready to start generating interesting track combinations!"}),Object(a.jsx)("br",{})]}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("h4",{children:["First track"," ",Object(a.jsx)(E.a,{disabled:bt,size:"small",color:"primary",variant:"contained",onClick:function(){return It(!kt)},children:kt?"Done":"Edit"})]}),Object(a.jsx)(Y,{tracks:kt?s:[Rt].filter(S.a),editing:kt,disabled:bt,onTrackSelected:function(t){Pt(s[t]),Vt(!0)},selectedTrackIndex:s.findIndex(M.a(Rt))},"intro"),Object(a.jsxs)("h4",{children:["Last track"," ",Object(a.jsx)(E.a,{disabled:bt,size:"small",color:"primary",variant:"contained",onClick:function(){return Lt(!Ct)},children:Ct?"Done":"Edit"})]}),Object(a.jsx)(Y,{tracks:Ct?s:[Ft].filter(S.a),editing:Ct,disabled:bt,onTrackSelected:function(t){Nt(s[t]),Vt(!0)},selectedTrackIndex:s.findIndex(M.a(Ft))},"outro"),Object(a.jsx)("h4",{children:"Rest"}),Object(a.jsx)(Y,{tracks:k.a([Rt,Ft],s)},"middle")]}),Object(a.jsx)("div",{style:{display:yt?"block":"none"},children:Object(a.jsx)(_.a,{fullWidth:!0,rowsMax:20,multiline:!0,variant:"outlined",onChange:function(t){r(t.target.value)},onKeyDown:function(t){if("Tab"===t.key){t.preventDefault();var e=t.target,n=e.selectionStart,a=e.selectionEnd;e.value=e.value.substring(0,n)+"\t"+e.value.substring(a),e.selectionStart=e.selectionEnd=n+1,r(e.value)}},value:n})}),Object(a.jsx)("h3",{children:"Number of tracks between first and last"}),Object(a.jsx)(X.a,{min:3,max:30,valueLabelDisplay:"on",value:W-2,disabled:bt,style:{marginTop:20},onChange:function(t,e){V(e+2),Vt(!0),ve(pt(je,W,pe.fn))}}),Object(a.jsx)("h3",{children:"Target curve"}),Object(a.jsx)(q.a,{value:pe.name,disabled:bt,onChange:function(t){var e=xe.find(I.a("name",t.target.value));me(e),Vt(!0),ve(pt(je,W,e.fn))},children:xe.map((function(t){var e=t.name;return Object(a.jsx)($.a,{value:e,children:e},e)}))}),"Manual"===pe.name?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h4",{children:"Values"}),A.a(0,W).map((function(t){return Object(a.jsxs)(a.Fragment,{children:[0!==t&&t%10===0?Object(a.jsx)("br",{}):null,Object(a.jsx)(_.a,{size:"small",variant:"outlined",style:{width:60,marginBottom:10},label:(t+1).toString(),value:te[t].value,onChange:function(e){te[t].value=T.a(0,10,parseInt(e.target.value)||0),ee(Object(j.a)(te)),Vt(!0)}},t)]})}))]}):null,Object(a.jsx)(tt.a,{options:{chart:{id:"apexchart-example"},xaxis:{categories:A.a(1,W+1)}},series:[{name:"energy target",data:pt(je,W,pe.fn)}],height:"200"}),Object(a.jsx)(et.a,{control:Object(a.jsx)(nt.a,{checked:Xt,onChange:function(){qt(!Xt)}}),label:"Show advanced options"}),Xt?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h3",{children:"Processing timeout (minutes)"}),Object(a.jsx)(X.a,{min:.5,max:5,step:.1,valueLabelDisplay:"on",value:U,disabled:bt,onChange:function(t,e){Z(e),Vt(!0)}}),Object(a.jsx)("h4",{children:"Tolerance"}),Object(a.jsx)(X.a,{min:0,max:3,step:.1,valueLabelDisplay:"on",value:st,disabled:bt,onChange:function(t,e){ut(Number(e)),Vt(!0)}}),Object(a.jsx)("h4",{children:"Seed"}),Object(a.jsx)(at.a,{size:"small",value:Ut,disabled:bt,onChange:function(t){return Yt(parseInt(t.target.value)||0)}}),Object(a.jsx)(E.a,{size:"small",variant:"contained",color:"primary",disabled:bt,onClick:function(){Yt(Math.round(1e6*Math.random())),Vt(!0)},children:"Generate seed"})]}):null,Object(a.jsx)("p",{children:Object(a.jsx)(E.a,{color:"primary",variant:"contained",disabled:!Rt||!Ft||!Wt&&0!==O.length||bt||yt,onClick:Object(b.a)(h.a.mark((function t(){var e;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return jt(!0),P([]),re(""),document.getElementById("result").scrollIntoView({behavior:"smooth",block:"end"}),t.next=6,Object(it.a)({tracks:s,intro:Rt,outro:Ft,targetLength:W,tolerance:st,timeout:U,seed:Ut,penalties:Object(d.a)({},(n=s[0],f.a([0],gt(n))),{weight:1,fn:pe.fn})});case 6:e=t.sent,ve(pt(je,W,pe.fn)),Vt(!1),P(e),N(e[0]),jt(!1),se(!1),re(0===e.length?"No suitable orders found. Try increasing processing timeout or tolerance":"");case 14:case"end":return t.stop()}var n}),t)}))),children:"Generate order"})}),ie?Object(a.jsx)("p",{children:ie}):null,bt?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{children:"Calculating..."}),Object(a.jsx)(rt.a,{})]}):null,Object(a.jsxs)("div",{style:{minHeight:100},children:[Object(a.jsx)("h2",{id:"result",children:"Result"}),bt?null:Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(R.a,{color:"primary",variant:"contained",children:O.map((function(t,e){return Object(a.jsx)(E.a,{color:t===F?"secondary":"primary",onClick:function(){N(t),be(ot(t.path))},children:e+1},e)}))}),Object(a.jsxs)("h3",{children:["Tracklist"," ",Object(a.jsx)(E.a,{disabled:bt,size:"small",color:"primary",variant:"contained",onClick:function(){le||0!==F.path.length&&be(ot(F.path)),se(!le)},children:le?"Done":"Edit"})]}),le?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(xt,{children:"After exporting the playlist, open the web page and copy and paste the contents (including the headers) into the field below. Then click the Done button above and if everything goes well, the graphs should update!"}),Object(a.jsx)("br",{}),Object(a.jsx)(_.a,{fullWidth:!0,rowsMax:20,multiline:!0,display:le?"block":"none",variant:"outlined",onChange:function(t){var e=t.target;be(e.value),F.path=p(e.value),F.penalty=void 0,N(F);var n=F.path.length;n>W&&(V(n),ve(pt(je,n,pe.fn)))},onKeyDown:function(t){if("Tab"===t.key){t.preventDefault();var e=t.target,n=e.selectionStart,a=e.selectionEnd;e.value=e.value.substring(0,n)+"\t"+e.value.substring(a),e.selectionStart=e.selectionEnd=n+1,be(e.value),F.path=p(e.value),F.penalty=void 0,N(F);var i=F.path.length;i>W&&(V(i),ve(pt(je,i,pe.fn)))}},value:de})]}):Object(a.jsx)(Y,{tracks:F.path}),Object(a.jsxs)(a.Fragment,{children:[F.penalty?Object(a.jsxs)("h3",{children:["Correlation with target curve (",Math.round(100*F.penalty)/100,")"]}):null,Object(a.jsx)(tt.a,{options:{chart:{id:"apexchart-example"},xaxis:{categories:F.path.map((function(t){return mt(t.title)})),name:"Track"},yaxis:{labels:{formatter:function(t){return Math.floor(t)}}}},series:[{name:"Target",data:ye},{name:"Actual",data:F.path.map(Ot)}],height:"200"}),Object(a.jsx)("h3",{children:"Keys"}),Object(a.jsx)(tt.a,{options:{chart:{id:"apexchart-example"},xaxis:{categories:F.path.map((function(t){return mt(t.title)}))}},series:[{name:"key",data:F.path.map(w.a("keyNumber"))}],height:"200"})]})]})]})]}),Object(a.jsx)(lt.a,{href:"https://github.com/gadgetmies/mixtape_planner",target:"_blank"})]})},At=n(311),yt=n(312),vt=n(313),Mt=n(314),St=n(160),kt=n.n(St),It=function(t){return function(e){return e.length>t?"".concat(e.substring(0,t),"..."):e}}(10),Tt=function(t){return f.a([1],function(t){return f.a([0],Object.entries(t.properties))}(t))},wt=function(){var t=Object(s.useUrlSearchParams)({tracklist:""}),e=Object(l.a)(t,2),n=e[0],r=e[1];-1===n.tracklist.indexOf("Artist")&&r({tracklist:"Artist\tTitle\tKey\tComment\n"+n.tracklist});var o=Object(i.useState)(p(n.tracklist)),c=Object(l.a)(o,2),u=c[0],h=c[1],d=function(){return kt.a.shorten(window.location)};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(B.a,{maxWidth:"md",children:[Object(a.jsx)("h1",{children:"Mixtape Visualizer"}),Object(a.jsx)(xt,{children:"After exporting the playlist, open the web page and copy and paste the contents (including the headers) into the field below. Then click the Done button above and if everything goes well, the graphs should update!"}),Object(a.jsx)("br",{}),Object(a.jsx)(_.a,{fullWidth:!0,rowsMax:20,multiline:!0,variant:"outlined",onChange:function(t){var e=t.target;r({tracklist:e.value}),h(p(e.value))},onKeyDown:function(t){if("Tab"===t.key){t.preventDefault();var e=t.target,n=e.selectionStart,a=e.selectionEnd;e.value=e.value.substring(0,n)+"\t"+e.value.substring(a),e.selectionStart=e.selectionEnd=n+1,r({tracklist:e.value}),h(p(e.value))}},value:n.tracklist}),Object(a.jsx)(At.a,{url:d,title:"This is how my mixtape looks",children:Object(a.jsx)(yt.a,{round:!0,style:{padding:"5px"}})}),Object(a.jsx)(vt.a,{url:d,title:"This is how my mixtape looks",children:Object(a.jsx)(Mt.a,{round:!0,style:{padding:"5px"}})}),Object(a.jsx)(tt.a,{options:{chart:{id:"apexchart-example"},xaxis:{categories:u.map((function(t){var e=t.title;return It(e)})),name:"Track"},yaxis:{labels:{formatter:function(t){return Math.floor(t)}}}},series:[{name:"Actual",data:u.map(Tt)}],height:"200"}),Object(a.jsx)("h3",{children:"Keys"}),Object(a.jsx)(tt.a,{options:{chart:{id:"apexchart-example"},xaxis:{categories:u.map((function(t){var e=t.title;return It(e)}))}},series:[{name:"key",data:u.map(w.a("keyNumber"))}],height:"200"})]}),Object(a.jsx)(lt.a,{href:"https://github.com/gadgetmies/mixtape_planner",target:"_blank"})]})};var Ct=function(){var t=Object(s.useUrlSearchParams)({tracklist:void 0}),e=Object(l.a)(t,1)[0];return e.tracklist?Object(a.jsx)(wt,{tracklist:e.tracklist}):Object(a.jsx)(ft,{})},Lt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,324)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),a(t),i(t),r(t),o(t)}))};c.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(Ct,{})}),document.getElementById("root")),Lt()},47:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return o}));var a=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Math.abs(t.keyNumber-e.keyNumber)%11<=1&&(!n||t.isMinor===e.isMinor||t.keyNumber===e.keyNumber)},i=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e.filter((function(e){return a(t,e,n)}))},r=function(t){return function(e,n){return Math.abs(e.keyNumber-n.keyNumber)+(t&&e.isMinor!==n.isMinor?1:0)}},o=function(t,e){return"".concat(t).concat(e?"B":"A")}},68:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var a=function(t,e){return Math.abs(t-e)},i=function(t){return function(e){var n=e/t;return n-Math.floor(n)}},r=function(t,e){return function(n){return(i(t)(n)+n/e)/2}},o=function(t){return Math.abs(Math.sin(t/2))}},69:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return r}));var a=n(162),i=function(t){return{min:a.a(Math.min,t),max:a.a(Math.max,t)}},r=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return function(a){var r=n||i(a),o=r.min,c=r.max;return a.map((function(n){return(n-o)*(e-t)/(c-o)+t}))}}}},[[244,1,2]]]);
//# sourceMappingURL=main.72e5e772.chunk.js.map