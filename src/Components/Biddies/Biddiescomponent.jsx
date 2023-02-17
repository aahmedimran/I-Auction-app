import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getAuction } from "../../store/Auction product/action";
const Biddiescomponent = () => {
  const { data } = useSelector((state) => state.getAuction);
 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line

  return <>
<div className="actionCard">
        {data &&
          data?.map(
            (datas, index) =>
             ( datas.product.isBid === true) && (
                <Card
                  style={{
                    width: "18rem",
                    border: "none",
                    height: "55vh",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                  }}
                  key={index}
                  className=" mt-3 "
                >
                  <Card.Img
                    variant="top"
                    src={datas.product.file}
                    width={171}
                    height={180}
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Card.Title>Name : {datas.product.Name}</Card.Title>
                      </div>
                      <div>
                        <Card.Title>
                          Price : {datas.product.price}/Rs
                        </Card.Title>
                      </div>
                    </div>
                    <Card.Text className="discription">
                      <strong>Discription :</strong> {datas.product.discription}
                    </Card.Text>
                    <div className="button-container">
                

                      <Button variant="primary"> Cancel bid</Button>
                    </div>
                  </Card.Body>
                </Card>
              )
          )}
      </div>
  </>;
};

export default Biddiescomponent;
