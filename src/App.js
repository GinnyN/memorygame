import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie/es6';

import './App.css';
import getImages from './apicall/apicall';
import Card from './card';
import { shuffleArray } from './helpers/shuffle';

function App() {
  const cookies = new Cookies();

  const [list, setList] = useState([]);
  const [opened, setOpened] = useState([]);
  const [found, setFound] = useState([]);
  const [congrats, setCongrats] = useState(false);
  const [score, setScore] = useState({ correct: 0, mistakes: 0});
  const [names, setNames] = useState("");

  useEffect(() => {
    if(list.length === 0) {
      getImages().then(data => {
        const newList = [];
        data.entries.map((item) => {
          newList.push({ image: item.fields.image.url, id: item.meta.name });
          newList.push({ image: item.fields.image.url, id: item.meta.name });
        });
        shuffleArray(newList);
        setList(newList);
      });
      const cookie = cookies.get('myName');
      if(cookie) setNames(cookie);
    }
  }, []);

  const compareCards = (index) => {
    if(opened.length === 0) setOpened([index]);
    else if(opened.length === 2) setOpened([]);
    else {
      if(list[index].id === list[opened].id) {
        const temp = [...found];
        temp.push(list[index].id);
        setFound(temp);
        setOpened([]);
        setScore({mistakes: score.mistakes, correct: score.correct + 1});
        if(found.length === (list.length / 2) - 1) setCongrats(true);
      } else {
        setOpened([index, opened[0]]);
        setScore({mistakes: score.mistakes + 1, correct: score.correct});
      }
    }
    
  }

  const resetGame = () => {
    setCongrats(false);
    setFound([]);
    setOpened([]);
  }

  const handleName = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    cookies.set('myName', event.target[0].value);
    setNames(event.target[0].value);
  }

  return (
    <React.Fragment>
        { congrats && <div className='congrats'>
          <h1>{names}! Congratulations!</h1>
          <Button onClick={resetGame}>New Game</Button>
        </div> }
        { names.length === 0 && <div className='congrats'>
          <h1>Memory Game</h1>
          <Form onSubmit={handleName}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Please enter your id:"
                aria-label="Please enter your id:"
                aria-describedby="basic-addon2"
              />
              <Button type='submit'>
                Enter
              </Button>
            </InputGroup>
          </Form>
          </div>}
        { !congrats && names.length !== 0 && <div className="memory">
        <Container>
          <Row bsPrefix='row memory_scoreboard'>
            <Col>{names}</Col>
            <Col>Errores: {score.mistakes}</Col>
            <Col>Aciertos: {score.correct}</Col>
          </Row>
          <Row>
            { list.map((item, index) => <Col> 
              <Card index={index} obj={item} checkOpen={() => compareCards(index)} found={found.includes(item.id)} opened={opened.includes(index)}/>
            </Col>)}
          </Row>
        </Container>
      </div> }
    </React.Fragment>
  );
}

export default App;
