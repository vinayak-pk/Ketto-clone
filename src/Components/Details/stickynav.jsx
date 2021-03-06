import React from "react"
import styles from "./Sticky.module.css"
import styled from "styled-components"
import { About } from "./About";
import { Updates } from "./Updates";
import {animated,useTransition} from 'react-spring'
import {Comment} from "../Comment_Box/Comment"
let Button = styled.div`
padding:2%;
cursor:pointer;
&:active{
  border-bottom:4px solid rgba(0,190,189,255);
}
`
export function Stickynav({id}) {
    const [but,setBut] = React.useState(1);

      let handleClick =(num)=>{
         setBut(num);
      }

     
      const pages = [
        ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
        ({ style }) => <animated.div style={{ ...style, }}><About/></animated.div>,
        ({ style }) => <animated.div style={{ ...style,}}><Updates/></animated.div>,
        ({ style }) => <animated.div style={{ ...style, }}><Comment id={id}/></animated.div>,
      ]

      let curr=0;
      let transitions;
       const transitions1 = useTransition(but, p => p, {
          from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
          enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
          leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
        })
    
       const transitions2 = useTransition(but, p => p, {
          from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
          enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
          leave: { opacity: 0, transform: 'translate3d(50%,0,0)' },
        })
  if(curr<but){
    transitions = transitions1;
    curr= but;
  }else if(curr>but){
    transitions = transitions2;
    curr=but;
  }
      
    return(
        <div>
          <Navelements but={but} handleClick={handleClick}/>
        <div>
          {transitions.map(({ item, props, key }) => {
            const Page = pages[item]
            return item&&<Page key={key} style={props} />
          })}
        </div>
    </div>
    )
}

export function Navelements({but,handleClick}) {
  return (
    <nav className={styles.navigation}>
    <Button style={but===1?{borderBottom:"3px solid rgba(0,190,189,255)"}:{borderBottom:"0px"}} onClick={()=>handleClick(1)}><i style={{marginRight:"5px",color:"rgba(204,205,205,255)",fontSize:"18px"}} className="fa fa-globe"/>About</Button>
    <Button style={but===2?{borderBottom:"3px solid rgba(0,190,189,255)"}:{borderBottom:"0px"}} onClick={()=>handleClick(2)}><i style={{marginRight:"5px",color:"rgba(204,205,205,255)",fontSize:"18px"}} className="fa fa-history fa-flip-horizontal"/>Updates</Button>
    <Button style={but===3?{borderBottom:"3px solid rgba(0,190,189,255)"}:{borderBottom:"0px"}} onClick={()=>handleClick(3)}><i style={{marginRight:"5px",color:"rgba(204,205,205,255)",fontSize:"18px"}} className="fa fa-comment"/>Comments</Button>
 </nav>
  )
}