import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Auction } from "../../store/Auction product/action";
import { HashLoader } from "react-spinners";

const Addproduct = () => {
  const User = localStorage.getItem("User");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [isdisable, setIsdisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [selactedCategaryValue, setSelactedCategaryValue] =
    useState("Electrical");
  const [updatwloading, setupdateloading] = useState(false);

  const [inputValue, setInputValue] = useState({
    Name: "",
    price: "",
    discription: "",
    auctionTime: ""
  });
  const { data } = useSelector((state) => state.addAuction);
  React.useEffect(() => {
    if (data) {
      setInputValue({ Name: "", price: "", discription: "", auctionTime: ""});
      setSelectedValue("");
      setShow(false);
      setIsdisable(false);
      setupdateloading(false);
    }
  }, [data, dispatch]);
  const ChangeInputValue = (event) => {
    let Value = { ...inputValue };
    Value[event.target.name] = event.target.value;
    setInputValue(Value);
  };

  const handleAdd = () => {
    const { Name, price, discription,auctionTime } = inputValue;
    if (!Name) return toast.error("Enter Name");
    if (!price) return toast.error("Enter Price");
    if (!discription) return toast.error("Enter Discription");
    if (!auctionTime) return toast.error("Enter auctionTime");
    if (!selactedCategaryValue) return toast.error("Select Categary");
    if (!imageUpload) return toast.error("ImageUpload");
    if (!selectedValue) return toast.error("Select Auction Type ");

    dispatch(
      Auction(
        Name,
        price,
        discription,
        selectedValue,
        auctionTime,
        imageUpload,
        User,
        selactedCategaryValue
      )
    );
    setIsdisable(true);
    setupdateloading(true);
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
          {updatwloading && (
            <HashLoader
              color={"#0D6EFD"}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
              style={{
                width: "none",
                display: "flex",
                position: "relitive",
                height: "none",
                transform: "rotate(165deg)",
              }}
            />
          )}
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
            <div className="d-flex gap-5">
              <Form.Group className="d-flex flex-row gap-3 align-items-center">
                <span>Categary</span>
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
              <Form.Group className="d-flex flex-row align-items-center gap-3">
                <span>Auction time days</span>
                <Form.Control
                  type="number"
                  placeholder="Auction Price"
                  name="auctionTime"
                value={inputValue.auctionTime}
                onChange={ChangeInputValue}
                  className="w-50"
                />
              </Form.Group>
            </div>
            <Form.Group controlId="formFileLg" className="mb-3">
              <span>Image : </span>
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
            </Form.Group>
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
            <Button variant="primary" onClick={handleAdd} disabled={isdisable}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Addproduct;
