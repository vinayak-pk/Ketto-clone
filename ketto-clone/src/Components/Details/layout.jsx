import React, { useEffect } from "react"
import { useSelector ,useDispatch, shallowEqual} from "react-redux";
import { getData } from "../../Redux/layoutaction";
import { Navbar } from "./Navbar"
// import { Stickynav } from './stickynav';
import styled from "styled-components"
import {ProgressBar} from "./ProgressBar" 
let Layoutbody = styled.div`
width:80%;
margin:auto;
min-height:500px;
border:1px solid black;
`
let Loader = styled.h1`
text-align:center;`

let Blog = styled.div`
width:65%;
min-height:600px;
border:1px solid black;`

let Imgbody = styled.div`
width:100%;
height:350px;
text-align:center;
box-shadow: 0px -10px 20px #8b8b8b inset;
`
let Contribute= styled.button`
width:100%;
height:65px;
color:white;
font-weight:bold;
font-size:20px;
background:rgba(0,190,189,255);
border:0px;
outline:0px;
border-radius:5px;
margin-bottom:50px;
cursor:pointer;
&&:hover{
    opacity:0.6;
}
`
let Share= styled.button`
width:100%;
height:65px;
color:white;
font-size:20px;
background:rgba(58,89,153,255);
border:0px;
outline:0px;
border-radius:5px;
cursor:pointer;
&&:hover{
    opacity:0.6;
}
`
let Pre = styled.pre`
font-size:33px;
margin:15px 0px;
word-spacing:0px;
color:rgba(73,72,73,255);
`

let Sidebox = styled.div`
width:30%;`

let Body = styled.span`
color:rgba(73,72,73,255);
`
let Head = styled.span`
font-size:25px;
color:black;
`

let Infocard = styled.div`
width:100%;
height:80px;
border:1px solid lightgray;
display:flex;
`

let Namcont = styled.div`
border-radius:50px;
background:lightgray;
padding:10px;
height:20px;
margin-top:20px;
color:rgba(0,190,189,255);
`
export function Layout(){
    let [state,setState]=React.useState(false);
    let data = useSelector(state=>state.layout.data);
    let isLoading = useSelector(state=>state.layout.isLoading);
    let isError = useSelector(state=>state.layout.isError)
    let dispatch = useDispatch();
    let currencyVal = new Intl.NumberFormat('en-IN',{
        // style: 'currency',
        // currency:'INR',
        minimumFractionDigits:0,
    });
    // console.log(currencyVal.format(data.curr_donation));
    let curDonation = currencyVal.format(data.curr_donation);
    let donationGoal = currencyVal.format(data.donation_goal)
    useEffect(()=>{
        dispatch(getData()).then(()=>setState(true))
    },[])
    console.log(data,isLoading,isError)
   let achievedPercent = Math.floor((data.curr_donation)/(data.donation_goal) * 100)
    if(achievedPercent > 100){
        achievedPercent = 100;
    }

    const getDaysLeft = () => {
        let addDateComponents = data.due_date.split('/').map(Number);
        console.log(addDateComponents);
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let daysRemaining = (year * 365 + 
        month * 30) + 
        date -(addDateComponents[0] * 30 + addDateComponents[1] + addDateComponents[2]*365);
        daysRemaining = daysRemaining < 0 ?(daysRemaining*-1) : daysRemaining;
        console.log( (year * 365 + month * 30) + date,(addDateComponents[0] * 30 + addDateComponents[1] + addDateComponents[2]*365))
        return daysRemaining;
    }
    let dueDate;
    if(state){
        dueDate = getDaysLeft();
    }
    let nameApp = ()=>{
        let f = data.first_name.slice(0,1);
        let l = data.last_name.slice(0,1);
        return f + l;
    }

    return isLoading?<Loader>...Loading</Loader>:isError?<Loader>...Error</Loader>:(
        <>
         <div>
                <Navbar/>
        </div>
        <Layoutbody>
            <h1 style={{textAlign:"center",color:"rgba(73,72,73,255)"}}>{data.title}</h1>
            <div style={{display:"flex",gap:"30px"}}>
                <Blog>
                    <Imgbody>
                        <img style={{width:"100%"}} src={data.blog_img} alt=""/>
                    </Imgbody>
                    <div>
                        {/* <Stickynav/> */}
                    </div>
                </Blog>
                <Sidebox>
                    <Contribute>CONTRIBUTE NOW</Contribute>
                    <Share>Spread the word</Share>
                    <Pre>₹ {curDonation}</Pre>
                    <p style={{color:"rgba(73,72,73,255)",margin:"2px 0px",marginBottom:"10px"}}>raised of <span style={{fontSize:"18px",color:"black"}}>₹ {donationGoal}</span> goal</p>
                    <ProgressBar sliderColor = "#01bfbd" completed ={achievedPercent}/>
                    <Body><Head>{data.supporters} </Head> supporters</Body><Body style={{marginLeft:"70px"}}><Head>{dueDate} </Head> days left</Body>
                    <Infocard>
                        <Namcont>
                            {state&&nameApp()}
                        </Namcont>
                        <div>
                            <p>Campaigner & Beneficiar <br/> Jasper Paul</p>
                        </div>
                    </Infocard>
                </Sidebox>
            </div>
        </Layoutbody>
        </>
    )
}