import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Auction } from "../../store/Auction product/action";

const Addproduct = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [selactedCategaryValue, setSelactedCategaryValue] =
    useState("Electrical");

  const [inputValue, setInputValue] = useState({
    Name: "",
    price: "",
    discription: "",
  });
  const User = localStorage.getItem("User");
  const { data } = useSelector((state) => state.addAuction);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data) {
      setInputValue({ Name: "", price: "", discription: "" });
      setSelectedValue("");
      setSelactedCategaryValue("");
      setShow(false);
    }
  }, [data, dispatch]);

  const ChangeInputValue = (event) => {
    let Value = { ...inputValue };
    Value[event.target.name] = event.target.value;
    setInputValue(Value);
  };

  const handleAdd = () => {
    const { Name, price, discription } = inputValue;
    if (!Name) {
      toast.error("enter Name");
      return;
    }
    if (!price) {
      toast.error("enter Price");
      return;
    }
    if (!discription) {
      toast.error("enter discription");
      return;
    }

    if (!selactedCategaryValue) {
      toast.error("Select Categary");
      return;
    }

    if (!imageUpload) {
      toast.error("imageUpload");
      return;
    }
    if (!selectedValue) {
      toast.error("select Auction Type ");
      return;
    }
    dispatch(
      Auction(
        Name,
        price,
        discription,
        selectedValue,
        imageUpload,
        User,
        selactedCategaryValue
      )
    );
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Auction
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categary</Form.Label>
              <select
                name="select1"
                id="select1"
                value={selactedCategaryValue}
                onChange={(e) => setSelactedCategaryValue(e.target.value)}
              >
                <option value={"Electrical"}>Electrical</option>
                <option value={"Electronics"}>Electronics</option>
              </select>
            </Form.Group>

            {/* <select
            name="select1"
            id="select1"
            value=''
            // onChange={(e) => setSelactedCategaryValue(e.target.value)}
          >
            <option value={"Electrical"}>Electrical</option>
            <option value={"Electronics"}>Electrical</option>
          </select> */}

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
