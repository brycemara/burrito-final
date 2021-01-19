import React from "react";
import App from "./App";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { getOrders, postOrder } from "../../apiCalls";
jest.mock("../../apiCalls");

const expectedOrders = {
  orders : [
    {
      id: 5,
      name: "bryce",
      ingredients: [
      "pico de gallo",
      "hot sauce",
      "guacamole"
      ]
      },
      {
      id: 6,
      name: "Will",
      ingredients: [
      "queso fresco"
      ]
      }
]
}


describe("App", () => {
  it("should render correctly", () => {
    getOrders.mockResolvedValue(expectedOrders)
    act(() => render(
        <App />
    ))
    const header = screen.getByText("Burrito Builder")
    const submitButton = screen.getByText("Submit")

    expect(header).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it("should fetch correctly", async () =>  {
    getOrders.mockResolvedValue(expectedOrders)
    act(() => render(
        <App />
    ))
    const bryceOrder = await waitFor(() => screen.getByText("bryce"))
    const willOrder = await waitFor(() => screen.getByText("Will"))

    expect(bryceOrder).toBeInTheDocument()
    expect(willOrder).toBeInTheDocument()
  })
})

describe("Form & Orders Interaction", () => {
  
  it("should be able to fill out name and select ingredients", async () => {
    getOrders.mockResolvedValue(expectedOrders)
    act(() => render(
        <App />
    ))
    postOrder.mockResolvedValueOnce(expectedOrders)

    const nameInput = screen.getByPlaceholderText("Name")
    const ingredientInput = screen.getByText("beans")
    const submitButton = screen.getByText("Submit")

    act(() => {
      userEvent.type(nameInput, "leta")
      userEvent.click(ingredientInput)
      userEvent.click(submitButton)
    })

    const newOrder = await waitFor(() => screen.getByText("leta"))

    expect(newOrder).toBeInTheDocument()

  })
})