import React, { Component } from "react";
import { Modal } from "react-bootstrap";
// import {Button} from 'react-bootstrap/Button';
// import { Text } from "react-native";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactToPrint from 'react-to-print';
import ComponentToPrint from "./ComponentToPrint";


class MealPageModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.openModal,
      increment: 0,
      checked: false,
      index: 0
    };
  }

  render() {
    return (
      <>
        <div>
          <Modal
            show={this.props.openModal}
            onHide={this.props.closeModal}
            dialogClassName="modal-90w"
            centered
          >
            <Modal.Header closeButton style={{ 'borderBottom': '30px', 'padding': '0px' }} />
            <Modal.Body style={{ padding: "0px" }}>
              <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return <a href="#">Print/Share</a>;
                }}
                content={() => this.componentRef}
              />
              <ComponentToPrint ref={el => (this.componentRef = el)}
                mealName={this.props.mealName} mealImage={this.props.mealImage}
                categories={this.props.categories}
                prepTime={this.props.prepTime} cookTime={this.props.cookTime}
                mealName={this.props.mealName} serves={this.props.serves}
                ingredientsList={this.props.ingredientsList} utensilsList={this.props.utensilsList}
                instructionChunk1={this.props.instructionChunk1} instructionChunk2={this.props.instructionChunk2}
                instructionChunk3={this.props.instructionChunk3} instructionChunk4={this.props.instructionChunk4}
                instructionChunk5={this.props.instructionChunk5} instructionChunk6={this.props.instructionChunk6}
                tips={this.props.tips} mealImageData={this.props.mealImageData}
              />
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
export default MealPageModal;
