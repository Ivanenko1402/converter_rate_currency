import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setRates } from "../../features/ratesSlice";

export const Form = () => {
  const { rates } = useAppSelector(state => state.rates);
  const dispatch = useAppDispatch();
  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  const [date, setDate] = useState(today)
  const [inputValue, setInputValue] = useState(0);
  const [selectFrom, setSelectFrom] = useState(1);
  const [selectTo, setSelectTo] = useState(0);
  const [result, setResult] = useState(0);

  async function fetchRates() {
    const selectedDate = date.split('-').join('');
    const URL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${selectedDate}&json`;

    const result = await axios.get(URL);

    try {
      dispatch(setRates(result.data))
    } catch (error) {
      console.log(error);
    }
  };

  const swapSelectors = () => {
    const prevSelectorFom = selectFrom;

    setSelectFrom(selectTo);
    setSelectTo(prevSelectorFom);
  }

  useEffect(() => {
    if (rates.length) {
      setSelectTo(rates[0].rate)
    }
  }, [rates])

  useEffect(() => {
    fetchRates();
  }, [date])

  useEffect(() => {
    setResult(Number(inputValue * selectFrom / selectTo));
    return;
  }, [selectFrom, selectTo, inputValue])

  useEffect(() => {
    setInputValue(Number(result * selectTo / selectFrom));
  }, [result])

  return (
    <div className="content">
      <form className="content_form" onSubmit={(event) => {
        event.preventDefault();
      }}>
        <label className="content_form_date">
          Date
          <input
            type="date"
            className="content_form_date_input"
            max={today}
            value={date}
            onChange={(event) => setDate(event.target.value)} />
        </label>
        <div className="content_form_conteiner">
          <div className="content_form_conteiner_inputs">
            <label className="content_form_conteiner_inputs_label">
              From
              <select
                className="content_form_conteiner_inputs_label_input"
                value={selectFrom}
                onChange={(event => setSelectFrom(Number(event.target.value)))}
              >
                <option value={1}>Гривня - UAH</option>
                {rates.map(rate => (
                  <option value={rate.rate} key={rate.r030}>
                    {`${rate.txt} - ${rate.cc}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="content_form_conteiner_inputs_label">
              Amount
              <input
                className="content_form_conteiner_inputs_label_input"
                type="number"
                min={0}
                step='0.1'
                inputMode='numeric'
                placeholder="0"
                value={String(Math.round(inputValue * 100) / 100)}
                onChange={event => setInputValue(Number(event.target.value))}
              />
            </label>
          </div>

          <button
            className="content_form_conteiner_button"
            type="button"
            onClick={() => swapSelectors()}
          >
            <div className="content_form_conteiner_button_img">
            </div>
          </button>

          <div className="content_form_conteiner_inputs">
            <label className="content_form_conteiner_inputs_label">
              To:
              <select
                className="content_form_conteiner_inputs_label_input"
                value={selectTo}
                onChange={event => setSelectTo(Number(event.target.value))}
              >
                <option value={1}>Гривня - UAH</option>
                {rates.map(rate => (
                  <option
                    value={rate.rate}
                    key={rate.r030}
                  >
                    {`${rate.txt} - ${rate.cc}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="content_form_conteiner_inputs_label">
              Result
              <input
                className="content_form_conteiner_inputs_label_input"
                type="number"
                min={0}
                step='0.1'
                placeholder="0"
                inputMode='numeric'
                value={String(Math.round(result * 100) / 100)}
                onChange={event => setResult(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}