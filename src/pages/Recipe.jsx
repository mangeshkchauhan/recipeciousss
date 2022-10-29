import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'

function Recipe() {
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')
    let params = useParams();

    useEffect(()=>{
        if(details){
            fetchDetails(params.name);
        }
    },[params.name])

    const fetchDetails = async recipeId => {
        const check=localStorage.getItem(`${recipeId}`);
        if(check){
            setDetails(JSON.parse(check))
        }
        else{
            const data = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const detailData = await data.json();
            localStorage.setItem(`${recipeId}`,JSON.stringify(detailData))
            setDetails(detailData);
        }
    }

  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.image} />
        </div>
        <Info>
            <Button
                className={activeTab==='instructions'?'active':''}
                onClick={()=>{setActiveTab('instructions')}}
            >
                Instructions
            </Button>
            <Button
                className={activeTab==='ingredients'?'active':''}
                onClick={()=>{setActiveTab('ingredients')}}
            >
                Ingredients
            </Button>
            {activeTab==='instructions'?
                <div>
                    <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
                    <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
                </div>
            :
                <ul>
                    {details.extendedIngredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            }
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 7rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color:white;
    }
    h2 {
    margin-bottom: 2rem;
    }
    li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    }
    ul {
    margin-top: 2rem;
    }
    img{
        height: 15rem;
        width: 20rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;
const Info = styled.div`
    margin-left: 4rem;

    p{
        font-size: 1.1rem;
        color: rgb(56,56,56);
        line-height: 1.5rem;
        margin: 2rem 0rem;
    }
`

export default Recipe