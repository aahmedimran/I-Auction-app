import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addproduct from "./addproduct";
import { getAuction } from "../../store/Auction product/action";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Actionproductcompnent.css";
const Actionproductcompnent = () => {
  const { data } = useSelector((state) => state.getAuction);
  console.log(
    "🚀 ~ file: Actionproductcompnent.jsx:10 ~ Actionproductcompnent ~ getAuction",
    data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!getAuction) {
    dispatch(getAuction());
    // }
  }, []); // eslint-disable-line
  return (
    <div>
      <Addproduct />
      <p>Hello Data</p>

      <div className="actionCard">
        {data &&
          data?.map((datas, index) => (
            <Card style={{ width: "18rem" }} key={index} className=" mt-3">
              <Card.Img
                variant="top"
                src={datas.product.file}
                width={171}
                height={180}
              />
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Card.Title>Name : {datas.product.Name}</Card.Title>
                  </div>
                  <div>
                    <Card.Title>Price : {datas.product.price}</Card.Title>
                  </div>
                </div>
                <Card.Text>{datas.product.discription}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Actionproductcompnent;
