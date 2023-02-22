import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createBid, updateAuction } from "../../store/Auction product/action";

const Globalmodalcomponent = ({
  title,
  heading,
  id,
  Name,
  discription,
  price,
  file,
  type,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [auctionName, setAuctionName] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [auctionType, setAuctionType] = useState("");
  console.log("🚀 ~ file: Bidmodalcomponent.jsx:30 ~ auctionType:", auctionType)
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    if (title === "Update") {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setAuctionName(Name);
    setAuctionPrice(price);
    setAuctionDescription(discription);
    setAuctionType(type);
    setImageUpload(file);
  }, [Name, discription, file, price, type]);

  const handleAdd = () => {
    if (title === "Update") {
      dispatch(updateAuction(id,auctionName,auctionPrice,auctionDescription,auctionType));
      // setAuctionName("");
      // setAuctionPrice("");
      // setAuctionDescription("");
      // setAuctionType("");
      // setImageUpload("");
      setShow(false);
    } else {
      if (parseInt(auctionPrice) >= parseInt(price / 10) + parseInt(price)) {
        dispatch(createBid(id, auctionPrice));
        setAuctionName("");
        setAuctionPrice("");
        setAuctionDescription("");
        setAuctionType("");
        setImageUpload("");
        setShow(false);
      } else {
        toast.error("bid price must be 10%");
      }
    }
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={(event) => {
          handleShow(event);
          handleClick(event);
        }}
      >
        {title}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>{heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Auction Product Name"
                name="Name"
                value={auctionName}
                disabled={isDisabled}
                onChange={(e) => setAuctionName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Auction Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Auction Price"
                name="price"
                value={auctionPrice}
                onChange={(e) => setAuctionPrice(parseInt(e.target.value))}
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
                disabled={isDisabled}
                onChange={(e) => setAuctionDescription(e.target.value)}
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
                disabled={isDisabled}
                onChange={(e) => setAuctionType(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Up Comming auction"
                name="auctionType"
                value={auctionType}
                checked={auctionType === "Up Comming auction"}
                disabled={isDisabled}
                onChange={(e) => setAuctionType(e.target.value)}
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
export default Globalmodalcomponent;