import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { aceaptBid, getAuction } from "../../store/Auction product/action";
import "./Userbid.css";
const Userbid = () => {
  const { data } = useSelector((state) => state.getAuction);
  const [confirmBid, setConfirmBid] = React.useState("");
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
            !datas.product.confirmBid &&
            datas.product.userId === User &&
            datas.product.bidder.length >= 1 && (
              <Card
                style={{
                  width: "20rem",
                  border: "none",
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
                  <div className="desc">
                    <strong>Name:</strong> {datas.product.Name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Text>
                      {datas.product.bidder.map((bidder, index) => (
                        <div key={index} className="userbid-container">
                          <input
                            type="radio"
                            name="auctionType"
                            checked
                            value={bidder.bidderId}
                            onClick={(e) => setConfirmBid(e.target.value)}
                          />
                          <div>
                            <div>
                              <strong>bidder Name :</strong>
                              {bidder.bidderName}
                            </div>
                          </div>
                          <div>
                            <div>
                              <strong>bid price :</strong> {bidder.bidPrice}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Card.Text>
                  </div>
                  <div className="button-container">
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(aceaptBid(datas?.id, confirmBid));
                      }}
                    >
                      Conform bid
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )
        )
      ) : (
        <div style={{backgroundColor: 'black'}}>data Not found</div>
      )}
    </div>
  );
};
export default Userbid;
