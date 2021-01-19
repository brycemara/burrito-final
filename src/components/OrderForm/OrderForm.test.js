import React from "react";
import OrderForm from "./OrderForm";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe.skip("Order Form", () => {
  it("should render correctly", () => {
    render(
      <OrderForm />
    )
    const nameInput = screen.getByPlaceholderText("Name")
    const ingredientInput = screen.getByText("beans")
    const submitButton = screen.getByText("Submit")

    expect(nameInput).toBeInTheDocument()
    expect(ingredientInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it("should be able to enter name", () => {
    render(
      <OrderForm />
    )
    const nameInput = screen.getByPlaceholderText("Name")
    
    userEvent.type(nameInput, "leta")
      
    expect(nameInput).toHaveValue("leta")
  })

  it("should be able to select ingredients", () => {
    render(
      <OrderForm />
    )
    const ingredientInput = screen.getByText("beans")
    
    userEvent.click(ingredientInput)

    expect(ingredientInput).toHaveValue("beans")
  })

  it('should be able to submit a new order', () => {
    const mockSetOrders = jest.fn()
    const mockOrders = [{
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
      }]
    render(
      <OrderForm setOrders={mockSetOrders} orders={mockOrders} />
    )
    const nameInput = screen.getByPlaceholderText("Name")
    const ingredientInput = screen.getByText("beans")

    userEvent.type(nameInput, "leta")
    userEvent.click(ingredientInput)
    userEvent.click(screen.getByText("Submit"))

    expect(mockSetOrders).toBeCalled()
  })
})