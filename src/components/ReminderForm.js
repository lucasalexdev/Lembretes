import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReminder } from "../redux/actions/reminders";

function ReminderForm() {
  const dispatch = useDispatch();

  // Define os estados iniciais dos campos de descrição, data e erro
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [error, setError] = useState("");

  // Função para lidar com a mudança de data
  const handleDateChange = (e) => {
    let inputDate = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    inputDate = inputDate.slice(0, 8); // Limita o campo a 8 caracteres

    if (inputDate.length > 2) {
      // Insere as barras automaticamente após inserir o dia e o mês
      inputDate = inputDate.replace(/^(\d{2})(\d{2})(\d{0,4})$/, "$1/$2/$3");
    }

    setReminderDate(inputDate);
  };

  // Função para verificar se a descrição do lembrete é válida
  function isValidRemiderDescription() {
    return reminderDescription.length > 0;
  }

  // Função para verificar se a data é válida
  function isValidDate(date) {
    const [day, month, year] = date.split("/");
    const testDate = new Date(`${year}-${month}-${day}`);
    return testDate instanceof Date && !isNaN(testDate);
  }

  // Função para verificar se a data do lembrete é válida
  function isValidReminderDate() {
    if (reminderDate.length === 0) {
      setError("O campo de data não foi preenchido");
      return false;
    }

    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!datePattern.test(reminderDate)) {
      setError("O campo de data está no formato incorreto (dd/mm/yyyy)");
      return false;
    }

    if (!isValidDate(reminderDate)) {
      setError("A data informada é inválida");
      return false;
    }

    const now = new Date();
    const date = new Date(reminderDate);

    if (date <= now) {
      setError("A data do lembrete precisa estar no futuro");
      return false;
    }

    return true;
  }

  // Função para limpar os campos
  function clearFields() {
    setReminderDescription("");
    setReminderDate("");
    setError("");
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidRemiderDescription()) {
      setError("O campo de nome não foi preenchido");
      return;
    }

    if (!isValidReminderDate()) {
      return;
    }

    const reminder = {
      description: reminderDescription,
      date: reminderDate,
    };

    // Despacha a ação addReminder com o lembrete como parâmetro
    dispatch(addReminder(reminder));

    clearFields();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Exibe a mensagem de erro, se houver */}
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Nome do lembrete"
        value={reminderDescription}
        onChange={(e) => setReminderDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data (dd/mm/yyyy)"
        value={reminderDate}
        onChange={handleDateChange}
      />
      <button type="submit">Criar</button>
    </form>
  );
}

export default ReminderForm;
