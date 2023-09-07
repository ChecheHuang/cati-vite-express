import{t as l,c as u,r as p,j as t,d as m,$ as x,e as h,s as g,w as f,f as v,h as b}from"./index-9f5614ec.js";function y(...e){return l(u(e))}const j=m("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",primary:" text-primary  hover:text-white hover:bg-primary/90 hover:shadow-primary  hover:shadow-[0_0_5px,0_0_25px,0_0_50px,0_0_100px]"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),r=p.forwardRef(({className:e,variant:n,size:o,asChild:a=!1,...i},c)=>{const d=a?x:"button";return t.jsx(d,{className:y(j({variant:n,size:o,className:e})),ref:c,...i})});r.displayName="Button";const s=h({links:[g({condition:e=>e.type==="subscription",true:f({client:v({url:"ws://localhost:9000/trpc"})}),false:b({url:"http://localhost:9000/trpc"})})]});function w(){return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex gap-2",children:["prisma",t.jsx(r,{onClick:async()=>{const e=await s.admin.insertAdmin.mutate();console.log(e)},children:"insert"}),t.jsx(r,{onClick:async()=>{const e=await s.admin.getAdmin.query();console.log(e)},children:"allAdmin"})]}),t.jsxs("div",{children:["WebSocket",t.jsx("br",{}),t.jsx(r,{onClick:()=>{s.users.update.mutate({userId:"1",name:"Test"})},children:"update"})]}),t.jsxs("div",{children:["Not WebSocket",t.jsxs("div",{children:[t.jsx(r,{onClick:async()=>{const e=await s.users.all.query();console.log(e)},children:"all"}),t.jsx(r,{onClick:async()=>{const e=await s.users.get.query({userId:"1"});console.log(e)},children:"getUser"}),t.jsx(r,{onClick:async()=>{const e=await s.users.update.mutate({userId:"1",name:"Test"});console.log(e)},children:"updateUser"})]})]})]})}export{w as default};