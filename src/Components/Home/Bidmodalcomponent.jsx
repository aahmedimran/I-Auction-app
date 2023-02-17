import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createBid } from "../../store/Auction product/action";

const Bidmodalcomponent = ({ id, Name, discription, price, file, type }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [auctionName, setAuctionName] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [auctionType, setAuctionType] = useState("");

  useEffect(() => {
    setAuctionName(Name);
    setAuctionPrice(price);
    setAuctionDescription(discription);
    setAuctionType(type);
    setImageUpload(file);
  }, [Name, discription, file, price, type]);

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(createBid(id, Name, discription, price, file, type));
    toast.success("Bid Created");
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Bid Here
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Bid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Auction Product Name"
                name="Name"
                value={auctionName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Auction Price"
                name="price"
                value={auctionPrice}
                onChange={(e) => setAuctionPrice(e.target.value)}
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
                value={auctionDescription}
                disabled
              />
            </FloatingLabel>
            <Form.Group controlId="formFileLg" className="mb-3"></Form.Group>
            <Card.Img
              variant="top"
              src={imageUpload}
              width={171}
              height={180}
            />

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="radio"
                label="Currunt auction"
                name="auctionType"
                value={auctionType}
                checked={auctionType === "Currunt auction"}
                disabled
              />
              <Form.Check
                type="radio"
                label="Up Comming auction"
                name="auctionType"
                value={auctionType}
                checked={auctionType === "Up Comming auction"}
                disabled
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

export default Bidmodalcomponent;
