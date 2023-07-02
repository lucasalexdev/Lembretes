import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReminderForm from "../components/ReminderForm";

const mockStore = configureStore([]);

describe("ReminderForm", () => {
  it("should submit form with valid input", () => {
    const store = mockStore({});

    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ReminderForm />
      </Provider>
    );

    // Obtém os elementos do formulário
    const nameInput = getByPlaceholderText("Nome do lembrete");
    const dateInput = getByPlaceholderText("Data (dd/mm/yyyy)");
    const submitButton = getByText("Criar");

    // Simula a alteração dos campos de entrada
    fireEvent.change(nameInput, { target: { value: "Reminder 1" } });
    fireEvent.change(dateInput, { target: { value: "01/07/2023" } });

    // Simula o clique no botão de envio
    fireEvent.click(submitButton);

  });

  it("should display error message when name field is empty", () => {
    const store = mockStore({});

    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ReminderForm />
      </Provider>
    );

    // Obtém os elementos do formulário
    const nameInput = getByPlaceholderText("Nome do lembrete");
    const submitButton = getByText("Criar");

    // Simula o clique no botão de envio sem preencher o campo de nome
    fireEvent.click(submitButton);

    // Verifica se a mensagem de erro é exibida corretamente
    const errorMessage = getByText("O campo de nome não foi preenchido");
    expect(errorMessage).toBeInTheDocument();
  });
});
