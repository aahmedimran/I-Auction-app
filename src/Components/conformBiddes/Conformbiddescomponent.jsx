import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAuction } from "../../store/Auction product/action";

const Conformbiddescomponent = () => {
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
            datas?.product?.confirmBid &&
            datas?.product?.aceaptedBid
              .map((aceaptedBid) => aceaptedBid.User)
              .includes(User) && (
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
                  <Card.Text className="item">
                    <strong>Name :</strong> {datas?.product?.Name}
                  </Card.Text>
                  <Card.Text className="item">
                    <strong>Price :</strong>
                    {datas?.product?.price}/Rs
                  </Card.Text>
                  <Card.Text className="item">
                    <strong>Categary :</strong>
                    {datas?.product?.Categary}
                  </Card.Text>
                  <Card.Text className="item">
                    <strong>Type :</strong>
                    {datas?.product?.type}
                  </Card.Text>
                  <Card.Text className="discription">
                    <strong>Discription :</strong>
                    {datas?.product?.discription}
                  </Card.Text>

                  <div>
                    <Button variant="primary" disabled>
                      Offer Accapted
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )
        )
      ) : (
        <div>data Not found</div>
      )}
    </div>
  );
};

export default Conformbiddescomponent;
