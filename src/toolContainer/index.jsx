import React from "react";
import styled from 'styled-components';
import WardrobeContainer from './wardrobe.jsx';
import StoragContainer from './storage.jsx';
import DoorContainer from './door.jsx';
import NavigatorMain from './navigatorMain.jsx';

const ToolContainerBlock = styled.div`
    padding: 20px 0;
    
    .finishing-list-container{
      display: grid;
      grid-template-columns: auto auto auto auto auto;
      grid-gap: 10px;
      margin-bottom: 20px;

      .finishing-item{
          border: 1px solid #fff;
          border-radius: 7px;
          transition: all ease-in 0.3s;
          max-width: 100px;

        img{
          width: 100%;
          float: left;
          height: 100%;
          border-radius: 5px;
          cursor: pointer;
        }
        &:hover{
          box-shadow: 0px 3px 1px 3px rgb(0, 0, 0, 0.2), 0px 2px 2px 3px rgb(0, 0, 0, 0.14), 0px 1px 5px 2px rgb(0, 0, 0, 0.12);
        }
      }
      .selected-finishing-item{
        border: 1px solid #000000;
        box-shadow: 0px 3px 1px 3px rgb(0, 0, 0, 0.2), 0px 2px 2px 3px rgb(0, 0, 0, 0.14), 0px 1px 5px 2px rgb(0, 0, 0, 0.12);
      }
    }
    @media screen and (max-width: 1200px) {
      padding: 20px;
    }
    
`;


  
  const ToolContainer = (props) => {



    return (
      <ToolContainerBlock>
        <NavigatorMain
            { ...props }/>

          {props.currentComponent === 'wardrobe' && <WardrobeContainer
            { ...props }
            />}
          {props.currentComponent === 'storage' && <StoragContainer
            { ...props }
             />}
          {props.currentComponent === 'door' && <DoorContainer
            { ...props }
            />}

      </ToolContainerBlock>
    );
  };
  
  export default ToolContainer;