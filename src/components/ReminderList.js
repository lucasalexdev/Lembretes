import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReminder } from "../redux/actions/reminders";

// Função auxiliar para formatar a data
const formatDate = (date) => {
  const [dia, mes, ano] = date.split("/");
  return `${ano}-${mes}-${dia}`;
};

// Função para agrupar lembretes por data
const groupRemindersByDate = (reminders) => {
  const remindersByDate = {};

  reminders.forEach((reminder) => {
    const { date } = reminder;
    if (!remindersByDate[date]) {
      remindersByDate[date] = [];
    }
    remindersByDate[date].push(reminder);
  });

  return remindersByDate;
};

function ReminderList() {
  // Recupera a lista de lembretes do armazenamento Redux
  const reminders = useSelector(({ reminders }) => reminders.list);
  const dispatch = useDispatch();

  // Agrupa os lembretes por data
  const remindersByDate = groupRemindersByDate(reminders);

  // Função para lidar com a exclusão de um lembrete
  const handleDeleteReminder = (reminderId, date) => {
    dispatch(deleteReminder(reminderId));
  };

  return (
    <ul>
      {Object.keys(remindersByDate)
        // Ordena as datas em ordem crescente
        .sort((a, b) => new Date(formatDate(a)) - new Date(formatDate(b)))
        .map((date) => (
          <React.Fragment key={date}>
            <li className="date-header">{formatDate(date)}</li>
            {remindersByDate[date].map((reminder) => (
              <li key={reminder.id}>
                {reminder.description}
                <button onClick={() => handleDeleteReminder(reminder.id, date)}>
                  X
                </button>
              </li>
            ))}
          </React.Fragment>
        ))}
    </ul>
  );
}

export default ReminderList;
