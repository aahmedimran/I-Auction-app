import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { deleteBid, getAuction } from "../../store/Auction product/action";
const Yourbid = () => {
  const { data } = useSelector((state) => state.getAuction);
  const User = localStorage.getItem("User");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line

  return (
    <div className="actionCard">
      {data?.length ? (
        data &&
        data?.map(
          (datas, index) =>
            datas?.product?.bidder
              .map((bidderData) => bidderData.bidderId)
              .includes(User) && (
              <Card
                style={{
                  width: "18rem",
                  border: "none",
                  height: "66vh",
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
                  <Card.Text className="item">
                    <strong>Name :</strong> {datas?.product?.Name}
                  </Card.Text>
                  <Card.Text className="item">
                    <strong>Price :</strong>
                    {datas.product.bidder.map(
                      (bidder) => bidder.bidderId === User && bidder.bidPrice
                    )}
                    /Rs
                  </Card.Text>
                  <Card.Text className="item">
                    <strong> Categary :</strong> {datas?.product?.Categary}
                  </Card.Text>
                  <Card.Text className="item">
                    <strong>Type :</strong>
                    {datas?.product?.type}
                  </Card.Text>
                  <Card.Text className="discription">
                    <strong>Discription :</strong> {datas?.product?.discription}
                  </Card.Text>
                  {!datas.product.confirmBid ? (
                    <div className="button-container">
                      <Button
                        variant="primary"
                        onClick={() => dispatch(deleteBid(datas?.id))}
                      >
                        {" "}
                        Cancel bid
                      </Button>
                    </div>
                  ) : (
                    <div className="button-container">
                      <Button variant="primary"> bid confirmed</Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )
        )
      ) : (
        <div>Data not found</div>
      )}
    </div>
  );
};

export default Yourbid;
