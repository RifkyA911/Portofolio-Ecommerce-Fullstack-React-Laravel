import React from "react";
import { Container, Content } from "../Layout";

export const textku = "hallo wew";
function Order() {
  // Konten komponen
  return (
    <>
      <Container>
        <Content pageName={"Order"}>
          <table className="table">
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>C</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <tr></tr>
              </td>
            </tbody>
          </table>
        </Content>
      </Container>
    </>
  );
}
export default Order;
