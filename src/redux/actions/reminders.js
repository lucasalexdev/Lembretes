// Ação para adicionar um lembrete
export const addReminder = (reminder) => {
  return {
    type: 'ADD_REMINDER',
    payload: reminder,
  };
};

// Ação para excluir um lembrete
export const deleteReminder = (reminderId) => {
  return {
    type: 'DELETE_REMINDER',
    payload: reminderId,
  };
};

