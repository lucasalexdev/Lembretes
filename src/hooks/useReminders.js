import { useState } from 'react';

function useReminders() {
  const [reminders, setReminders] = useState([]);

  const createReminder = (reminder) => {
    // Chamada para a API para criar o lembrete
    

    setReminders((prevReminders) => [...prevReminders, reminder]);
  };

  const deleteReminder = (reminderId) => {
    // Fazer a chamada para a API para deletar o lembrete pelo ID
    // Depois de receber a resposta da API

    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== reminderId)
    );
  };

  return {
    reminders,
    createReminder,
    deleteReminder,
  };
}

export default useReminders;
