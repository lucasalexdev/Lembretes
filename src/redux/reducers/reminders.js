const initialState = {
  list: [],
};

// Reducer para gerenciar o estado dos lembretes
const remindersReducer = (state = initialState, action) => {
    // Função auxiliar para gerar o ID do lembrete
  function generateReminderId() {
    if (state.list.length > 0) {
      return state.list[state.list.length - 1].id + 1;
    }

    return 1;
  }

  switch (action.type) {
    case "ADD_REMINDER":
      // Adiciona um novo lembrete à lista de lembretes
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: generateReminderId(),
            ...action.payload,
          },
        ],
      };
    case "DELETE_REMINDER":
      // Remove um lembrete da lista de lembretes
      return {
        ...state,
        list: state.list.filter((reminder) => reminder.id !== action.payload),
      };
    default:
      // Retorna o estado atual caso a ação não seja reconhecida
      return state;
  }
};

export default remindersReducer;
