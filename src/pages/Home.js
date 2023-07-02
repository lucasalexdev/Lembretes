import React from 'react';
import Header from '../components/Header';
import ReminderForm from '../components/ReminderForm';
import ReminderList from '../components/ReminderList';
import useReminders from '../hooks/useReminders';

function Home() {
    // Utiliza o hook useReminders para obter os lembretes e as funções de criação e exclusão de lembretes
  const { reminders, createReminder, deleteReminder } = useReminders();

  // Função para lidar com a criação de lembretes
  const handleReminderCreate = (reminder) => {
    createReminder(reminder);
  };

  // Função para lidar com a exclusão de lembretes
  const handleReminderDelete = (reminderId) => {
    deleteReminder(reminderId);
  };

  return (
    <div>
      <Header />
      <ReminderForm onReminderCreate={handleReminderCreate} />
      <ReminderList reminders={reminders} onDeleteReminder={handleReminderDelete} />
    </div>
  );
}

export default Home;
