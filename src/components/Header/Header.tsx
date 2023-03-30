import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks"
import { Rate } from "../../types/Rate";

export const Header: React.FC = () => {
  const { rates } = useAppSelector(state => state.rates);
  const [usd, setUsd] = useState<Rate | null>(null);
  const [eur, setEur] = useState<Rate | null>(null);

  useEffect(() => {
    setUsd(rates.find(rate => rate.cc === 'USD') || null);
    setEur(rates.find(rate => rate.cc === 'EUR') || null);
  }, [rates])

  return (
    <header className="header">
      <div className="header_logo">
      </div>
      <div className="header_content">
        <div className="header_content_conteiner">
          <img
            src='https://cdn-icons-png.flaticon.com/512/555/555526.png'
            alt="USD"
            className="header_content_conteiner_image"
          />
          <div>
            {usd && `: ${Math.floor(usd.rate * 100) / 100} UAH`}
          </div>
        </div>
        <div className="header_content_conteiner">
          <img
            src='https://cdn-icons-png.flaticon.com/512/330/330426.png'
            alt="USD"
            className="header_content_conteiner_image"
          />
          <div>
            
            {eur && `: ${Math.floor(eur.rate * 100) / 100} UAH`}
          </div>
        </div>
      </div>
    </header>
  )
}