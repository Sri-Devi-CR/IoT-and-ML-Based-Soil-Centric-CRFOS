import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";

const ActionButton = ({ onClick }) => {
  return (
    <MDBBtn
      className="w-100"
      size="md"
      style={{
        marginTop:"12px",
        backgroundColor: "#81c784",
        borderRadius: "5px",
        color: "#323232",
        fontFamily: "Paris2024",
        fontWeight: "bold",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      Get Fertilizer Recommendation
    </MDBBtn>
  );
};

export default ActionButton;