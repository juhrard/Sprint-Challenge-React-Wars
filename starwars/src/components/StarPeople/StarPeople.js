import React, { useState, useEffect } from "react";
import StarCard from "../StarCard/StarCard"
import styled from "styled-components";
import axios from "axios";

const StyledContainer = styled.div`

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;

`

const ButtonBox = styled.div`

  display: flex;
  width: 100%;
  justify-content: space-between;

`

const BackButton = () => {
  return (
    <button>
      {'<'}
    </button>
  )
}

const ForwardButton = () => {
  return (
    <button>
      {'>'}
    </button>
  )
}

function StarPeople() {

  const [person, setPerson] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {

    axios.get(`https://swapi.co/api/people/?page=${count}`)
    .then(response => {
      console.log(response);
      setPerson(response.data.results);
      setCount(count);
    })
    .catch(error => {
      console.log(error);
    })

  }, [count]);

  const nextPage = () => {
    console.log('Button Clicked')
    setCount(count + 1);

  }
  const prevPage = () => setCount(count - 1)

  return (
    <div>
      <ButtonBox>
        <BackButton onClick={() => prevPage()}/>
        <ForwardButton onClick={() => nextPage()}/>
      </ButtonBox>
      <StyledContainer>
        {person.map(person => {
          return <StarCard name={person.name} height={person.height} mass={person.mass} birth_year={person.birth_year}/>})}
      </StyledContainer>
    </div>
  )

}

export default StarPeople;