import React, { useState, useEffect } from 'react';

export default function SwitchLang({ i18n }) {
  const [currentLang, setCurrentLang] = useState();

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n]);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setCurrentLang(e.target.value);
  };

  return (
    <div className="switch-languages">
      <select value={currentLang} onChange={(e) => changeLanguage(e)}>
        <option value="kr">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
