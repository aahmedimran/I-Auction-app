import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useDispatch,useSelector } from "react-redux";
import { Auction } from "../../store/Auction product/action";

const Addproduct = () => {
  // const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [inputValue, setInputValue] = useState({
    Name: "",
    price: "",
    discription: "",
  });
 
  const { data } = useSelector((state) => state.addAuction);
  

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data) {
      setShow(false);
      setInputValue({ Name: "", price: "", discription: "" });
      setSelectedValue('')
    }
  }, [data])
  
 
  const ChangeInputValue = (event) => {
    let Value = { ...inputValue };
    Value[event.target.name] = event.target.value;
    setInputValue(Value);
  };

  const handleAdd = () => {
    const { Name, price, discription } = inputValue;
    if (!Name) {
      console.log("🚀 ~ Return price");
   
      return;
    }
    if (!price) {
      
      console.log("🚀 ~ Return price");
      return;
    }
    if (!discription) {
      console.log("🚀 ~ Return discription");
      return;
    }

    if (imageUpload == null) {
      console.log("🚀 ~ Return imageUpload");
      return;
    }
    dispatch(Auction(Name, price, discription, selectedValue, imageUpload));
  };





  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ++
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Auction Product Name"
                name="Name"
                value={inputValue.Name}
                onChange={ChangeInputValue}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Auction Price"
                name="price"
                value={inputValue.price}
                onChange={ChangeInputValue}
              />
            </Form.Group>
          
            <FloatingLabel
              controlId="floatingTextarea"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Add Description here"
                name="discription"
                value={inputValue.discription}
                onChange={ChangeInputValue}
              />
            </FloatingLabel>

            <Form.Group controlId="formFileLg" className="mb-3"></Form.Group>
            <input
              name="Pfile"
              type="file"
              placeholder=""
              id="profilePictureInput"
              required
              accept="image/*"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
                var profilePictureInput = document.getElementById(
                  "profilePictureInput"
                );
                var url = URL.createObjectURL(profilePictureInput.files[0]);
                document.getElementById(
                  "img"
                ).innerHTML = `<img width ="200px" src="${url}"  id="img" >`;
              }}
            />
            <div id="img"></div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="radio"
                label="Currunt auction"
                name="auctionType"
                value="Currunt auction"
                checked={selectedValue === "Currunt auction"}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                }}
              />
              <Form.Check
                type="radio"
                label="Up Comming auction"
                name="auctionType"
                value="Up Comming auction"
                checked={selectedValue === "Up Comming auction"}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Addproduct;
