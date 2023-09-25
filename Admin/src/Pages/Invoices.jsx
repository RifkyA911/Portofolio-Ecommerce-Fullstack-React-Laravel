import React from "react";
import { Container, Content } from "../Layout";
export default function Invoices() {
  // Konten komponen
  return (
    <>
      <Container>
        <Content pageName={"Invoices"}>
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
