import styled from 'styled-components'

import pencil1 from "./pencil1.png";

export const Container = styled.div`
  //   background-color: white;
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

export const Button = styled.button`
  width: 15.4vw;
  height: 6vh;
  background-color: #1F2833
  border: 2px solid #1F2833
  color: white;
  font-size: 20px;
    font-family: Oswald
    margin: 15px;
    cursor: pointer;
    &:hover {
      background: white;
      color: black;
      transition: all 0.4s ease 0s;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: black;
        }
`;

export const GoBack = styled.button `

`

export const Info = styled.h2`
  color: white;
  font-size: 50px;
`;

export const Background = styled.div`
 

  background-repeat: no-repeat;
  background-color: #4ab5ff;
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-image: url(${pencil1});
  background-position: center;
  background-size: 98vh;
  background-g
`;

export const Header = styled.div`
  width: 85vw;
  display: flex;
  // padding: 5px;
  justify-content: space-between;
  align-items: center;
  // border: solid black 1px;
  margin-top: 70px;
  // margin-left: 55px;
`;

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;
  font-family: Montserrat;
`;

export const Logo = styled.h1`
  font-family: Lobster;
  font-weight: bold;
  margin: 0;
  color: white;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: solid 1px black;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  margin-bottom: 60px;
`;

export const Description = styled.h1`
  color: white;
  font-size: 70px;
`;

export const User = styled.h1`
  color: white;
  font-family: Quicksand;
  font-size: 20px;
`;
export const Img = styled.img`
  height: 30px;
  width: 30px;
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const UserDiv = styled.div`
  display: flex;
  align-items: center;
`;