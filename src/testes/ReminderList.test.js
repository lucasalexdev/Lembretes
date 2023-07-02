import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReminderList from "../components/ReminderList";

const mockStore = configureStore([]);

describe("ReminderList", () => {
  it("Deve exibir os lembretes corretamente", () => {
    // Define o estado inicial do store Redux com uma lista de lembretes
    const initialState = {
      reminders: {
        list: [
          {
            id: 1,
            description: "Lembrete 1",
            date: "01/07/2023",
          },
          {
            id: 2,
            description: "Lembrete 2",
            date: "02/07/2023",
          },
        ],
      },
    };

    // Cria um mock do store Redux com o estado inicial definido
    const store = mockStore(initialState);

    // Renderiza o componente ReminderList dentro do Provider com o store mockado
    const { getByText } = render(
      <Provider store={store}>
        <ReminderList />
      </Provider>
    );

    // Verifica se os lembretes são exibidos corretamente na tela
    expect(getByText("Lembrete 1")).toBeInTheDocument();
    expect(getByText("Lembrete 2")).toBeInTheDocument();
  });

  it("Deve chamar a ação de exclusão de lembrete quando o botão de exclusão for clicado", () => {
    // Define o estado inicial do store Redux com um único lembrete
    const initialState = {
      reminders: {
        list: [
          {
            id: 1,
            description: "Lembrete 1",
            date: "01/07/2023",
          },
        ],
      },
    };

    // Cria um mock do store Redux com o estado inicial definido
    const store = mockStore(initialState);

    // Renderiza o componente ReminderList dentro do Provider com o store mockado
    const { getByText } = render(
      <Provider store={store}>
        <ReminderList />
      </Provider>
    );

    // Obtém o botão de exclusão do lembrete
    const deleteButton = getByText("X");

    // Simula um clique no botão de exclusão
    fireEvent.click(deleteButton);

    // Verifica se a ação deleteReminder foi chamada com os argumentos corretos
    const expectedAction = {
      type: "DELETE_REMINDER",
      payload: 1, // ID do lembrete a ser excluído
    };
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
